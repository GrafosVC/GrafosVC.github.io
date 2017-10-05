class Generator {
  static generate(n, m) {
    if (m < n - 1) return null;
    if (2 * m > n * (n - 1)) return null;

    const graph = new Graph(n);
    const edges = new Set();

    for (var u = 0; u < n; u++) {
      for (var v = u + 1; v < n; v++) {
        edges.add(u * n + v);
      }
    }

    const addEdge = (u, v) => {
      edges.delete(u * n + v);
      graph.addEdge(u, v);
      m--;
    };

    // First, generate a Spanning Tree.
    for (var u = 1; u < n; u++) {
      var v = Math.floor(Math.random() * u);
      addEdge(v, u);
    }

    const getRandomEdge = () => {
      const edge = Array.from(edges)[Math.floor(Math.random() * edges.size)];
      return {
        u: Math.floor(edge / n),
        v: edge % n
      };
    };

    while (m) {
      const edge = getRandomEdge();
      addEdge(edge.u, edge.v);
    }

    return graph;
  }
}
