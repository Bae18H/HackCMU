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

function Player (xi, yi, q){
	this.x = xi;
	this.y = yi;
	this.vx = 0;
	this.vy = 0;
	this.r = cwidth/50;
	this.img = new Image();
	if(q > 0){
		this.img.src = "https://raw.githubusercontent.com/Bae18H/HackCMU/master/Images/postive%20criminal%20particle.png" 
	} else {

		this.img.src = "https://raw.githubusercontent.com/Bae18H/HackCMU/master/Images/negative%20criminal%20particle.png" 
	}
}

Player.prototype.draw = function(ctx){
	ctx.drawImage(this.img, this.x - this.r, this.y - this.r, 2*this.r, 2*this.r);
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
	this.width = cwidth/10;
	this.height = 0.16*cwidth;
	this.img = new Image();
	this.img.src = "Images/warp\ gate.png"
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

	ctx.drawImage(this.img, 250, 0, 550, 900, dx, dy, this.width, this.height);
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
	this.img = new Image()
	if(q > 0){
		this.img.src = "Images/+\ particle.png"
	} else {
		this.img.src = "Images/-\ particle.png"
	}

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

	ctx.drawImage(this.img, dx-this.r, dy-this.r,2*this.r, 2*this.r);
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
	this.img1 = new Image();
	this.img2 = new Image();

	this.img1.src = "Images/positive\ Hcapacitor.png"
	this.img2.src = "Images/negative\ Hcapacitor.png"
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
	var px;
	var nx;
	if(this.V < 0){
		px = 0;
		nx = this.d
	} else {
		px = this.d;
		nx = 0;
	}
	ctx.fillStyle = "#0000FF";
	ctx.drawImage(this.img1, 1930, 250, 200, 3008, dx + px, dy-this.width/2, this.dwidth, this.width);
	ctx.drawImage(this.img2, 270, 270, 230, 3008, dx + nx, dy-this.width/2, this.dwidth, this.width);
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
	this.img1 = new Image();
	this.img2 = new Image();

	this.img2.src = "Images/negative\ capacitor.png"
	this.img1.src = "Images/positive\ capacitor.png"

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
	var py;
	var ny;
	if(this.V < 0){
		py = 0;
		ny = this.d
	} else {
		py = this.d;
		ny = 0;
	}
	ctx.drawImage(this.img1, 220, 350, 3008, 250, dx-this.width/2, dy + py, this.width, this.dwidth);

	ctx.drawImage(this.img2, 250, 1950, 3058, 250, dx-this.width/2, dy+ny, this.width, this.dwidth);

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
	grad.addColorStop(0, "#FFDF00");
	grad.addColorStop(1, "#FFDF0000");
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
