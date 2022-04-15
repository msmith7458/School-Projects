class Coin extends GameObject
{
	constructor()
	{
		super();
		this.isTrigger = true;
		this.collissionRadius = 0.2;

		this.buffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

		this.vertices =
		[	

		 //Face 1
		 -.125,-.25,0,  0,0,0,
		 0,0,0,         0,0,0,
		 .125,-.25,0,   0,0,0,
		 
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
		 .125, .25, 0, 	 0,0,0,
		 0,    0, 0,   	 0,0,0,
		 -.125, .25, 0,  0,0,0,

		 //Face 6
		 -.125, .25, 0,   1,1,0,
		 0,     0,  0,    1,1,0,
		 -.25, .125, 0,   1,1,0,

		 //Face 7
		 -.25, .125, 0, 	0,0,0,
		 0,    0,  0,    	0,0,0,
		 -.25, -.125, 0,    0,0,0,

		 //Face 8
		 -.25, -.125, 0,   1,1,0,
		 0,    0,  0,      1,1,0,
		 -.125,-.25,0,     1,1,0

		];

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

	}

	Update()
	{
		this.rot[1] += .01;
	}
}