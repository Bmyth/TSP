function ConstructSolutions(ants , mapG){
	
	 var step=0;
	
	 for(var k=0;k<ants.length;k++){
	 	var r=parseInt(Math.random()*mapG.dist.length);
	 	ants[k].tour[step]=r;
	 	ants[k].visitedCity[r]=true;
	 	//document.write(k+"<br>"+r+"<br>");
	 	}
	 while(step<mapG.dist.length){
	 	step++;
	 	for(var k=0;k<ants.length;k++){
	 		DecisionRule(k,step,ants,mapG);
	 	}
	 }
	 for(var k=0;k<ants.length;k++){
	 	ants[k].tour[mapG.dist.length]=ants[k].tour[0];
	 	for(var i=0;i<ants[k].tour.length-1;i++){
	 		ants[k].tourLength+=mapG.dist[ants[k].tour[i]][ants[k].tour[i+1]];
	 	}
	 	//document.write(i+" "+ants[i].tourLength+" ");
	 }

	 // for(var i=0;i<ants.length;i++){
	 	
	 // 	//document.write(i+" "+ants[i].tourLength+"<br>");

	 // }
	 return ;
}	