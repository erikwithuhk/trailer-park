UPDATE users
SET
  email = $2,
  username = $3,
  first_name = $4,
  last_name = $5,
  bio = $6,
  password = $7
WHERE id = $1
RETURNING *;
