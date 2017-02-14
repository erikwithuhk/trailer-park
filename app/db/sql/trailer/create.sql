INSERT INTO trailers (tmdb_id, title, media_type) VALUES ($1, $2, $3) RETURNING *;
