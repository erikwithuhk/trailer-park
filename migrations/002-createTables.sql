--schema


DROP TABLE IF EXISTS trailers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;

CREATE TABLE trailers (
  id SERIAL PRIMARY KEY,  --PK
  media_type VARCHAR(255),
  tmdb_id INTEGER,
  title VARCHAR(255),
  adult BOOLEAN,
  users_id INTEGER --FK
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  bio TEXT,
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  users_id INTEGER
);
