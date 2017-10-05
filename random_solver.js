class RandomSolver {
  constructor(graph) {
    this.graph = graph;
  }

  solve() {
    const edges = new Set();
    for (var i = 0; i < this.graph.m; i++) {
      const u = this.graph.from[i];
      const v = this.graph.to[i];
      if (u > v) continue;
      edges.add(this.graph.n * u + v);
    }

    const mark = [];
    for (var i = 0; i < this.graph.n; i++) {
      mark[i] = false;
    }

    var ans = 0;
    const getRandomEdge = () => {
      const edge = Array.from(edges)[Math.floor(Math.random() * edges.size)];
      const u = Math.floor(edge / this.graph.n);
      const v = edge % this.graph.n;

      edges.delete(edge);
      if (!mark[u] && !mark[v]) {
        mark[u] = true;
        mark[v] = true;
        ans += 2;
      }
    };

    while (edges.size > 0) {
      getRandomEdge();
    }

    return ans;
  }
}
