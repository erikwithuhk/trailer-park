\c trailer_park_db

TRUNCATE TABLE users;
TRUNCATE TABLE trailers;
TRUNCATE TABLE users_trailers;
TRUNCATE TABLE friends;

INSERT INTO users (email, username, first_name, last_name, bio, password)
           VALUES ('anniebnyc@gmail.com', 'filmbuff_annie', 'Annie', 'Burns', 'filmbuff', 'password');
INSERT INTO users (email, username, first_name, last_name, bio, password)
           VALUES ('erik@test.com', 'erikwithuhk', 'Erik', 'Jönsson', 'love obscure comedy', 'password');
INSERT INTO users (email, username, first_name, last_name, bio, password)
           VALUES ('lynnfleck@me.com', 'lynn_designs', 'Lynn', 'Fleck', 'love engaging series', 'password');
INSERT INTO users (email, username, first_name, last_name, bio, password)
           VALUES ('alf2125@gmail.com', 'popcorn_lover', 'Allie', 'Fleder', 'popcorn enthusiast', 'password');
INSERT INTO users (email, username, first_name, last_name, bio, password)
           VALUES ('iamonily@omily.com', 'omily_the_otter', 'omily', 'otter', 'jaws scares me', 'password');
INSERT INTO users (email, username, first_name, last_name, bio, password)
           VALUES ('hellothere@gmail.com', 'lichard_the_lemur', 'lichard', 'lemur', 'couch potato', 'password');

INSERT INTO trailers (tmdb_id, title, media_type)
              VALUES (9340, 'The Goonies', 'movie');
INSERT INTO trailers (tmdb_id, title, media_type)
              VALUES (9598, 'Babe', 'movie');
INSERT INTO trailers (tmdb_id, title, media_type)
              VALUES (55721, 'Bridesmaids', 'movie');
INSERT INTO trailers (tmdb_id, title, media_type)
              VALUES (238713, 'Spy', 'movie');
INSERT INTO trailers (tmdb_id, title, media_type)
              VALUES (43074, 'Ghostbusters', 'movie');
INSERT INTO trailers (tmdb_id, title, media_type)
              VALUES (61418, 'Jane the Virgin', 'tv');
INSERT INTO trailers (tmdb_id, title, media_type)
              VALUES (4589, 'Arrested Development', 'tv');
INSERT INTO trailers (tmdb_id, title, media_type)
              VALUES (66732, 'Stranger Things', 'tv');
INSERT INTO trailers (tmdb_id, title, media_type)
              VALUES (578, 'Jaws', 'movie');

INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (1, 9340, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (1, 55721, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (1, 55721, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (1, 238713, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (2, 66732, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (2, 4589, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (2, 238713, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (2, 9598, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (3, 9340, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (3, 55721, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (3, 55721, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (3, 238713, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (4, 43074, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (4, 61418, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (4, 4589, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (4, 66732, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (5, 43074, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (5, 61418, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (5, 4589, FALSE);
INSERT INTO users_trailers (user_id, tmdb_id, blocked)
              VALUES (5, 66732, FALSE);

INSERT INTO friends (user_id, friend_id)
             VALUES (2, 1);
INSERT INTO friends (user_id, friend_id)
             VALUES (2, 3);
INSERT INTO friends (user_id, friend_id)
             VALUES (2, 4);
INSERT INTO friends (user_id, friend_id)
             VALUES (2, 5);
INSERT INTO friends (user_id, friend_id)
             VALUES (1, 2);
INSERT INTO friends (user_id, friend_id)
             VALUES (1, 3);
INSERT INTO friends (user_id, friend_id)
             VALUES (3, 6);
INSERT INTO friends (user_id, friend_id)
             VALUES (4, 5);
INSERT INTO friends (user_id, friend_id)
             VALUES (6, 1);
