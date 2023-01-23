/* 

- sketch.js - 
== Author: Xingwei Christopher Zhang ==
== Date: Jan.22, 2023 ==

*/

var points = [];  // create an array to save elements
var v_Angle = 0.00255;  // velocity of angle change, change this to get different lines.

function setup() 
{
    createCanvas(windowWidth,windowHeight);  // window's size.
    background(20);  // dark color
    noiseDetail(1);
    angleMode(degrees);

    var density = 75;  // the density var for space between each element
    var space = width / density;  // the larger the density, the smaller the space.

    // classic double-loop to create basic 2D lattice
    for (var x = 0; x < width; x += space)
    {
        for (var y = 0; y < height; y += space)
        {
            var point = createVector(x,y);
            points.push(point);
        }
    }
}

function draw(){
    noStroke()
    fill(255)  // white

    for (var i = 0; i < points.length; i++)
    {
        if (dist(width/2, height/2, points[i].x, points[i].y) < 350)
        {
            // (based on point coordinates in points[]) create ellipse for each point
            ellipse(points[i].x, points[i].y, 2, 2);  
        }
        

        // set angles to generate
        var angleTo = map(noise(points[i].x * v_Angle, points[i].y * v_Angle), 0, 1, 1, 150);  

        // add createVector to every point
        points[i].add(createVector(cos(angleTo), sin(angleTo)));

        var colorR = map(points[i].y, 0, height, 0, 300);
        var colorG = map(points[i].x, 0, width, 0, 300);
        var colorB = map(points[i].y, 0, height, 0, 300);

        fill(colorR, colorG, colorB);
    }
}