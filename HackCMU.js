var k = 1e4;

var cwidth = 0;
var cheight = 0;

var charges = []

function draw(ctx, mx, my){
for(var i = 0; i < charges.length; i++){
		charges[i].draw(ctx, mx, my);
	}
}

function clickCharges(mx, my){
for(var i = 0; i < charges.length; i++){
		if(charges[i].click(mx, my)){
			break;
		}
	}
}

function Efield(x, y){
	var E = [0, 0]
	for(var i = 0; i < charges.length; i++){
		var Ei = charges[i].Efield(x, y);

		E = [E[0] + Ei[0], E[1] + Ei[1]]
	}
	return E;
}

function Bfield(x, y){
	var B = 0
	for(var i = 0; i < charges.length; i++){
		var Bi = charges[i].Bfield(x, y);

		B += Bi; 
	}
	return B;
}

function Player (xi, yi){
	this.x = xi;
	this.y = yi;
	this.vx = 0;
	this.vy = 0;
}

Player.prototype.draw = function(ctx){
	ctx.fillStyle="#FF1111"
	ctx.beginPath();
	ctx.arc(this.x, this.y, cwidth/50, 0, 2*Math.PI);
	ctx.fill();
}

Player.prototype.update = function(){
	Enet = Efield(this.x, this.y);
	Bnet = Bfield(this.x, this.y);
	Fnet = [0,0];

	Fnet[0] = Enet[0] + this.vy*Bnet;
	Fnet[1] = Enet[1] - this.vx*Bnet;

	this.vx += Fnet[0];
	this.vy += Fnet[1];
	this.x += this.vx;
	this.y += this.vy;

}

function Goal(x, y, moveable = false){
	this.x = x;
	this.y = y;
	this.moveable = moveable;
	this.clicked = false;
	this.width = cwidth/20;
	this.height = cheight/10;
}

Goal.prototype.draw = function(ctx, mx, my){
	dx = 0;
	dy = 0;
	if(this.clicked){
		dx = mx;
		dy = my;
	} else {
		dx = this.x;
		dy = this.y;
	}
	ctx.fillStyle = "#00FF00";
	ctx.fillRect(dx, dy, this.width, this.height);
}

Goal.prototype.update = function(x, y){
	if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height){
		console.log("You Win!!!");
	}
}

Goal.prototype.click = function(mx, my){
	if(this.clicked){
		this.x = mx;
		this.y = my;
		this.clicked = false;
	} else if(this.moveable){
		if(mx > this.x && mx < this.x + this.width && my > this.y && my < this.y + this.height){
			this.clicked = true;
		}
	}
}


function PointCharge (x, y, q, moveable=false, r=cwidth/50, clicked=false) {
    this.x = x;
    this.y = y;
    this.q = q;
	this.r = r;
	this.moveable = moveable;
	this.clicked = clicked;

}

PointCharge.prototype.click = function(mx, my){
	if(this.clicked){
		this.x = mx;
		this.y = my;
		this.clicked = false;
		return true;
	} else if(this.moveable){
		if((Math.pow(this.x-mx, 2)+Math.pow(this.y-my,2)) < Math.pow(this.r, 2)){
			this.clicked = true;
			return true;
		}
		return false;
	}
	return false;
}

PointCharge.prototype.Efield = function(x, y){
	var r2 = Math.pow(this.x - x, 2) + Math.pow(this.y -y, 2);
	var mag = -(k * this.q)/r2;

	var Ex = mag*(this.x - x)/Math.sqrt(r2);
	var Ey = mag*(this.y - y)/Math.sqrt(r2);

	return [Ex, Ey];
}

PointCharge.prototype.Bfield = function(x, y){
	return 0;
}

PointCharge.prototype.draw = function(ctx, mx, my){
	var dx;
	var dy;
	if(this.clicked){
		dx = mx;
		dy = my;
	} else {
		dx = this.x;
		dy = this.y;
	}
	if(this.q > 0){
		ctx.fillStyle = "#FF0000";
	} else {
		ctx.fillStyle = "#0000FF";
	}

	ctx.beginPath();
	ctx.arc(dx, dy, this.r, 0, 2*Math.PI);
	ctx.fill()
}

PointCharge.prototype.update = function(){

}

function HCapacitor (x, y, V, d, width, moveable=false, clicked=false) {
    this.x = x;
    this.y = y;
    this.V = V;
    this.d = d;
    this.width = width;
    this.moveable = moveable;
    this.clicked = clicked;
	this.dwidth = cwidth/30;
	
}

