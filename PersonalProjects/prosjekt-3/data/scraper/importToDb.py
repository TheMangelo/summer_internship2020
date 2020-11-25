

import os
import json
from uuid import uuid4
from language import Language
from movieWriter import MovieWriter
from country import MovieCountry
from director import Director
from rating import Rating
from actor import Actor
from writer import Writer
from genre import Genre
from connection import AddActors, AddWriters, AddDirectors, AddLanguage, AddMovie, AddMovieRatingTypes, AddCountries, addMovieDirectors, alterMovieWriterRole, AddGenres, updateMovieRated

def connectToDb():
    from dotenv import load_dotenv

    import psycopg2

    # OR, explicitly providing path to '.env'
    from pathlib import Path  # Python 3.6+ only

    env_path = Path('../../backend/') / '.env'

    load_dotenv(dotenv_path=env_path)

    # Connect to your postgres DB
    conn = psycopg2.connect("dbname=%s user=postgres host=%s password=%s" % (
        os.getenv("PG_USER"), os.getenv("PG_HOST"), os.getenv("PG_PASS")))

    # Open a cursor to perform database operations
    cur = conn.cursor()

    # Execute a query
    cur.execute("SELECT * FROM moviest")

    # Retrieve query results
    records = cur.fetchall()
    print(records)


class Movie:
    def __init__(self, id, title, year, rated, released, runtime, language, writers, imdbId, country, plot, director, rating, production, actors, imdbVotes, genre):
        self.id = id
        self.movieId = id.split(".")[0]
        self.title = title
        self.year = int(str(year)[:4])
        self.rated = rated
        self.released = getReleased(released)
        self.runtime = getRuntime(runtime)
        self.languages = Language.getLanguages(None, language)
        self.writers = MovieWriter.getMovieWriters(None, writers)
        self.imdbId = imdbId
        self.country = MovieCountry.getCountries(None, country)
        self.plot = plot
        self.director = Director.getDirectors(None, director)
        self.ratings = Rating.getRatings(None, rating)
        self.production = production
        self.actors = Actor.getActors(None, actors)
        self.imdbVotes = getVotes(imdbVotes)
        self.genres = Genre.getGenres(None, genre)

    def __str__(self):
        return str(({'id': id,'imdbId': self.imdbId, 'title': self.title, 'year': self.year, 'rated': self.rated, 'released': self.released, 'runtime': self.runtime,
                           'languages': str(self.languages),
                           'writers': str(self.writers),
                           'country': str(self.country),
                           'plot': self.plot,
                           'director': str(self.director),
                           'ratings': str(self.ratings),
                           'production': self.production,
                           'actors': str(self.actors),
                           'imdbVotes': self.imdbVotes
                           }))


folder = os.listdir(os.getcwd() + "/documents")


def getMonth(month):
    n = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
         'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].index(month)
    if (n < 10):
        return "0%s" % n
    else:
        return n


def getReleased(date):
    day, month, year = date.split()
    month = getMonth(month)
    return "%s-%s-%s" % (year, month, day)


def getRuntime(inp):
    try:
        return float(inp.split()[0])*60  # seconds
    except:
        return 0


def getVotes(votes):
    if ("/") in votes:
        return 0
    return float(votes.replace(',', ''))

movies = []
for document in folder:
    file = open("documents/%s" % document, "r")
    data = json.loads(file.read())
    file.close()

    if not 'Production' in data:
        data['Production'] = 'Unknown'
    
    movie = Movie(document, data['Title'], data['Year'], data['Rated'], data['Released'], data['Runtime'], data['Language'], data['Writer'],
                    data['imdbID'], data['Country'], data['Plot'], data['Director'], data['Ratings'], data['Production'], data['Actors'], data['imdbVotes'], data['Genre'])
    movies.append(movie)


print()
print()
print()
print()
print()
print()


# updateMovieRated(movies)

# AddGenres(Genre.genres)
# AddMovie(movies)



print()
print()
print()
print()
print()
print()



# AddActors(Actor.actors)
# AddWriters(Writer.writers)
# AddDirectors(Director.directors)
# AddCountries(MovieCountry.countries)

# AddLanguage(Language.languages)
# AddMovieRatingTypes(Rating.ratingSources)
# AddMovie(movies)

# addMovieDirectors(movies)

#alterMovieWriterRole(movies)
#print(movies[0].writers)