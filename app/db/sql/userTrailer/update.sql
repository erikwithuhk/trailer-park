UPDATE users_trailers
SET
  blocked = $3
WHERE user_id = $1^
AND tmdb_id = $2^;
