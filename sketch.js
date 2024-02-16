
var color_bg, color_record, color_ortef_bg, color_ortef_text;

var nameColorPicker;

var trackName = "SLEEV";
var trackNameInput;

function setup() {
  let main_canvas = createCanvas(500, 500);
  main_canvas.position(50, 50);
  
  color_bg = color(40,40,40);
  color_record = color(255, 255, 255);
  color_ortef_bg = color(230,180,30);
  color_ortef_text = color(0, 0, 0);
  
  saveButton = createButton('EXPORT IMAGE');
  saveButton.position(50, 550);
  saveButton.mousePressed(saveImage);
  
  nameColorPicker = createColorPicker(color_ortef_bg);
  nameColorPicker.position(600, 100);

  trackNameInput = createInput(trackName);
  trackNameInput.position(600, 50);
}

function draw() {
  textFont("Josefin Sans");

  background(color_bg);

  fill(0);
  circle(250,250,450);

  fill(color_record);
  circle(250,250,430);

  stroke(color_record);
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
