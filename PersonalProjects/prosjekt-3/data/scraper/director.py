
from uuid import uuid4

class Director:

    directors = {}

    def __init__(self):
        pass   

    def getDirector(self, director):
        d = director.split('(')[0]
        if (d in Director.directors.keys()):
            return Director.directors[d]
        else:
            id = uuid4()
            Director.directors[d] = {'id': id, 'name': d}
            return Director.directors[d]

    def getDirectors(self, director):
        return [Director.getDirector(self, d.strip()) for d in director.split(",")]