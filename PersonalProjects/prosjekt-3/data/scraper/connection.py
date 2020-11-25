import os

def connectToDb():
    from dotenv import load_dotenv

    import psycopg2

    # OR, explicitly providing path to '.env'
    from pathlib import Path  # Python 3.6+ only

    env_path = Path('../../backend/.env')# / '.env'
    load_dotenv(dotenv_path=env_path)

    # Connect to your postgres DB
    conn = psycopg2.connect("dbname=%s user=%s host=%s password=%s" % (
        os.getenv("PG_DATABASE"), os.getenv('PG_USER'), os.getenv("PG_HOST"), os.getenv("PG_PASS")))

    # Open a cursor to perform database operations
    return conn
    

    # # Execute a query
    # cur.execute("SELECT * FROM moviest")

    # # Retrieve query results
    # records = cur.fetchall()
    # print(records)




def AddActors(actors):
    conn = connectToDb()
    cur = conn.cursor()
    for actor in actors:
        cur.execute("insert into actor (name, id) values (%s, %s)", (actor, str(actors[actor])))

    # # conn.commit()
    cur.close()
    conn.close()

def AddWriters(writers):
    conn = connectToDb()
    cur = conn.cursor()
    for writer in writers:
        cur.execute("insert into writer (name, id) values (%s, %s)", (writer, str(writers[writer])))
    # # conn.commit()
    cur.close()
    conn.close()

def AddDirectors(directors):
    conn = connectToDb()
    cur = conn.cursor()
    for director in directors:
        cur.execute("insert into director (name, id) values (%s, %s)", (director, str(directors[director])))
    # # conn.commit()
    cur.close()
    conn.close()

def AddLanguage(languages):
    conn = connectToDb()
    cur = conn.cursor()
    for language in languages:
        cur.execute("insert into language (name, id) values (%s, %s)", (language, str(languages[language])))
    # # conn.commit()
    cur.close()
    conn.close()

def AddMovieRatingTypes(ratings):
    conn = connectToDb()
    cur = conn.cursor()
    for rating in ratings:
        r = ratings[rating]
        cur.execute("insert into ratingtype (id, ratingname, ratingtop) values (%s, %s, %s)", (str(r['id']), rating, r['top'] ))
    # # conn.commit()
    cur.close()
    conn.close()


def AddCountries(countries):
    conn = connectToDb()
    cur = conn.cursor()
    for country in countries:
        cur.execute("insert into country (id, name) values (%s, %s)", (str(countries[country]), country))
    # # conn.commit()
    cur.close()
    conn.close()


def AddGenres(genres):
    conn = connectToDb()
    cur = conn.cursor()
    for genre in genres:
        cur.execute("insert into genre (name, id) values (%s, %s)", (genre, str(genres[genre])))
    # conn.commit()
    cur.close()
    conn.close()

def AddMovie(movies):
    conn = connectToDb()
    cur = conn.cursor()
    counter = 0
    for movie in movies:
        #cur.execute("insert into movie (id, title, year, released, runtime, imdbId, plot, production, imdbVotes) values (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (movie.movieId, movie.title, movie.year, movie.released, movie.runtime, movie.imdbId, movie.plot, movie.production, movie.imdbVotes))
        # addMovieWriters(movie, conn)
        #addMovieActors(movie, conn)
        #addMovieRating(movie, conn)
        #addMovieLanguage(movie, conn)
        #addMovieCountries(movie, conn)
        addMovieGenres(movie, conn)
        counter += 1
    # conn.commit()
    cur.close()
    print("Inserted %i movies" % counter)
    

def addMovieWriters(movie, conn):
    cur = conn.cursor()
    for writer in movie.writers:
        cur.execute("insert into moviewriter (movieId, writerId, role) values (%s, %s, %s)", (str(movie.movieId), str(writer['writer']), str(writer['role'])))
    # conn.commit()
    cur.close()
    

def addMovieActors(movie, conn):
    cur = conn.cursor()
    for actor in movie.actors:
        cur.execute("insert into movieActor (movieId, actorId) values (%s, %s)", (str(movie.movieId), str(actor)))
    # # conn.commit()
    cur.close()
    

def addMovieRating(movie, conn):
    cur = conn.cursor()
    for rating in movie.ratings:
        cur.execute("insert into movierating (movieid, ratingtype, ratingvalue) values (%s, %s, %s)", (str(movie.movieId), str(rating['source']['id']), rating['value']))
    # # conn.commit()
    cur.close()
    

def addMovieCountries(movie, conn):
    cur = conn.cursor()
    for country in movie.country:
        cur.execute("insert into moviecountry (movieid, countryid) values (%s, %s)", (str(movie.movieId), str(country)))
    # # conn.commit()
    cur.close()
    

def addMovieLanguage(movie, conn):
    cur = conn.cursor()
    #print(movie)
    for language in movie.languages:
        #print(language)
        cur.execute("insert into movielanguage (movieid, languageid) values (%s, %s)", (str(movie.movieId), str(language['id'])))
    # # conn.commit()
    cur.close()

def addMovieGenres(movie, conn):
    cur = conn.cursor()
    for genre in movie.genres:
        cur.execute("insert into moviegenre (movieid, genreid) values (%s, %s)", (str(movie.movieId), str(genre)))
    # conn.commit()
    cur.close()
    

def addMovieDirectors(movies):
    conn = connectToDb()
    cur1 = conn.cursor()
    for movie in movies: 
        for director in movie.director:
            print(director['name'])
            cur1.execute("select id from director where name=%s", (director['name'],))
            directorEl = cur1.fetchone()
            if (directorEl == None):
                cur1.execute("insert into director (name, id) values (%s, %s)" , (director['name'], str(director['id'])))
                directorId = str(director['id'])
            else:
                directorId = directorEl[0]
            cur1.execute("insert into moviedirector (movieid, directorid) values (%s, %s)", (str(movie.movieId), str(directorId)))
        
            #print(directorId)
        #print(movie.director)
    
    # conn.commit()
    cur1.close()
    conn.close()

def updateMovieRated(movies):
    conn = connectToDb()
    cur = conn.cursor()
    for movie in movies:
        cur.execute('update movie set rated = %s where id = %s', (movie.rated, movie.movieId))

    # conn.commit()


def alterMovieWriterRole(movies):
    pass
#     conn = connectToDb()
#     cur = conn.cursor()
#     for movie in movies:
#         for writer in movie.writers:
#             print(writer['name'])
#             wirterId = cur.execute("select id from writer where name=%s", (writer['name'], ))
#             print(cur.fetchall())

if __name__ == '__main__':
    connectToDb()