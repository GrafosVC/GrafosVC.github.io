class Plotter {
  constructor() {
    this.server = 'http://162.243.157.230:5000/';
  }

  run() {
    const graphData = this.getGraphData();
    this.plot(graphData.graphs);
  }

  plot(graphs) {
    const data = new vis.DataSet();

    var id = 0;
    for (const N in graphs) {
      for (const M in graphs[N]) {
        console.log(N + ", " + M + ", " + graphs[N][M]['mxm2aprox'])
        data.add({
          id: id++,
          x:  N * 5,
          y:  M * 1,
          z:  graphs[N][M]['mxm2aprox'],
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
        keepAspectRatio: true,
        verticalRatio: 1,
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
