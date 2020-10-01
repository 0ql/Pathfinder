function getIntersectionPoint(A, B, C, D) {
	// Line AB represented as a1x + b1y = c1 
	var a1 = B.y - A.y;
	var b1 = A.x - B.x;
	var c1 = a1 * (A.x) + b1 * (A.y);

	// Line CD represented as a2x + b2y = c2 
	var a2 = D.y - C.y;
	var b2 = C.x - D.x;
	var c2 = a2 * (C.x) + b2 * (C.y);

	var determinant = a1 * b2 - a2 * b1;

	if (determinant == 0) {
		// The lines are parallel
		return Infinity;
	}
	else {
		var x = (b2 * c1 - b1 * c2) / determinant;
		var y = (a1 * c2 - a2 * c1) / determinant;
		return createVector(x, y);
	}
}

function drawLines(lines) {
	for (var i in lines) {
		line(lines[i][0].x, lines[i][0].y, lines[i][1].x, lines[i][1].y);
	}
}

function drawPoints() {
	for (var i in deathPoints) {
		push();
		fill('red');
		stroke('red');
		circle(deathPoints[i].x, deathPoints[i].y, 2);
		pop();
	}
}

function init() {
	createLines();
	deathPoints = [];
	agents = [];
	for (var i = 0; i < POPSIZE; i++) {
		agents.push(new Agent(i));
	}
}

function createLines() {
	lines = [
		[createVector(0, CANVAS_HEIGHT / 2 - 40), createVector(200, CANVAS_HEIGHT / 2 - 40)],
		[createVector(0, CANVAS_HEIGHT / 2 + 40), createVector(200, CANVAS_HEIGHT / 2 + 40)],
	];

	for (var i = 0; i < 5; i++) {
		var rd = random(0, CANVAS_HEIGHT - 80);
		lines.push([lines[lines.length - 2][1], createVector((i + 2) * 200, max(rd, 0))]);
		lines.push([lines[lines.length - 2][1], createVector((i + 2) * 200, max(rd + 80, 80))]);
	}
}

function run() {
	if (agentsAlive > 0) {
		for (var i = 0; i < POPSIZE; i++) {
			agents[i].collide(lines);
			agents[i].move(lines);
			agents[i].draw(lines);
		}
	} else {
		lastAv = neat.getAverage();
		neat.evolve().then(_ => { agentsAlive = POPSIZE; init(); time = 0; genCounter++; best = max(lastAv, best) });
	}
}

function drawThings() {
	line(best, 0, best, CANVAS_HEIGHT);
	drawLines(lines);
	drawPoints();
}