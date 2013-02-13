var Fsod = window.Fsod || {}; 

/**
 * @class cloud
 */

Fsod.Cloud = function( depth, bubbles, ratio, x, y, h, w, vx, vy, ax, ay ){
	this.depth = depth;
	this.bubbles = bubbles;
	this.ratio = ratio;
	this.x = x;
	this.y = y;
	this.r = y;
	this.h = h;
	this.w = w;
	this.vx = vx;
	this.vy = vy;
	this.ax = ax;
	this.ay = ay;
	this.offScreen = false;

	this.buildBubbles();
	
	this.img = new Image();
	this.img.src = document.getElementById('cloudImg'+(  Math.floor(  Math.random() * 6 ) +1   )+'').value;
	
};
//Math.floor(Math.random()*(1+High-Low))+Low;
Fsod.Cloud.prototype.buildBubbles = function(){
	this.bxs = [];
	this.bys = [];
	this.brs = [];
	//this.kappa = Math.random()*(1+.7-.4)+.4;
	for(var j=0; j< this.bubbles; j++){
		
		//fit bubbles in box
		var r,
			rHigh,
			rLow,
			x,
			y;
		if(this.h > this.w){
			rHigh = this.w / 2;
		}else{
			rHigh = this.h / 2;
		}
		
		if(j>1){
			rLow = rHigh/j;
		}else{
			rLow = rHigh / this.bubbles
		}
		rHigh = Math.floor(rHigh);
		rLow = Math.floor(rLow)
		r = Math.floor(Math.random()*(1+rHigh-rLow)) + rLow ;
		
		
		x = Math.floor(Math.random()*(1+ this.w- 1)) + 1;
		y =  Math.floor(Math.random()*(1+ this.h- 1)) + 1
		
		
		//console.log(rHigh , rLow, r )
		this.brs.push( r );
		this.bxs.push(  x );
		this.bys.push( y );

	}
};

