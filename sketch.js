let input;
let img;
let detector;

function preload() { //load model before anything happens
  detector = ml5.objectDetector('cocossd');
  console.log('model loaded');
}

function setup() { // create file input to load image
  input = createFileInput(handleFile);
  input.position(360,700);
  let col = color(173,216,230);
  input.style('font-size', '30px');
  button = createButton('Predict');
  button.position(1000,700);
  button.style('font-size', '30px');
  button.style('background-color', col);
  input.style('color', 'white');
  button.mousePressed(detectImage);
}

function draw() { // create canvas to place image on
  createCanvas(1500,500);
  background(255);
  if (img) {
    image(img, 350,0, 750, height);
    img.center();
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}


// function detectImage() {
//   detector.detect(img,gotDetections);
// }
//
// function gotDetections(error,results) {
//   if(error){
//       console.error(error);
//     }
//   for(let i = 0; i<results.length; i++){
//     let object = results[i];
//     stroke(0,255,0);
//     strokeWeight(4);
//     noFill();
//     rect(object.x+350,object.y,object.width,object.height);
//     noStroke();
//     fill(255);
//     textSize(34);
//     text(object.label,object.x+350,object.y);
//     console.log(object);
//   }
//   detectImage();
// }

function detectImage() {
  detector.detect(img, function(error,results) {
    if(error){
         console.error(error);
       }
     for(let i = 0; i<results.length; i++){
       let object = results[i];
       stroke(0,255,0);
       strokeWeight(4);
       noFill();
       rect(object.x+350,object.y,object.width,object.height);
       noStroke();
       fill(255);
       textSize(34);
       text(object.label,object.x+350,object.y);
       console.log(object);
     }
     detectImage();
  });
}
