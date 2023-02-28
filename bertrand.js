let pi;
let Result;
var count1 = 0;
var count2 = 0;

function setup() {
  createCanvas(420, 420);
  result = createP('Approximated probability: ')
  background(0);
  stroke(255);
  noFill();
  translate(width / 2, height / 2);
  ellipse(0, 0, 400, 400);
  stroke('red')
  line(0, -200, 100*sqrt(3), 100)
  line(0, -200, -100*sqrt(3), 100)
  line(-100*sqrt(3), 100, 100*sqrt(3), 100)
}

function draw() {

  translate(width / 2, height / 2);

  const a1 = random(0, TWO_PI);
  const a2 = random(0, TWO_PI);

  const x1 = 200 * cos(a1);
  const y1 = 200 * sin(a1);

  const x2 = 200 * cos(a2);
  const y2 = 200 * sin(a2);
  var a = x1 - x2;
  var b = y1 - y2;
  const len = Math.sqrt( a*a + b*b);
  if (len < 200*Math.sqrt(3)) {
    strokeWeight(0.5)
    stroke('darkcyan');
    line(x1, y1, x2, y2);
    count1++;
  }
  if (len >= 200*Math.sqrt(3)) {
    strokeWeight(0.5)
    stroke('azure');
    line(x1, y1, x2, y2);
    count2++;
  }
  var prob = count2/(count1 + count2);
  result.html(`Probability: ${prob}`);
}
