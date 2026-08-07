#!/usr/bin/env bash

set -a
source .env
set +a

API_URL="https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/cfd_tunnel/${CLOUDFLARE_TUNNEL_ID}/configurations"

BASE_DOMAIN=umanitobacssa.ca
TARGET_HOST=192.168.100.15

check_config_successful() {
    config=$1
    if ! echo "$config" | jq -e '.success == true' >/dev/null 2>&1; then
        echo "Error: GET failed" >&2
        exit 1
    fi
}
get_tunnel_config() {
    tunnel_config=$(curl -s "$API_URL" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN")

    check_config_successful "$tunnel_config"
}

create() {
    get_tunnel_config

    exists=$(echo "$tunnel_config" | jq \
        --arg hostname "${pr_number}-preview.${BASE_DOMAIN}" \
        '[.result.config.ingress[]? | select(.hostname == $hostname)] | length > 0')

    if $exists; then
        echo "PR #${pr_number} already has a preview — replacing it"
    fi
    new_ingress=$(echo "$tunnel_config" | jq \
        --arg hostname "${pr_number}-preview.${BASE_DOMAIN}" \
        --arg service "https://${TARGET_HOST}:${port_number}" \
        '
  .result.config.ingress
  | map(select(.hostname != $hostname)) as $filtered
  | ($filtered | map(select(.hostname != null))) as $named
  | ($filtered | map(select(.hostname == null))) as $catchall
  | $named + [{hostname: $hostname, service: $service}] + $catchall
  ')
    config=$(jq -n --argjson ingress "$new_ingress" '{config: {ingress: $ingress}}')

    new_tunnel_config=$(curl -s "$API_URL" -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -d "$config")

    check_config_successful "$new_tunnel_config"
}

delete() {
    get_tunnel_config

    exists=$(echo "$tunnel_config" | jq \
        --arg hostname "${pr_number}-preview.${BASE_DOMAIN}" \
        '[.result.config.ingress[]? | select(.hostname == $hostname)] | length > 0')

    if ! $exists; then
        echo "No entry found for PR #${pr_number}, nothing to delete"
        exit
    fi
    new_ingress=$(echo "$tunnel_config" | jq \
        --arg hostname "${pr_number}-preview.${BASE_DOMAIN}" \
        '
  .result.config.ingress
  | map(select(.hostname != $hostname))
  ')
    config=$(jq -n --argjson ingress "$new_ingress" '{config: {ingress: $ingress}}')

    new_tunnel_config=$(curl -s "$API_URL" -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -d "$config")

    check_config_successful "$new_tunnel_config"
}

main() {
    if [ $# -lt 1 ]; then
        echo "Usage: $0 <create|delete> [args...]" >&2
        exit 1
    fi

    action=$1
    shift

    case "$action" in
    create)
        if [ $# -eq 1 ]; then
            port_number=$(./scripts/find-free-port.sh)
            if ! [[ "$port_number" =~ ^[0-9]+$ ]]; then
                echo "Error: port must be a number, got '$port_number'" >&2
                exit 1
            fi
            pr_number=$1
            if ! [[ "$pr_number" =~ ^[0-9]+$ ]]; then
                echo "Error: port must be a number, got '$pr_number'" >&2
                exit 1
            fi
        elif [ $# -eq 2 ]; then
            port_number=$1
            pr_number=$2
        else
            echo "Usage: $0 create <port> <pr_number>  (or just <pr_number> to auto-pick a port)" >&2
            exit 1
        fi
        if ! [[ "$port_number" =~ ^[0-9]+$ ]]; then
            echo "Error: port must be a number, got '$port_number'" >&2
            exit 1
        fi
        if ! [[ "$pr_number" =~ ^[0-9]+$ ]]; then
            echo "Error: port must be a number, got '$pr_number'" >&2
            exit 1
        fi
        create
        echo "config created successfully"
        ;;
    delete)
        if [ $# -ne 1 ]; then
            echo "Usage: $0 delete <pr_number>" >&2
            exit 1
        fi
        pr_number=$1
        if ! [[ "$pr_number" =~ ^[0-9]+$ ]]; then
            echo "Error: port must be a number, got '$pr_number'" >&2
            exit 1
        fi
        delete
        echo "config updated successfully"
        ;;
    *)
        echo "Unknown action '$action' - expected 'create' or 'delete'" >&2
        exit 1
        ;;
    esac
}

main "$@"
