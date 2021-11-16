"""
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
