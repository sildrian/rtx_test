# rtx_test

Instruction
================================================
Server
1.npm install => get all needed module

2.npx sequelize-cli db:create => create database

3.npx sequelize-cli model:generate --name api --attributes "api:jsonb" => generate model to create table

4.npx sequelize-cli db:migrate => create table

5.http://localhost:3000/api/getapitodb => get api for save to db

6.npm test => run unit test

7.npm run dev => to run in local

=============================================
Client

1.npm install => get all needed module

2.npm run test:unit => run unit test

3.http://localhost:8080 => to run in local


