var k = 1;

function PointCharge (x, y, charge, moveable=False) {
    this.x = x;
    this.y = y;
    this.charge = charge;

}

PointCharge.prototype.Efield = function(x, y){
	var r2 = Math.pow(this.x - x, 2) + Math.pow(this.y -y, 2);
	var mag = (k * charge)/r2;

	var Ex = mag*(x-this.x)/Math.sqrt(r2);
	var Ey = mag*(y-this.y)/Math.sqrt(r2);

	return [Ex, Ey];
}

PointCharge.prototype.Bfield = function(x, y){
	return [0, 0];
}

PointCharge.prototype.draw(ctx){

}
PointCharge.prototype.update(){

}

function HCapacitor (x, y, V, d, width) {
    this.x = x;
    this.y = y;
    this.V = V;
    this.d = d;
    this.width = width;
	
}
HCapacitor.prototype.Efield = function(x, y) {
	if(x < this.x + width $$ x > this.x - width){
		return[-1 * this.V / this.d , 0];
	} else {
		return[0, 0]
	}
}
HCapacitor.prototype.Bfield = function() {
  return [0, 0];
}
HCapacitor.prototype.draw = function() {

}
HCapacitor.prototype.update = function() {

}

function VCapacitor (x, y, V, d, width) {
    this.x = x;
    this.y = y;
    this.V = V;
    this.d = d;
    this.width = width;
	
}
VCapacitor.prototype.Efield = function(x, y) {
	if(y < this.y + width $$ y > this.y - width){
		return[0, -1 * this.V / this.d];
	} else {
		return[0, 0]
	}
}
VCapacitor.prototype.Bfield = function() {
  return [0, 0];
}
VCapacitor.prototype.draw = function() {

}
VCapacitor.prototype.update = function() {

}

function MagField (x, y, B) {
    this.x = x;
    this.y = y;
    this.B = B;
}
MagField.prototype.Efield = function() {
	return [0, 0];
}
MagField.prototype.Bfield = function() {
	return B;
}
MagField.prototype.draw = function() {

}
MagField.prototype.update = function() {

}
