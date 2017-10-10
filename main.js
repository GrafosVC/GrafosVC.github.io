const SERVER = 'http://162.243.157.230:5000/';

const getBatch = () => {
	const ajax = new XMLHttpRequest();
	ajax.open('GET', SERVER + 'graphindex', false);
	ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	ajax.send();
	return JSON.parse(ajax.responseText);
};

const sendOne = answer => {
	const ajax = new XMLHttpRequest();
	ajax.open('POST', SERVER + 'graph', true);
	ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	ajax.send(JSON.stringify(answer));
};

const sendBatch = answers => {
	answers.forEach(answer => {
		sendOne(answer);
	});
};

const runBatch = (N, M) => {
	const GRAPH_QTY = 69;
	const answers = [];

	for (var i = GRAPH_QTY - 1; i >= 0; i--) {
		const graph = Generator.generate(N, M);
		if (graph == null) continue;

		const answer = {
			'nodes':   graph.n,
			'edges':   graph.m / 2,
			'none':    (new OptimalSolver(graph)).solve(),
			'2aprox':  (new RandomSolver(graph)).solve(),
			'greedy':  (new GreedySolver(graph)).solve(),
			'2greedy': (new RandomGreedySolver(graph)).solve(),
			'graph':   graph.getRepresentation()
		};

		answers.push(answer);
	}

	console.log(N + ', ' + M + ', ' + answers.length);

	return answers;
};

while (true) {
	const batch = getBatch();
	sendBatch(runBatch(batch.nodes, batch.edges));
}
