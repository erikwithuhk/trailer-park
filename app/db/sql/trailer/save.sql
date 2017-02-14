UPDATE trailers
SET
  tmdb_id = $2,
  title = $3,
  media_type = $4,
WHERE id = $1
RETURNING *;
