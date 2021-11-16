'''
Student.py:
Chapter 9, Exercise 1
Student Name: Michael Smith
Purpose: represent a student by a class type
'''
class Student(object):
    """Represents a student"""
    
    def __init__(self, initName, initScore):
        """the constructor that creates a student based on the given initial values"""
    
        self.name = initName
        self.score = initScore
    
    def getName(self):
        """Returns the student's name"""
        
        return self.name
        
    def setName(self, newName):
        """Resets the student's name"""
        
        self.name = newName
        
    def getScore(self):
        """Return's the student's score"""
        
        return self.score
        
    def setScore(self, newScore):
        """Resets the student's score to a new score"""
        
        self.score = newScore
        
    def __str__(self):
        """Returns a string representation of the student"""
        
        return "Name: " + self.name + "\nScore: " + str(self.score)
      
"""
main.py
Chapter 9, Exercise 2
Student Name: Michael Smith
Purpose: Represent a student by a class type that is defined in a module
"""

from student import *

#instantiate a student 
myStudent = Student("Albert", 96)

#print the student
print(myStudent)

#change the student's name to Tony
myStudent.setName("Tony")

#change the student's score to 98
myStudent.setScore(98)

#print the student again
print(myStudent)
