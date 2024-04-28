let latestBoundaries = []; // Array to keep track of the latest boundaries

class Boundary {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        let options = {
            friction: 1,
            restitution: 0.8,
            isStatic: true
        }
        this.body = Bodies.circle(this.x, this.y, this.r,options);
        
        // Add the new boundary to the latestBoundaries array
        latestBoundaries.push(this);
        
   //console.log(this)
        // lagging effect by increasing the length
        if (latestBoundaries.length > poses.length) {
            let removedBoundary = latestBoundaries.shift(); // Remove the oldest boundary from the array
            Composite.remove(world, removedBoundary.body); // Remove the corresponding body from Matter.js world
        }

        // Add the new boundary to the Matter.js world
        Composite.add(world, this.body);
    }

    show() {
        let pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        noStroke();
        fill(255);
        ellipse(0, 0, this.r);
        pop();
    }
}
