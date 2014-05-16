$(function(){
	svg = d3.select('.container').append('svg');
    svg2 = d3.select('.info').append('svg');  

    var points = [];
    var pointsNumber = 24;
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

    paintCircle(points);

    function generateNewPoint(idx){
    	var flag = false;
    	var x;
    	var y;
    	while(!flag){
    		x = parseInt(rangeLength * Math.random());
    		y = parseInt(rangeLength * Math.random());
    		var farEnough = true;
    		for (var i = 0; i < points.length; i++){
    			if(distance(x, points[i].x, y, points[i].y) < 500){
    				farEnough = false;
    			}	
    		}

    		flag = farEnough;
    	}
    	return point(x, y, idx);
    }

    GA(points);
    // var aco = ACO(points);

    // while(aco.isOver){
    // 	aco.go();
    // }
})

var svg, svg2;

function distance(x1, x2, y1, y2){
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}

function generateOrderedArray(l){
    var a = [];
    for(var i = 0; i<l; i++)
        a.push(i)
    return a;
}

function copyArray(a){
    var l = [];
    for(var i=0; i<a.length; i++){
        l.push(a[i]);
    }
    return l;
}

function showArray(a, where){
  var p = $(where);
  p.text("");
  for(var i = 0; i<a.length; i++){
     $("<span></span>").text(parseInt(a[i]) + ",").appendTo(p);
  }
}

function showMatrix(a, where){
  var p = $(where);
  p.text("");
  for(var i = 0; i<a.length; i++){
     var l = a[i];
     var ele = $("<p></p>");
     for(var j=0; j<l.length; j++){
        $("<span></span>").text(a[i][j] + ",").appendTo(ele);
     }
     $(ele).appendTo(p);
  }  
}

function paintCircle(points){
    svg.selectAll("circle")
       .data(points)
       .enter().append("circle")
       .attr("cx", function(d) { return d.x; })
       .attr("cy", function(d) { return d.y; })
       .attr("r", 5);
}

function paintPath(points, path){
    var p = '';
    for(var i =0; i<path.length; i++){
        p += points[path[i]].x + ', ' + points[path[i]].y + ' ';
    }
    svg.select('polygon').remove();
    svg.append('polygon').attr({
        points: p
    }).style({
        fill: 'none',   
        stroke: '#aaa',
        opacity: 1,  
        'stroke-width': 2
    });   
}

function paintBestRecord(r){
    var p = '';
    for(var i =0; i<r.length; i++){
        p += i * 20 + ', ' + r[i] * 10 + ' ';
    }
    svg2.append('polyline').attr({
        points: p
    }).style({
        fill: 'none',   
        stroke: 'blue',
        opacity: 1,  
        'stroke-width': 2
    });   
}
