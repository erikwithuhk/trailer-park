TRUNCATE TABLE TRAILERS;
TRUNCATE TABLE USERS;
TRUNCATE TABLE FRIENDS;

INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 9340, 'The Goonies', false, 124);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 252171, 'A Girl Walks Home Alone at Night', false, 125);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 601, 'E.T. the Extra-Terrestrial', false, 123);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 578, 'Jaws', false, 123);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 205596, 'The Imitation Game', false, 125);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 264660, 'Ex Machina', false, 124);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 281957, 'The Revenant', false, 123);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 680, 'Pulp Fiction', false, 125);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 393, 'Kill Bill: Vol. 2', false, 125);

INSERT INTO users(users_id, email, first_name, last_name, bio) VALUES (123, 'anniebnyc@gmail.com', 'Annie', 'Burns', 'filmbuff');
INSERT INTO users(users_id, email, first_name, last_name, bio) VALUES (124, 'efjonsson@gmail.com', 'Erik', 'Jonsson', 'love obscure comedy');
INSERT INTO users(users_id, email, first_name, last_name, bio) VALUES (125, 'lynnfleck@me.com', 'Lynn', 'Fleck', 'love engaging series');

INSERT INTO friends(friends_id, users_id) VALUES (124, 123);
INSERT INTO friends(friends_id, users_id) VALUES (123, 125);
INSERT INTO friends(friends_id, users_id) VALUES (124, 125);
