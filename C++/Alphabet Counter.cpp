#include <iostream>
using namespace std;

//Count Function
void count(const string &s)
{
   //Define counter variable, list array (stores occurrence of each letter)
   int i = 0, list[26] = {}, j; //Variable j holds value of current letter (a = 0, b = 1, ...)
   
   while (s[i] != '\0') //While string is not empty
   { 
      if (s[i] >= 'a' && s[i] <= 'z') //If letter is a lowercase 'a' through 'z'
      {     
        j = s[i] - 'a'; //s[i] minus integer value of 'a' equals int value of letter at s[i], store in j
        ++list[j];      //Increment the value at current letter's index in 'list' array by 1
      }
      
      else if (s[i] >= 'A' && s[i] <= 'Z') //If letter is an uppercase 'a' through 'z'
      {
        j = s[i] - 'A'; //s[i] minus integer value of 'A' equals int value of letter at s[i], store in j
        ++list[j];      //Increment the value at current letter's index in 'list' array by 1
      }
      ++i;              //increment to next letter in string
   }
   
   for (i = 0; i < 26; i++)     //Print out final counts for each letter in string
   {
       if (list[i] > 0)         //If count of current letter is greater than 0
        cout << char(i + 'a') << ": "<< list[i] << " times" << endl; //Print letter, colon, count of letter, then 'times'
   } 
}

//Entry point
int main() 
{
   char str[50];                //Define char array
   cout << "Enter a string: ";  //Prompt user for string
   cin.getline(str, 50);        //Call getline to read entire string
   
   count(str);                  //Call count function to count occurrence of each letter in string
   
   return 0;
}
