def main():
    n = int(input("How many digits do you want to generate? "))
    
    while n > 0:
        print(fib(n), end = " ")
        n -= 1;
    
def fib(n):
    if n<=2:
        return n-1; #base case
    else:
        return fib(n-2) + fib(n-1) #Recursive case

#Entry point
main()
