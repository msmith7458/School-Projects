#start from the first row 
row = 1

#end at the seventh row
while(row <= 7):
    
    #within each row, start from the first col
    col = 1
    
    #within each row, end at the 7th col
    while(col <= 7):
        
        if ((row == col) or (row + col) == 8):
            print("X", end ="")
        else:
            print(" ", end="")
            
        col = col + 1
        
    print()    #line feed
    row = row + 1
