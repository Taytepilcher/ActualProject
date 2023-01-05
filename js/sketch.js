let i = 0;
let n;
let r =0;
let drawflag = false;



function setup() {

 //setup canvas
   const csize = min(windowWidth, windowHeight); // minimum of width and height of the window 
   createCanvas(csize, csize);                   // canvas will always be square and fit in the smallest value of width and height

   fill(0, 102, 153); // ??


//                         SLIDERS
 //create sliders
   //rotation slider
   sliderNumSides = createSlider(0, 10, 0);           // intializes rotation slider
   sliderNumSides.position(15, (height/2)-(height/5));
   sliderNumSides.style('width', '80px');
   
   //number of sides
   sliderDepthOfIteration = createSlider(0, 4, 0);
   sliderDepthOfIteration.position(15, (height/2)-(height/10));
   sliderDepthOfIteration.style('width', '80px');

   //Depth of iterations
   sliderRot = createSlider(0, 1, 0.25, 0.01);
   sliderRot.position(15, (height/2)-((height/10)*3));
   sliderRot.style('width', '80px');


 //                           BUTTONS
   //save image button
   buttonSaveImg = createButton('Press To Save Image as Jpeg');  // initialize button
   buttonSaveImg.Toclass
   buttonSaveImg.size(100, 100);                                 // set size
   buttonSaveImg.position(0,height/2,);                         // set location
   buttonSaveImg.mousePressed(buttonAction);                    // when pressed run "buttonAction"
   buttonSaveImg.addClass('btn')                                // css class button is added to


   buttonFractalChooser = createButton('Toggle the Fractal Following your Mouse');// initializes button
   buttonFractalChooser.Toclass
   buttonFractalChooser.size(100, 100);                  // intialises buttton size
   buttonFractalChooser.position(0,(height/2)+100,);     // iniitilizes button location
   buttonFractalChooser.mousePressed(chooseFractal);     //what function the button calls
   buttonFractalChooser.addClass('btn')                  //css class button is added to
 

 //                        COLOR PICKERS
   //shape color
   colorPickerShape = createColorPicker('white');
   colorPickerShape.position(15, (height/2)-(4*(height/10)));
   
   //background color
   colorPickerBg = createColorPicker('black');
   colorPickerBg.position(60, (height/2)-(4*(height/10)));
 
}


function chooseFractal(){
    if (drawflag==false){
        drawflag= true;
    }
    else if(drawflag==true){
        drawflag = false;
    }
}


function buttonAction(){
    //TODO:: ID system
    saveCanvas( 'myCanvas', 'jpg');// when button is pressed save canvas image as a jpeg
}


function draw() {
 //SETUP
    scale(width, height);                  //x and y values go from 0-1 instead of 0-width/height top left corner is (0,0)
    background(colorPickerBg.color(),0);
    stroke(colorPickerShape.color());         
    strokeWeight(0.002);                  // has to be small so it fits on 0-1 screeen.

  // GET INPUT
    let numPointsInput = sliderNumSides.value();             // asign the slider value to a variable
    let depthInput =sliderDepthOfIteration.value();
  // PROCESS  INPUT
    numPoints = 3+ floor(numPointsInput);                  // the amount of points that will be placed around the circle
    depth = floor(depthInput);          // the amount of fractals created is based on the slider position from 1 -5


    if(drawflag== true){
      //if mouse is OOB don't draw
        const minsize = min(windowWidth, windowHeight);
        let Nmousex = map(mouseX,0,minsize,0,1)
        let Nmousey = map(mouseY,0,minsize,0,1)

        drawFractal(Nmousex,Nmousey,0.1,depth);
     
    }
    else if (drawflag == false){
        drawFractal(0.5,0.5,0.1,depth);// calls drawFractal function and passes 0.5 for x and y to center shape, 0.4 so the shape doesnt take up half the screen, and 1 for the amount of fractals that are made.
    }

}

/*
    STUDY:
      1. Polar co-ordinates
      2.Cartisian coordinates

*/
function polar(angle, radius){         // this uses polar co-ordinate to return a cartisian co-ordinate
    return{
        x: cos(angle * TWO_PI)* radius,   // takes the cosin of a whole circle which is PI * 2 and multiples by the radius
        y: sin(angle * TWO_PI)* radius,   // take the sin of a whole circle which is PI *2 and multiples by the radius
    }
}


function drawFractal(x,y,csize,depth){

    for(let i=0;i<numPoints; i++){
     //for loop variables
        const f = i/numPoints;        //divides the ammount of times that have been iterated by the total amount to find the angle on the circle
        Rotation = sliderRot.value();
        const angle = f+ Rotation;    //0.25;// + 0.25 is to straighten the shapes

     //for number of iterations
        if (depth>0) {               // depth is the amount of fractal steps that take place
           //change values
            const scale = 0.5;
            const s = csize * scale;
            const p = polar(angle, s);

           //draw shape
            drawFractal(x+p.x,y+p.y, s, depth-1);
        }
        else{
            const p1 = polar(angle, csize);              // p1 is a vector 
            const p2 = polar(angle + 1/numPoints, csize);// p2 is a vector 
            line(x+p1.x,y+p1.y, x + p2.x, y +p2.y);
        }

    }

}
