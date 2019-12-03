## Dockerized script
run:
	docker-compose up -d

test:
	docker-compose run api-gateway  npm test
	
build:
	docker-compose build

clean:
	docker-compose down

restart:
	docker-compose restart

fresh:
	make clean
	make run

rebuild:
	make clean
	make build
	make run
