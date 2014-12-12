#!/bin/bash -ex

# Docker
cat > ~/.dockercfg <<EOF
{
    "https://quay.io/v1/": {
        "auth": "${QUAY_AUTH_TOKEN}",
        "email": ""
    }
}
EOF
