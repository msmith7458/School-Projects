'''
Chapter 6, Exercise 3
Student Name: Michael Smith
Purpose: raise X to the power of N recursively, where X is a floating point number and N is an integer greater than or equal to 1
'''
def main():
    '''The main function of this program'''
    
    #prompt for the base, i.e., the X
    base = float(input("Please enter the base which is a floating point number: "))
    
    #prompt for the exponent, i.e., the N
    exponent = int(input("Please enter the exponent which is an integer greater than or equal to 1: "))
    
    #raise X to the Nth power
    result = pow(base, exponent)
    
    print("The result is ", result)
    
def pow(x, n):
    """Raise x to the nth power"""
    
    if n==1:
        return x #base case
    else:
        return pow(x, n-1) * x  #recursive case
        
#the entry point of execution
main()
