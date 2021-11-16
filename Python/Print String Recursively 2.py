'''
Assignment 5
Student Name: Michael Smith
Purpose: print the charactters within a given nonempty string recursively
'''
def main():
    """The main function of this program"""
    
    #prompt for a string
    string = input("Please enter a string: ")
    
    #print the characters
    print("The characters are:", end = " ")
    printCharacters(string)
    
def printCharacters(anyString):
    """print characters in the given string recursively"""
    
    if len(anyString) == 1:
        print(anyString[0], end = " ")
    else:
        print(anyString[0], end = " ")
        printCharacters(anyString[1:])
        
#the entry point of execution
main()
