var agents, lines, lastAv, button, slider, checkbox, checkbox2,
	randomGeneration = false,
	time = 0,
	agentsAlive = POPSIZE,
	genCounter = 0,
	best = 0,
	deathPoints = [],
	genAvs = [],
	pointsLastGen = [],
	checkboxOn = true,
	difficulties = [];

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	angleMode(DEGREES);
	slider = createSlider(0, 100, 1);
	slider.position(15,230);

	checkbox = createCheckbox("Automatisch schwierigkeit erhöhen", checkboxOn);
	checkbox.position(15,250);
	checkbox.changed(() => {checkboxOn = !checkboxOn; checkBox();});
	checkBox();

	checkbox2 = createCheckbox("Terrain zufällig generieren", randomGeneration);
	checkbox2.position(15, 270);
	checkbox2.changed(() => {randomGeneration = !randomGeneration})
	init();
}

function draw() {
	background(220);
	time++;

	text('Schwierigkeit des Terrains: '+slider.value()+'/100', 10, 210);
	text('Am Leben: ' + agentsAlive + ' von ' + POPSIZE, 10, 30);
	text('Generation: ' + genCounter, 10, 60);
	text('Durchschnitt letzter Generation: ' + round(lastAv*0.1), 10, 90);
	text('bester Durchschnitt: ' + round(best), best + 5, 290);

	drawThings();
	run();
}