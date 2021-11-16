"""
Chapter 4, Exercise 1
Student Name: Michael Smith
Purpose: Read in a sentence from the keyboard and compute the average word length in the sentence

"""

#prompt for a sentence
sentence = input("Please enter a sentence: ")

#split into list of words
listOfWords = sentence.split()

#compute the total number of words in the sentence
numOfWords = len(listOfWords)

#compute the total number of characters in the sentence
numOfCharacters = 0
for word in listOfWords:
    numOfCharacters += len(word)
    

print("Total number of words: ", numOfWords)
print("Total number of characters: ", numOfCharacters)
print("The average word length in the sentence is", numOfCharacters/numOfWords)
