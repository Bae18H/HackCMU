
var secA = function()
{
  ctx.clearRect(0, 0, cwidth, cheight);
}

function Aloop(){
  loop(Aloop, secA);
}
function initA()
{
  canvas.addEventListener("keydown", restart);

  charges.push(new PointCharge(cwidth/4, cheight/4, 1, false));
  p = new Player(cwidth/3, cheight/3);
  draw(ctx, mouseX, mouseY);
  p.draw(ctx);
  goal = new Goal(17*cwidth/20, 7*cheight/10);
  goal.draw(ctx);

  ctx.font="20px Georgia";
  ctx.fillStyle="#000000";
  ctx.fillText("Press [SPACE] to escape through the quantum tunnel!", cwidth/10, cheight/10);

  canvas.addEventListener("keydown", function(evt){
    if(evt.keyCode == 32){
      window.requestAnimationFrame(Aloop);
    }
    console.log(goal.update(p.x, p.y));
  });
}
