#!/usr/bin/env bash

MIN=1024
MAX=65535

get_random_port() {
    echo $(( RANDOM % (MAX - MIN + 1) + MIN ))
}


is_port_free() {
    local port=$1
    if ss -tuplen | grep "$port" >/dev/null 2>&1; then
        return 1 
    else
        return 0
    fi
}

find_free_port() {
    for i in {1..100}; do
        local port
        port=$(get_random_port)
        if is_port_free "$port"; then
            echo "$port"
            return 0
        fi
    done
    echo "Error: No free port found, try again" >&2
    exit 1
}

main() {
    if [ $# -eq 0 ]; then
        find_free_port
    elif [ $# -eq 1 ]; then
        local port=$1
        if is_port_free "$port"; then
            echo "port $port is free"
        else
            echo "port $port is occupied"
        fi
    else
        echo "Invalid number of parameters provided." >&2
        exit 1
    fi
}

main "$@"