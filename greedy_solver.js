class GreedySolver {
  constructor(graph) {
    this.graph = graph;
  }

  solve() {
    const deg = [];
    const mark = [];

    for (var u = 0; u < this.graph.n; u++) {
      mark[u] = false;
    }

    const getDeg = u => {
      deg[u] = 0;
      if (!mark[u]) {
        this.graph.forEach(u, (i, u, graph) => {
          if (!mark[graph.to[i]]) {
            deg[u]++;
          }
        });
      }
    };

    const getNextVertex = () => {
      var best = 0;
      for (var u = 0; u < this.graph.n; u++) {
        getDeg(u);
        if (deg[best] < deg[u]) {
          best = u;
        }
      }
      return best;
    };

    const removeVertex = u => {
      mark[u] = true;
    };

    var u;
    var ans = 0;
    while (deg[u = getNextVertex()] > 0) {
      removeVertex(u);
      ans++;
    }
    return ans;
  }
}
