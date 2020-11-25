

from connection import connectToDb
from bs4 import BeautifulSoup
from urllib.parse import urlencode
import requests
import threading
import os

def getImage(id, name, counter):
    #print(name)
    req = requests.get("https://imdb.com/find?%s" % urlencode({'q': name}))
    
    soup = BeautifulSoup(req.text, 'html.parser')
    try:
        actorLink = soup.find_all('table')[0].find_all('a')[0]['href']
        actorImage = soup.find_all('table')[0].find_all('a')[0].find('img')['src'].split("V1")[0] + "V1.jpg"
        actorImageElement = requests.get(actorImage)
        with open("directors/%s.jpg" % id, 'wb') as f:
            print("writing image %i of ~1900" % counter)
            for chunk in actorImageElement.iter_content(1024):
                f.write(chunk)

    except:
        print("https://imdb.com/find?%s" % urlencode({'q': name}))

def getAlreadyDownloaded():
    alreadyDownloaded = [x.split('.')[0] for x in os.listdir('directors')]
    return alreadyDownloaded

def main():
    adld = getAlreadyDownloaded()
    threads = []
    conn = connectToDb()
    cur = conn.cursor()
    cur.execute("select * from director")
    counter = 1
    for actor in cur.fetchall():
        id, name = actor
        if id not in adld:
            t = threading.Thread(target=getImage, args=(id, name, counter))
            threads.append(t)
            t.start()
            counter += 1
        if counter > 200:
            break
    
    for thread in threads:
        thread.join()
    cur.close()
    conn.close()





if __name__ == '__main__':
    main()