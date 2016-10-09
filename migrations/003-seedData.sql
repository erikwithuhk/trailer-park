TRUNCATE TABLE USERS;
TRUNCATE TABLE TRAILERS;
TRUNCATE TABLE FRIENDS;

INSERT INTO users (email, username, first_name, last_name, bio) VALUES ('anniebnyc@gmail.com', 'filmbuff_annie', 'Annie', 'Burns', 'filmbuff');
INSERT INTO users (email, username, first_name, last_name, bio) VALUES ('efjonsson@gmail.com', 'erikwithuhk', 'Erik', 'Jonsson', 'love obscure comedy');
INSERT INTO users (email, username, first_name, last_name, bio) VALUES ('lynnfleck@me.com', 'lynn_designs', 'Lynn', 'Fleck', 'love engaging series');
INSERT INTO users (email, username, first_name, last_name, bio) VALUES ('alf2125@gmail.com', 'popcorn_lover', 'Allie', 'Fleder', 'popcorn enthusiast');
INSERT INTO users (email, username, first_name, last_name, bio) VALUES ('iamonily@omily.com', 'omily_the_otter', 'omily', 'otter', 'jaws scares me');
INSERT INTO users (email, username, first_name, last_name, bio) VALUES ('hellothere@gmail.com', 'lichard_the_lemur', 'lichard', 'lemur', 'couch potato');

INSERT INTO trailers (media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 9340, 'The Goonies', false, 1);
INSERT INTO trailers (media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 252171, 'A Girl Walks Home Alone at Night', false, 2);
INSERT INTO trailers (media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 601, 'E.T. the Extra-Terrestrial', false, 3);
INSERT INTO trailers (media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 578, 'Jaws', false, 4);
INSERT INTO trailers (media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 205596, 'The Imitation Game', false, 1);
INSERT INTO trailers (media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 264660, 'Ex Machina', false, 2);
INSERT INTO trailers (media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 281957, 'The Revenant', false, 3);
INSERT INTO trailers (media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 680, 'Pulp Fiction', false, 4);
INSERT INTO trailers (media_type, tmdb_id, title, adult, users_id) VALUES ('movie', 393, 'Kill Bill: Vol. 2', false, 1);

INSERT INTO friends (friends_id, users_id) VALUES (4, 1);
INSERT INTO friends (friends_id, users_id) VALUES (3, 2);
INSERT INTO friends (friends_id, users_id) VALUES (5, 3);
INSERT INTO friends (friends_id, users_id) VALUES (6, 4);
