SELECT tmdb_id, title, media_type FROM users JOIN trailers ON users.id = trailers.users_id WHERE users.id = $1;
