#!/bin/bash

DOCKER_CONTAINER = transportesapp
DOCKER_DB = dbcenter

SPORT = --service-ports
DCOMPOSER = docker-compose

OS := $(shell uname)

help: ## Show this help message
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

run:
	docker-compose up -d

run-back:
	cd ../transportesapi
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down

restart:
	$(MAKE) stop && $(MAKE) run

bash:
	docker-compose exec ${DOCKER_CONTAINER} /bin/sh

inspectdb:
	docker inspect ${DOCKER_DB}

dev:
	docker-compose run --rm --service-ports ${DOCKER_CONTAINER} npm run dev

db:  ## Solo si dbcenter se encuentra en el mismo directorio que smartclaims
	cd ../dbcenter
	docker-compose up -d

up-full:  ## Solo si dbcenter se encuentra en el mismo directorio que smartclaims
	$(MAKE) db && $(MAKE) run && $(MAKE) run-back && $(MAKE) dev