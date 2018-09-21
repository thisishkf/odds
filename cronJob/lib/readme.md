# node-lib

## desciption

## usage
1. Add library to package.json

```javascript 
    "dependencies": {
	    "lib": "git+ssh://git@git.fintechlink.com.hk:blockchain/common/node-lib.git#develop"
	},
```

2. Install library

```bash
npm install
```

3. Importing libray
For es6 or newer version, use `Destructuring Assignment`:

```javascript 
    const { logger, mysqldb, system } = require('lib');
```

for es5 or older verion:
```javascript 
    const library = require('lib');
    const logger = library.logger;
    const mysqldb = library.mysqldb;
    const system = library.system;
```

## Table of Contents
1. [core](#core)
2. [mysqlService](#mysqlService)
3. [system](#system)
4. [logger](#logger)

## core

#### Desciption

This is a library exporting core functions, mostly prototype function of JavaScript object.
Core libaray must be loaded.

## mysqlService

#### Desciption

This is the interface library for use `mysql` library.
* only single layer transaction is support.

#### Parameter

Parameters that will be used when initing the services.

| Parameter      | Type   | Mandatory | Example            | Default    |
|----------------|--------|-----------|--------------------|------------|
| host           | String | true      | '10.0.0.34'        |            |
| port           | Number | true      |  3306              |            |
| user           | String | true      | 'devsharptradesql' |            |
| password       | String | true      | 'xbwb9rch'         |            |
| database       | String | true      | 'devsharptradedb'  |            |
| connectTimeout | Number | false     | 300000             | 300000     |
| maxRetry       | Number | false     | 5                  | 2          |
| queueLimit     | Number | false     | 30                 | 30         |
| acquireTimeout | Number | false     | 300000             | 300000     |

#### functions
> TODO

## system

This is the system core library. 

#### functions:

1. loadConfig(String)

## logger

#### Desciption

This is a logger library logging to `console` and `file`.
If filepath is not found, only console logging will be preformed.

#### Parameter

Parameters that will be used when initing the services.

| Name           | Type   | Mandatory | Example                             |
|----------------|--------|-----------|-------------------------------------|
| filepath       | String | true      | '/var/log/app/'                     |
| level          | String | true      | 'all'                               |
| filename       | Object | true      | { filename.debug , filename.error } |
| filename.debug | String | true      | "local-sc.sharptrade.io.log.{DATE}" |
| filename.error | String | true      | "local-sc.sharptrade.io.log.{DATE}" |

#### functions:
1. info(String)
2. debug(String)
3. error(String)
4. warn(String)