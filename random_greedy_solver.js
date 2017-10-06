class RandomGreedySolver {
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

    const getEdges = u => {
      const edges = [];
      this.graph.forEach(u, (i, u, graph) => {
        if (!mark[graph.to[i]]) {
          edges.push(i);
        }
      });
      return edges;
    }

    const getRandomV = u => {
      const edges = getEdges(u);
      return this.graph.to[edges[Math.floor(Math.random() * edges.length)]];
    };

    const removeVertex = u => {
      mark[u] = true;
    };

    var u;
    var ans = 0;
    while (deg[u = getNextVertex()] > 0) {
      const v = getRandomV(u);
      removeVertex(u);
      removeVertex(v);
      ans += 2;
    }
    return ans;
  }
}
