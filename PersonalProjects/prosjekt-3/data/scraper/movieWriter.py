
from movieWriterRole import MovieWriterRole
from writer import Writer
from uuid import uuid4

class MovieWriter:

    def __init__(self):
        pass

    def getWriter(self, writer):
        writer = writer.strip()
        role = "writer"
        if "(" in writer:
            role = str(writer.split("(")[1])[:-1]
            if ("by") in role:
                role = role.split(" by")[0]
        name = writer.split(" (")[0]
        writer = Writer.getWriter(None, name)
        return {'name': name, 'writer': writer, 'role': role}

    def getMovieWriters(self, writer):
        return [MovieWriter.getWriter(None, l.strip()) for l in writer.split(",")]
