// make an extra colour scale function - 0 to 255
// - need to start this at 0.2 or something
const colorScale = (barHeight, Maxheight) => Maxheight / barHeight;

// year chart
// - a bar chart
const yearChart = data => {
  const yearArr = [];
  // filter out Nan, just years in 2000s
  Object.keys(yearCount(data)).map(i => {
    if (i.startsWith("2")) yearArr.push([i, yearCount(data)[i]]);
  });
  const w = 950;
  const h = 475;
  const padding = 20;

  // set the scales of the bars
  // - take range of results and padding into account
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(yearArr, d => d[0]), d3.max(yearArr, d => d[0])])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(yearArr, d => d[1]), d3.max(yearArr, d => d[1])])
    .range([h - padding, padding]);

  // create svg canvas
  const svg = d3
    .select("#year")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // add bars
  svg
    .selectAll("rect")
    .data(yearArr)
    .enter()
    .append("rect")
    // position
    .attr("x", (d, i) => xScale(d[0]) - i * padding) // space the bars out
    .attr("y", (d, i) => yScale(d[1]))
    // width
    .attr("width", (d, i) => w / yearArr.length - padding) // w / yearArr.length * i
    .attr("height", (d, i) => yScale(h - d[1]))
    // fill
    // - make bars more opaque if taller
    .attr("fill", (d, i) => `rgba(154, 215, 163, ${colorScale(h, yScale(h - d[1]))})`);

  // - - - - - -
  // add labels
  svg
    .selectAll("text")
    .data(yearArr)
    .enter()
    .append("text")
    // add text
    .text(d => `${d[0]}, \n${d[1]} climbs`)
    // position
    .attr("x", (d, i) => xScale(d[0]) - i * padding)
    .attr("y", (d, i) => yScale(d[1]) - 5);
};
