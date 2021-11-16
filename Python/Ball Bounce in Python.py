#Michael Smith, COP2034.01, Assignment 2

#Constants
index = 0.6

#Get data from user
dropHeight = int(input("Please enter the initial drop height of the ball: ")) #Initial height of ball
numBounces = float(input("How many times is the ball allowed to bounce? ")) #Number of times the ball bounces

#From starting point, ball is at rest
ttlDist = 0 #Distance traveled equals zero

#Calculations
while numBounces > 0: #While the ball is still bouncing
    ttlDist = ttlDist + dropHeight #Add distance from ball to floor to the total distance
    dropHeight = dropHeight * index #Update distance from ball to floor after the ball bounces (inital distance times 0.6)
    ttlDist = ttlDist + dropHeight #Add distance from ball to floor again, as the ball will travel back to the floor after bouncing
    numBounces -= 1 #Lower bounce count by 1

#Output total distance to the user
print("The total distance traveled by the ball is ", ttlDist, " feet.")
