import random

""" 1: Create a function that, given a list of integers,
returns the highest product between three of those numbers.
For example, given the list [1, 10, 2, 6, 5, 3]
the highest product would be 10 * 6 * 5 = 300 """


"""
Four scenarios here that are interesting:
Only Positives
Only Negatives
At least One Positive
At least One Negative

"""


def productOfList(inputList):
    sum = 1
    for i in inputList:
        sum *= i
    return sum


def maxProduct(inputList):

    if(len(inputList) < 3):
        return None
    elif (len(inputList) == 3):
        return productOfList(inputList)

    sum = 1
    negList = sorted([i for i in inputList if i < 0])
    posList = sorted([i for i in inputList if i >= 0], reverse=True)

    # Only Positives
    if(len(negList) == 0):
        return posList[0] * posList[1] * posList[2]

    # Only Negatives
    elif(len(posList) == 0):
        return negList[-1] * negList[-2] * negList[-3]

    else:
        # If Only One negative
        if(len(negList) == 1):
            return productOfList(posList[0:3])

        # IF only one Positive
        elif (len(posList) == 1):
            newList = [posList[0], negList[0], negList[1]]
            return productOfList(newList)

        # If there is exactly two positives the function the result will be a negative number
        elif(len(posList) == 2):
            # print('-'*100)
            negListAbsolute = sorted([-i for i in negList])
            # print(negListAbsolute)
            # print(negListAbsolute[0], negListAbsolute[1])
            maxAbsNeg = negListAbsolute[0]*negListAbsolute[1]
            # print('MaxAbsNeg: ' + str(maxAbsNeg))

            minPos = posList[0] * posList[1]
            # print('this is min pos ' + str(minPos))
            # print('-'*100)

            if(maxAbsNeg < minPos):
                sum = maxAbsNeg
                sum *= min(posList[-1], negList[0])

            else:
                sum = minPos
                sum *= negList[-1]

            # If there is at least two positives and to negatives
        else:

            maxPos = posList[0] * posList[1]
            maxNeg = negList[0] * negList[1]
            if (maxPos > maxNeg):
                sum = maxPos
                del posList[0:2]
                if(len(posList) != 0):
                    sum *= posList[0]
                else:
                    sum *= negList[-1]

            else:
                sum = maxNeg
                sum *= posList[0]

        return sum


a = [1, 2, -1, -5, - 100, -200, -300]  # Should return -2
b = [100, 200, -1, -2, -3]  # Shoud return -6

print('Expected result -2. \nActual result: \t' + str(maxProduct(a)))
print('Expected result -6. \nActual result: \t' + str(maxProduct(b)))


onlyPositives = [1, 2, 3, 4, 5, 6]  # Should be 120
oneNeg = [1, 2, 3, 4, -5, 6]  # Should be 72
twoNeg = [1, 2, 3, 4, -5, -6]  # Should be 120
threeNeg = [1, 2, 3, -4, -5, -6]  # Should be 90

print('Expected result 120. \nActual result: \t' + str(maxProduct(onlyPositives)))
print('Expected result 72. \nActual result: \t' + str(maxProduct(oneNeg)))
print('Expected result 120. \nActual result: \t' + str(maxProduct(twoNeg)))
print('Expected result 90. \nActual result: \t' + str(maxProduct(threeNeg)))
