
from uuid import uuid4

class MovieCountry:
    countries = {}
    def getCountry(self, country):
        if country in MovieCountry.countries:
            return MovieCountry.countries[country]
        else:
            id = MovieCountry.countries[country] = uuid4()
            return id
    

    def getCountries(self, country):
        return [MovieCountry.getCountry(self, l.strip()) for l in country.split(",")]