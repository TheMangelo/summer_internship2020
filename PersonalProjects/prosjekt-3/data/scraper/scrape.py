
import requests
from bs4 import BeautifulSoup
from uuid import uuid4
import threading
import logging
import os
from urllib.parse import urlencode
import sys
from dotenv import load_dotenv
import json
load_dotenv()

total = 250


if (os.getenv("API_KEY") is None):
    print("Hey! Why are you duch? Get your own key plz")
    sys.exit(1)

omdb_base = "http://www.omdbapi.com/?apikey=%s" % os.getenv("API_KEY") 

def fetch_image(url, id, num):
    logging.info('Started getting image %s/%s' % (num, total))
    img = requests.get(src)
    with open("images/%s.png" % id, "wb") as f:
        for chunk in img.iter_content(1024):
            f.write(chunk)
    logging.info('Finished writing image %s/%s' % (num, total))


def fetch_ombd(title, id, num):
    logging.info('Getting movie %s (%s/%s) from omdb' % (title, num, total))
    result = requests.get('%s&%s' % (omdb_base, urlencode({'t': title})))    
    j = result.json()
    if(j['Response']):
        logging.info('Download complete')
        with open('documents/%s.json' % id, 'w') as f:
            f.write(json.dumps(j))

    else:
        logging.error('Movie not found')
    


if __name__ == '__main__':

    format = "%(asctime)s: %(message)s"
    logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")
    logging.info("USING API_KEY: %s" % os.getenv('API_KEY'))
    # imdbUrl = "https://www.imdb.com/chart/top/?ref_=nv_mv_250"
    # result = requests.get(imdbUrl)
    # data = result.text
    with open("movies.dat", "r") as data:
        soup = BeautifulSoup(data, 'html.parser')
        a = soup.find_all('img')
        
        for b, counter in zip(a, range(1, 251)):
            title = b.get('alt')
            src = b.get('src').split('V1')[0] + "V1.jpg"
            movieId = uuid4()
            getThread = threading.Thread(fetch_ombd(title, movieId, counter))
            getThread.start()
            getThread.join()
            t = threading.Thread(fetch_image(src, movieId, counter))
            t.start()
            t.join()
            
            

        print(counter)

