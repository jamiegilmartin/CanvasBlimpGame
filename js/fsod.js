var Fsod = window.Fsod || {}; 

window.onload = function(){
	Fsod.init();
}
/**
 * @author jamiegilmartin@gmail.com
 * @description canvas blimp game 
 * @see Foundation HTML5 Animation with JavaScript
 */
Fsod = {
	init : function(){
		
		//set page elements height
		window.onresize = function(e){
			Fsod.resizePage(e.target.innerHeight);
		};
		this.resizePage();
		
		//init animation frame
		this.utils.init();
		
		//init game
	 	var game = new Fsod.game();

		
	},
	resizePage : function(h){
		
		var windowHeight = window.innerHeight,
			windowWidth = window.innerWidth,
			fsod = document.getElementsByClassName('fsod')[0],
			fsgame = document.getElementById('fsgame');
		//resize canvas
		fsod.style.height = windowHeight + 'px';
		//fsod.style.width = windowWidth + 'px';
		fsgame.height = windowHeight;
		fsgame.width = windowWidth;
	}
};


/*game*/
Fsod.game = function(){
	var self = this;
	this.canvas = document.getElementById('fsgame');
	this.canvasW = this.canvas.width;
	this.canvasH = this.canvas.height;
	this.playing = true;
	this.startBtn = document.getElementsByClassName('startBtn')[0];
	this.stopBtn = document.getElementsByClassName('stopBtn')[0];
	this.pointingDirection = 'left';
	this.direction = '';
	this.backgroundX = 0;
	this.backgroundWidth = 4419;
	this.bgMoveRatio = 0.02;
	this.goingForward = false; //set in ship
	this.goingBackward = false; 
	this.gravity = 20;
	
	
	console.log(this.canvasW, this.canvasH)
	
	this.init();

};
Fsod.game.prototype.init = function(){
	var self = this,
		date = new Date(),
		time = date.getTime();
		
	if (this.canvas.getContext){  
		this.c = this.canvas.getContext('2d');
		//this.c.webkitImageSmoothingEnabled = true;
		// drawing code here
		
		//make clouds
		this.cloudControl = new Fsod.CloudController( this );
		
		//create bomb controller
		this.bombControl = new Fsod.BombController( this );
		
		
		//ship
		this.ship = new Fsod.Ship( this );
		
		//button events
		this.startBtn.style.display = 'none'; 
		
		this.startBtn.addEventListener('click', function() {
			this.style.display = 'none';
			self.stopBtn.style.display = 'block';
			self.playing = true;
			self.animate(time);
		}, false ); 
		this.stopBtn.addEventListener('click', function() {
			this.style.display = 'none';
			self.startBtn.style.display = 'block';
			self.playing = false;
		}, false );
		
		//key controls
		document.onkeydown = function(e) {
			var keyCode = e.keyCode || e.which,
			arrow = {left: 37, up: 38, right: 39, down: 40 },
			space = 32;
			
			switch (keyCode) {
				case arrow.left:
					//console.log('left')
					self.direction = 'left';
					self.pointingDirection = 'left';
					return false;
				break;
				case arrow.up:
					//console.log('up')
					self.direction = 'up';
					return false;
				break;
				case arrow.right:
					//console.log('right')
					self.direction = 'right';
					self.pointingDirection = 'right';
					return false;
				break;
				case arrow.down:
					//console.log('down');
					self.direction = 'down';
					return false;
				break;
				case space:
					//make bomb
					self.bombControl.makeBomb( self.ship.x, self.ship.y );
					
					return false;
				break;
				default:
					self.direction = '';
			}
		}
		document.onkeyup = function(e){
			self.direction = '';
			self.shooting = false;
			self.goingForward = false; 
			self.goingBackward = false; 
		};
		
		//mouse stuff
		/*
		var mouse = Fsod.utils.captureMouse( this.canvas.get(0) );
		this.canvas.get(0).addEventListener('mousedown', function(){
			console.log('x : '+ mouse.x +' y: '+mouse.y)
		}, false);
		*/
		
		//animate
		this.interval = 0;
		
		
		this.animate(time);
	}
};

//http://www.html5canvastutorials.com/labs/html5-canvas-interactive-ball-physics/
Fsod.game.prototype.animate = function(lastTime){
	var self = this,
		date = new Date(),
		time = date.getTime(),
		timeDiff = time - lastTime;
	this.interval++; 
	//console.log(this.interval);

	//update
	this.cloudControl.update();
	this.ship.update( timeDiff );
	this.bombControl.update( timeDiff );
	
	
	
	//clear
	this.c.clearRect( 0, 0, this.canvasW, this.canvasH );
	
	//draw
	this.cloudControl.draw();
	this.ship.draw()
	this.bombControl.draw();


	//level slide //TODO: don't use interval
	
	if(this.goingForward === true){
		this.backgroundX -= Math.floor(this.bgMoveRatio*this.interval);
		//console.log(this.backgroundX, (this.backgroundWidth-this.canvasW))
		if(Math.abs(this.backgroundX) >= this.backgroundWidth-this.canvasW){
			this.backgroundX = -(this.backgroundWidth-this.canvasW);
			this.canvas.style.backgroundPosition = '-'+(this.backgroundWidth-this.canvasW)+'px 100%';
			
		}else{
			//move
			this.canvas.style.backgroundPosition = this.backgroundX+'px 100%';
		}
		
	}
	if(this.goingBackward === true){
		this.backgroundX += Math.floor(this.bgMoveRatio*this.interval);
		if(this.backgroundX <= 0){
			//move
			this.canvas.style.backgroundPosition =  this.backgroundX+'px 100%';
		}else{
			this.backgroundX = 0;
			this.canvas.style.backgroundPosition =  '0px 100%';
		}
	}
	
	
	


	
	
	// request new frame
	requestAnimFrame(function(){
		if(self.playing){
			self.animate(time);
		}else{
			//console.log('stopped')
		}
	});
};
