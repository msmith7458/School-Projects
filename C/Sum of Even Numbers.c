#include <stdio.h>
#include <stdlib.h>

int main (void) {
int sum = 0;
int n, counter=1 ;

printf("Enter a number\n");
scanf("d", &n);

while (counter <= n) {
    if (counter % 2 != 0) {
        sum = sum + counter;
    }
    counter++;

}
printf("The sum of even numbers between 1 and %d is %d\n", n, sum);
return 0;

}
