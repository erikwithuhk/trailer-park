TRUNCATE TABLE TRAILERS;
TRUNCATE TABLE USERS;
TRUNCATE TABLE FRIENDS;

--ALTER SEQUENCE users_id_seq RESTART WITH 1;
--ALTER SEQUENCE friends_id_seq RESTART WITH 1;

INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 9340, 'The Goonies', false, 1);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 252171, 'A Girl Walks Home Alone at Night', false, 2);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 601, 'E.T. the Extra-Terrestrial', false, 3);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 578, 'Jaws', false, 4);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 205596, 'The Imitation Game', false, 1);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 264660, 'Ex Machina', false, 2);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 281957, 'The Revenant', false, 3);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 680, 'Pulp Fiction', false, 4);
INSERT INTO trailers(media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 393, 'Kill Bill: Vol. 2', false, 1);

INSERT INTO users(id, email, first_name, last_name, bio) VALUES (1, 'anniebnyc@gmail.com', 'Annie', 'Burns', 'filmbuff');
INSERT INTO users(id, email, first_name, last_name, bio) VALUES (2, 'efjonsson@gmail.com', 'Erik', 'Jonsson', 'love obscure comedy');
INSERT INTO users(id, email, first_name, last_name, bio) VALUES (3, 'lynnfleck@me.com', 'Lynn', 'Fleck', 'love engaging series');
INSERT INTO users(id, email, first_name, last_name, bio) VALUES (4, 'alf2125@gmail.com', 'Allie', 'Fleder', 'popcorn enthusiast');
INSERT INTO users(id, email, first_name, last_name, bio) VALUES (5, 'iamonily@omily.com', 'omily', 'otter', 'jaws scares me');
INSERT INTO users(id, email, first_name, last_name, bio) VALUES (6, 'hellothere@gmail.com', 'lichard', 'lemur', 'couch potato');

INSERT INTO friends(friends_id, users_id) VALUES (4, 1);
INSERT INTO friends(friends_id, users_id) VALUES (3, 2);
INSERT INTO friends(friends_id, users_id) VALUES (5, 3);
INSERT INTO friends(friends_id, users_id) VALUES (6, 4);

