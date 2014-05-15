function ACO(TSP_points){
   var points = TSP_points;
   var ants = [];
   var map;
   var isOver = true;
   var antsNumber = TSP_points.Length;
   initial();
   constructions();
   showMatrix([[1,2],[1,2],[1,2],[1,2]]);

   function initial(){
      initialAnts();
      initialMap();
      initialStatistics();
   }
   function initialStatistics () {
      // body...
      var  minTourLength=0;
      var minTour=[];
      return{
         minTourLength:minTourLength,
         minTour:minTour
      }
   }
   function initialAnts(){
      for(var i = 0; i< antsNumber; i++){
         var a = ant(i);
         ants.push(a);
      }
   }

   function initialMap(){
      map = mapG(points);

   }

   function ant(i){
      var idx = i;
      var visitedCity = [];
      var tour = [];
      var tourLength = 0;

      for(var i = 0; i < antsNumber; i++){
         visitedCity.push(false);
      }

      return{
         idx : idx,
         visitedCity : visitedCity,
         tour : tour,
         tourLength : tourLength
      }
   }

   function mapG(points){
      var dist = [];
      var one=[];
      var neighbours = [];
      var pl = points.length;
      var pheromone=[];
      var choice_info=[];

      for(var i = 0; i<pl; i++){
         var d = [];
         var done=[];
         var two=[];
         var three=[];
         for(var j = 0; j <pl; j++){
            if(i != j){
               d.push(disance(points[i].x, points[j].x, points[i].y, points[j].y)); 
               done.push(disance(points[i].x, points[j].x, points[i].y, points[j].y));  

            }else{
               d.push(600 * 600 * 2);
               done.push(600 * 600 * 2);
            }
            two.push(pl/(600*Math.sqrt(pl)));
            three.push((1/d[j])*3*two[j])
         }
         
         dist.push(d);
         one.push(done); 
         pheromone.push(two);
         choice_info.push(three);
        // document.write(choice_info[i]+"<br>");
         
      }
      
      for(var i = 0; i<pl; i++){
        var l = generateOrderedArray(pl);

         
        
         for(var j = 0; j<pl-1; j++){
            for(var k = (pl - 1); k>j; k--){
               if(one[i][k] < one[i][k-1]){

                  var x = l[k];
                  l[k] = l[k-1];
                  l[k-1] = x;
                  var y =one[i][k];
                  one[i][k] = one[i][k-1];
               one[i][k-1] = y;
               }
            }
         }
         //document.write(dist[i]+"<br>");
         //document.write(one[i]+"<br>");
         neighbours.push(l);
         

      }//document.write(neighbours+"<br>");

      

      function generateOrderedArray(l){
         var a = [];
         for(var i = 0; i<l; i++)
            a.push(i)
         return a;
      }

      return{
         dist : dist,
         neighbours : neighbours,
         pheromone:pheromone,
         choice_info:choice_info  
      }
   }


   showMatrix(dist, ".debugInfo");
      showMatrix(neighbours, ".debugInfo2");

   function disance(x1, x2, y1, y2){
      return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
   }

   function showArray(a, where){
      var p = $(where);
      p.text("");
      for(var i = 0; i<a.length; i++){
         $("<span></span>").text(a[i] + ",").appendTo(p);
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

   return {
      ants : ants 
   }
}

