#!/usr/bin/python

import sys
import random


from random import randint
from random import uniform
import time

if len(sys.argv) == 2:
    url = str(sys.argv[1])
    print ("URL entered:",url)
else:
    print ("URL not detected")

objects = ["People","Platform","RR","GG","YY","RG","RY","GY","SpeedSign","SpeedRegulator"]
numObjects = 9


epochTime = round(uniform(0.0, 999.99), 2)

lastValue = True

while lastValue == True:
    randNum = randint(0,numObjects)
    outp = "{\"detected\": \"" + objects[randNum] + "\", \"epoch\": " + str(epochTime) + "}"
    print (outp)
    

    timeNum = randint(1, 3)
    time.sleep(timeNum)

    epochTime = epochTime + timeNum