function initA()
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

  p = new Player(cwidth/3, cheight/2);

  window.requestAnimationFrame(loop);
}
