$(function(){
	var svg = d3.select('.container').append('svg'); 

    var points = [];
    var pointsNumber = 48;
    var rangeLength = 600;

    function point(x, y, idx){
    	var x = x;
    	var y = y;
    	var idx = idx;
    	return {
    		x : x,
    		y : y,
    		idx : idx
    	}
    }

    for(var i = 0; i<pointsNumber; i++){
    	points.push(generateNewPoint(i));
    }

    function generateNewPoint(idx){
    	var flag = false;
    	var x;
    	var y;
    	while(!flag){
    		x = parseInt(rangeLength * Math.random());
    		y = parseInt(rangeLength * Math.random());
    		var farEnough = true;
    		for (var i = 0; i < points.length; i++){
    			if(disance(x, points[i].x, y, points[i].y) < 500){
    				farEnough = false;
    			}	
    		}

    		flag = farEnough;
    	}
    	return new point(x, y, idx);
    }

    function disance(x1, x2, y1, y2){
    	return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    }

    svg.selectAll("circle")
       .data(points)
       .enter().append("circle")
       .attr("cx", function(d) { return d.x; })
       .attr("cy", function(d) { return d.y; })
       .attr("r", 5);

   	var ants=[];
   	function ant(){
   		var visitedCity=[];
   		var tour=[];
   		var tourLength;
   		return{
   			visitedCity : visitedCity,
   			tour : tour,
   			tourLength : tourLength
   		}
   	}


})