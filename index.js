const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576

// "c" represents the visual aspects of the game
c.fillRect(0, 0, canvas.width, canvas.height);

//grav for speed of jumps
const gravity = 0.7

// "Sprite" class represents all models within the game
class Sprite {
    //wrapping args as obj allows more effeciently passed through multi-args, also allows you to input args in any order
    constructor({position, velocity, color = 'red'}) {
        //parameters to create a char model
      this.position = position
      this.velocity = velocity
      this.width = 50
      this.height = 150
      this.lastKey = ''
      //hitbox properties
      this.attackBox = {
        //this arg means the hitbox will follow the character assigned to it
        position: this.position,
        //size of hitbox
        width: 100,
        height: 50,
      }
      this.color = color
      this.isAttacking
    }
    
    // creates the visual aspects of the game
    draw() {
        // character is drawn here
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // hitbox is drawn here
        c.fillStyle = 'green'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    // updates visuals based on model position in the canvas i.e. char jumps, crouches, etc.
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
         
        this.attack = () => {
            this.isAttacking = true
            setTimeout(() => {
                this.isAttacking = false
            }, 100);
        }
    }
}

// branching off "Sprite" class, represents the player char
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    }
})

// branching off "Sprite" class, represents the enemy char
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue'
})

// represents keys for both chars 
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // Player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

    // Enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

    // detect for collision
    if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x && player.attackBox.position.x <= enemy.position.x + enemy.width && player.attackBox.position.y + player.attackBox.height >= enemy.position.y && player.attackBox.position.y <= enemy.position.y + enemy.height && player.isAttacking) {
        console.log('go');
    }

}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch (event.key) {
        // Player controls
        case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break;
        case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break;
        case 'w':
        player.velocity.y = -20
        break;
        case '': 
        player.attack()
        break;

        // Enemy Controls
        case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = "ArrowRight"
        break;
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = "ArrowLeft"
        break;
        case 'ArrowUp':
        enemy.velocity.y = -20
        break
    }

    console.log(event.key);
})

window.addEventListener('keyup', (event) => {
    // Player Controls
    switch (event.key) {
        case 'd':
        keys.d.pressed = false
        break;
        case 'a':
        keys.a.pressed = false
        break;
    }

    // Enemy Controls
    switch(event.key) {
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break;
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break;
    }

    console.log(event.key);
})