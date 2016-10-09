INSERT INTO user_auth (email, password) VALUES($1, $2) RETURNING *;
