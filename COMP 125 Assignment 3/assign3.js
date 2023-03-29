var canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 650;
var ctx = canvas.getContext("2d");
canvas.style.border = "10px groove #99FF1D"; 
document.body.appendChild(canvas);

var timer = 0;
var click = false;
var speed = 10;

var background = false;
var backgroundImage = new Image();
backgroundImage.onload = function () 
{
    background = true;
};
backgroundImage.src = "space3.jpg";

var theChild = false;
var childImage = new Image();
childImage.onload = function () 
{
    theChild = true;
};
childImage.src = "grogu5.png";

var child = {};
var childCaught = 0;
var reset = function () {
    child.x = 10 + (Math.random() * (canvas.width - 90));
    do {
        child.y = 20 + (Math.random() * (canvas.height - 90));
    }
    while (child.y < 100)
};

window.addEventListener("mousedown", onMouseDown, false);
function onMouseDown(e) 
{

    if (e.button != 0) return;

    mouseXincanvas = e.clientX;
    mouseYincanvas = e.clientY;

    if (childClicked(child, mouseXincanvas, mouseYincanvas)) {
        click = true;
        clearInterval(timer);
        timer = setInterval(reset, 20000 / speed);
        reset();
    }
	if (Restart(mouseXincanvas, mouseYincanvas)) {
        location.reload();
    }
    if (StartSpeed(mouseXincanvas, mouseYincanvas)) {
        clearInterval(timer);
        timer = setInterval(reset, 20000 / speed);
        reset();
        render();
    }
};

function childClicked(child, x, y) {

    if (x <= (child.x + 80)
        && child.x <= (x + 90)
        && y <= (child.y + 80)
        && child.y <= (y + 80)
    ) {
        speed = speed + 2;
        childCaught++;
        return true;
    }
    return false;
};

function Restart(x, y) {

    if (x > (405)
        && x < (650)
        && y > (15)
        && y < (85)
    ) {
        return true;
    }
    return false;
};


function StartSpeed(x, y) {
    if (x > (660)
        && x < (965)
        && y > (15)
        && y < (85)
    ) {
        speed = 10;
        return true;
    }
    return false;
};

var render = function () {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (background) {
        ctx.drawImage(backgroundImage, 0, 100);
    }
    if (theChild) {
        ctx.drawImage(childImage, child.x, child.y);
    }
    if (click == true) {
        if (background) {
            ctx.drawImage(backgroundImage, 0, 100);
        }
        click = false;
    }
        
        const StarJedi = new FontFace("Star Jedi", "url(starjedi\Starjedi.ttf))");
        console.log('font ready');        
        document.fonts.add(StarJedi);
                
        ctx.fillStyle = "#4D4C5C";  
        ctx.font = '42px Star Jedi';
        ctx.textAlign = "left";
        ctx.textBaseline = "top";    
        ctx.fillText("Grogu Catcher", 25, 40);
        ctx.font = '21px Star Jedi';
        ctx.fillText("Grogu Caught: " + childCaught, 200, 10);
    
        ctx.fillStyle = "#4D4C5C";   
        ctx.fillRect(520, 18, 200, 61);     
        ctx.fillRect(760, 18, 230, 61);   
        ctx.fillStyle = "#FFCBA4";  
        ctx.fillRect(525, 21, 190, 54);  
        ctx.fillRect(765, 21, 220, 54); 
        ctx.fillStyle = "#4D4C5C";  
        ctx.font = '25px Star Jedi'; 
        ctx.fillText("Restart", 560, 38);
        ctx.fillText("Reset Speed", 783, 38);
      
};

var main = function ()
{
    render();
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

reset();
main();