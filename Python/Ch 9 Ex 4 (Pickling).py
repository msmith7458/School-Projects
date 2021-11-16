'''

Chapter 9, Exercise 4
Student Name: Michael Smith
Purpose: write an object to a file and then read it in from the file
         i.e., pickling an object

'''
from pickle import *

class Counter(object):
    """Represents a counter"""
    
    def __init__(self, initValue=0):
        """Creates a counter with default value or given value"""
        
        self.value = initValue
        
    def getValue(self):
        """Returns the counter's value"""
        
        self.value
        
    def setValue(self, newValue):
        """Resets the counter's value"""
        self.value = newValue
        
    def __str__(self):
        """Returns a string representation of the counter"""
        return "Value: " + str(self.value)
        
def main():
    """The main function of this program"""
    
    #create a count with initial value 3
    aCounter = Counter(3)
    
    #print the counter
    print(aCounter)
    
    #prompt for a file name
    fileName = input("Please enter a file name: ")
    
    #open the output file
    outFile = open(fileName, "wb")
    
    #write the counter to the output file
    dump(aCounter, outFile)
    
    #close the output file
    outFile.close()
    
    #open the input file
    inFile = open(fileName, "rb")
    
    #read in the counter from the input file
    aCounter = load(inFile)
    
    #print the counter again
    print(aCounter)

#Entry point
main()
