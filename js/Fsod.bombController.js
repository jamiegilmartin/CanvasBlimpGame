var Fsod = window.Fsod || {}; 

Fsod.BombController = function( game ){
	this.game = game;
	this.bombs = [];
};

Fsod.BombController.prototype.makeBomb = function( shipX, shipY ){
	this.bombs.push(  new Fsod.Bomb( this.game, shipX, shipY )  );
	
};

Fsod.BombController.prototype.update = function( timeDiff ){
	
	for(var i = 0; i < this.bombs.length; i++){
		
		if(!this.bombs[i].exploded){
			
			this.bombs[i].update( timeDiff );
			
			//boundries
			if(this.bombs[i].x - this.bombs[i].r < 0 ){
				this.bombs[i].x = 0;
			
				this.bombs[i].explode();
				this.destroyBomb(i);
			
			}else if(this.bombs[i].x + this.bombs[i].r > this.game.canvasW){
				this.bombs[i].x = this.game.canvasW - this.bombs[i].w;
			
				this.bombs[i].explode();
				this.destroyBomb(i);
			}
			if(this.bombs[i].y -this.bombs[i].r < 0 ){
				this.bombs[i].y = 0;
			
				this.bombs[i].explode();
				this.destroyBomb(i);
			}else if(this.bombs[i].y + this.bombs[i].r > this.game.canvasH){
				this.bombs[i].y = this.game.canvasH - this.bombs[i].h;  
			
				this.bombs[i].explode();
				this.destroyBomb(i);
			}
		
		}
		
		

		
	}
};

Fsod.BombController.prototype.draw = function(){
	for(var i = 0; i < this.bombs.length; i++){
		this.bombs[i].draw();
	}
};

Fsod.BombController.prototype.destroyBomb = function( i ){
	//console.log('destroy me')
	if( i ){

		//delete this.bombs[i];
		//this.bombs.remove(i);
		//console.log('remove')

	}
};