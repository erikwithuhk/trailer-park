INSERT INTO trailers (tmdb_id, media_type, title, blocked, users_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;
