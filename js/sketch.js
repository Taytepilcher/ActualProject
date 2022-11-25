
function setup() {
    createCanvas(800, 600)
}
function draw() {
    background(0)
    translate(width / 2, height)
    stroke(50, 250, 50)
    branch(150)
    translate(0, -150)
}
function branch(length){
    line(0,0,0, -length)
    translate(0, -length)
    if (length > 1) {
        push()
            rotate(PI / 4)
            branch(length * 0.75)
        pop()
        push()
            rotate(-PI / 4)
            branch(length * 0.75)
        pop()
    }
}




