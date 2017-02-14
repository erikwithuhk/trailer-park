-- These migrations are to be performed manually using
 -- the psql console

\c trailer_park_db

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  bio TEXT,
  password VARCHAR NOT NULL
);
