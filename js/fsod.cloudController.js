var Fsod = window.Fsod || {}; 

Fsod.CloudController = function( game ){
	this.game = game;
	this.clouds = [];
	this.numberOfClouds = 10;
	for(var i =0; i < this.numberOfClouds; i++){
		this.makeCloud( true );
	}
};
//Math.floor(Math.random()*(1+High-Low))+Low;
Fsod.CloudController.prototype.makeCloud = function( onload ){
	var x;
	if(onload === true){
		x = 20+(Math.random()* (this.game.canvasW-40) );
	}else{
		x = this.game.canvasW;
	}
	
	var bubbles = Math.floor(Math.random()*(1+9-3))+3;
	var y = Math.floor(Math.random()*(1+ (this.game.canvasH-200) - 100)) + 100 ;
	var depth = Math.floor(y);
	
	var hHigh =10;
	var hLow = 5;
	var wHight =30;
	var wLow = 10;
	var h = Math.floor(Math.random()*(1+hHigh-hLow))+hLow; 
	var w = Math.floor(Math.random()*(1+wHight-wLow))+wLow; 
	
	
	var ratio = y / this.game.canvasH;
	ratio = 1.0-ratio; // Invert ratio
	
	//console.log(ratio)
	
	var maxScale = 10; // Maximum scaling of the cloud object
	var newHeight = h * (maxScale*ratio) ;
	
	// Leave the width alone, but scale it so it matches in aspect ratio to the height
	var aspectRatio = (newHeight/h);
	var newWidth = w * aspectRatio;
	
	var vx = ( Math.random() *-1 ) * 0.3; 
	var vy = 0; //Math.random()*4-2; 
	var ax = Math.random()*0.2-1; 
	var ay = Math.random()*0.2-1; 

	
	this.clouds.push(  new Fsod.Cloud( depth, bubbles, ratio, x, y, newHeight, newWidth, vx, vy, ax, ay )  );

};

Fsod.CloudController.prototype.update = function(){
	for(var i=0;i<this.clouds.length;i++){

		//add velocity
		this.clouds[i].x += this.clouds[i].vx; 
		this.clouds[i].y += this.clouds[i].vy; 
		
		//cloud off screen left
		if(this.clouds[i].x + (this.clouds[i].w *2 )< 0 ){
		//if(this.clouds[i].x < 0 ){
			this.clouds[i].offScreen = true;
			this.destroyCloud( i );
			
		}
		
	}
};

Fsod.CloudController.prototype.draw = function(){
	for(var i=0;i<this.clouds.length;i++){
		
		//img
		this.game.c.drawImage(this.clouds[i].img, this.clouds[i].x,this.clouds[i].y,this.clouds[i].w,this.clouds[i].h);
		
		/**/
		this.game.c.fillStyle = 'rgb(255,255,255)';
		//squareWrap
		//this.game.c.strokeRect(this.clouds[i].x,this.clouds[i].y,this.clouds[i].w,this.clouds[i].h);
		//return;
		for(var j=0; j<this.clouds[i].bubbles;j++){
			//add velocity
			//this.clouds[i].bxs[j] += this.clouds[i].vx; 
			//this.clouds[i].bys[j] += this.clouds[i].vy; 
			//this.game.c.fillStyle = "rgba(255,255,255," + this.clouds[i].ratio + ")";
			this.game.c.beginPath();
			//this.game.c.arc( this.clouds[i].x + this.clouds[i].bxs[j], this.clouds[i].y +this.clouds[i].bys[j] , this.clouds[i].brs[i] , 0 , Math.PI*2, false );
			this.drawEllipse(this.clouds[i].kappa, this.clouds[i].x + this.clouds[i].bxs[j], this.clouds[i].y +this.clouds[i].bys[j], this.clouds[i].w, this.clouds[i].h);
			//this.c.stroke();
			this.game.c.fill();
			this.game.c.closePath();
		
		}
		
	}
};
Fsod.CloudController.prototype.drawEllipse = function(k,x, y, w, h) {
  var kappa = .5522848;//k,//
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle
  this.game.c.beginPath();
  this.game.c.moveTo(x, ym);
  this.game.c.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  this.game.c.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  this.game.c.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  this.game.c.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  this.game.c.closePath();
  //this.game.c.stroke();
};


Fsod.CloudController.prototype.destroyCloud = function( i ){
	if( i ){
		delete this.clouds[i];
		this.clouds.remove(i);
	 	//console.log(this.clouds.length)
		this.makeCloud( false );
	}
};
