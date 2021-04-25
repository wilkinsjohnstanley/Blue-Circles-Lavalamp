const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;
//create a global variable called particles array, it will store the particle objects into this array
const particlesArray = [];
//handles stretching 
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
});

//set to undefined to have a blank canvas at the beginning
const mouse = {
    x: undefined,
    y: undefined,
}
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

})
//be able to click and hold to paint. Create a simple paintbrush.
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
   
})



//everytime we call Particle, constructor will create a new particle object and assign it random values
class Particle {
    constructor(){
        //the coordinate of the particle will be set to the coordinate of the mouse coordinate
        //but when created, they are still undefined because they're not defined yet
        // this.x = mouse.x;
        // this.y = mouse.y;

        //let's make it random for now
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        //creates random sized particles
        this.size = Math.random() * 5 + 1;
        //to move left and write, must be positive and negative
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    //method is simple a function on an object
    //update the x and y coordinates in order to move it
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    //take the updated coordinates and draw it there 
    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
        ctx.fill();
    }
}
//a function that will call it many times to create particles
function init(){
    for(let i = 0; i < 100; i++){
        //new ClassName will find that class, and trigger its constructor method.
        //because we set the blueprint for constructing the particles to be random, we will have a bunch of random particles
        particlesArray.push(new Particle());
    }
}
init();


function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

//animate function calls itself over and over in an infinite loop
function animate(){
    //clearRect expects four arguments to determine what part of canvas to clear
    ctx.clearRect(0, 0, canvas.width,  canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}
animate();