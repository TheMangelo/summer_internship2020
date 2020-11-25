import concurrent.futures
import logging
import queue
import random
import threading
import time

counter = 0


def producer(queue, dataElement, event):
    """Pretend we're getting a number from the network."""
    lastElement = dataElement.getData()
    while not event.is_set():

        if (lastElement == None):
            logging.info("Setting event from producer")
            event.set()
        message = lastElement
        logging.info("Producer got message: %s", message)
        queue.put(message)
        lastElement = dataElement.getData()

    logging.info("Producer received event. Exiting")

def consumer(queue, event):
    """Pretend we're saving a number in the database."""
    while not event.is_set() or not queue.empty():
        message = queue.get()
        logging.info(
            "Consumer storing message: %s (size=%d)", message, queue.qsize()
        )

    logging.info("Consumer received event. Exiting")

class Store:
    def __init__(self):
        self.data = range(100)
        self.storeLock = threading.Lock()

    def getData(self):
        logging.info('Getting element')
        logging.info('Getting element %s' % (100 - len(self.data)))
        if len(self.data) > 0:
            logging.info('Locking')
            self.storeLock.acquire()
            dataFirst = self.data[0]
            self.data = self.data[1:]
            self.storeLock.release()
            logging.info('REturning')
            return dataFirst
        return None

if __name__ == "__main__":
    format = "%(asctime)s: %(message)s"
    logging.basicConfig(format=format, level=logging.INFO,
                        datefmt="%H:%M:%S")

    pipeline = queue.Queue(maxsize=10)
    event = threading.Event()
    store = Store()
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        executor.submit(producer, pipeline, store, event)
        executor.submit(consumer, pipeline, event)

        time.sleep(0.1)
        logging.info("Main: about to set event")
        event.set()