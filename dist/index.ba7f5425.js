var color_bg, color_record, color_ortef_bg, color_ortef_text;
var nameColorPicker;
var backgroundColorPicker;
var nameColorPicker;
var recordBackgroundColorPicker;
var backgroundImageInput;
var trackName = "SLEEV";
var trackNameInput;
var patternSize = 200;
let COLS = createCols("https://coolors.co/eb300f-fe7688-fff566-212121-306e42-0d3b66");
function setup() {
    console.log(COLS);
    let main_canvas = createCanvas(500, 500);
    main_canvas.position(50, 50);
    backgroundImageMaskLayer = createGraphics(500, 500);
    color_bg = color(40, 40, 40);
    color_record = color("#fff");
    color_ortef_bg = color(230, 180, 30);
    color_ortef_text = color(0);
    saveButton = createButton("EXPORT IMAGE");
    saveButton.position(50, 575);
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
    applyButton = createButton("APPLY COLORS");
    applyButton.position(575, 285);
    applyButton.mousePressed(applyColors);
    applyButton = createButton("RANDOM PATTERN");
    applyButton.position(575, 455);
    applyButton.mousePressed(generatePattern);
    applyButton = createButton("CLEAR PATTERN");
    applyButton.position(575, 505);
    applyButton.mousePressed(clearPattern);
    textFont("Josefin Sans");
    background(backgroundColorPicker.color());
    fill(0);
    circle(250, 250, 450);
    applyColors();
}
function draw() {
    stroke(nameColorPicker.color());
    fill(nameColorPicker.color());
    rect(135, 104, 230, 70);
    fill(color_ortef_text);
    stroke(color_ortef_text);
    textSize(55);
    textAlign(CENTER);
    text("ORTEF", 250, 160);
    textSize(80);
    textAlign(CENTER);
    text(trackNameInput.value(), 250, 370);
    stroke(lightenColor(recordBackgroundColorPicker.color(), -20));
    fill(lightenColor(recordBackgroundColorPicker.color(), -20));
    circle(250, 250, 80);
    stroke(0);
    fill(0);
    circle(250, 250, 20);
    fill(0, 0, 0, 0);
    stroke(0);
    circle(250, 250, 430);
}
function applyColors() {
    fill(recordBackgroundColorPicker.color());
    circle(250, 250, 430);
}
function saveImage() {
    save(trackNameInput.value() + ".png");
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function clearPattern() {
    fill(recordBackgroundColorPicker.color());
    circle(250, 250, 430);
}
function generatePattern() {
    background(backgroundColorPicker.color());
    fill(0);
    circle(250, 250, 450);
    const patternSize = getRandomInt(10);
    const record_color = recordBackgroundColorPicker.value();
    PALETTE = [
        colorToHex(lightenColor(record_color, -20)),
        colorToHex(lightenColor(record_color, -40)),
        colorToHex(lightenColor(record_color, -60))
    ];
    patternColors(PALETTE);
    const t = width / patternSize;
    pattern(randPattern(100));
    circlePattern(250, 250, 430);
}
function createCols(url) {
    let slaIndex = url.lastIndexOf("/");
    let colStr = url.slice(slaIndex + 1);
    let colArr = colStr.split("-");
    for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
    return colArr;
}
function lightenColor(oldColor, amount) {
    // Extract RGB components
    let r = red(oldColor);
    let g = green(oldColor);
    let b = blue(oldColor);
    // Increase brightness
    r += amount;
    g += amount;
    b += amount;
    // Ensure the values stay within the valid range (0-255)
    r = constrain(r, 0, 255);
    g = constrain(g, 0, 255);
    b = constrain(b, 0, 255);
    // Return the new color
    return color(r, g, b);
}
function colorToHex(color1) {
    // Extract RGB components
    let r = red(color1);
    let g = green(color1);
    let b = blue(color1);
    // Convert each component to hexadecimal and ensure two digits
    let rHex = ("0" + r.toString(16)).slice(-2);
    let gHex = ("0" + g.toString(16)).slice(-2);
    let bHex = ("0" + b.toString(16)).slice(-2);
    // Concatenate and return the hexadecimal string
    return "#" + rHex + gHex + bHex;
}
function randPattern(t) {
    const ptArr = [
        PTN.stripe(t / int(random(6, 12))),
        PTN.stripeCircle(t / int(random(6, 12))),
        PTN.stripePolygon(int(random(3, 7)), int(random(6, 12))),
        PTN.stripeRadial(TAU / int(random(6, 30))),
        PTN.wave(t / int(random(1, 3)), t / int(random(10, 20)), t / 5, t / 10),
        PTN.dot(t / 10, t / 10 * random(0.2, 1)),
        PTN.checked(t / int(random(5, 20)), t / int(random(5, 20))),
        PTN.cross(t / int(random(10, 20)), t / int(random(20, 40))),
        PTN.triangle(t / int(random(5, 20)), t / int(random(5, 20)))
    ];
    return random(ptArr);
}

//# sourceMappingURL=index.ba7f5425.js.map
