let noseX = 0; // Initial x position of the nose
let noseY = 0; // Initial y position of the nose
let clown_nose;
let video;

function preload() {
  // Load the nose image
  clown_nose = loadImage('https://i.postimg.cc/7ZBcjDqp/clownnose.png');
}

function setup() {
  // Create the canvas and center it
  const canvas = createCanvas(300, 300);
  canvas.center();

  // Capture the webcam and set the size
  video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();

  // Initialize PoseNet and set the modelLoaded function
  const poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function draw() {
  // Display the webcam image on the canvas
  image(video, 0, 0, 300, 300);

  // Draw the nose using a geometric shape (circle)
  fill(255, 0, 0);
  stroke(0, 0, 0);
  circle(noseX + 15, noseY + 15, 20);

  // Alternative: Display the nose using the image
  // image(clown_nose, noseX, noseY, 30, 30);
}

function take_snapshot() {
  // Save the image with the name 'myFilterImage.png'
  save('myFilterImage.png');
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
  if (results.length > 0) {
    // Update the nose position
    noseX = results[0].pose.nose.x - 15;
    noseY = results[0].pose.nose.y - 15;
  }
}
