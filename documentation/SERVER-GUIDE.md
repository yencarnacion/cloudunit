# Installing CloudUnit on a server

You are reading the right guide if you would like to set up a CloudUnit server.
This guide aims to provide install instructions that follow the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle).

## Requirements

A virtual or baremetal server with
* at least 8 GB RAM (32 GB or even 64 GB will be better!)
* Ubuntu 14.04 LTS (with a 4.x kernel with AUFS support) Or Centos 7.x (With LVM2 package installed and a lvm vg named "docker") (see FAQ if needed)

## Install

### As `root` 

Download the install script and check that all prerequisites are present.

```
curl -sSL https://raw.githubusercontent.com/Treeptik/cloudunit/dev/cu-production/get.cloudunit.sh | sh
```

Install and start CloudUnit, installing Docker if it isn't already.

```
./bootstrap.sh
```

During the install, you will be required to answer a few questions, such as whether to download (pull) or
build the components of the CloudUnit platform.

By default, the latest cutting-edge version from branch `dev` will be installed. If you would rather install
a different version, you may pass its tag or branch name as an argument to the installer. Branch `master` always
contains the latest stable release.

```
./bootstrap.sh [branch]
./bootstrap.sh dev
./bootstrap.sh master
```

## Unattended install

As mentioned before, the bootstrap script asks a few questions, mainly in order to customize the platform.
If you would like to do an unattended install, create a shell script named `.env` that sets the environment
variables that will be read. This script must be in the directory where you will execute the bootstrap script.
You can use the following example as inspiration for writing your own `.env` customization script.

```
# Set CloudUnit deployment Environment

CU_DOMAIN=cloudunit.io                       # Domain for all created application ex: myapp.cloudunit.io
CU_MANAGER_DOMAIN=cloudunit.io               # Url within Cloudunit UI will be reachable
CU_GITLAB_DOMAIN=gitlab.cloudunit.io         # Url within Gitlab UI will be reachable
CU_JENKINS_DOMAIN=jenkins.cloudunit.io       # Url within Jenkins UI will be reachable
CU_KIBANA_DOMAIN=kibana.cloudunit.io         # Url within Kibana UI will be reachable
CU_MATTERMOST_DOMAIN=mattermost.cloudunit.io # Url within Lets Chat UI will be reachable
CU_NEXUS_DOMAIN=nexus.cloudunit.io           # Url within Nexus UI will be reachable
CU_SONAR_DOMAIN=sonar.cloudunit.io           # Url within Sonar UI will be reachable
ELASTICSEARCH_URL=elasticsearch              # Url of elasticsearch database default to internal one
MYSQL_ROOT_PASSWORD=changeit                 # Change Mysql Root Password
MYSQL_DATABASE=cloudunit                     # Mysql Database name
HOSTNAME=cloudunit-host                      # Server hostname
```

# FAQ


## How to install a 4.x kernel with AUFS support

```
apt-get install linux-image-4.4.0-42-generic
apt-get install -y linux-image-extra-$(uname -r)

```

## How to install lvm2 package for Centos Distro

```
yum -y update && yum -y install lvm2

```

## How to create a fullspace volume (Digital Ocean)

```
pvcreate /dev/sda
vgcreate docker /dev/sda
```

## How to restart the production environment without reseting data

```
~/cloudunit/cu-compose/start-with-elk.sh
```
You have many start-* files for different scenarii.

## How to reset the production environment 

```
~/cloudunit/cu-compose/reset-prod.sh
~/cloudunit/cu-compose/start-with-elk.sh
```

## How to change the MySQL password

You have to change the MySQL root password (`changeit` by default)
To do so, you have to change the value in the following files
* /home/admincu/.cloudunit/configuration.properties
* /etc/profile

## How to change the SSL Certificates

In order to customize your CloudUnit installation with your own domain name and SSL certificates,
please follow these instructions.

Execute the following commands to copy you certificates into the traefik and restart the container :

```
docker cp /path/to/your-public-key.crt cu-traefik:/certs/traefik.crt 
docker cp /path/to/your-private-key.pem cu-traefik:/certs/traefik.key
docker restart cu-traefik
``` 
