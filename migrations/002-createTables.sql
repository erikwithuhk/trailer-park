DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS trailers;
DROP TABLE IF EXISTS friends;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  bio TEXT
);

CREATE TABLE trailers (
  id SERIAL PRIMARY KEY,
  media_type VARCHAR(255) NOT NULL,
  tmdb_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  adult BOOLEAN NOT NULL,
  users_id INTEGER NOT NULL --FK
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  friends_id INTEGER NOT NULL,
  users_id INTEGER NOT NULL
);
