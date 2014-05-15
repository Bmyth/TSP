function DecisionRule(k,i,ants,map){
	var c=ants[k].tour[i-1];
	var sum_probability=0.0;
	var selection_probability=[];
	for(var j=0;j<map.neighbours.length;j++){
		if(ants[k].visitedCity[map.neighbours[c][j]]){
			selection_probability[j]=0.0;
		}
		else{
			selection_probability[j]=map.choice_info[c][map.neighbours[c][j]];
			sum_probability+=selection_probability[j];
		}
	}
	if(sum_probability=0.0){
		ChooseBestNext(k,i);
	}else{
	var	r=Math.random()*sum_probability;
	var m=0;
	var p=selection_probability[m];
	}
	while(p<r){
		m++;
		p+=selection_probability[m];
	}
	ants[k].tour[i]=map.neighbours[c][m];
	ants[k].visitedCity[map.neighbours[c][m]]=true;
function ChooseBestNest(k,i){
	var v=0.0;
	for(var j=0;j<map.dist.length;j++){
		if(!ants[k].visitedCity[j]){
		var max;
		if(map.choice_info[c][j]>v){
			v=map.choice_info[c][j];
			 max=j;
		}
	}
}
	ants[k].visitedCity[max]=true;
	ants[k].tour[i]=max;
}
}