#!/bin/bash -ex

sudo docker push quay.io/nicolastr11/sact:${CIRCLE_BRANCH}

SSH_OPTIONS="-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"
ssh ${SSH_OPTIONS} ubuntu@178.62.25.158 -t "bash -exs" <<EOF
# Credentials
cat > ~/.dockercfg <<EOF2
{
    "https://quay.io/v1/": {
        "auth": "${QUAY_AUTH_TOKEN}",
        "email": ""
    }
}
EOF2

# Data directories
sudo mkdir -p /data/postgresql

# Dependencies
sudo apt-get update -qq
sudo apt-get install -y python-pip
sudo pip install fig==1.0.1
curl -sSL https://get.docker.io/ubuntu/ | sudo sh

# Force the pull to have the latest version
sudo docker pull quay.io/nicolastr11/sact:master
# Start the app

cat > fig.yml <<EOF2
postgres:
    image: orchardup/postgresql:9.3
    environment:
        POSTGRESQL_USER: superawesomeuser
        POSTGRESQL_PASS: ${POSTGRESQL_PASS}
        POSTGRESQL_DB: superawesomedb
    volumes:
        - /data/postgresql:/var/lib/postgresql

web:
    image: quay.io/nicolastr11/sact:master
    links:
        - postgres
    ports:
        - "80:80"
    environment:
        SENTRY_DSN: "${SENTRY_DSN}"
        DJANGO_SECRET_KEY: "${DJANGO_SECRET_KEY}"
EOF2

sudo fig stop
sudo fig rm --force
sudo fig up -d
sleep 5
EOF
