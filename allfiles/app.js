// @TODO: YOUR CODE HERE!
// console.log("start here")
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

console.log("svg")

// // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g");

  console.log("chart")

// // The concept of SVG shift to right and to the bottom 
// // Append a group to the SVG area and shift ('translate')

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  console.log("after chart");



// // works

// d3.select(".chartGroup")
//     .append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

var circRadius;
function crGet() {
   if (width <= 530) {
     circRadius = 5;
   }
   else {
     circRadius = 10;
   }
 }
crGet();
// // grab a sample from web
d3.csv("data.csv", function(newsData) {
  // if (err) throw err;
  console.log(newsData)

  //     // Step 2: Create scale functions
  //     // ==============================
      var xLinearScale = d3.scaleLinear()

          .range([0, width]);
      var yLinearScale = d3.scaleLinear()
          .range([height,0]);
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);
      xLinearScale.domain([9, d3.max(newsData, function(data){
          return +data.poverty;
        })]);
        // .range[0, width]);

      yLinearScale.domain([0, d3.max(newsData, function(data){
          return +data.healthcare*1.2;
        })]);

  
  

  //     // Step 6: Initialize tool tip
  //     // ==============================
      var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
          return (`${d.state}<br>poverty: ${d.poverty}<br>healthcare: ${d.healthcare}`);
        });
      chartGroup.call(toolTip);

      

  //     // Step 7: Create tooltip in the chart
  //     // ==============================
      // chartGroup.call(toolTip); chartGroup.call(toolTip);
      var circlesGroup = svg.selectAll("g").data(newsData).enter();
      circlesGroup.append("circle")
        
        .attr("cx", function(data, index) {
          return xLinearScale(data.poverty);
        })  
        .attr("cy", function(data, index) {
         return yLinearScale(data.healthcare);
        })
        .attr("r", circRadius)
        .attr("fill", "blue")
        // style("opacity", .95).
        .attr("stroke", "black")
        .on("click", function(data) {
          toolTip.show(data);
          // toolTip.style("display", null);
      });

      //append text
    circlesGroup.append("text")
      .text(function(d){
        return d.abbr;
      })
      .attr("dx", function(data, index){
        return xLinearScale(data.poverty)
    })
      .attr("dy", function(data){
        return yLinearScale(data.healthcare)+circRadius/2.5;
    })
      .attr("fontsize", circRadius)
      .attr("class", "stateText")
      .on("mouseover", function(data, index) {
        toolTip.show(data, this);
        d3.select(this).style("stroke", "#323232");
      })
      // //onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
        d3.select(this).style("stroke", "#e3e3e3");
      });

 

  
  // call x axis
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

  //call y axis
      chartGroup.append("g")
        .call(leftAxis);
  

  //     // Create axes labels
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("% of People in healthcare");

        // Append x-axis labels
      

      chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Poverty vs. Health");
  });
    

    

// //sets the html in the div to an image tag with the link
  