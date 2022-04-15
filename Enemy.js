class Enemy extends GameObject
{
	constructor()
	{
		super();
		this.isTrigger = true;
		this.collissionRadius = 0.1;
		this.velocity[0] = .01;
		this.buffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

		this.vertices =
		[	

		 //Face 1
		 -.125,-.25,0,  0,0,0,
		 0,0,0,         0,0,0,
		 .125,-.25,0,   0,0,0,
		 
		 //Face 2
		 .125, -.25,   0,   0,0,0,
		  0,      0,   0,   0,0,0,
		 .25, -.125,  0,  	0,0,0,

		 //Face 3
		 .25, -.125,  0,  	0,0,0,
		 0,      0,   0,    0,0,0,
		 .25, .125,  0,  	0,0,0,

		 //Face 4 
		 .25, .125,  0,     1,0,0,
		 0,0,0,   	 	 	1,0,0,
		 .125,.25,0, 	    1,0,0,

		 //Face 5
		 .125, .25, 0, 	 0,0,0,
		 0,    0, 0,   	 0,0,0,
		 -.125, .25, 0,  0,0,0,

		 //Face 6
		 -.125, .25, 0,   1,0,0,
		 0,     0,  0,    1,0,0,
		 -.25, .125, 0,   1,0,0,

		 //Face 7
		 -.25, .125, 0, 	0,0,0,
		 0,    0,  0,    	0,0,0,
		 -.25, -.125, 0,    0,0,0,

		 //Face 8
		 -.25, -.125, 0,   0,0,0,
		 0,    0,  0,      0,0,0,
		 -.125,-.25,0,     0,0,0

		];

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
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

		this.loc = tempP;

		for(var so in m.Solid)
		{
			if(m.Solid[so] != this)
			{
				if(m.CheckCollision(tempP, this.collissionRadius, m.Solid[so].loc, m.Solid[so].collissionRadius))
				{
					this.OnCollisionEnter(m.Solid[so]);
				}
			}
		} 

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
	

	OnCollisionEnter(OtherObject)
	{

		if (OtherObject.prefab == Wall)
		{
			console.log("Collided with Wall!");
			var tempF = this.transform.right;
			this.velocity[0] = (this.velocity[0]*-1);

			this.Move();
		}

	}

	Update()
	{

		this.transform.doRotations(this.rot);
		var tempF = this.transform.right; //[1,0,0]

		this.Move();
	}

}