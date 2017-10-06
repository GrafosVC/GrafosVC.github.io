while(true){
	graph = new Graph(3);
	graph.addEdge(0, 1);
	graph.addEdge(1, 2);
	graph.addEdge(2, 3);
	answer={}
	opt=new OptimalSolver(graph)
	answer['none']=opt.solve()
	answer['edges']=graph.n
	answer['nodes']=graph.m
	answer['2aprox']=opt.solve()
	answer['greedy']=opt.solve()
	answer['2greedy']=opt.solve()
	answer['graph']=""
	Jquery.post("http://162.243.157.230:5000/graph", answer);
	break
}
