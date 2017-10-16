const plotter = new Plotter();

function plotGraph() {
  plotter.runGraph();
}

window.onload = () => plotter.runAll();
