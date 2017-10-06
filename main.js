for (var n = 5, k = 1; ; n++, k *= 2) {
	for (var i = 0; i < k; i++) {
		const min_m = n - 1;
		const max_m = (n * (n - 1)) / 2;
		const m = min_m + Math.floor(Math.random() * (max_m - min_m + 1));
		const graph = Generator.generate(n);
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
		const ajax = new XMLHttpRequest();
		ajax.open("POST", "http://162.243.157.230:5000/graph", true);
		ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		ajax.send(JSON.stringify(answer));
	}
}
