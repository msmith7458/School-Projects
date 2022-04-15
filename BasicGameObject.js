class Transform
{
	constructor()
	{
		this.forward = [0,0,1];
		this.right = [1,0,0];
		this.up = [0,1,0];
	}

	doRotations(RotAngles)
	{
		this.xRot = [
					[1,0,0,0],
					[0,Math.cos(RotAngles[0]),-1*Math.sin(RotAngles[0]),0],
					[0,Math.sin(RotAngles[0]),Math.cos(RotAngles[0]),0],
					[0,0,0,1]
				];		
		this.yRot = [
				[Math.cos(RotAngles[1]),0,Math.sin(RotAngles[1]),0],
				[0,1,0,0],
				[-1*Math.sin(RotAngles[1]),0,Math.cos(RotAngles[1]),0],
				[0,0,0,1]	
				];
		this.zRot = [
					[Math.cos(RotAngles[2]),Math.sin(RotAngles[2]),0,0],
					[Math.sin(RotAngles[2])*-1.0,Math.cos(RotAngles[2]),0,0],
					[0,0,1,0],
					[0,0,0,1]
				]
		//this.forward = this.crossMultiply(xRot,[0,0,1,0]);		
		this.forward = this.crossMultiply(this.zRot,this.crossMultiply(this.yRot,this.crossMultiply(this.xRot,[0,0,1,0])))
		this.right = this.crossMultiply(this.zRot,this.crossMultiply(this.yRot,this.crossMultiply(this.xRot,[1,0,0,0])))
		this.up = this.crossMultiply(this.zRot,this.crossMultiply(this.yRot,this.crossMultiply(this.xRot,[0,1,0,0])))
	}			
	crossMultiply(M,V)
	{
	//console.log(M[0][3]);
	//console.log(V[3]);
	var temp = 
		[
			M[0][0]*V[0]+M[0][1]*V[1]+M[0][2] * V[2]+ M[0][3]*V[3],
			M[1][0]*V[0]+M[1][1]*V[1]+M[1][2] * V[2]+ M[1][3]*V[3],
			M[2][0]*V[0]+M[2][1]*V[1]+M[2][2] * V[2]+ M[2][3]*V[3],
			M[3][0]*V[0]+M[3][1]*V[1]+M[3][2] * V[2]+ M[3][3]*V[3]
		]
	//console.log(temp);
		return temp;
	}
}

class GameObject
{
	constructor() 
	{
		this.loc = [0,0,0];
		this.rot = [0,0,0];
		this.isTrigger = false;
		this.collissionRadius = 1.0;
		this.velocity = [0,0,0];
		this.angVelocity = [0,0,0];
		this.name = "default";
		this.id = 0;
		this.prefab;
		this.transform = new Transform();
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
			}
		}

		else
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
	

	Update()
	{
		//console.log(this.name + " update() not implemented!");
	}

	OnCollisionEnter(OtherObject)
	{

		if (OtherObject.prefab == Coin)
		{
			m.Trigger["ID0"].score += 1;
			document.getElementById("playerScore").innerHTML = `Coins Collected: ${(m.Trigger["ID0"]).score}`;
			m.DestroyObject(OtherObject.id);
		}

		if (OtherObject.prefab == Enemy)
		{
			document.getElementById("playerScore").innerHTML = "Game Over!";
			m.DestroyObject(this.id);
		}

		//console.log("Collision occured!");
		//console.log("Player X: " + (m.Trigger["ID0"]).loc[0]+" Player Y: " + (m.Trigger["ID0"]).loc[1]);
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
}