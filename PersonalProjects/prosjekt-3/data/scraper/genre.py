
from uuid import uuid4

class Genre:

    genres = {}

    def __init__(self, genre):
        self.id = uuid4()
        self.genre = genre

    def getGenre(self, genre):
        if genre not in Genre.genres.keys():
            g = Genre(genre)
            id  = g.id
            Genre.genres[genre] = id
            return id
        else:
            return Genre.genres[genre]

    def getGenres(self, genres):
        return [Genre.getGenre(self, g.strip()) for g in genres.split(",")]
