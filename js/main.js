//Constants
var ROWS=20, COLS=20, BLOCK_WIDTH=5, BLOCK_HEIGHT=1;
//IDs
var EMPTY=0, BLOCK=1, BUILDING=2;
//Directions
var LEFT=0, RIGHT=1, DOWN=2;
//Key codes
var KEY_SPASE=13;

var grid = {
	width: null,
	height: null,
	_grid: null,

	init: function(value, width, height) {
		this.width = width;
		this.height = height;
		this._grid = [];

		for (var i = 0; i < width; i++) {
			this._grid.push([]);
			for (var j = 0; j < height; j++) {
				this._grid[i].push(value);
			}
		}
	},

	set: function (value, x, y) {
		this._grid[x][y] = value;
	},

	get: function (x, y) {
		return this._grid[x][y];
	}
}

var block = {
	direction: null,
	last: null,
	_queue: null,

	init: function(direction, x, y) {
		this.direction = direction;
		this._queue = [];
		this.insert(x, y);
	},

	insert: function(x, y) {
		this._queue.unshift({x:x, y:y});
        this.last = this._queue[0];
	},

	remove: function() {
		return this._queue.pop();
	}
}

var canvas, frames, keystate;
function main() {
	canvas = document.createElement("canvas");
	canvas.width =COLS*20;
	canvas.height = ROWS*20;
	ctx = canvas.getContext("2d");

	var container = document.getElementById("container");
	frames = 0;
	keystate = {};

	document.addEventListener("keydown", function(event) {
		keystate[event.keyCode] = true;
	});
	document.addEventListener("keyup", function(event) {
		delete keystate[event.keyCode];
	});

    container.appendChild(canvas);

    init();
    loop();
}

function init() {
	grid.init(EMPTY, COLS, ROWS);

	var bp = {x:COLS-1, y:3};
	block.init(LEFT, bp.x, bp.y);
	grid.set(BLOCK, bp.x, bp.y);
}

function loop() {
	update();
	draw();

	window.requestAnimationFrame(loop, canvas);
}

function update() {
	frames++;

	if ( keystate[KEY_SPASE] ) {
		block.direction = DOWN;
	}

	if (frames%7 === 0) {
		var bx = block.last.x;
		var by = block.last.y;

		switch(block.direction) {
			case LEFT:
				bx--;
				break;
			case RIGHT:
				bx++;
				break;
			case DOWN:
				by++;
				break;
		}

		if ( bx < 1 ) {
			block.direction = RIGHT;
		}
		if ( bx > COLS-2 ) {
			block.direction = LEFT;
		}

		if ( by > ROWS-2 ) {

		}

		var out = block.remove();
		grid.set(EMPTY, out.x, out.y);

		out.x = bx;
		out.y = by;

		grid.set(BLOCK, out.x, out.y);
		block.insert(out.x, out.y);

	}
}

function draw() {
	var tw = canvas.width/grid.width;
	var th = canvas.height/grid.height;

	for (var i = 0; i < grid.width; i++) {
		for (var j = 0; j < grid.height; j++) {
			switch(grid.get(i, j)) {
				case EMPTY: 
					ctx.fillStyle = "#fff";
					break;
				case BLOCK: 
					ctx.fillStyle = "#0ff";
					break;
				case BUILDING: 
					ctx.fillStyle = "#f00";
					break;
			}
			ctx.fillRect(i*tw, j*th, tw, th);
		}
	}
}
