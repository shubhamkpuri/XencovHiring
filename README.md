# XENCOV Hiring Assignment

The assignment was to create a simple REST API to receive large CSV file and then store each row as data in Postgres with basic Validations.

## Installation

You can use npm to install all the packages that are being used.

```bash
npm install
```
## Database setup

Create a database in PostgreSQL.

Then use **createTable.sql** file provided in root folder of project to create table for Records.

You will also need to change host, port, username and password for database and that you can do .env file.

## Usage

There are 3 API 

1. /records -GET

 This API returns list of All the records in records table.

2. /records/upload-file  -POST

This API accepts a .csv, uploads the .csv file to server then migrate each row in the database to postgres.

3. /records/chunk-file   -POST

This API accepts stream of file from UI. Then validates and pass it to the server. This API will require UI so can't be tested using Postman. 

## Conclusion
There were many approach to tackle this problem and the best one will be using stream-data from frontend and passing it to backend so that buffer size won't create a issue.

Those implementation are two-way communication implementation like using socket to show status of the data that has been already migrated.