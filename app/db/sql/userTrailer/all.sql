SELECT user_id, email, username, first_name, last_name, bio, password, trailers.tmdb_id, title, media_type, blocked
FROM users
JOIN users_trailers
ON users.id = users_trailers.user_id
JOIN trailers
ON users_trailers.tmdb_id = trailers.tmdb_id;
