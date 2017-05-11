var margin = {top: 20, right: 10, bottom: 150, left:100},
    width = 1500 - margin.right - margin.left,
    height = 600 - margin.top - margin.bottom;


var svg = d3.select("body")
    .append("svg")
      .attr ({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
      })
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");



var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");


d3.json("../output/aggregration.json", function(error,data) {
  if(error) console.log("Error: data not loaded!");

  
  data.forEach(function(d) {
    d.continent = d.continent;
   d.population = +parseInt(d.population); 
          // try removing the + and see what the console prints
    console.log(d.population);   // use console.log to confirm
  });


  // Specify the domains of the x and y scales
  xScale.domain(data.map(function(d) { return d.continent; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.population; } ) ]);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(1000)
    .delay( function(d,i) { return i * 200; })
    // attributes can be also combined under one .attr
    .attr({
      "x": function(d) { return xScale(d.continent); },
      "y": function(d) { return yScale(d.population); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.population); }
    })
    .style("fill", function(d,i) { return 'rgb(20, 20, ' + ((i * 30) + 100) + ')'});


        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d.population;
            })
            .attr({
                "x": function(d){ return xScale(d.continent) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.population)+ 12; },
                "font-family": 'sans-serif',
                "font-size": '13px',
                "font-weight": 'bold',
                "fill": 'white',
                "text-anchor": 'middle'
                //"transform":'rotate(-45)'
            });

    // Draw xAxis and position the label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "10px");     
    

    // Draw yAxis and postion the label
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-5em")
        .style("text-anchor", "middle")
        .text("Population in Millions");
});