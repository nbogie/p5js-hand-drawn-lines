"use strict";
var gWavySeed = 99;
var gPositionsSeed = 100;
var gDrawFirstCurveVertex = random() > 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  gDrawFirstCurveVertex = random() > 0.5;
  //first bit of random work generates positions.
  //We make this repeatable on this seed.
  randomSeed(gPositionsSeed);

  background("#E0E4CC");
  var lines = [];
  //for each possible horizontal level, draw a number of lines
  for (var y = 0; y < height; y += 40) {
    for (var j = 0; j < 4; j++) {
      var w = random(1, width / 60) * 20;
      var x1 = random(0, width / 20) * 20;
      var x2 = x1 > width / 2 ? x1 - w : x1 + w;
      lines.push([x1, y, x2, y]);
    }
  }
  //at each possible vertical position, just draw one wall
  for (var x = 0; x < width; x += 40) {
    var h = random(1, height / 60) * 20;
    var y1 = random(0, width / 20) * 20;
    var y2 = y1 > height / 2 ? y1 - h : y1 + h;
    lines.push([x, y1, x, y2]);
  }

  //Second bit of random work draws randomly-wavy lines between the given positions
  //Make this repeatable on another seed - not tied to the positions themselves.
  randomSeed(gWavySeed);

  lines.forEach(function(l) {
    ftline(l[0], l[1], l[2], l[3]);
  });
  noLoop();
}
function mousePressed() {
  gWavySeed = random(0, 1000000);
  draw();
}

function oneWavyLine(x1, y1, x2, y2, amt) {  
  noFill();
  beginShape();
  var dotTheEnds = true;
  var dx = x2 - x1;
  var dy = y2 - y1;

  if (dotTheEnds) {
    var r = 3;
    fill("black");
    ellipseMode(CENTER);
    ellipse(x1, y1, r, r);
    ellipse(x2, y2, r, r);
    noFill();
  }
  //start of line
  vertex(x1 + random(-amt, amt), y1 + random(-amt, amt));

  //at the start
  curveVertex(x1 + random(-amt, amt), y1 + random(-amt, amt));

  //1/3 of the way along
  curveVertex(x1 + dx / 3 + random(-amt, amt), y1 + dy / 3 + random(-amt, amt));

  //2/3 of the way along
  curveVertex(
    x1 + 2 * dx / 3 + random(-amt, amt),
    y1 + 2 * dy / 3 + random(-amt, amt)
  );

  //at the destination
  curveVertex(x2 + random(-amt, amt), y2 + random(-amt, amt));

  //end of line
  vertex(x2 + random(-amt, amt), y2 + random(-amt, amt));

  endShape();
}

function ftline(x1, y1, x2, y2) {
  [1, 2].forEach(function(variance) {
    //strokeWeight(2);
    stroke("black");
    oneWavyLine(x1, y1, x2, y2, variance);
  });
}


function keyPressed() {
  gPositionsSeed = random(0, 1000000);
  gWavySeed = random(0, 1000000);
  draw();
}
