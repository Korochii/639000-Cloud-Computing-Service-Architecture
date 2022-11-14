#!/bin/bash

apt-get update
apt install postgresql postgresql-contrib -y
systemctl start postgresql.service
cd /etc/postgresql/12/main
sed -i "92 i host    all             all             192.168.57.12/24        md5" pg_hba.conf
sed -i "s#1\/128#0\/0#" pg_hba.conf
sed -i "60 i listen_addresses = '*'         # what IP address(es) to listen on;" postgresql.conf
cd ~
psql -u postgres createdb log
psql -u postgres psql log -c "CREATE TABLE log(id SERIAL PRIMARY KEY, japInput TEXT, engOutput TEXT);"
psql -u postgres psql log -c "ALTER USER postgres PASSWORD 'password';"
service postgresql restart