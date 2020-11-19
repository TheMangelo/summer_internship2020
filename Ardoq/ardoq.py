""" 1: Create a function that, given a list of integers, 
returns the highest product between three of those numbers. 
For example, given the list [1, 10, 2, 6, 5, 3] 
the highest product would be 10 * 6 * 5 = 300 """


exampleList = [1, 10, 2, 6, 5, 3]

# Sorts the list by order high to low and the removes the hightest elements 3 times
# If you want to change the count of max number, pass a number n.


def maxProduct(input_list, n=3):
    sum = 1
    tempList = input_list
    tempList.sort(reverse=True)
    for i in range(n):
        sum *= tempList[i]
    return sum


print(maxProduct(exampleList))
