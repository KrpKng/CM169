/* 

- sketch.js - 
== Author: Xingwei Christopher Zhang ==
== Date: Jan.22, 2023 ==

*/

var points = [];  // create an array to save elements

var v_Angle = 0.00256;  // velocity of angle change, --bigger v_Angle: smaller curvature.

var c_r1;
var c_r2;
var c_g1;
var c_g2;
var c_b1;
var c_b2;

function setup() 
{
    createCanvas(windowWidth,windowHeight);  // window's size.
    background(10);  // dark background

    angleMode(degrees);
    noiseDetail(1.5);  // adjust this to create different line appearance.

    var density = 75;  // the density var for space between each element
    var interval = width / density;  // the larger the density, the smaller the space.

    c_r1 = random(255);
    c_r2 = random(255);
    c_g1 = random(255);
    c_g2 = random(255);
    c_b1 = random(255);
    c_b2 = random(255);

    // classic double-loop to create basic 2D lattice
    for (var x = 0; x < width; x += interval)
    {
        for (var y = 0; y < height; y += interval)
        {
            var point = createVector(x,y);
            points.push(point);
        }
    }
}

function draw()
{
    if (mouseIsPressed)
    {
        noStroke()
        for (var i = 0; i < points.length; i++)
        {
            if (dist(width/2, height/2, points[i].x, points[i].y) < 350)
            {
                // (based on point coordinates in points[]) create square (or any, e.g. ellipse)
                square(points[i].x, points[i].y, 1.5);  
            }

            // create a var for setting angles
            var angleTo = map(noise(points[i].x * v_Angle, points[i].y * v_Angle), 0, 1, 1, 155);  
    
            // create Vector for every point
            points[i].add(createVector(cos(angleTo), sin(angleTo)));
    
            var colorR = map(points[i].y, 0, height, c_r1, c_r2);
            var colorG = map(points[i].x, 0, width, c_g1, c_g2);
            var colorB = map(points[i].y, 0, height, c_b1, c_b2);
    
            var alpha = map(dist(width / 2, height /2, points[i].x, points[i].y), 0, 350, 200, 0);
    
            fill(colorR, colorG, colorB, alpha);
        }
    }

    if (keyIsDown(DOWN_ARROW))
    {
        clear();
        setup();
    }
}