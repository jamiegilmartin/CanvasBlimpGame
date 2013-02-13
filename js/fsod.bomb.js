var Fsod = window.Fsod || {}; 
/**
 * @class Bomb
 */

Fsod.Bomb = function( game,   x, y  ){
	this.game = game;
	this.x = x;
	this.y = y;
	this.h = 20;
	this.w = 20;
	this.r = 10;
	//this.vx = 20;
	if( this.game.pointingDirection === 'right' ){
		this.vx = 15; 
	}else if( this.game.pointingDirection === 'left' ){
		this.vx = -15; 
	}
	this.vy = 0;
	this.ax = 0.2;
	this.ay = 0.2;
	this.img = new Image();
	this.img.src = document.getElementById('bombImg').value;

};
Fsod.Bomb.prototype.update = function( timeDiff ){
	var speedIncrementFromGravityEachFrame = this.game.gravity * timeDiff / 1000;
	
	//add velocity
	this.x += this.vx; 
	
	//gravity
	this.vy += speedIncrementFromGravityEachFrame;
	this.y += this.vy;
	
	//add acceleration with limit
	if(Math.abs(this.vx) < 30){
		this.vx += this.ax; 
	}
	if(Math.abs(this.vy) < 30){
		this.vy += this.ay; 
	}
};
Fsod.Bomb.prototype.draw = function(){

	if(this.exploded === true){
		this.game.c.drawImage( this.img,  this.x , this.y , this.w, this.h);
	}else{
		this.game.c.fillStyle = "rgba( 0, 255 , 0, 0.9 )";
		this.game.c.beginPath();
		this.game.c.arc( this.x , this.y , this.r , 0 , Math.PI*2, false );
		this.game.c.fill();
		this.game.c.closePath();
	}

	
};
Fsod.Bomb.prototype.explode = function(){
	this.exploded = true;
};
