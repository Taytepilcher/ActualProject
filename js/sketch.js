
let n;
function setup() {
   const csize = min(windowWidth, windowHeight);// minimum of width and height of the window 
   createCanvas(csize, csize);// canvas will always be square and fit in the smallest value of width and height
colorMode(HSL,1);// normalise color vaue so it will be between 0-1
slider = createSlider(0, 10, 0);
slider.position(10, 10);
slider.style('width', '80px');
}

function draw() {
    scale(width, height);//x and y values go from 0-1 instead of 0-width/height top left corn is (0,0)
background(0)
stroke(1);//white stroke
strokeWeight(0.002)// has to be small so it fits on 0-1 screeen.
let val =slider.value();
n = 3+ floor(val);// the amount of points that will be placed around the circle
const depth = floor(5 * mouseY/ height);// the amount of fractals created is based on the mouse y position from 1 -5
drawFractal(0.5,0.5,0.4,depth);// calls drawFractal function and passes 0.5 for x and y to center shape, 0.4 so the shape doesnt take up half the screen, and 1 for the amount of fractals that are made.


}
function polar(angle, radius){// this uses polar co-ordinate to return a cartisian co-ordinate
return{
    x: cos(angle * TWO_PI)* radius,// takes the cosin of a whole circle which is PI * 2 and multiples by the radius
    y: sin(angle * TWO_PI)* radius,// take the sin of a whole circle which is PI *2 and multiples by the radius
}
}

function drawFractal(x,y,csize,depth){
for(let i=0;i<n; i++){
const f = i/n; //divides the ammount of times that have been iterated by the total amount to find the angle on the circle
const angle = f+ 0.25;// + 0.25 is to straighten the shapes

    if (depth>0) {// depth is the amount of fractal steps that take place
        const scale = 0.5;
        const s = csize * scale;
        const p = polar(angle, s);
        drawFractal(x+p.x,y+p.y, s, depth-1);
}
    else{
        const p1 = polar(angle, csize);// p1 is a vector 
        const p2 = polar(angle + 1/n, csize);// p2 is a vector 
        line(x+p1.x,y+p1.y, x + p2.x, y +p2.y);
        }
    }
}




