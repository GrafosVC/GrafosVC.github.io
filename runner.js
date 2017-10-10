class Runner {
  constructor() {
    this.answer = [];
    this.repetitions = 100;
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

    this.answer.push({
      'nodes':   graph.n,
      'edges':   graph.m / 2,
      'none':    (new OptimalSolver(graph)).solve(),
      '2aprox':  (new RandomSolver(graph)).solve(),
      'greedy':  (new GreedySolver(graph)).solve(),
      '2greedy': (new RandomGreedySolver(graph)).solve(),
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
    const ajax = new XMLHttpRequest();
    ajax.open('GET', this.server + 'graphindex', false);
    ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    ajax.send();
    return JSON.parse(ajax.responseText);
  }

  sendData(data) {
    const ajax = new XMLHttpRequest();
    ajax.open('POST', this.server + 'graph', true);
    ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    ajax.send(JSON.stringify(data));
  }
};
