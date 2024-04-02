### trial-copera.ai

#### Requirements
- Node 20.12
- Yarn

#### How To Run:

1- Run `mongodb`

```shell
cd ./infra/mongodb
export DB_USERNAME=root DB_PASSWORD=1234 && docker compose -f mongodb-compose.yaml up
```

2- Run `kafka`

```shell
cd ./infra/kafka
docker compose -f ./kafka-compose.yaml up
```

3- Run `backend`

```shell
cd ./backend

export DB_USERNAME='root'
export DB_PASSWORD='1234'
export DB_HOST='localhost'
export DB_PORT=27017
export KAFKA_BROKER='127.0.0.1:9092'
export PORT=3000

yarn install
yarn dev
```

4- Run `websocket`

```shell
cd ./websocket

export KAFKA_BROKER='127.0.0.1:9092'
export PORT='3001'

yarn install
yarn dev
```
