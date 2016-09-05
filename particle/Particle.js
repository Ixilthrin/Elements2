
function Particle(image, posX, posY, width, height)
{
    this.particleSize = particleSize;
  
    var x = Math.random() * width;
    var y = Math.random() * height;

    var imageData = context.getImageData(x + posX, y + posY, x + posX + 1, y + posY + 1);
    var currentRed = imageData.data[0];
    var currentGreen = imageData.data[1];
    var currentBlue = imageData.data[2];
    this.color = "rgb(" + currentRed + ", " + currentGreen + ", " + currentBlue + ")";

    this.x = posX + x;
    this.y = posY + y;
    this.z = 0;

    var centerX = posX + width / 2;
    var centerY = posY + height / 2;

    var diffX = this.x - centerX;
    var diffY = this.y - centerY;
  
    var angle = Math.atan(diffY / diffX);
    if (diffX < 0) {
        angle += Math.PI;
    }
    
    this.p1 = new Object();
    this.p2 = new Object();
    this.p3 = new Object();
    this.p4 = new Object();

    this.p1.x = this.x
    this.p1.y = this.y

    this.p2.x = this.p1.x + Math.random() * this.particleSize;
    this.p2.y = this.p1.y + Math.random() * 2;

    this.p3.x = this.p2.x + (Math.random() * 1 - 2);
    this.p3.y = this.p2.y + Math.random() * this.particleSize;

    this.p4.x = this.p3.x - Math.random() * this.particleSize;
    this.p4.y = this.p3.y + (Math.random() * 1 - 2);


    this.velocity = new Object();
    this.velocity.x = 0;
    this.velocity.y = 0;
    var speed = .2 + Math.random() * 1.5;
    this.velocity.x = speed * Math.cos(angle);
    this.velocity.y = speed * Math.sin(angle);
}

Particle.prototype.update = function()
{
    this.move(this.velocity.x, this.velocity.y);
    if (this.y > canvas.height - this.particleSize) {
        this.velocity.y = 0;
        this.velocity.x = 0;
    }
    if (this.x > canvas.width) {
        this.velocity.x = Math.random() / 3;
        this.velocity.x = -1 * this.velocity.x;
        this.velocity.y = 3 + Math.random();
    }
    if (this.y < 0) {
        this.velocity.y = Math.random();
    }
    if (this.x < 0) {
        this.velocity.x = Math.random() / 3;
        this.velocity.y = 3 + Math.random();
    }
    this.velocity.y += .003;
}

Particle.prototype.draw = function(context)
{
    context.beginPath();
    context.fillStyle = this.color;

    context.moveTo(this.p1.x, this.p1.y);
    context.lineTo(this.p2.x, this.p2.y);
    context.lineTo(this.p3.x, this.p3.y);
    context.lineTo(this.p4.x, this.p4.y);
    context.lineTo(this.p1.x, this.p1.y);

    context.fill();
}

Particle.prototype.move = function(x, y)
{
    this.x += x;
    this.y += y;
    this.p1.x += x;
    this.p1.y += y;
    this.p2.x += x;
    this.p2.y += y;
    this.p3.x += x;
    this.p3.y += y;
    this.p4.x += x;
    this.p4.y += y;
}