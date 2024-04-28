class Circle {

    constructor(x, y, r,latestSpeech) {  
      
        this.x = x;
        this.y = y;
        this.r = r;
        this.latestSpeech = latestSpeech; 
        let options = {
            frictionAir: 0.2,
            friction:0.8,
          frictionStatic:0.9,
          restitution:0,
            
        }
        
        this.body = Bodies.circle(this.x, this.y, this.r, options);
      //snow trajectory
      this.initialangle = random(0, 2 * PI); 

        Composite.add(world, this.body);
    }

    isLanding() {
        let pos = this.body.position;
        return (pos.y > height + 10)
    }
  
   resetPosition() {
     
    let x = random(width); 
    let y = -random(height); 
    
    Matter.Body.setPosition(this.body, { x: x, y: y })
   }

//     removeFromWorld() {
//         Composite.remove(world, this.body)
//     }
    
    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
    
        push();
       //stroke(255)
        fill(0);
        text(this.latestSpeech,pos.x, pos.y)
        translate(pos.x, pos.y);
        rotate(angle);
        noStroke()    
        fill(255)
        ellipse(0, 0, this.r );
        pop();
      //console.log(pos.y)
    }
  //update snow trajectory
  update(time) {
        let pos = this.body.position;
        let w = 5; 
        let ang = w * time + this.initialangle;
        pos.x += random(0.3) * sin(ang); 
        //pos.y += pow(this.r, 0.5); 
    }

}