
from uuid import uuid4

class Writer:
    writers = {}
    def __init__(self, writer):
        self.id = uuid4()
        self.writer = writer
        Writer.writers[writer] = self.id

    def getWriter(self, name):
        if name in Writer.writers.keys():
            return Writer.writers[name]
        else:
            return Writer(name).id