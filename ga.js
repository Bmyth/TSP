function GA(TSP_points){
	var populationNumber = 200;
	var population = [];
	var populationV = [];
	var populationK = [];
	var points = TSP_points;
	var pointsNumber = TSP_points.length;
	var crossOverPossibility = 0.4;
	var mutationPossibility = 0.1;
	var crossOverPosition = parseInt(pointsNumber / 2);
	var totalV;
	var normalizeParameter = 500000 * pointsNumber;
	var bestPathIdx;
	var vRecord = [];
	var runTimes = 5000;

	initialPopulation();

	var stepNumber = 0;
	while(stepNumber < runTimes){
		step();
		stepNumber ++;
		if(stepNumber % 800 == 0){
			alert("run " + stepNumber + "times");
			paintPath(points, population[bestPathIdx]);
		}
		if(stepNumber % 400 == 0){
			vRecord.push(populationK[bestPathIdx]);
		}	
	}
	// step();
	// showArray(populationV, ".debugInfo");
	// paintBestRecord(vRecord);

	function initialPopulation(){
		for(var i=0; i<populationNumber; i++){
			var p = [];
			for(var j=0; j<pointsNumber; j++){
				p.push((j + i) % pointsNumber);
			}

			var p1 = parseInt(Math.random() * pointsNumber);
			var p2 = parseInt(Math.random() * pointsNumber);	
				while(p1 == p2){
					p2 = parseInt(Math.random() * pointsNumber);	
				}
				p[p1] = population[i][p2];
				p[p2] = population[i][p1];
				population.push(p);

			population.push(p);
		}
	}

	function step(){
		crossOver();
		mutation();
		naturePick();
		getBestPath();
	}

	function crossOver(){
		for(var i=0; i<populationNumber; i++){
			if(happenIn(crossOverPossibility)){
				var j = parseInt(Math.random() * populationNumber);	
				while(i == j){
					j = parseInt(Math.random() * populationNumber);	
				}

				var i2 = copyArray(population[i]);
				var j2 = copyArray(population[j]);
				for(var m = crossOverPosition; m < pointsNumber; m++){
					for(var n = 0; n <pointsNumber; n++){
						var matched = false;
						for(var o = 0; o < m; o++){
							if(population[j][n] == i2[o]){
								matched = true;
								break;
							}
						}
						if(!matched){
							i2[m] = population[j][n];
							break;
						}
					} 
				}

				for(var m = crossOverPosition; m < pointsNumber; m++){
					for(var n = 0; n <pointsNumber; n++){
						var matched = false;
						for(var o = 0; o < m; o++){
							if(population[i][n] == j2[o]){
								matched = true;
								break;
							}
						}
						if(!matched){
							j2[m] = population[i][n];
							break;
						}
					} 
				}

				population.push(i2);
				population.push(j2);
			}
		}
	}

	function mutation(){
		for(var i=0; i<populationNumber; i++){
			if(happenIn(mutationPossibility)){
				var p = copyArray(population[i]);
				var p1 = parseInt(Math.random() * pointsNumber);
				var p2 = parseInt(Math.random() * pointsNumber);	
				while(p1 == p2){
					p2 = parseInt(Math.random() * pointsNumber);	
				}
				p[p1] = population[i][p2];
				p[p2] = population[i][p1];
				population.push(p);
			}
		}
	}

	function naturePick(){
		evaluatePopulation();
		var newPopulation = [];
		while(newPopulation.length != populationNumber){
			var r = Math.random() * totalV;
			for(var i =0; i<population.length; i++){
				if(populationV[i] >= r){
					newPopulation.push(population[i]);
					break;
				}
			}
		}
		population = newPopulation;	
	}

	function getBestPath(){
		bestPathIdx = 0;
		var v = populationK[0];
		for(var i=0; i<population.length; i++){
			if(populationK[i] > v){
				bestPathIdx = i;
				v = populationK[i];
			}
		}	
	}

	function happenIn(p){
		return Math.random() <= p;
	}

	function evaluatePopulation(){
		totalV = 0;
		populationV = [];
		populationK = [];
		for(var i=0; i<population.length; i++){
			var s = 0;
			for(var j=1; j<pointsNumber; j++){
				s += distance(points[population[i][j]].x, points[population[i][j-1]].x, points[population[i][j]].y, points[population[i][j-1]].y);
			}
			var ds = normalizeParameter/s;
			totalV += ds;
			populationV.push(totalV);
			populationK.push(ds);
		}	
	}
}
