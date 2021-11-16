"""
Assignment 4
Student Name: Michael Smith
Purpose: Print a row-major pattern to an output file.

"""

f = open("out.txt", "a")    #Open output file in append mode, create file if it doesn't exist

row = 0             #start from the first row

while(row <= 4):    #end at the fifth row
    
    col = 1         #within each row, start from the first col
    
    while(col <= 5):                #within each row, end at the fifth col
        
        if (row == 2) or (col == 3): #Third row and Column 3 will be filled with X's
            f.write("X")             #Write to output file
        else:
            f.write("O")             #fill other spaces with O's, write to output file
                        
        col = col + 1                #increment column
    
    f.write("\n")                #print new line
    row = row + 1                #increment row
