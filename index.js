var agents, lines, lastAv, button;
var time = 0;
var agentsAlive = POPSIZE;
var genCounter = 0;
var best = 0;
var deathPoints = [];

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	angleMode(DEGREES);
	createLines();
	init();
}

function draw() {
	background(220);
	time++;
	
	text('Am Leben: '+agentsAlive+' von '+POPSIZE, 10, 30);
	text('Generation: '+genCounter, 10, 60);
	text('Durchschnitt letzter Generation: '+round(lastAv), 10, 90);
	text('bester Durchschnitt: '+round(best), best+5, 250);

	drawThings();
	run();
}