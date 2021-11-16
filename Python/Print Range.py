for row in range(1,4):
    for col in range(1,4):
        if (row == col):
            print ("X", end = " ")
        else:
            print ("O", end = " ")
        col += 1
    print()
    
