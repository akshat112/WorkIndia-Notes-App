# WorkIndia's Notes App
---
## Table of contents
- [About](#About)
- [Installation](#installation)
- [Dependencies](#dependencies)
## About
This repository is the submission for WorkIndia's Backend API task

Following modules are made:
  - User
  - Notes

## Installation
The details of the users and notes will be stored in the database under the table names `users` and `notes` respectively. 
Create a MySQL Database with following tables:

#### Users
| id | username | password
|--- | --- | ---|
| primary key int | unique | text

#### Notes
| id | title | data |user_id
|--- | --- | ---| ---|
| primary key int | encrypted test | encrypted text | id of user who added this note

This requires NodeJS to work
```bash
# Clone this repository
$ https://github.com/akshat112/WorkIndia-Notes-App.git

# Go into the repository
$ cd WorkIndia-Notes-App

# Install dependencies
$ npm install

# Create a .env file with following details
DB_NAME=<Your DB>
DB_USER=<Your DB Username>
DB_PASSWORD=<Your DB Password>
DB_HOST=<Your DB Host>
PORT=<Your Server Free Port>
JSON_TOKEN=<Your JWT Secret>
DATA_ENCRYPTION_KEY=<Your Encryption key for encrypting and decrypting notes>


# Run the app
$ npm start
```
## Dependencies

```
    "bcrypt": "^5.0.0",
    "body-parser": "^1.19.0",
    "cryptr": "^6.0.2",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mysql": "^2.18.1"
```
