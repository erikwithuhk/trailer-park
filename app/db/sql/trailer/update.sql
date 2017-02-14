UPDATE trailers
SET
  title = $2,
  media_type = $3
WHERE tmdb_id = $1^
RETURNING *;
