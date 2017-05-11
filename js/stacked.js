 
var margin={top:40, bottom:100, left:150, right:90},
    width=1000-margin.left-margin.right,
    height=600-margin.top-margin.bottom;

  var horizontal=d3.scale.ordinal().rangeRoundBands([0,width],0.12),
    vertical=d3.scale.linear().rangeRound([height,0]);

  var color = d3.scale.ordinal().range(["#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var xAxis=d3.svg.axis()
    .scale(horizontal)
    .orient("bottom");

  var yAxis=d3.svg.axis()
    .scale(vertical)
    .orient("left");

  var svg=d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");

  d3.json("../output/plotpower.json",function(err,data){
  data.forEach(function(d){
    d.Country=d.Country;
    d.power2010=d.power2010;
    d.power2011=d.power2011;
  d.power2012=d.power2012;
  d.power2013=d.power2013;
  });
  var xData=["power2010","power2011","power2012","power2013"];
  var dataIntermediate = xData.map(function (c) {
        return data.map(function (d) {
            return {x: d.Country, y: d[c]};
        });
    });
  var dataStackLayout = d3.layout.stack()(dataIntermediate);

  horizontal.domain(dataStackLayout[0].map(function (d) {
        return d.x;
    }));
  vertical.domain([0,
        d3.max(dataStackLayout[dataStackLayout.length - 1],
                  function (d) { return d.y0 + d.y;})
      ])
      .nice();
  var layer = svg.selectAll(".stack")
          .data(dataStackLayout)
          .enter().append("g")
          .attr("class", "stack")
          .style("fill", function (d, i) {
                return color(i);
    });

  layer.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")

        .attr("x", function (d) {
            return horizontal(d.x);
          })
          .attr("y", function (d) {
              return vertical(d.y + d.y0);
          })
          .attr("height", function (d) {
              return vertical(d.y0) - vertical(d.y + d.y0);
        })
      .attr("width", horizontal.rangeBand());

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(-60)" )
               .style("text-anchor", "end")


     

  svg.append("g")
    .attr("class", "axis")
    .call(yAxis)
    .append("text")
       .attr("transform", "rotate(-90)")
       .attr("dy","1em")
       .style("text-anchor", "end")
       .style("font-size","12px")
       .style("font-weight","bold")
       .style("color","red")
  
       var legend = svg.selectAll(".legend")
         .data(color.domain().slice())
       .enter().append("g")
         .attr("class", "legend")
         .attr("transform", function(d, i) { return "translate(0," + i * 20 +
  ")"; });


     legend.append("rect")
         .attr("x", width - 100)
         .attr("width", 18)
         .attr("height", 18)
         .style("fill", color);

     legend.append("text")
         .attr("x", width - 114)
         .attr("y", 9)
         .attr("dy", ".35em")
         .style("text-anchor", "end")
         .style("fill","green")
         .text(function(d,i) { return xData[i]; });

  });
