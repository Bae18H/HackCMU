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

function Capacitor (x, y, charge) {
    this.x = x;
    this.y = y;
    this.charge = charge;
}
Capacitor.prototype.Efield = function() {

}
Capacitor.prototype.Bfield = function() {
  return [0, 0];
}
Capacitor.prototype.draw = function() {

}
Capacitor.prototype.update = function() {

}

function MagField (x, y, orient) {
    this.x = x;
    this.y = y;
    this.orient = orient;
}
MagField.prototype.Efield = function() {

}
MagField.prototype.Bfield = function() {

}
MagField.prototype.draw = function() {

}
MagField.prototype.update = function() {

}
