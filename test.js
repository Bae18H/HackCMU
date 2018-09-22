var canvas;
var ctx;

var mouseX = 0;
var mouseY = 0;

var level = []

var p;

var goal;

var loop = function(){
	ctx.clearRect(0, 0, cwidth, cheight);
	draw(ctx, mouseX, mouseY);

	p.update();
	p.draw(ctx);


	goal.update(p.x, p.y);
	goal.draw(ctx, mouseX, mouseY);

	window.requestAnimationFrame(loop);
}

var init = function(){
	canvas = document.getElementById("gc");
	ctx = canvas.getContext("2d");

	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	cwidth = canvas.width;
	cheight = canvas.height;


	canvas.addEventListener("mousemove", function(evt){
		mouseX = evt.clientX;
		mouseY = evt.clientY;
	});

	canvas.addEventListener("keydown", function(evt){
		if(evt.key == "Enter"){
			p = new Player(level[0][0], level[0][1], 1);
		}
	});

	canvas.addEventListener("click", function(evt){
		clickCharges(evt.clientX, evt.clientY);
		goal.click(evt.clientX, evt.clientY);
	});

	level = test(cwidth, cheight);

	p = new Player(level[0][0], level[0][1], 1);
	goal = new Goal(level[1][0], level[1][1], true);

	charges = level[2]

window.requestAnimationFrame(loop);
}


