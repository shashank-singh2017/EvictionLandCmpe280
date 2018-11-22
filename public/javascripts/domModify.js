
var Letter = function(v) {
    measureDiv.innerHTML = v;
    this.width = measureDiv.clientWidth;
    this.height = 100;
    this.value = v;
    this.x = 0;
    this.y = 0;
    this.draw = function() {
        context.globalCompositeOperation = 'multiply';
        context.strokeText(this.value, this.x, this.y);
        context.globalCompositeOperation = 'source-over';
        context.fillText(this.value, this.x, this.y);
    }
}

function initDrawingCanvas() {
    drawingCanvas = document.getElementById("myCanvas");
    drawingCanvas.width = 1524;
    drawingCanvas.height = 260;
    context = drawingCanvas.getContext('2d');
    context.font = 'bolder 120px Arial';
}

function processText() {
    text = "Eviction   Land";
    letters.length = 0;
    totalTextWidth = 0;
    for (var i = 0; i < text.length; i++) {
        letters.push(new Letter(text[i]));
        totalTextWidth += letters[i].width;
    }
}

function drawCanvas(c1, c2) {
    var Canvas_pattern = document.getElementById('Canvas_pattern');
    var w = Canvas_pattern.width = 256;
    var h = Canvas_pattern.height = 256;
    var hw = w * 0.5;
    var hh = h * 0.5;
    var c = Canvas_pattern.getContext('2d');
    c.fillStyle = c1;
    c.fillRect(0, 0, w, h);
    c.fillStyle = c2;
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(hw, hh);
    c.lineTo(w, 0);
    c.lineTo(w, hh);
    c.lineTo(hw, h);
    c.lineTo(0, hh);
    c.closePath();
    c.fill();
    return c.createPattern(Canvas_pattern, 'repeat');
}

function loop() {
    draw();
    time += 0.03;
    requestAnimationFrame(loop);
}

function draw() {
    var textFillPattern = drawCanvas('#FFF0A5', '#FFB03B');
    context.fillStyle = '#8E2800';
    context.fillRect(0, 0, 1524, 260);
    context.strokeStyle = '#DE0017';
    context.lineWidth = 14;
    context.fillStyle = textFillPattern;
    var letter, x = 300;
    for (var i = 0; i < letters.length; i++) {
        letter = letters[i];
        letter.x = x + Math.cos(time + i * 0) * 64;
        letter.y = 150 + Math.sin(time + i * 0) * 50;
        letter.draw();
        x += letter.width + 5;
    }
}
