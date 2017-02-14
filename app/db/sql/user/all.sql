SELECT users.id, email, username, first_name, last_name, bio, password, array_to_string(array_agg(CONCAT_WS('*@*', trailers.tmdb_id, title, media_type)), '#@#') AS trailers
FROM users LEFT JOIN users_trailers ON users.id = users_trailers.user_id JOIN trailers ON users_trailers.tmdb_id = trailers.tmdb_id
GROUP BY users.id;
