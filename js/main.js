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
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

     // plot points
     LENGTH.selectAll("points")  
      .data(data) // passed from .then  
      .enter()       
      .append("circle")  
        .attr("cx", (d) => { return (X_SCALE(d.Sepal_Length) + MARGINS.left); }) 
        .attr("cy", (d) => { return (Y_SCALE(d.Petal_Length) + MARGINS.bottom); }) 
        .attr("r", 5)
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
                    .attr("class", "frame"); 

     // plot points
     WIDTH.selectAll("points")  
      .data(data) // passed from .then  
      .enter()       
      .append("circle")  
        .attr("cx", (d) => { return (X_SCALE(d.Sepal_Width) + MARGINS.left); }) 
        .attr("cy", (d) => { return (Y_SCALE(d.Petal_Width) + MARGINS.bottom); }) 
        .attr("r", 5)
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
}); 

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
                        .attr("class", "frame"); 

    // plot our points
    BAR.selectAll("bar")  
        .data(data) // passed from .then  
        .enter()     
        .append("rect")  
            .attr("x", (d) => { return ((X_SCALE2(d.Species)) + MARGINS.left); }) 
            .attr("y", (d) => { return (Y_SCALE2(CountInstances(d, d.Species)) + MARGINS.top); }) 
            .attr("width", X_SCALE2.bandwidth())
            .attr("height", (d) => { return VIS_HEIGHT - Y_SCALE2(CountInstances(d, d.Species)); })
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


function CountInstances(s) {
  d3.csv("data/iris.csv").then((data) => {
  const process = data =>  {
    const counts = data.reduce((acc, { Species }) => {
      acc.s   += Species.toLowerCase() === s;
      //return acc;
      return counts.s;
    }, { s: 0 });
  
  console.log("Total count",counts.s)
  
  Object.entries(counts).forEach(([key,val]) => document.getElementById(key).textContent = val)
}
});
}