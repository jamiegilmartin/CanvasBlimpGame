var Fsod = window.Fsod || {}; 
/**
 * @class ship
 */

Fsod.Ship = function( game ){
	this.game = game;

	this.x =  this.game.canvasW / 2 + 50;
	this.y = this.game.canvasH / 2;
	this.h = 100;//265;
	this.w = 100;//405;
	this.r = 0;
	this.vx = 10;
	this.vy = 10;
	this.ax = 0;
	this.ay = 0.2;
	this.img = new Image();
	this.img.src = document.getElementById('shipImg').value;
	console.log(this.img.src)
};

Fsod.Ship.prototype.update = function( timeDiff ){
	var sideBounds = 50,
		speedIncrementFromGravityEachFrame = this.gravity * timeDiff / 1000;
		
	this.game.goingForward = false;
	this.game.goingBackward = false;
	
	//boundry
	if(this.x - this.r < sideBounds){
		//stop left
		this.x = this.r + sideBounds;
		this.game.goingBackward = true;
	}else if(this.x + this.r > this.game.canvasW - sideBounds){
		//stop right
		this.x = this.game.canvasW - this.r - sideBounds;
		this.game.goingForward = true;
	}
	if(this.y -this.r < 0 ){
		//stop top
		this.y = this.r;
		
		
	}else if(this.y + this.r > this.game.canvasH){
		//stop bottom
		this.y = this.game.canvasH - this.r;
		this.explode();
	}
	
	//gravity
	//this.vy += speedIncr ementFromGravityEachFrame;
	//this.y += this.vy;
	
	//add acceleration bob
	var evenOdd = ( Math.floor(Math.random()*50)+1 );
	if(evenOdd % 2 === 0){
		this.y += this.ay; 
	}else{
		this.y -= this.ay; 
	}
	
	
	
	
	//add velocity
	if(this.game.direction === 'up'){
		this.y -= this.vy; 
	}
	if(this.game.direction  === 'down'){
		this.y += this.vy; 
	}
	if(this.game.direction  === 'left'){
		this.x -= this.vx; 
	}
	if(this.game.direction  === 'right'){
		this.x += this.vx; 
	}
	
};
Fsod.Ship.prototype.draw = function(){
	var sliceRightX = 0,
	sliceRightY = 0,
	sliceRightW = 405,
	sliceRightH = 265,
	sliceLeftX = sliceRightW,
	sliceLeftY = 0,
	sliceLeftW = sliceRightW,
	sliceLeftH = sliceRightH;
	
	/*
	this.game.c.fillStyle = "rgba( 0, 255 , 0, 0.9 )";
	this.game.c.beginPath();
	this.game.c.arc( this.x , this.y , this.r , 0 , Math.PI*2, false );
	this.game.c.fill();
	this.game.c.closePath();
	*/
	
	if( this.game.pointingDirection === 'right' ){
		this.game.c.drawImage( this.img, sliceRightX, sliceRightY, sliceRightW, sliceRightH, this.x - this.r, this.y - this.r / 2, this.w, this.h );
	}else if ( this.game.pointingDirection === 'left' ){
		this.game.c.drawImage(this.img, sliceLeftX, sliceLeftY, sliceLeftW, sliceLeftH, this.x - this.r, this.y - this.r / 2, this.w, this.h );
	}
};

Fsod.Ship.prototype.explode = function(){
	//console.log('u r dead')
};
