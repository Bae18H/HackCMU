function initC()
{
  canvas.addEventListener("mousemove", function(evt){
    mouseX = evt.clientX;
    mouseY = evt.clientY;
  });

  canvas.addEventListener("keydown", function(evt){
    if(evt.key == "Enter"){
      p = new Player(cwidth/3, cheight/2);
    }
  });

  canvas.addEventListener("click", function(evt){
    clickCharges(evt.clientX, evt.clientY);
  });

  charges.push(new HCapacitor(cwidth/10, cheight/2, -100, cwidth/2, cheight/2, true));
  charges.push(new VCapacitor(3*cwidth/4, cheight/10, 100, cheight/1.5, cwidth/5, true));
  charges.push(new PointCharge(cwidth/2, cheight/2, 1, true));
  charges.push(new PointCharge(cwidth/2, 4*cheight/5, -1, true));
  p = new Player(cwidth/3, cheight/2);

  window.requestAnimationFrame(loop);
}
