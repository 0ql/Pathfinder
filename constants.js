const nt = neataptic;
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 300;
const POPSIZE = 200;
const TIME = 1100;
const STEP = 3;

const neat = new nt.Neat(2, 1, null, {
	mutation: nt.methods.mutation.ALL,
	popsize: POPSIZE,
	mutationRate: 0.2,
	elitism: 10
});
