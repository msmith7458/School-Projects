class Player extends GameObject
{
	constructor()
	{
		super();

		this.collissionRadius = 0.1;
		this.isTrigger = false;
		this.score = 0;

		/*
			These variables are used to check conditions. 
			I attached them to the player object since it will exist for
			the game's duration. They should be attached to the enemy and 
			projectile objects, but I was having trouble implementing them in 
			the code effectively.
		*/

		this.enemySlain = false;
		this.projectileExists = false;

		this.buffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		 
		//Now we want to add color to our vertices information.

		this.vertices =
		[

		 	
			 //Face 1
			 -.125,-.25,0,  1,1,0,
			 0,0,0,         1,1,0,
			 .125,-.25,0,   1,1,0,
			 
			 //Face 2
			 .125, -.25,   0,   1,1,0,
			  0,      0,   0,   1,1,0,
			 .25, -.125,  0,  	1,1,0,

			 //Face 3
			 .25, -.125,  0,  	0,0,0,
			 0,      0,   0,    0,0,0,
			 .25, .125,  0,  	0,0,0,

			 //Face 4 
			 .25, .125,  0,     1,1,0,
			 0,0,0,   	 	 	1,1,0,
			 .125,.25,0, 	    1,1,0,

			 //Face 5
			 .125, .25, 0, 	 1,0,0,
			 0,    0, 0,   	 1,0,0,
			 -.125, .25, 0,  1,0,0,

			 //Face 6
			 -.125, .25, 0,   1,1,0,
			 0,     0,  0,    1,1,0,
			 -.25, .125, 0,   1,1,0,

			 //Face 7
			 -.25, .125, 0, 	1,1,0,
			 0,    0,  0,    	1,1,0,
			 -.25, -.125, 0,    1,1,0,

			 //Face 8
			 -.25, -.125, 0,   1,1,0,
			 0,    0,  0,      1,1,0,
			 -.125,-.25,0,     1,1,0	 
			
		 ];
		 
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

		this.loc = [0.0,0.0,0.0];
		this.rot = [0.0,0.0,0.0];
		this.angVelocity = [0,0,0];
	}

	Move()
	{
		var tempP = [0,0,0]
		for(var i =0; i<3; i++)
		{
			tempP[i] = this.loc[i];
			tempP[i] += this.velocity[i];
			this.rot[i] += this.angVelocity[i];
		}

		if(!this.isTrigger)
		{
			var clear = true;
			for(var so in m.Solid)
			{
				if(m.Solid[so] != this)
				{
					if(m.CheckCollision(tempP, this.collissionRadius, m.Solid[so].loc, m.Solid[so].collissionRadius))
					{
						clear = false;
						this.OnCollisionEnter(m.Solid[so]);
					}
				}
			} 

			if(clear)
			{
				this.loc = tempP;

				for(var to in m.Trigger)
				{
					if(m.Trigger[to] != this)
					{
						if(m.CheckCollision(tempP, this.collissionRadius, m.Trigger[to].loc, m.Trigger[to].collissionRadius))
						{
							this.OnCollisionEnter(m.Trigger[to]);
						}
					}
				}
			}
		}

		else
		{
			this.loc = tempP;
		}
	}

	OnCollisionEnter(OtherObject)
	{
		if (OtherObject.prefab == Camera)
		{
			console.log("Player collided with Camera!");
		}

		if (OtherObject.prefab == Wall)
		{
			console.log("Player collided with wall!");
		}

		if (OtherObject.prefab == Coin)
		{
			console.log("Player collided with coin!");

			//Increment score
			this.score += 1;

			//Destroy coin
			m.DestroyObject(OtherObject.id);

			//Update message
			document.getElementById("playerScore").innerHTML = `Coins Collected: ${(m.Trigger["ID0"]).score}`;

			//If enemy is dead and all coins are collected, print winning message
			if ((this.enemySlain) && this.score == 3)
			{
				document.getElementById("statusBox").innerHTML = "You win!"
			}
		}

		if (OtherObject.prefab == Enemy)
		{
			console.log("Player collided with enemy!");

			//Update message
			document.getElementById("statusBox").innerHTML = "Game Over!";

			//Destroy Player
			m.DestroyObject(this.id);
		}
	}


	Render(program)
	{
		//First we bind the buffer for triangle 1
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
			
		
		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");
		//We don't have to bind because we already have the correct buffer bound.
		size = 3;
		type = gl.FLOAT;
		normalize = false;
		stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT;									//size of the offset
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		
		
		var primitiveType = gl.TRIANGLES;
		offset = 0;
		var count = 24;
		gl.drawArrays(primitiveType, offset, count);
	}	



	Update()
	{

		var tempF = [0,0,0];
		this.velocity = [0,0,0];
		this.angVelocity = [0,0,0];

		if("A" in m.Keys && m.Keys["A"])
		{
			this.angVelocity[2] += .01;			//Euler Angles x, y, z
		}

		if("D" in m.Keys && m.Keys["D"])
		{
			this.angVelocity[2] -= .01;
		}


		if("W" in m.Keys && m.Keys["W"])
		{

			this.transform.doRotations(this.rot);
			this.velocity = this.transform.right;

			for(var i = 0; i<3; i++)
			{
				this.velocity[i] *= .01;
			}
		}

		if("S" in m.Keys && m.Keys["S"])
		{
			this.transform.doRotations(this.rot);
			this.velocity = this.transform.right; //[1,0,0]

			for(var i = 0; i<3; i++)
			{
				this.velocity[i] *= -.01;
			}
		}

		this.Move();
	}

}