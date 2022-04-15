class Projectile extends GameObject
{
	constructor()
	{
		super();
		
		this.isTrigger = true;
		this.buffer=gl.createBuffer();
		this.collissionRadius = 0.05;

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

		 this.vertices =
		 [	

		 0, -0.15, 0, 1, 0, 0,
		 0, 0.15, 0, 0, 1, 0,
		 0.15, 0, 0, 0, 0, 1,

		 0, -0.15, 0, 1, 0, 0,
		 0, 0.15, 0, 0, 1, 0,
		 -0.15, 0, 0, 0, 0, 1

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
		if (OtherObject.prefab == Camera)
		{
			console.log("Collided with Camera!");
		}

		if (OtherObject.prefab == Wall)
		{
			console.log("Collided with Wall!");
			m.Trigger["ID0"].projectileExists = false;
			m.DestroyObject(this.id);
		}

		if (OtherObject.prefab == Coin)
		{
			console.log("Collided with coin!");
		}

		if (OtherObject.prefab == Enemy)
		{
			m.DestroyObject(OtherObject.id);

			if(m.Trigger["ID0"].score == 3)
			{
				document.getElementById("statusBox").innerHTML = "You Win!"
			}

			else
			{
				document.getElementById("statusBox").innerHTML = "Enemy slain!"
				m.Trigger["ID0"].enemySlain = true;
			}
		}
	}

	Update()
	{

		this.transform.doRotations(this.rot);
		var tempF = this.transform.right;

		for(var i = 0; i<3; i++)
		{
			this.velocity[i] += tempF[i]*.001;
		}

		this.Move();
	}
}