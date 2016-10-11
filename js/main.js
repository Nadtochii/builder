//Constants
var ROWS=20, COLS=20, BLOCK_WIDTH=5, BLOCK_HEIGHT=1;
//IDs
var EMPTY=0, BLOCK=1, BUILDING=2;
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

var canvas;
function main() {
	canvas = document.createElement("canvas");
	canvas.width =COLS*20;
	canvas.height = ROWS*20;
	ctx = canvas.getContext("2d");

	var container = document.getElementById("container");

    container.appendChild(canvas);

    init();
    draw();
}

function init() {
	grid.init(EMPTY, COLS, ROWS);
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
			ctx.fillRect(i*tw, i*th, tw, th);
		}
	}
}
