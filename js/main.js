function ClassChooser(s) {
    if (s == "virginica") {
        return "virginica";
      } else if (s == "versicolor") {
        return "versicolor";
      } else {
        return "setosa";
      } 
}

const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400; 
const MARGINS = {left: 25, right: 25, top: 25, bottom: 25};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 


// read data and create plot for length
function build_scatters() {

  d3.csv("data/iris.csv").then((data) => {

    const MAX_X = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });

    const MAX_Y = d3.max(data, (d) => { return parseInt(d.Petal_Length); });

    const X_SCALE = d3.scaleLinear() 
                      .domain([0, (MAX_X + 1)]) // padding
                      .range([0, VIS_WIDTH]); 

    const Y_SCALE = d3.scaleLinear() 
                      .domain([(MAX_Y + 1), 0]) // padding  
                      .range([0, VIS_HEIGHT]); 

    const LENGTH = d3.select("#length-scatter")
                  .append("svg")
                    .attr("id", "length")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

     // plot points
    var points = LENGTH.append('g')
                          .selectAll("circle")
                          .data(data) // passed from .then  
                          .enter()       
                          .append("circle")  
                            .attr("cx", (d) => { return (X_SCALE(d.Sepal_Length) + MARGINS.left); }) 
                            .attr("cy", (d) => { return (Y_SCALE(d.Petal_Length) + MARGINS.bottom); }) 
                            .attr("r", 5)
                            .attr("id", (d) => { return d.id})
                            .attr("class", (d) => { return (ClassChooser(d.Species)); }); 

    // Add x axis to vis  
    LENGTH.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE).ticks(4)) 
          .attr("font-size", '10px'); 

    // Add y axis to vis  
    LENGTH.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(Y_SCALE).ticks(4)) 
          .attr("font-size", '10px'); 

}); 

// read data and create plot for width
  d3.csv("data/iris.csv").then((data) => {

    const MAX_X = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });

    const MAX_Y = d3.max(data, (d) => { return parseInt(d.Petal_Width); });

    const X_SCALE = d3.scaleLinear() 
                      .domain([0, (MAX_X + 1)]) // padding
                      .range([0, VIS_WIDTH]); 

    const Y_SCALE = d3.scaleLinear() 
                      .domain([(MAX_Y + 1), 0]) // padding  
                      .range([0, VIS_HEIGHT]); 

    const WIDTH = d3.select("#width-scatter")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("id", "width")
                    .attr("class", "frame"); 

    // plot points
    var wpoints = WIDTH.append('g')
                          .selectAll("circle")
                          .data(data) // passed from .then  
                          .enter()       
                          .append("circle")  
                            .attr("cx", (d) => { return (X_SCALE(d.Sepal_Width) + MARGINS.left); }) 
                            .attr("cy", (d) => { return (Y_SCALE(d.Petal_Width) + MARGINS.bottom); }) 
                            .attr("r", 5)
                            .attr("id", (d) => { return ("W" +d.id); })
                            .attr("class", (d) => { return (ClassChooser(d.Species)); }); 

    // Add x axis to vis  
    WIDTH.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE).ticks(4)) 
          .attr("font-size", '10px'); 

    // Add y axis to vis  
    WIDTH.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(Y_SCALE).ticks(4)) 
          .attr("font-size", '10px'); 

    
    d3.select("#width")
          .call( d3.brush()                     // Add the brush feature using the d3.brush function
            .extent( [ [0,0], [(VIS_WIDTH + MARGINS.right), (VIS_HEIGHT + MARGINS.top)] ] )       // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            .on("start brush", updateChart)
          )


    // Function that is triggered when brushing is performed
    function updateChart(event) {
      extent = event.selection  //get coordinate
      wpoints.classed("selected", function(d){ return isBrushed(extent, X_SCALE(d.Sepal_Width), Y_SCALE(d.Petal_Width) ) } )
      linkChart
    }

    // A function that return TRUE or FALSE according if a dot is in the selection or not
    function isBrushed(brush_coords, cx, cy) {
      let x = (cx + MARGINS.left);
      let y = (cy + MARGINS.top);
      var x0 = brush_coords[0][0],
          x1 = brush_coords[1][0],
          y0 = brush_coords[0][1],
          y1 = brush_coords[1][1];
        return x0 <= x && x <= x1 && y0 <= y && y <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
    }
  }); 
}


// somehow do linking here maybe??
function linkChart() {
  d3.csv("data/iris.csv").then((data) => {
    points.classed("selected", function(d){ return isSelected(d.id) } )
    });
}

// return true if the point on the length scatter is sleected
function isSelected(id) {
  let WidthID = "W" + id
  let LPoint = document.getElementById(WidthID)

  return LPoint.classList.contains("selected");
}


build_scatters();

// read data and create  bar chart
d3.csv("data/iris.csv").then((data) => {

    // scale for X
    const X_SCALE2 = d3.scaleBand() 
                      .domain(["virginica", "versicolor", "setosa"]) 
                      .range([0, VIS_WIDTH])
                      .paddingInner(0.1)
                      .paddingOuter(0.30); 

    // scale for Y
    const Y_SCALE2 = d3.scaleLinear() 
                      .domain([60, 0]) // padding
                      .range([0, VIS_HEIGHT]); 


    const BAR = d3.select("#bar")
                      .append("svg")
                        .attr("height", FRAME_HEIGHT)
                        .attr("width", FRAME_WIDTH)
                        .attr("id", "bar")
                        .attr("class", "frame"); 

    // plot our points
    BAR.selectAll("bar")  
        .data(data) // passed from .then  
        .enter()     
        .append("rect")  
            .attr("x", (d) => { return ((X_SCALE2(d.Species)) + MARGINS.left); }) 
            .attr("y", (Y_SCALE2(50)) + MARGINS.top)
            .attr("width", X_SCALE2.bandwidth())
            .attr("height", (VIS_HEIGHT - Y_SCALE2(50)))
            .attr("class", (d) => { return (ClassChooser(d.Species)); }); 

     // Add an axis to the vis 
    BAR.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE2))
          .attr("font-size", '10px'); 

    BAR.append("g") 
        .attr("transform", "translate(" + MARGINS.bottom + 
              "," + (MARGINS.left) + ")") 
        .call(d3.axisLeft(Y_SCALE2).ticks(4)) 
          .attr("font-size", '10px'); 
});
