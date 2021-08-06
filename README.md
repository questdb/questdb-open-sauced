# questdb-open-sauced

Code examples and resources for the Open Sauced stream!

## Starting QuestDB

```
docker run -p 9000:9000 \
  -p 9003:9003 \
  -p 9009:9009 \
  -p 8812:8812 questdb/questdb:6.0.4
```

You can interact with QuestDB using the following interfaces:

- [Web Console](https://questdb.io/docs/reference/web-console/) listening on
  port `9000`
- [REST API](https://questdb.io/docs/reference/api/rest/) on port `9000`
- [PostgreSQL](https://questdb.io/docs/reference/api/postgres/) wire protocol on
  port `8812`
- [InfluxDB](https://questdb.io/docs/reference/api/influxdb/) line protocol for
  high-throughput ingestion on port `9009`

## Starting Telegraf

Run telegraf with the configuration file provided:

```
telegraf --config questdb_tcp.conf
```

## Starting Grafana

```
docker run -p 3000:3000 grafana/grafana
```

### Add a data source

1. Open Grafana's UI (by default available at `http://localhost:3000`)
2. Go to the `Configuration` section and click on `Data sources`
3. Click `Add data source`
4. Choose the `PostgreSQL` plugin and configure it with the following settings:

```bash
host: localhost:8812
database: qdb
user: admin
password: quest
SSL mode: disable
```

5. When adding a panel, use the "text edit mode" by clicking the pencil icon and
   adding a query

## Docker compose

A docker compose file is provided for convenience so QuestDB is already added as a datasource within Grafana.
To start QuestDB and Grafana, run:

```
docker compose up
```
