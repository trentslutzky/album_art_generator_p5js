var color_bg, color_record, color_ortef_bg, color_ortef_text, color_track_name;
var nameColorPicker;
var backgroundColorPicker;
var nameColorPicker;
var recordBackgroundColorPicker;
var backgroundImageInput;
var trackName = generateRandomEnglishLikeWord(5);
var trackNameInput;
var patternGenerated = false;
let img;
let imgLoaded = false;
let COLS = createCols("https://coolors.co/eb300f-fe7688-fff566-212121-306e42-0d3b66");
function setup() {
    let main_canvas = createCanvas(500, 500);
    main_canvas.position(50, 50);
    backgroundImageMaskLayer = createGraphics(500, 500);
    color_bg = color(40, 40, 40);
    color_record = generateRandomPastelColor();
    color_ortef_bg = color(255, 225, 31);
    color_ortef_text = color(0);
    color_track_name = color(0);
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
    trackNameColorPicker = createColorPicker(color_track_name);
    trackNameColorPicker.position(575, 280);
    trackNameColorPickerLabel = createP("TRACK NAME TEXT COLOR");
    trackNameColorPickerLabel.position(640, 277);
    applyButton = createButton("RANDOM TITLE");
    applyButton.position(575, 345);
    applyButton.mousePressed(randomizeTrackName);
    applyButton = createButton("RANDOM PATTERN");
    applyButton.position(575, 455);
    applyButton.mousePressed(generatePattern);
    applyButton = createButton("CLEAR PATTERN");
    applyButton.position(575, 505);
    applyButton.mousePressed(clearPattern);
    input = createFileInput(handleFile);
    input.position(575, 415);
    layer1 = createGraphics(500, 500);
    layer2 = createGraphics(500, 500);
// generatePattern();
}
function draw() {
    noStroke();
    if (!patternGenerated) background(recordBackgroundColorPicker.color());
    layer1.noStroke();
    layer2.noStroke();
    layer2.clear();
    layer2.textFont("Josefin Sans");
    layer1.background(backgroundColorPicker.color());
    layer1.fill(0);
    layer1.circle(250, 250, 450);
    layer1.erase();
    layer1.circle(250, 250, 430);
    layer1.noErase();
    layer2.fill(nameColorPicker.color());
    layer2.rect(135, 104, 230, 70);
    layer2.fill(color_ortef_text);
    layer2.textSize(55);
    layer2.textAlign(CENTER);
    layer2.text("ORTEF", 250, 160);
    layer2.fill(trackNameColorPicker.color());
    layer2.textSize(80);
    layer2.textAlign(CENTER);
    layer2.text(trackNameInput.value(), 250, 370);
    layer2.fill(lightenColor(recordBackgroundColorPicker.color(), -20));
    layer2.circle(250, 250, 80);
    if (imgLoaded) image(img, 0, 0);
    image(layer1, 0, 0);
    image(layer2, 0, 0);
    fill(0);
    circle(250, 250, 20);
}
function saveImage() {
    save(trackNameInput.value() + ".png");
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function clearPattern() {
    patternGenerated = false;
}
function generatePattern() {
    patternGenerated = true;
    fill(0);
    circle(250, 250, 450);
    const patternSize = getRandomInt(5) + 5;
    const record_color = recordBackgroundColorPicker.value();
    PALETTE = [
        colorToHex(lightenColor(record_color, -20)),
        colorToHex(lightenColor(record_color, -40)),
        colorToHex(lightenColor(record_color, -60))
    ];
    patternColors(PALETTE);
    const t = width / patternSize;
    // pattern(PTN.stripe(t / 10));
    pattern(randPattern(t));
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
        PTN.stripe(t),
        PTN.stripeCircle(t),
        PTN.stripePolygon(int(random(3, 6)), t),
        PTN.stripeRadial(TAU / int(random(6, 30))),
        PTN.wave(t / int(random(1, 3)), t / int(random(10, 20)), t / 5, t / 10),
        PTN.dot(t, t / 2),
        PTN.checked(t, t),
        PTN.cross(t, t / 8),
        PTN.triangle(t / int(random(1, 3)), t / int(random(1, 4)))
    ];
    return random(ptArr);
}
// Once the img element is created, use it to 
// convert the image element into a p5Image object. 
function imgCreated() {
    img.hide();
    // Create a temporary p5.Graphics object to draw the image.
    let g = createGraphics(img.elt.width, img.elt.height);
    g.image(img, 0, 0);
    // Remove the original element from the DOM.
    img.remove();
    // g.get will return image data as a p5.Image object
    img = g.get(0, 0, g.width, g.height);
    // Because we've converted it into a p5.Image object, we can
    // use functions such as 'resize', and 'filter',
    // which aren't available on the HTML img element.
    // Uncomment the following lines for an example...
    /*
  // Resize it to fill the canvas
  if (img.width < img.height){
    img.resize(width, 0);
  } else {
    img.resize(0, height);
  }
  
  // Posterize and invert the colours
  img.filter(POSTERIZE, 2);
  img.filter(INVERT);
  */ // Record that we have finished creating the image object.
    imgLoaded = true;
}
function handleFile(file) {
    imgLoaded = false;
    if (file.type === "image") {
        // Create the image as an img element. 
        // The 'imgCreated' function will be called when it
        // is done, so we can convert it into a p5.Image object
        img = createImg(file.data, "Alt text", "anonymous", imgCreated);
        img.hide();
    } else img = null;
}
function generateRandomEnglishLikeWord() {
    const vowels = "AEIOU";
    const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
    let word = "";
    let isVowel = Math.random() < 0.5; // Start with a vowel or consonant randomly
    for(let i = 0; i < 5; i++){
        if (isVowel) word += vowels.charAt(Math.floor(Math.random() * vowels.length));
        else word += consonants.charAt(Math.floor(Math.random() * consonants.length));
        isVowel = !isVowel; // Switch between vowel and consonant
    }
    return word;
}
function generateRandomPastelColor() {
    // Generate random RGB values within a soft range
    let r = random(200, 255);
    let g = random(200, 255);
    let b = random(200, 255);
    // Ensure the colors are close in terms of brightness
    let minColor = min(r, g, b);
    r = lerp(r, minColor, 0.2);
    g = lerp(g, minColor, 0.2);
    b = lerp(b, minColor, 0.2);
    // Return the color
    return color(r, g, b);
}
function randomizeTrackName() {
    trackNameInput.elt.value = generateRandomEnglishLikeWord();
    if (patternGenerated) generatePattern();
}

//# sourceMappingURL=index.ba7f5425.js.map
