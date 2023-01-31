// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

let angle1 = 0;
let angle2 = 0;

var starsL = [];

var randomN;
var dirX_Elight;
var dirY_Elight;

var x;
var y;
var z;

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  angleMode();
}

function draw() {
    background(0, 120, 120);

    rotateY(frameCount * 0.0075);
    rotateX(frameCount * 0.0075);
    rotateZ(frameCount * 0.0075);
    let randomN = random(3,4);

    // Small swirl
    for (let i = 0; i <= 360; i += 45) {
        let x = cos(radians(i + angle1)) * 80;
        let y = sin(radians(i + angle1)) * 65;
        let z = sin(radians(i + angle1)) * 90;
        push();
        translate(x, y, z);
        sphere(7);
        pop();
    }

    // Star, the center
    sphere(40);

    // Large swirl
    for (let i = 0; i <= 360; i += 60) {
        let y = cos(radians(i + angle2)) * 110;
        let x = sin(radians(i + angle2)) * 80;
        let z = sin(radians(i + angle2)) * 110;
        push();
        translate(x, y, z);
        sphere(7.5);
        pop();
    }
    
    for (let i = 0; i <= 360; i += 45) {
        let z = cos(radians(i + angle2)) * 120;
        let x = sin(radians(i + angle2)) * 90;
        let y = sin(radians(i + angle2)) * 150;
        push();
        translate(x, y, z);
        sphere(8);
        pop();
    }
    
    for (let i = 0; i <= 360; i += 6) {
        let z = cos(radians(i + angle1)) * 50;
        let x = sin(radians(i + angle1)) * 50;
        let y = sin(radians(i + angle1)) * 50;
        push();
        translate(x, y, z);
        box(4);
        pop();
    }
    
    angle1 -= randomN;
    angle2 += randomN;

    if (mouseIsPressed === true){

        let dirX_Elight = (mouseX / width) * 3;
        let dirY_Elight = (mouseY / height) * 3;

        directionalLight(80, 200, 255, -dirX_Elight, -dirY_Elight, -1);

        if (random(100) > 99){
            for(let i = 0; i < 100; i++){
                let cR = random(255);
                let cG = random(255);
                let cB = random(255);

                let eleColor = color(cR,cG,cB);

                let star = new Star(eleColor);
                starsL.push(star);
            }
        }

        for(let i = starsL.length - 1; i>=0; i--){
            starsL[i].addVel();
            starsL[i].showEle();
        }
    }
}


class Star {
    // construct element
    constructor(eleColor){
        this.pos = createVector(0,0,0);
        this.vel = p5.Vector.random3D().normalize().mult(random(5,6));
        this.eleColor = eleColor;
    }
    // add velocity to the element position
    addVel(){
        this.pos.add(this.vel)
    }
    // show the created element
    showEle(){
        push();
        noStroke();
        fill(this.eleColor);
        translate(this.pos.x, this.pos.y, this.pos.z);
        sphere(7.5);
        pop();
    }
}
