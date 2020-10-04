class Agent {
	constructor(index) {
		this.position = createVector(25, CANVAS_HEIGHT / 2);
		this.direction = createVector(0, 0);
		this.leftAntenna;
		this.rightAntenna;
		this.rotation = 0;
		this.radius = 30;
		this.alive = true;
		this.index = index;
		this.score = 0;
		this.antennaLength = 200;
	}
	collide(lines) {
		if (this.alive) {
			this.score++;
			// collider
			for (var i in lines) {
				if (collideLineCircleVector(lines[i][0], lines[i][1], this.position, this.radius)) {
					this.alive = false;
					agentsAlive--;
					// give Score to Brain
					neat.population[this.index].score = this.position.x;
					deathPoints.push(this.position);
					break;
				} else if (time > 1100) {
					this.alive = false;
					agentsAlive--;
					neat.population[this.index].score = this.position.x;
					break;
				}
			}
		}
	}

	move(lines) {
		this.direction.x = cos(this.rotation);
		this.direction.y = sin(this.rotation);

		if (this.alive) {
			this.position = p5.Vector.add(this.position, this.direction);

			this.leftAntenna = createVector(cos(this.rotation - 35) * this.antennaLength + this.position.x, sin(this.rotation - 25) * this.antennaLength + this.position.y);
			this.rightAntenna = createVector(cos(this.rotation + 35) * this.antennaLength + this.position.x, sin(this.rotation + 25) * this.antennaLength + this.position.y);

			// check if the Antenna is colliding with line and then calculate the distance
			var shortestDistLeft = 1;
			var shortestDistRight = 1;

			for (var i in lines) {

				var distanceLeft = 1;
				if (collideLineLineVector(lines[i][0], lines[i][1], this.position, this.leftAntenna)) {
					var collisionPoint = getIntersectionPoint(lines[i][0], lines[i][1], this.position, this.leftAntenna);
					circle(collisionPoint.x, collisionPoint.y, 5);
					distanceLeft = this.position.dist(collisionPoint) / this.antennaLength;
					shortestDistLeft = min(distanceLeft, shortestDistLeft);
				}

				var distanceRight = 1;
				if (collideLineLineVector(lines[i][0], lines[i][1], this.position, this.rightAntenna)) {
					var collisionPoint = getIntersectionPoint(lines[i][0], lines[i][1], this.position, this.rightAntenna);
					circle(collisionPoint.x, collisionPoint.y, 5);
					distanceRight = this.position.dist(collisionPoint) / this.antennaLength;
					shortestDistRight = min(distanceRight, shortestDistRight);
				}

			}

			neat.population[this.index].activate([shortestDistLeft, shortestDistRight]) > 0.8 ? this.rotation++ : this.rotation--;

		}

	}

	draw() {
		if (this.alive) {
			line(this.position.x, this.position.y, this.rightAntenna.x, this.rightAntenna.y);
			line(this.position.x, this.position.y, this.leftAntenna.x, this.leftAntenna.y);
			circle(this.position.x, this.position.y, this.radius);
		}
	}
}