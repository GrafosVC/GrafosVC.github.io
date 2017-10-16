class Runner {
  constructor() {
    this.answer = [];
    this.repetitions = 1;
    this.minUpdatePeriod = 1000;
    this.server = 'http://162.243.157.230:5000/';
    this.lastUpdate = 0;
  }

  run() {
    while (true) {
      this.generateBatch();
    }
  }

  generateGraph(N, M) {
    const graph = Generator.generate(N, M);
    if (graph == null) return;

	const v2aprox = (new RandomSolver(graph)).solve()
	const vgreedy = (new GreedySolver(graph)).solve()
	const v2greedy = (new RandomGreedySolver(graph)).solve()
	const vbest = Math.min(graph.n, v2aprox, vgreedy, v2greedy)

    this.answer.push({
      'nodes':   graph.n,
      'edges':   graph.m / 2,
      'none':    (new OptimalSolver(graph, vbest)).solve(),
      '2aprox':  v2aprox,
      'greedy':  vgreedy,
      '2greedy': v2greedy,
      'graph':   graph.getRepresentation()
    });
  }

  generateBatch() {
    const graphInfo = this.getNext();
    for (var i = this.repetitions - 1; i >= 0; i--) {
      this.generateGraph(graphInfo.nodes, graphInfo.edges);
      this.update();
    }
  }

  update() {
    const currentTime = (new Date()).getTime();
    if (currentTime - this.lastUpdate < this.minUpdatePeriod) {
      return;
    }
    this.lastUpdate = currentTime;

    if (this.answer.length > 0) {
      this.sendData({graphs: this.answer});
      this.answer = [];
    }
  }

  getNext() {
  	ans={}
  	ans.nodes=200;
  	edges=[400,600,8000,10000];
  	ans.edges=edges[Math.floor(Math.random() * edges.length)];
    return ans;
  }

  sendData(data) {
    const ajax = new XMLHttpRequest();
    ajax.open('POST', this.server + 'graph', true);
    ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    ajax.send(JSON.stringify(data));
  }
};
