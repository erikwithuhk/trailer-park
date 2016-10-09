-- These migrations are to be performed manually using
 -- the psql console

\c trailer_park_db

DROP TABLE IF EXISTS user_auth;

CREATE TABLE user_auth (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);
