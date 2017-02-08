/*******************************************************************************
 * Copyright 2017 IBM Corp.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 ******************************************************************************/

// Bar chart for top 5 URLs by average request time

var data = [];

var httpTop5_barHeight = tallerGraphHeight / 5;

var httpDiv3CanvasWidth = $("#httpDiv3").width();
var httpDiv3GraphWidth = httpDiv3CanvasWidth - margin.left - margin.right;

var httpTop5_xScale = d3.scale.linear().range([0, httpDiv3GraphWidth]);


var httpTop5Chart = d3.select("#httpDiv3")
    .append("svg")
    .attr("width", httpDiv3CanvasWidth)
    .attr("height", canvasHeight)
    .attr("class", "httpTop5Chart")
    .append("g")
    .attr("transform", 
        "translate(" + margin.left + "," + margin.shortTop + ")");

// Add the title
httpTop5Chart.append("text")
    .attr("x", -20)
    .attr("y", 0 - (margin.shortTop * 0.5))
    .attr("text-anchor", "left")
    .style("font-size", "18px")
    .text("Average Response Times (top 5)");

function convertURL(url) {
    if (url.toString().startsWith("http://" + myurl)) {
        return url.toString().substring(myurl.length + 7)
    }
}

function updateChart() {

    httpTop5_xScale.domain([0, d3.max(data, function(d) {
        return d.averageResponseTime;
    })])

    var bars = d3.select(".httpTop5Chart").selectAll(".bar").remove();

    var bar = d3.select(".httpTop5Chart").selectAll(".bar")
        .data(data)
        .enter().append("g").attr("class", "bar")
        .attr("transform", function(d, i) { 
            return "translate(50," + (margin.shortTop + i * httpTop5_barHeight) + ")";
        });

    // Background
    bar.append("rect")
        .attr("width", httpDiv3GraphWidth)
        .attr("height", httpTop5_barHeight - 4)
        .style("fill", "#9fa7a7");

    bar.append("rect")
        .attr("width", function(d) {
            return httpTop5_xScale(d.averageResponseTime);
        })
        .attr("height", httpTop5_barHeight - 4);

    bar.append("text")
        .attr("x", 2)
        .attr("y", httpTop5_barHeight / 2)
        .attr("dy", ".35em")
        .attr("fill", "white")
        .text(function(d) {            
            return convertURL(d.url)
        });

    bar.append("text")
        .attr("x", httpDiv3GraphWidth - 2)
        .attr("y", httpTop5_barHeight / 2)
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .attr("dy", ".35em")
        .text(function(d) {
            return d3.format(",.2f")(d.averageResponseTime) + "ms";
        });
    
    // Tooltip
    bar.append("svg:title").text(function(d) {return d.url;});
}

updateChart();

function updateHttpAverages(workingData) {
    data = workingData.sort(function(a, b) {
        if (a.averageResponseTime > b.averageResponseTime) {
            return -1;
        }
        if (a.averageResponseTime < b.averageResponseTime) {
            return 1;
        }
        // a must be equal to b
        return 0;
    });
    if (data.length > 5) {
        data = data.slice(0, 5);
    }
    updateChart();
}

function updateURLData() {
	var workingData = []
	for (urlValue in httpAverages) {
		workingData.push({url:urlValue, averageResponseTime:httpAverages[urlValue][0]})
	}    
        updateHttpAverages(workingData);
}

function resizeHttpTop5Chart() {
    httpDiv3CanvasWidth = $("#httpDiv3").width();
    httpDiv3GraphWidth = httpDiv3CanvasWidth - margin.left - margin.right;
    httpTop5_xScale = d3.scale.linear().range([0, httpDiv3GraphWidth]);
    var chart = d3.select(".httpTop5Chart")
    chart.attr("width", httpDiv3CanvasWidth);
    updateChart();
}


setInterval(updateURLData, 2000);
