class Plotter {
  constructor() {
    this.server = 'http://162.243.157.230:5000/';
  }

  run() {
    const graphData = this.getGraphData();
    this.plot(graphData.graphs);
  }

  plot(graphs) {
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

    var MAX_MAX_M = 0;
    for (const N in graphs) {
      const MAX_M = (N * (N - 1)) / 2;
      MAX_MAX_M = Math.max(MAX_MAX_M, MAX_M);
    }

    var id = 0;
    for (const N in graphs) {
      const MAX_M = (N * (N - 1)) / 2;
      const M_list = []
      M_list.push([0, 1]);
      M_list.push([N - 1, 1]);
      for (const M in graphs[N]) {
        M_list.push([M * 1, graphs[N][M]['cntgreedy'] / graphs[N][M]['cntnone']]);
      }
      M_list.push([MAX_M, 1]);
      M_list.push([MAX_MAX_M, 1]);

      const getMiddle = (a, b, c, d) => {
        return (a * d + b * c) / (c + d);
      };

      var i = 0;
      for (var M = 0; M <= MAX_MAX_M; M++) {
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
