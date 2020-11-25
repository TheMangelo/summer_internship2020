
from uuid import uuid4

class Language:
    languages = {}

    def __init__(self, lang):
        self.id = uuid4()
        self.lang = lang
        
    def getLangId(self, lang):
        if lang not in Language.languages.keys():
            l = Language(lang)
            # if (lang == 'Spanish'):
            #     print("Adding spanish")
            #     print("Spanish at id: %s" % l.id)
            id =  l.id
            Language.languages[lang] = id
            return {'id':id, 'name': lang}
        else:
            return {'id':Language.languages[lang], 'name': lang}

    def getLanguages(self, lang):        
        return [Language.getLangId(self, l.strip()) for l in lang.split(",")]
