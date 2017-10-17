class Plotter {
  constructor() {
    this.server = 'http://162.243.157.230:5000/';
    this.graphData = this.getGraphData();
    this.edgeFunction = [
      N => N - 1,
      N => 2 * N,
      N => 3 * N,
      N => Math.floor(N * N / 5),
      N => Math.floor(N * N / 4)
    ];
  }

  runAll() {
    this.runCurve();
    this.runGraph();
  }

  runCurve() {
    this.plotCurve(this.graphData.graphs);
  }

  runGraph() {
    const nodes = document.getElementById('graph-nodes').value;
    const edges_option = document.querySelector('input[name="graph-edges"]:checked').value;
    const edges = this.edgeFunction[Number(edges_option)](nodes);
    if (this.graphData.graphs[nodes] && this.graphData.graphs[nodes][edges]) {
      const data = this.graphData.graphs[nodes][edges];
      this.plotGraph(data.graph['greedy']);
    } else {
      const container = document.getElementById('graph');
      container.innerText = 'There is no data for these values.';
    }
  }

  plotGraph(graph) {
    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();

    for (var i = Number(graph.n) - 1; i >= 0; i--) {
      nodes.add({
        id: i,
        label: String(i)
      });
    }

    for (var i = graph.edges.length - 1; i >= 0; i--) {
      edges.add({from: graph.edges[i][0], to: graph.edges[i][1]});
    }

    const options = {
        width:  '600px',
        height: '600px'
    };
    const data = {
      nodes: nodes,
      edges: edges
    };

    const container = document.getElementById('graph');
    const graph3d = new vis.Network(container, data, options);
  }

  plotCurve(graphs) {
    this.plotSurface(graphs)
  }

  plotBar(graphs) {
    const data = new vis.DataSet();

    var id = 0;
    for (const N in graphs) {
      for (const M in graphs[N]) {
        data.add({
          id: id++,
          x:  N * 1,
          y:  M * 1,
          z:  graphs[N][M]['cntgreedy'] / graphs[N][M]['cntnone'],
        });
      }
    }

    const options = {
        width:  '600px',
        height: '600px',
        style: 'bar',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: false,
        xLabel: 'Nodes',
        yLabel: 'Edges',
        zLabel: 'Approximation',
    };

    const container = document.getElementById('curve');
    const graph3d = new vis.Graph3d(container, data, options);
  }

  plotSurface(graphs) {
    const data = new vis.DataSet();

    var id = 0;
    for (const N in graphs) {
      const M_list = []
      for (const M in graphs[N]) {
        M_list.push([M * 1, graphs[N][M]['cntgreedy'] / graphs[N][M]['cntnone']]);
      }

      const getMiddle = (a, b, c, d) => {
        return (a * d + b * c) / (c + d);
      };

      var i = 0;
      const MAX_M = (N * (N - 1)) / 4;
      for (var M = N - 1; M <= MAX_M; M++) {
        while (M_list[i][0] < M) i++;
        const value = M_list[i][0] == M ? M_list[i][1] : getMiddle(
            M_list[i - 1][1],
            M_list[i][1],
            M - M_list[i - 1][0],
            M_list[i][0] - M);
        data.add({
          id: id++,
          x:  N * 1,
          y:  M * 1,
          z:  value,
        });
      }
    }

    const options = {
        width:  '600px',
        height: '600px',
        style: 'surface',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: false,
        xLabel: 'Nodes',
        yLabel: 'Edges',
        zLabel: 'Approximation',
    };

    const container = document.getElementById('curve');
    const graph3d = new vis.Graph3d(container, data, options);
  }

  getGraphData() {
    const ajax = new XMLHttpRequest();
    ajax.open('GET', this.server + 'graph', false);
    ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    ajax.send();
    return JSON.parse(ajax.responseText);
  }
}
