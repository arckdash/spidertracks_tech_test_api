# API

### Requirements

Make sure you have the following installed in your computer:

* docker
* docker compose

### Install dependencies

Navigate to the root repo folder and run:

```
$> yarn
```

### Starting the project

From the root repository folder, run the command:

```
$> docker compose up -d
```

### Viewing logs

From the root repository folder, run the command:

```
$> docker logs spidertracks-api -f
```

### Stopping the project

From the root repository folder, run the command:

```
$> docker compose down
```

### TODO

* Fix TS absolute path issue
* Add logger middleware
* Add Global error handler middleware
* Add Authentication & Authorisation
* Tests
