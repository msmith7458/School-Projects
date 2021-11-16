'''
Assignment 6
Student Name: Michael Smith
Purpose: Create a class type to represent a Tricycle.
'''
class Tricycle:
    #Represent a Tricycle
    
    def __init__(self, initSpeed = 0):
        #Constructor that takes an argument for speed or assigns '0' as default value
        self.speed = initSpeed;
        
    def getSpeed(self):
        #Return the tricycle's speed
        return self.speed;
    
    def setSpeed(self, newSpeed):
        #Set a new value for speed
        self.speed = newSpeed;
        
    def pedal(self):
        #Increase the tricycle's speed by one
        self.speed += 1;
    
    def __gt__(self, other):
        #The greater than operator
        return self.speed > other.speed;
        
    def __str__(self):
        #Returns the string representation of the tricycle's speed
        return "speed: " + str(self.speed);
    
def main():
    #The main function of this program
    
    #create two tricycles
    myTricycle = Tricycle(2)
    yourTricycle = Tricycle()

    #print both tricycles
    print("My tricycle has", myTricycle)
    print("Your tricycle has", yourTricycle)

    #change your tricycle's speed to 2
    yourTricycle.setSpeed(2)
 
    #pedal your tricycle
    yourTricycle.pedal()

    #print both tricycles again
    print("My tricycle has", myTricycle)
    print("Your tricycle has", yourTricycle)

    #check if my tricycle is running faster than your tricycle
    if (myTricycle > yourTricycle):
        print("My tricycle is running faster than your tricycle")
    else:
        print("My tricycle is not running faster than your tricycle")
        
#The entry point of execution
main()
