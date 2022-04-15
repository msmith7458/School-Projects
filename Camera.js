class Camera extends GameObject
{
	constructor()
	{
		super();
		this.isTrigger = false;
		this.collisionRadius = -0.5;
	}

	Update()
	{
		this.angVelocity[1] = 0;
		this.velocity = [0,0,0]

		var deltaX = 0;
		var deltaZ = 0;
		var deltaR = 0;
	}

	Render(program)
	{
		var camLoc  = gl.getUniformLocation(program,'worldLoc');
		gl.uniform3fv(camLoc,new Float32Array(this.loc));
		var worldLoc = gl.getUniformLocation(program,'worldRotation');
		gl.uniform3fv(worldLoc,new Float32Array(this.rot));
	}
}