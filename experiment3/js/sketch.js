// sketch.js - Experiment 3: Generative Methods
// Author: Xingwei Christopher Zhang
// Date: Due Jan.31, 2023

/* 
--README--
1. Press the mouse button to generate “planets”.

2. Move your mouse when pressing the mouse button to see the color changes of the “planets”.
*/


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
  
    let randomN = random(3,4);

    rotateY(frameCount * 0.0075);
    rotateX(frameCount * 0.0075);
    rotateZ(frameCount * 0.0075);
    

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

    // generate when pressing
    if (mouseIsPressed === true){

        // light for elements
        let dirX_Elight = (mouseX / width) * 3;
        let dirY_Elight = (mouseY / height) * 3;

        // give light
        directionalLight(0, 0, 255, -dirX_Elight, -dirY_Elight, -1);

        // the frequency of appearing
        if (random(100) > 99){
            for(let i = 0; i < 100; i++){
                let cR = map(mouseX, 0, width, 0, random(255));
                let cG = map(mouseY, 0, height, random(255), 0);
                let cB = map(mouseX, 0, width, 50, 255);

                let eleColor = color(cR,cG,cB);

                let star = new Star(eleColor);
                starsL.push(star);
            }
        }

        // call appear
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