HCapacitor.prototype.click = function(mx, my){
	if(this.clicked){
		this.x = mx;
		this.y = my;
		this.clicked = false;
		return true;
	} else if(this.moveable){
		if(((mx > this.x && mx < this.x + this.dwidth) || (mx > this.x + this.d && mx < this.x + this.d + this.dwidth)) && my > this.y-this.width/2 && my < this.y+this.width/2){
			this.clicked = true;
			return true;
		}
		return false;
	}
	return false
}

HCapacitor.prototype.Efield = function(x, y) {
	if((y<this.y+this.width/2) && (y>this.y-this.width/2)
		&& x > this.x && x < this.x+this.d){
		return[-1 * this.V / this.d, 0];
	} else {
		return[0, 0]
	}
}
HCapacitor.prototype.Bfield = function() {
  return 0;
}
HCapacitor.prototype.draw = function(ctx, mx, my) {
	var dx;
	var dy;

	if(this.clicked){
		dx = mx;
		dy = my;
	} else {
		dx = this.x;
		dy = this.y;
	}
	if(this.V > 0){
		ctx.fillStyle = "#0000FF";
	} else {
		ctx.fillStyle = "#FF0000";
	}
	ctx.fillRect(dx, dy-this.width/2, this.dwidth, this.width);
	if(this.V > 0){
		ctx.fillStyle = "#FF0000";
	} else {
		ctx.fillStyle = "#0000FF";
	}

	ctx.fillRect(dx + this.d, dy-this.width/2, this.dwidth, this.width);
}
HCapacitor.prototype.update = function() {

}

function VCapacitor (x, y, V, d, width, moveable=false, clicked=false) {
    this.x = x;
    this.y = y;
    this.V = V;
    this.d = d;
    this.width = width;
	this.moveable = moveable;
    this.clicked = clicked;
	this.dwidth = cwidth/30;

}

VCapacitor.prototype.click = function(mx, my){
	if(this.clicked){
		this.x = mx;
		this.y = my;
		this.clicked = false;
		return true;
	} else if(this.moveable){
		if(((my > this.y && my < this.y + this.dwidth) || 
			(my > this.y + this.d && my < this.y + this.d + this.dwidth)) 
			&& mx > this.x-this.width/2 && mx < this.x+this.width/2){
			this.clicked = true;
			return true;
		}
		return false;
	}
	return false;
}

VCapacitor.prototype.Efield = function(x, y) {
	if((x<this.x+this.width/2) && (x>this.x-this.width/2)
		&& y > this.y && y < this.y+this.d){
		return[0, -1 * this.V / this.d];
	} else {
		return[0, 0]
	}
}
VCapacitor.prototype.Bfield = function() {
  return 0;
}
VCapacitor.prototype.draw = function(ctx, mx, my) {
	var dx;
	var dy;
	if(this.clicked){
		dx = mx;
		dy = my;
	} else {
		dx = this.x;
		dy = this.y;
	}
	if(this.V > 0){
		ctx.fillStyle = "#0000FF";
	} else {
		ctx.fillStyle = "#FF0000";
	}
	ctx.fillRect(dx-this.width/2, dy, this.width, this.dwidth);
	if(this.V > 0){
		ctx.fillStyle = "#FF0000";
	} else {
		ctx.fillStyle = "#0000FF";
	}

	ctx.fillRect(dx - this.width/2, dy+this.d, this.width, this.dwidth);

}
VCapacitor.prototype.update = function() {

}

function MagField (x, y, r, B, moveable=false, clicked=false) {
    this.x = x;
    this.y = y;
	this.r = r;
    this.B = B;
	this.moveable = moveable;
	this.clicked=clicked;
}
MagField.prototype.Efield = function(x, y) {
	return [0, 0];
}
MagField.prototype.Bfield = function(x, y) {
	if(Math.pow(this.x - x, 2) + Math.pow(this.y-y, 2) < Math.pow(this.r, 2)){
		return this.B;
	} else {
		return 0;
	}
}
MagField.prototype.draw = function(ctx, mx, my) {
	var dx;
	var dy;
	if(this.clicked){
		dx = mx;
		dy = my;
	} else {
		dx = this.x;
		dy = this.y;
	}

	var grad = ctx.createRadialGradient(dx, dy, this.r/2.5, dx, dy, this.r);
	grad.addColorStop(0, "#00FF00FF");
	grad.addColorStop(1, "#00FF0011");
	ctx.fillStyle=grad;
	ctx.beginPath();
	ctx.arc(dx, dy, this.r, 0, 2*Math.PI);
	ctx.fill();

}
MagField.prototype.click = function(mx, my){
	if(this.clicked){
		this.x = mx;
		this.y = my;
		this.clicked = false;
		return true;
	} else if(this.moveable){
		if((Math.pow(this.x-mx, 2)+Math.pow(this.y-my,2)) < Math.pow(this.r, 2)){
			this.clicked = true;
			return true;
		}
		return false;
	}
	return false;

}
