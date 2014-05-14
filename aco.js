function ACO(TSP_points){
   var points = TSP_points;
   var ants = [];
   var map;
   var isOver = true;
   var antsNumber = TSP_points.Length;
   initial();

   showMatrix([[1,2],[1,2],[1,2],[1,2]]);

   function initial(){
      initialAnts();
      initialMap();
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
      var neighbours = [];
      var pl = points.length;

      for(var i = 0; i<pl; i++){
         var d = [];
         for(var j = 0; j <pl; j++){
            if(i != j){
               d.push(disance(points[i].x, points[j].x, points[i].y, points[j].y));   
            }else{
               d.push(600 * 600 * 2);
            }
            
         }
         dist.push(d);
      }

      for(var i = 0; i<pl; i++){
         var l = generateOrderedArray(pl);

         var d=new Aarry()=dist;
         for(j = 0; j<4; j++){
            for(var k = (pl - 1); k>j; k--){
               if(d[i][k] < d[i][k-1]){

                  var x = l[k];
                  l[k] = l[k-1];
                  l[k-1] = x;
                  var y = d[k];
                  d[k] = d[k-1];
                  d[k-1] = y;
               }
            }
         }
         neighbours.push(l);
      }

      showMatrix(dist, ".debugInfo");
      showMatrix(neighbours, ".debugInfo2");

      function generateOrderedArray(l){
         var a = [];
         for(var i = 0; i<l; i++)
            a.push(i)
         return a;
      }

      return{
         dist : dist,
         neighbours : neighbours   
      }
   }

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

