
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- our fantastic structure

create table actor (
    id uuid primary key default uuid_generate_v4(),
    name varchar (200)
);

create table language (
    id uuid primary key default uuid_generate_v4(),
    name varchar(200)
);

create table writer (
    id uuid primary key default uuid_generate_v4(),
    name varchar(200)
);

create table director (
    id uuid primary key default uuid_generate_v4(),
    name varchar(200)
);

create table country (
    id uuid primary key default uuid_generate_v4(),
    name varchar(200)
);

create table movie (
    id uuid primary key default uuid_generate_v4(),
    title varchar(5000),
    year integer,
    rated varchar(1000),
    released date,
    runtime float,
    imdbId varchar(2000),
    plot TEXT,
    production varchar(7000),
    imdbVotes integer
);

create table moviecountry (
    movieid uuid not null,
    countryid uuid not null,
    CONSTRAINT FK_MCMID FOREIGN KEY (movieid) REFERENCES movie(id),
    CONSTRAINT FK_MCCID FOREIGN KEY (countryid) REFERENCES country(id)
);

create table movieWriter (
    id uuid primary key default uuid_generate_v4(),
    movieId uuid NOT NULL,
    writerId uuid NOT NULL,
    CONSTRAINT FK_MOVIEWRTIER_MOVIEID FOREIGN KEY (movieId) REFERENCES movie(id),
    CONSTRAINT FK_MOVIEWRITER_WRITERID FOREIGN KEY (writerId) REFERENCES writer(id)
);

create table ratingType (
    id uuid primary key default uuid_generate_v4(),
    ratingName varchar(200) NOT NULL,
    ratingTop NUMERIC(7, 2)
);

create table movieRating (
    id uuid primary key default uuid_generate_v4(),
    movieId uuid NOT NULL,
    ratingType uuid NOT NULL,
    ratingValue NUMERIC (7, 2) NOT NULL,

    CONSTRAINT FK_MOVIE_RATING_MOVIE_ID FOREIGN KEY (movieId) REFERENCES movie(id),
    CONSTRAINT FK_MOVIE_RATING_TYPE FOREIGN KEY (ratingType) REFERENCES ratingType(id)
);

create table movieActor (
    id uuid primary key default uuid_generate_v4(),
    movieId uuid NOT NULL,
    actorId uuid NOT NULL,
    CONSTRAINT FK_MOVIE_ACTOR_ID FOREIGN KEY (movieId) REFERENCES movie(id),
    CONSTRAINT FK_MOVIE_ACTOR_ACTOR_ID FOREIGN KEY (actorId) REFERENCES actor(id)
);

create table movieLanguage (
    id uuid primary key default uuid_generate_v4(),
    movieId uuid NOT NULL,
    languageId uuid NOT NULL,
    CONSTRAINT FK_MOVIE_LANGUAGE_ID FOREIGN KEY (movieId) REFERENCES movie(id),
    CONSTRAINT FK_MOVIE_LANGUAGE_LANGUAGE_ID FOREIGN KEY (languageId) REFERENCES language(id)
);

create table moviedirector (
    id uuid primary key default uuid_generate_v4(),
    movieid uuid not null,
    directorid uuid not null,
    CONSTRAINT FK_DIRECTOR_MOVIEID FOREIGN KEY (movieid) REFERENCES movie(id),
    CONSTRAINT FK_DIRECTOR_DIRECTORID FOREIGN KEY (directorid) REFERENCES director(id)
);

create table genre (
    name varchar(200),
    id uuid default uuid_generate_v4() not null primary key
);

create table moviegenre (
    id uuid primary key default uuid_generate_v4() not null,
    movieid uuid, genreid uuid,
    constraint mgmid foreign key (movieid) references movie(id),
    constraint mggid foreign key (genreid) references genre(id)
);

create table appuser (
    id uuid primary key default uuid_generate_v4() not null,
    registered timestamptz default now()
);

create table uservote (
    id uuid not null primary key default uuid_generate_v4(),
    userid uuid not null,
    movieid uuid not null,
    voted timestamptz default now(),
    value decimal(7, 2) not null,
    constraint uvmid foreign key (movieid) references movie(id),
    constraint uvuid foreign key (userid) references appuser(id),
    constraint uniquemiduid UNIQUE (movieid, userid),
    constraint validvalue CHECK (value >= 0 AND value <= 10)
);