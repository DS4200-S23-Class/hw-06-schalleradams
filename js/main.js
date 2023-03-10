// fucntion to select class from species
function ClassChooser(s) {
    if (s == "virginica") {
        return "virginica";
      } else if (s == "versicolor") {
        return "versicolor";
      } else {
        return "setosa";
      } 
}

// constants for plot design
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400; 
const MARGINS = {left: 25, right: 25, top: 25, bottom: 25};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 


// creation function
function build_plots() {

  // reading in the data
  d3.csv("data/iris.csv").then((data) => {

    // creation of the scatter plot for length
    const MaxSLength = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });

    const MaxPLength = d3.max(data, (d) => { return parseInt(d.Petal_Length); });

    const LengthXScale = d3.scaleLinear() 
                      .domain([0, (MaxSLength + 1)]) // padding
                      .range([0, VIS_WIDTH]); 

    const LengthYScale = d3.scaleLinear() 
                      .domain([(MaxPLength + 1), 0]) // padding  
                      .range([0, VIS_HEIGHT]); 

    const LENGTH = d3.select("#length-scatter")
                  .append("svg")
                    .attr("id", "length")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

     // plot points
    const LengthPoints = LENGTH.append('g')
                          .selectAll("circle")
                          .data(data) // passed from .then  
                          .enter()       
                          .append("circle")  
                            .attr("cx", (d) => { return (LengthXScale(d.Sepal_Length) + MARGINS.left); }) 
                            .attr("cy", (d) => { return (LengthYScale(d.Petal_Length) + MARGINS.bottom); }) 
                            .attr("r", 5)
                            .attr("id", (d) => { return d.id})
                            .attr("class", (d) => { return (ClassChooser(d.Species)); }); 

    // Add x axis to vis  
    LENGTH.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(LengthXScale).ticks(4)) 
          .attr("font-size", '10px'); 

    // Add y axis to vis  
    LENGTH.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(LengthYScale).ticks(4)) 
          .attr("font-size", '10px'); 

    // creation of the width scatter plot
    const MaxSWidth = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });

    const MaxPWidth = d3.max(data, (d) => { return parseInt(d.Petal_Width); });

    const WidthXScale = d3.scaleLinear() 
                      .domain([0, (MaxSWidth + 1)]) // padding
                      .range([0, VIS_WIDTH]); 

    const WidthYScale = d3.scaleLinear() 
                      .domain([(MaxPWidth + 1), 0]) // padding  
                      .range([0, VIS_HEIGHT]); 

    const WIDTH = d3.select("#width-scatter")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("id", "width")
                    .attr("class", "frame"); 

    // plot points
    const WidthPoints = WIDTH.append('g')
                          .selectAll("circle")
                          .data(data) // passed from .then  
                          .enter()       
                          .append("circle")  
                            .attr("cx", (d) => { return (WidthXScale(d.Sepal_Width) + MARGINS.left); }) 
                            .attr("cy", (d) => { return (WidthYScale(d.Petal_Width) + MARGINS.bottom); }) 
                            .attr("r", 5)
                            .attr("id", (d) => { return ("W" +d.id); })
                            .attr("class", (d) => { return (ClassChooser(d.Species)); }); 

    // Add x axis to width vis  
    WIDTH.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(WidthXScale).ticks(4)) 
          .attr("font-size", '10px'); 

    // Add y axis to width vis  
    WIDTH.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(WidthYScale).ticks(4)) 
          .attr("font-size", '10px'); 

    // scale for X
    const BarXScale = d3.scaleBand() 
                      .domain(["virginica", "versicolor", "setosa"]) 
                      .range([0, VIS_WIDTH])
                      .paddingInner(0.1)
                      .paddingOuter(0.30); 

    // scale for Y
    const BarYScale = d3.scaleLinear() 
                      .domain([60, 0]) // padding
                      .range([0, VIS_HEIGHT]); 


    const BAR = d3.select("#bar")
                      .append("svg")
                        .attr("height", FRAME_HEIGHT)
                        .attr("width", FRAME_WIDTH)
                        .attr("id", "bar")
                        .attr("class", "frame"); 
    
    // plot frequencies
    BAR.append("rect")  
      .attr("x", ((BarXScale("versicolor")) + MARGINS.left)) 
      .attr("y", (BarYScale(50)) + MARGINS.top)
      .attr("width", BarXScale.bandwidth())
      .attr("height", (VIS_HEIGHT - BarYScale(50)))
      .attr("id", "versicolorbar")
      .attr("class", (ClassChooser("versicolor")))

    BAR.append("rect")  
        .attr("x", ((BarXScale("virginica")) + MARGINS.left))                 
                        .attr("y", (BarYScale(50)) + MARGINS.top)
                        .attr("width", BarXScale.bandwidth())
                        .attr("height", (VIS_HEIGHT - BarYScale(50)))
                        .attr("id", "virginicabar")
                        .attr("class", (ClassChooser("virginica"))); 
    
    BAR.append("rect")  
        .attr("x", ((BarXScale("setosa")) + MARGINS.left))                 
                        .attr("y", (BarYScale(50)) + MARGINS.top)
                        .attr("width", BarXScale.bandwidth())
                        .attr("height", (VIS_HEIGHT - BarYScale(50)))
                        .attr("id", "setosabar")
                        .attr("class", (ClassChooser("setosa"))); 

    const BarVals = BAR;
                      
     // Add an axis to the vis 
    BAR.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(BarXScale))
          .attr("font-size", '10px'); 

    BAR.append("g") 
        .attr("transform", "translate(" + MARGINS.bottom + 
              "," + (MARGINS.left) + ")") 
        .call(d3.axisLeft(BarYScale).ticks(4)) 
          .attr("font-size", '10px'); 

    // adding brushing
    d3.select("#width")
          .call( d3.brush()                    
            .extent( [ [0,0], [(VIS_WIDTH + MARGINS.right), (VIS_HEIGHT + MARGINS.top)] ] )
            .on("start brush", updateChart)
          )

    // Function that is triggered when brushing is performed
    function updateChart(event) {
      extent = event.selection  //get coordinate

      //brush middle graph
      WidthPoints.classed("selected", function(d){ return isBrushed(extent, WidthXScale(d.Sepal_Width), WidthYScale(d.Petal_Width))});

      // link left graph
      
      LengthPoints.classed("selected", function(d){ return isBrushed(extent, WidthXScale(d.Sepal_Width), WidthYScale(d.Petal_Width))});

      // link right graph (does not work)
     
      // initialize list
      brushedPT = WidthPoints.selectAll(".selected");
      let SpeciesList = [];

      // get all selected setosa points and give the the class brushset
      // then if there are elements in that class add setosa to the SpeciesList
      brushedSetosa = brushedPT.selectAll(".setosa");
      brushedSetosa.attr("class", "brushset");
      if ( (".brushset").length > 1) {
        SpeciesList.push("brushset");
      }

      // get all selected virginica points and give the the class brushvir
      // then if there are elements in that class add virginica to the SpeciesList
      brushedVirginica = brushedPT.selectAll(".virginica");
      brushedVirginica.attr("class", "brushvir");
      if ( (".brushvir").length > 1) {
              SpeciesList.push("brushvir");
            }

      // get all selected versicolor points and give the the class brushver
      // then if there are elements in that class add versicolor to the SpeciesList
      brushedVersicolor = brushedPT.selectAll(".versicolor");
      brushedVersicolor.attr("class", "brushver");
      if ( (".brushver").length > 1) {
        SpeciesList.push("brushver");
      } 

      BarVals.selectAll(".virginica").classed('selected', (SpeciesList.includes("brushvir")));
      BarVals.selectAll(".versicolor").classed('selected', (SpeciesList.includes("brushver")));
      BarVals.selectAll(".setosa").classed('selected', (SpeciesList.includes("brushset")));

}

    // A function that return TRUE or FALSE according if a dot is in the selection or not
    function isBrushed(brush_coords, cx, cy) {
      let x = (cx + MARGINS.left);
      let y = (cy + MARGINS.top);
      let x0 = brush_coords[0][0],
          x1 = brush_coords[1][0],
          y0 = brush_coords[0][1],
          y1 = brush_coords[1][1];

      return x0 <= x && x <= x1 && y0 <= y && y <= y1;
    }
  }); 
}

build_plots();