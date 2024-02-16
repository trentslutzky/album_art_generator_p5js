
var color_bg, color_record, color_ortef_bg, color_ortef_text;

var nameColorPicker;
var backgroundColorPicker;
var nameColorPicker;
var recordBackgroundColorPicker;
var backgroundImageInput;

var trackName = "SLEEV";
var trackNameInput;

var backgroundImage;
var maskImage;

function preload() {
  maskImage = loadImage("./mask.png");
}

function setup() {
  let main_canvas = createCanvas(500, 500);
  main_canvas.position(50, 50);
  
  backgroundImageMaskLayer = createGraphics(500, 500);
  
  color_bg = color(40,40,40);
  color_record = color(255, 255, 255);
  color_ortef_bg = color(230,180,30);
  color_ortef_text = color(0, 0, 0);
  
  saveButton = createButton('EXPORT IMAGE');
  saveButton.position(50, 550);
  saveButton.mousePressed(saveImage);

  trackNameInput = createInput(trackName);
  trackNameInput.position(575, 70);
  trackNameInputLabel = createP("TRACK NAME");
  trackNameInputLabel.position(575, 35);
      
  backgroundColorPicker = createColorPicker(color_bg);
  backgroundColorPicker.position(575, 130);
  backgroundColorPickerLabel = createP("MAIN BACKGROUND COLOR");
  backgroundColorPickerLabel.position(640, 127);
  
  nameColorPicker = createColorPicker(color_ortef_bg);
  nameColorPicker.position(575, 180);
  nameColorPickerLabel = createP("ORTEF BACKGROUND COLOR");
  nameColorPickerLabel.position(640, 177);
  
  recordBackgroundColorPicker = createColorPicker(color_record);
  recordBackgroundColorPicker.position(575, 230);
  recordBackgroundColorPickerLabel = createP("RECORD BACKGROUND COLOR");
  recordBackgroundColorPickerLabel.position(640, 227);
  
  backgroundImageInputLabel = createP("BACKGROUND IMAGE");
  backgroundImageInputLabel.position(575, 480);
  backgroundImageInput = createFileInput(handleImage);
  backgroundImageInput.position(575, 520);
}

function draw() {
  textFont("Josefin Sans");

  background(backgroundColorPicker.color());

  fill(0);
  circle(250,250,450);

  fill(recordBackgroundColorPicker.color());
  circle(250,250,430);
  
  if (backgroundImage) {
    image(backgroundImage, 0, 0);
    image(maskImage, 0, 0);
  }

  stroke(nameColorPicker.color());
  fill(nameColorPicker.color());
  rect(135,104,230,70);

  fill(color_ortef_text);
  stroke(color_ortef_text);
  textSize(55);
  textAlign(CENTER);
  text('ORTEF', 250, 160);

  textSize(80);
  textAlign(CENTER);
  text(trackNameInput.value(), 250, 370);

  fill(0);
  circle(250,250,20);
}

function saveImage() {
  save(trackNameInput.value()+".png");
}

function handleImage(file) {
  if (file.type === 'image') {
    backgroundImage = createImg(file.data, '');
    backgroundImage.position(50, 50);
  } else {
    backgroundImage = null;
  }
}
