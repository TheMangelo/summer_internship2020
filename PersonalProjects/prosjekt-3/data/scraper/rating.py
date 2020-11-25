
from uuid import uuid4

class Rating:
    ratingSources = {}

    def getValueAndTop(self, rating):
        if ('%' in rating['Value']): return rating['Value'][:-1], 100
        return [float(a) for a in rating['Value'].split("/")]


    def getSource(self, rating, top):
        s = rating['Source']
        if s in Rating.ratingSources.keys():
            return Rating.ratingSources[s]
        else:
            id = uuid4()
            Rating.ratingSources[s] = {'id':id, 'top':top}
            return Rating.ratingSources[s]

    def getRating(self, rating):
        value, top = Rating.getValueAndTop(self, rating)
        source = Rating.getSource(self, rating, top)
        return {'source': source, 'value': value, 'top': top}


    def getRatings(self, rating):
        return [Rating.getRating(self, r) for r in rating]