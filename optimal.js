class Optimal {
  constructor(graph) {
    this.graph = graph;
    this.best = graph.n;
  }

  solve() {
    this.run(0, 0);
    return this.best;
  }

  run(i, cost) {
    if (i == this.graph.n) {
      if (this.graph.check()) {
        this.best = Math.min(this.best, cost);
      }
    } else {
      if (this.best > cost) {
        this.run(i + 1, cost);
      }
      if (this.best > cost + 1) {
        this.graph.used[i] = true;
        this.run(i + 1, cost + 1);
        this.graph.used[i] = false;
      }
    }
  }
};
