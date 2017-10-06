while (true) {
	const graph = new Graph(4);
	graph.addEdge(0, 1);
	graph.addEdge(1, 2);
	graph.addEdge(2, 3);
	const answer = {
		'nodes':   graph.n,
		'edges':   graph.m / 2,
		'none':    (new OptimalSolver(graph)).solve(),
		'2aprox':  (new RandomSolver(graph)).solve(),
		'greedy':  (new GreedySolver(graph)).solve(),
		'2greedy': (new RandomGreedySolver(graph)).solve(),
		'graph':   graph.getRepresentation()
	};
	const ajax = new XMLHttpRequest();
	ajax.open("POST", "http://162.243.157.230:5000/graph", true);
	ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	ajax.send(JSON.stringify(answer))
	break
}
