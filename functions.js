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
	pointsLastGen = [];
	if (checkboxOn && slider.value() < 100 - STEP) slider.value(slider.value() + STEP);
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
		if (randomGeneration) {
			var offset = random((-CANVAS_HEIGHT / 2 + 40) / 100 * slider.value(), (CANVAS_HEIGHT / 2 - 40) / 100 * slider.value());
			lines.push([lines[lines.length - 2][1], createVector((i + 2) * 200, CANVAS_HEIGHT / 2 - 40 + offset)]);
			lines.push([lines[lines.length - 2][1], createVector((i + 2) * 200, CANVAS_HEIGHT / 2 + 40 + offset)]);
		} else {
			var offset = (CANVAS_HEIGHT / 2 - 40) / 100 * slider.value() * (Math.round(Math.random()) * 2 - 1);
			lines.push([lines[lines.length - 2][1], createVector((i + 2) * 200, CANVAS_HEIGHT / 2 - 40 + offset)]);
			lines.push([lines[lines.length - 2][1], createVector((i + 2) * 200, CANVAS_HEIGHT / 2 + 40 + offset)]);
		}
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
		genAvs.push(lastAv * 0.1);
		neat.evolve().then(_ => { difficulties.push(-slider.value()); charts(); agentsAlive = POPSIZE; init(); time = 0; genCounter++; best = max(lastAv, best); });
	}
}

function drawThings() {
	line(best, 0, best, CANVAS_HEIGHT);
	drawLines(lines);
	drawPoints();
}

function charts() {
	var data = [{
		x: genAvs.length,
		y: genAvs,
		name: 'Punktzahl',
		type: 'bar'
	},
	{
		x: difficulties.length,
		y: difficulties,
		name: 'Schwierigkeit',
		type: 'bar'
	},
	];
	var layout = {
		title: "Durschnittliche Punktzahl",
		xaxis: { title: "Generation" },
		yaxis: { title: "Punktzahl" },
		barmode: 'relative'
	}

	Plotly.newPlot('gens', data, layout);

	var data = {
		x: pointsLastGen,
		type: 'histogram',
	};
	var layout = {
		title: "Punktzahl der Agenten der letzten Generation",
		xaxis: { title: "Erreichte Punktzahl" },
		yaxis: { title: "Anzahl der Agenten" }
	}
	Plotly.newPlot('histogram', [data], layout);
}

function checkBox() {
	if (checkboxOn) {
		slider.attribute('disabled', '');
	} else {
		slider.removeAttribute('disabled');
	}
}