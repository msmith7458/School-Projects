"""
Assignment 5
Student Name: Michael Smith
Purpose: Write a program where the main function calls a helper function 
to print the characters in a string using recursion.

"""

#Function to print string characters using recursion
def printChar(st):
    
    #If string is empty, return
    if len(st) <= 0:
        return
    
    #Print the 1st character of the string
    print(st[0], end=" ")
    
    #Recursive call to print the rest of the characters in the string, from index 1 until the last index
    printChar(st[1:len(st)])

#Main function
def main():
    
    #Get string from user
    string = input("Please enter a string: ")
    
    #Print first message
    print("The characters are:",end=" ")
    
    #Call function to print characters using recursion
    printChar(string) 

#Entry point
main()
