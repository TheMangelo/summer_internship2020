

from uuid import uuid4


class Actor:
    actors = {}

    def __init__(self):
        pass

    def getActor(self, actor):
        if (actor in Actor.actors.keys()):
            return Actor.actors[actor]
        else:
            id = uuid4()
            Actor.actors[actor] = id
            return id

    def getActors(self, actor):
        return [Actor.getActor(self, a.strip()) for a in actor.split(",")]