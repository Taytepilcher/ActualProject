let i = 0;
let n;
let r =0;
let drawflag = false;
function setup() {
   const csize = min(windowWidth, windowHeight);// minimum of width and height of the window 
   createCanvas(csize, csize);// canvas will always be square and fit in the smallest value of width and height
//colorMode(HSL,1);// normalise color vaue so it will be between 0-1
fill(0, 102, 153);
text('word', 10, 60);
slider = createSlider(0, 10, 0);// intializes first slider
slider.position(15, (height/2)-(height/5));
slider.style('width', '80px');
slider2 = createSlider(0, 4, 0);
slider2.position(15, (height/2)-(height/10));
slider2.style('width', '80px');
slider3 = createSlider(0, 1, 0.25, 0.01);
slider3.position(15, (height/2)-((height/10)*3));
slider3.style('width', '80px');



button = createButton('Press To Save Image as Jpeg');// initializes button
button.Toclass
button.size(100, 100);// intialises buttton size
button.position(0,height/2,);// iniitilizes button location
button.mousePressed(buttonAction);//what function the button calls
button.addClass('btn')//css class button is added to
colorPicker = createColorPicker('white');
colorPicker.position(15, (height/2)-(4*(height/10)));
colorPicker1 = createColorPicker('black');
colorPicker1.position(60, (height/2)-(4*(height/10)));
button1 = createButton('Toggle the Fractal Following your Mouse');// initializes button
button1.Toclass
button1.size(100, 100);// intialises buttton size
button1.position(0,(height/2)+100,);// iniitilizes button location
button1.mousePressed(buttonAction1);//what function the button calls
button1.addClass('btn')//css class button is added to
}
function buttonAction1(){
if (drawflag==false){
    drawflag= true;
}
else if(drawflag==true){
    drawflag = false;
}
}

function buttonAction(){
    saveCanvas( 'myCanvas', 'jpg');// when button is pressed save canvas image as a jpeg
}


function draw() {
    scale(width, height);//x and y values go from 0-1 instead of 0-width/height top left corner is (0,0)
background(colorPicker1.color(),0)
stroke(colorPicker.color())//lcol[i]);//white stroke
strokeWeight(0.002)// has to be small so it fits on 0-1 screeen.
let val =slider.value();// asign the slider value to a variable
let val2 =slider2.value()
n = 3+ floor(val);// the amount of points that will be placed around the circle
const depth = floor(val2);// the amount of fractals created is based on the slider position from 1 -5
if(drawflag== true){
    const minsize = min(windowWidth, windowHeight);
let Nmousex = map(mouseX,0,minsize,0,1)
let Nmousey = map(mouseY,0,minsize,0,1)
drawFractal(Nmousex,Nmousey,0.1,depth);
console.log(mouseX)
    }
else if (drawflag == false){
}
drawFractal(0.5,0.5,0.1,depth);// calls drawFractal function and passes 0.5 for x and y to center shape, 0.4 so the shape doesnt take up half the screen, and 1 for the amount of fractals that are made.
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
val3 = slider3.value();
const angle = f+ val3//0.25;// + 0.25 is to straighten the shapes
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
