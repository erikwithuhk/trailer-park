SELECT users.id, email, username, first_name, last_name, bio, password, array_to_string(array_agg(CONCAT_WS('*@*', media_type, tmdb_id, title, blocked)), '#@#') AS trailers
FROM users LEFT JOIN trailers ON users.id = trailers.users_id
GROUP BY users.id;
