import json
import os
from dotenv import load_dotenv
from uuid import uuid4
import threading
import logging
import requests
from urllib.parse import urlencode

load_dotenv()

f = open("kaggle/cleaned.csv", 'r')

data = f.readlines()

f.close()


omdb_base = "http://www.omdbapi.com/?apikey=%s" % os.getenv("API_KEY") 

total = 4800
save = True

def fetch_image(url, id, num):
    logging.info('Started getting image %s/%s' % (num, total))
    img = requests.get(url)
    if save:
        with open("images/%s.png" % id, "wb") as f:
            for chunk in img.iter_content(1024):
                f.write(chunk)
    logging.info('Finished writing image %s/%s' % (num, total))


def fetch_ombd(title, id, num):
    logging.info('Getting movie %s (%s/%s) from omdb' % (title, num, total))
    result = requests.get('%s&%s' % (omdb_base, urlencode({'t': title})))    
    j = result.json()
    if(j['Response'] and j['Poster']):
        logging.info('Download complete')
        fetch_image(j['Poster'], id, num)
        if save:
            with open('documents/%s.json' % id, 'w') as f:
                f.write(json.dumps(j))

    else:
        logging.error('Movie not found')
    

counter = 0
threads = []
for line in data[1:]:
    movieTitle = line.split(';')[0]
    movieid = uuid4()
    t = threading.Thread(target=fetch_ombd, args=(movieTitle, movieid, counter))
    t.start()
    threads.append(t)
    counter += 1
    

print("Cleaing up...")
for thred in threads:
    thred.join()

print("downloaded %i movies" % counter)
