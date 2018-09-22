var test = function(cwidth, cheight){
	var charges = []

	//charges.push(new HCapacitor(cwidth/10, cheight/2, -100, cwidth/2, cheight/2, true));
	//charges.push(new VCapacitor(3*cwidth/4, cheight/10, 100, cheight/1.5, cwidth/5, true));
//	charges.push(new PointCharge(cwidth/2, cheight/2, 1, true));
	//charges.push(new PointCharge(cwidth/2, 4*cheight/5, -1, true));
		
	charges.push(new MagField(cwidth/3, cheight/2, cheight/2, 0.06, true));
	charges.push(new HCapacitor(0, 0, -10, cwidth/4, cheight/4, true));

	var ip = [cwidth/3, cheight/2]
	var gp = [7*cwidth/8, 4*cheight/8]

	return [ip, gp, charges];
}

var getLevels = function(){
	return [test];
}
