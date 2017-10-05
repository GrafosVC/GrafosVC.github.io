while(true){
	graph = new Graph(3);
	graph.addEdge(0, 1);
	graph.addEdge(1, 2);
	graph.addEdge(2, 3);
	answer={}
	opt=new Optimal(graph)
	answer['none']=opt.solve()
	answer['edges']=graph.n
	answer['nodes']=graph.m
	answer['2aprox']=opt.solve()
	answer['greedy']=opt.solve()
	answer['2greedy']=opt.solve()
	answer['graph']=""
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "https://162.243.157.230:5000/graph", true);
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(answer)
}
