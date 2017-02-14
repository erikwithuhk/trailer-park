\c trailer_park_db_new

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS trailers;
DROP TABLE IF EXISTS users_trailers;
DROP TABLE IF EXISTS friends;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  username VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  bio TEXT,
  password VARCHAR NOT NULL
);

CREATE TABLE trailers (
  tmdb_id INTEGER PRIMARY KEY NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  media_type VARCHAR(50) NOT NULL
);

CREATE TABLE users_trailers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  tmdb_id INTEGER NOT NULL REFERENCES trailers(tmdb_id),
  blocked BOOLEAN DEFAULT FALSE
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  friend_id INTEGER NOT NULL REFERENCES users(id)
);
