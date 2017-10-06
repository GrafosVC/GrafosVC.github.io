class Graph {
  constructor(n) {
    this.n = n;
    this.m = 0;
    this.step = 0;
    this.adj = [];
    this.used = [];
    this.from = [];
    this.to = [];
    this.mark = [];
    this.ant = [];
    for (var i = 0; i < n; i++) {
      this.adj.push(-1);
      this.used.push(false);
    }
  }

  addDirectionalEdge(u, v) {
    this.from[this.m] = u;
    this.to[this.m] = v;
    this.mark[this.m] = 0;
    this.ant[this.m] = this.adj[u];
    this.adj[u] = this.m;
    this.m++;
  }

  addVertex() {
    this.n++;
    this.adj.push(-1);
    this.used.push(false);
  }

  addEdge(u, v) {
    this.addDirectionalEdge(u, v);
    this.addDirectionalEdge(v, u);
  }

  findEdge(u, v) {
    for (var i = 0; i < this.m; i++) {
      if (this.from[i] == u && this.to[i] == v) {
        return i;
      }
    }
    return -1;
  }

  forEach(u, func) {
    for (var i = this.adj[u]; i != -1; i = this.ant[i]) {
      func(i, u, this);
    }
  }

  check() {
    this.step++;
    var ans = 0;
    for (var u = 0; u < this.n; u++) {
      if (this.used[u]) {
        this.forEach(u, (i, u, graph) => {
          if (graph.mark[i] != graph.step) {
            graph.mark[i] = graph.step;
            graph.mark[i^1] = graph.step;
            ans++;
          }
        });
      }
    }
    return 2 * ans == this.m;
  }

  getEdges() {
    const edges = [];
    for (var u = 0; u < this.n; u++) {
      this.forEach(u, (i, u, graph) => {
        edges.push([u, this.to[i]]);
      });
    }
    return edges;
  }

  getRepresentation() {
    const edges = [];
    for (var i = 0; i < this.m; i += 2) {
      edges.push([this.from[i], this.to[i]]);
    }
    return {
      n: this.n,
      edges: edges
    };
  }

  static fromRepresentation(repr) {
    const graph = new Graph(repr.n);
    for (var i = repr.edges.length - 1; i >= 0; i--) {
      graph.addEdge(repr.edges[i][0], repr.edges[i][1]);
    }
    return graph;
  }
}
