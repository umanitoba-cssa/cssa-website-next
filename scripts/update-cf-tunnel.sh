#!/usr/bin/env bash

set -euo pipefail

if [ -f .env ]; then
    set -a
    source .env
    set +a
else
    echo "Error: .env file not found"
    exit 1
fi

: "${CLOUDFLARE_ACCOUNT_ID:?Error: CLOUDFLARE_ACCOUNT_ID is required but not set. You can get it from Cloudflare Dashboard}"
: "${CLOUDFLARE_TUNNEL_ID:?Error: CLOUDFLARE_TUNNEL_ID is required but not set. You can get it from the Cloudflare Dashboard }"
: "${CLOUDFLARE_API_TOKEN:?Error: CLOUDFLARE_API_TOKEN is required but not set. You can get it from the Cloudflare Dashboard}"
: "${CLOUDFLARE_ZONE_ID:?Error: CLOUDFLARE_ZONE_ID is required but not set. You can get it from the Cloudflare Dashboard}"

API_URL="https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/cfd_tunnel/${CLOUDFLARE_TUNNEL_ID}/configurations"

BASE_DOMAIN=umanitobacssa.ca
TARGET_HOST=192.168.100.15

validate_number() {
    local value=$1 label=$2 min=$3 max=$4
    if ! [[ "$value" =~ ^[0-9]+$ ]]; then
        echo "Error: $label must be a number, got '$value'" >&2
        exit 1
    fi
    if ((10#$value < min || 10#$value > max)); then
        echo "Error: $label must be between $min-$max, got '$value'" >&2
        exit 1
    fi
}

check_config_successful() {
    config=$1
    if ! command -v jq >/dev/null 2>&1; then
        echo "Error: 'jq' is not installed." >&2
        exit 1
    fi

    if ! echo "$config" | jq -e '.success == true' >/dev/null 2>&1; then
        echo "Error: API request failed or invalid JSON response returned: $config" >&2
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

    if [ "$exists" = "true" ]; then
        echo "PR #${pr_number} already has a preview — replacing it"
    fi
    new_ingress=$(echo "$tunnel_config" | jq \
        --arg hostname "${pr_number}-preview.${BASE_DOMAIN}" \
        --arg service "https://${TARGET_HOST}:${port_number}" \
        '
  (.result.config.ingress // [])
  | map(select(.hostname != $hostname)) as $filtered
  | ($filtered | map(select(.hostname != null))) as $named
  | ($filtered | map(select(.hostname == null))) as $catchall
  | (if ($catchall | length) == 0 then [{service: "http_status:404"}] else $catchall end) as $catchall_final
  | $named + [{hostname: $hostname, service: $service}] + $catchall_final
  ')
    ingress_config=$(jq -n --argjson ingress "$new_ingress" '{config: {ingress: $ingress}}')

    new_tunnel_config=$(curl -s "$API_URL" -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -d "$ingress_config")
    check_config_successful "$new_tunnel_config"

    dns_hostname="${pr_number}-preview.${BASE_DOMAIN}"
    existing_dns=$(curl -s "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records?type=CNAME&name=${dns_hostname}" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN")
    check_config_successful "$existing_dns"

    dns_record_count=$(echo "$existing_dns" | jq '.result | length')

    if [ "$dns_record_count" -eq 0 ]; then
        dns_body=$(jq -n \
            --arg name "$dns_hostname" \
            --arg content "${CLOUDFLARE_TUNNEL_ID}.cfargotunnel.com" \
            '{
              name: $name,
              ttl: 3600,
              type: "CNAME",
              content: $content,
              proxied: true
            }')

        dns_response=$(curl -s "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records" \
            -X POST \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -d "$dns_body")
        check_config_successful "$dns_response"
        echo "DNS record created for ${dns_hostname}"
    else
        echo "DNS record for ${dns_hostname} already exists — skipping"
    fi
}

delete() {
    get_tunnel_config

    exists=$(echo "$tunnel_config" | jq \
        --arg hostname "${pr_number}-preview.${BASE_DOMAIN}" \
        '[.result.config.ingress[]? | select(.hostname == $hostname)] | length > 0')

    if ! [ "$exists" = "true" ]; then
        echo "No entry found for PR #${pr_number}, nothing to delete"
        exit
    fi
    new_ingress=$(echo "$tunnel_config" | jq \
        --arg hostname "${pr_number}-preview.${BASE_DOMAIN}" \
        '
  (.result.config.ingress // [])
  | map(select(.hostname != $hostname))
  ')
    ingress_config=$(jq -n --argjson ingress "$new_ingress" '{config: {ingress: $ingress}}')

    new_tunnel_config=$(curl -s "$API_URL" -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -d "$ingress_config")
    check_config_successful "$new_tunnel_config"

    dns_hostname="${pr_number}-preview.${BASE_DOMAIN}"
    existing_dns=$(curl -s "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records?type=CNAME&name=${dns_hostname}" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN")
    check_config_successful "$existing_dns"

    dns_record_id=$(echo "$existing_dns" | jq -r '.result[0].id // empty')

    if [ -n "$dns_record_id" ]; then
        dns_response=$(curl -s "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records/${dns_record_id}" \
            -X DELETE \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN")
        check_config_successful "$dns_response"
        echo "DNS record for ${dns_hostname} removed"
    fi
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
            if [ ! -x ./scripts/find-free-port.sh ]; then
                echo "Error: ./scripts/find-free-port.sh not found or not executable" >&2
                exit 1
            fi
            port_number=$(./scripts/find-free-port.sh)
            validate_number "$port_number" "port" 1 65535
            pr_number=$1
            validate_number "$pr_number" "pr number" 1 999999
        elif [ $# -eq 2 ]; then
            port_number=$1
            validate_number "$port_number" "port" 1 65535
            pr_number=$2
            validate_number "$pr_number" "pr number" 1 999999
        else
            echo "Usage: $0 create <port> <pr_number>  (or just <pr_number> to auto-pick a port)" >&2
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
        validate_number "$pr_number" "pr number" 1 999999
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
