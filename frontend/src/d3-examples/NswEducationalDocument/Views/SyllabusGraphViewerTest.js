import React, { Component } from "react";
import * as d3 from "d3";
import Split from "react-split";
import SplitterLayout from "react-splitter-layout";
import { Link, Button } from '@material-ui/core';
import "react-splitter-layout/lib/index.css";

import icons from "../datasets/ga_images_map.json";
var backStack = []
var b = {h: 25, s: 6, t: 10}
var char_space = 8
var len = []
var bcnodes = []
var nodelen = []

var ndata = [
  ["Early Stage 1", ["Objective A", "Objective B", "Objective C", "Objective D", "Objective E"]], 
  ["Stage 1", ["Objective A", "Objective B", "Objective C", "Objective D", "Objective E"]], 
  ["Stage 2", ["Objective A", "Objective B", "Objective C", "Objective D", "Objective E"]], 
  ["Stage 3", ["Objective A", "Objective B", "Objective C", "Objective D", "Objective E"]], 
  ["Stage 4", ["Objective A", "Objective B", "Objective C", "Objective D", "Objective E"]], 
  ["Stage 5", ["Objective A", "Objective B", "Objective C", "Objective D", "Objective E"]], 
  ["Text Selections", ["Objective A", "Objective B", "Objective C", "Objective D", "Objective E"]] 
];

const XP = 90

export default class SyllabusGraphViewerTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      odata: ndata,
      nodedata: null,
      filterData: ndata
    };
  }

  componentDidMount() {
    this.refreshNodes(null)
  }

  refreshNodes(d) {
    if(ndata === undefined || ndata === null || ndata.length < 1 || !ndata.forEach) {
      return
    }
    
    const { width, height } = this.props;

    var _this = this
  
    var outer = d3.map();
    var inner = [];
    var links = [];
    
    var outerId = [0];

    ndata.forEach(function(d) {
      if (d == null)
        return;
      
      i = { id: 'i' + inner.length, name: d[0], related_links: [] };
      i.related_nodes = [i.id];
      inner.push(i);
      
      if (!Array.isArray(d[1]))
        d[1] = [d[1]];
      
      d[1].forEach(function(d1) {
        var o = outer.get(d1);
        
        if (o == null) {
          o = { name: d1,	id: 'o' + outerId[0], related_links: [] };
          o.related_nodes = [o.id];
          outerId[0] = outerId[0] + 1;	
          
          outer.set(d1, o);
        }
        
        var l = { id: 'l-' + i.id + '-' + o.id, inner: i, outer: o }
        links.push(l);
        
        i.related_nodes.push(o.id);
        i.related_links.push(l.id);
        o.related_nodes.push(i.id);
        o.related_links.push(l.id);
      });
    });
    
    ndata = {
      inner: inner,
      outer: outer.values(),
      links: links
    }
    
    outer = ndata.outer;
    ndata.outer = Array(outer.length);
    
    var i1 = 0;
    var i2 = outer.length - 1;
    
    for (var i = 0; i < ndata.outer.length; ++i) {
      if (i % 2 == 1)
        ndata.outer[i2--] = outer[i];
      else
        ndata.outer[i1++] = outer[i];
    }
    
    console.log(ndata.outer.reduce(function(a,b) { return a + b.related_links.length; }, 0) / ndata.outer.length);
    
    var colors = ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"]
    var color = d3.scaleLinear()
        .domain([0, 8])
        .range([colors.length-1, 0])
        .clamp(true);
    
    var diameter = Math.min(width, height);
    var idiameter = Math.min(width, height) / 2;

    var rect_width = 120;
    var rect_height = 18;
    
    var link_width = "1px"; 
    
    var il = ndata.inner.length;
    var ol = ndata.outer.length;
    var PI = Math.PI

    var len = 160
    var degree = 2 * PI / il

    ndata.inner = ndata.inner.map(function(d, i) { 
      d.x = Math.floor(len * Math.cos(i * degree))
      d.y = Math.floor(-len * Math.sin(i * degree))

      return d;
    });

    var mid = (ndata.outer.length/2.0)
    var outer_x = d3.scaleLinear()
        .domain([0, mid, mid, ndata.outer.length])
        .range([50, 150, 220, 320]);
    
    var outer_y = d3.scaleLinear()
        .domain([0, ndata.outer.length])
        .range([0, diameter / 2 - 120]);
    
    ndata.outer = ndata.outer.map(function(d, i) { 
        d.x = outer_x(i);
        d.y = diameter/3 + 40;
        return d;
    });
    
    console.log("Data Inner:")
    console.log(ndata.inner)
    console.log("Data Outer:")
    console.log(ndata.outer)
    
    function get_color(name) {
        var c = Math.floor(Math.random() * 8);
        if (isNaN(c))
            return '#dddddd';
        
        return colors[c];
    }
    
    function projectX(x) {
        return ((x - XP) / 180 * Math.PI) - (Math.PI/2);
    }
    
    function link(d) {
      d.source = {}
      d.source.x = d.outer.y * Math.cos(projectX(d.outer.x))
      d.source.y = -d.outer.y * Math.sin(projectX(d.outer.x))

      d.target = {}
      d.target.x = d.inner.y + rect_height/2 - 8
      d.target.y = d.outer.x > 180 ? d.inner.x - 4 : d.inner.x + 4

      return "M" + d.source.y + "," + d.source.x
        + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
        + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
        + " " + d.target.y + "," + d.target.x;
    }
    
    var svg = d3
        .select(this.refs.mountPointTest)
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
        
    var link = svg
        .append('g')
        .attr('class', 'links')
        .selectAll(".link")
        .data(ndata.links)
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('id', function(d) { return d.id })
        .attr("d", link)
        .attr('stroke', function(d) { return get_color(d.inner.name); })
        .attr('stroke-width', link_width)
        .style("stroke-opacity", 0.2)
    
    var onode = svg
        .append('g')
        .selectAll(".outer_node")
        .data(ndata.outer)
        .enter().append("g")
        .attr("class", "outer_node")
        .attr("transform", function(d) { return "rotate(" + (d.x - XP) + ")translate(" + d.y + ")"; })
      
    onode.append("circle")
        .attr('id', function(d) { return d.id })
        .attr("r", 6)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);
      
    onode.append("text")
        .attr('id', function(d) { return d.id + '-txt'; })
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
        .text(function(d) { return d.name; });
      
    var center = svg
        .append('g')

    center
        .append("circle")
        .attr('r', len / 2)
        .attr("class", "inner_center")
        .style("stroke-opacity", 0.6)

    center.append("foreignObject")
        .attr('id', 'center_obj')
        .attr("x", -60)
        .attr('y', -24)
        .attr("width", 120)
        .attr("height", 48)
        .append("xhtml:div")
        .attr('id', 'center_text')
        .style('font', '18px sans-serif')
        .style('color', '#fff')
        .style('text-align', 'center')
        .html("NSW Syllabus English K-10")
        
    svg.append("circle")
        .attr('r', len)
        .style("stroke-dasharray", ("5, 5"))
        .style("stroke-opacity", 0.6)
        .attr("stroke", '#a02c2c')
        .attr('fill', 'none');

    svg.append("circle")
        .attr('r', len + 134)
        .style("stroke-dasharray", ("5, 5"))
        .style("stroke-opacity", 0.6)
        .attr("stroke", '#a02c2c')
        .attr('fill', 'none');

    var inode = svg
        .append('g')
        .selectAll(".inner_node")
        .data(ndata.inner)
        .enter().append("g")
        .attr("class", "inner_node")
        .attr("transform", function(d, i) { return "translate(" + d.x + "," + d.y + ")"})
      
    inode.append('circle')
        .attr('id', function(d) { return d.id })
        .attr("r", 10)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);
        
    inode.append("foreignObject")
      .attr("x", d => d.x > 0 ? 12 : -92)
      .attr('y', function(d) { 
        return d.name.length > 24 ? -16 : -8
      })
      .attr("width", 80)
      .attr("height", function(d) { 
        return d.name.length > 12 ? 48 : 16 
      })
      .append("xhtml:div")
      .style('font', '12px sans-serif')
      .style('text-align', d => d.x < 0 ? 'right' : null)
      .style('color', '#444')
      .html(d => d.name)
  
    function mouseover(d) {
        d3
            .selectAll('.links .link')
            .sort(function(a, b){ return d.related_links.indexOf(a.id); });	
      
        for (var i = 0; i < d.related_nodes.length; i++) {
            d3.select('#' + d.related_nodes[i]).classed('highlight', true);
            d3.select('#' + d.related_nodes[i] + '-txt').attr("font-weight", 'bold')
        }
        
        for (var i = 0; i < d.related_links.length; i++) {
          d3.select('#' + d.related_links[i]).attr('stroke-width', '4px')
          d3.select('#' + d.related_links[i]).style("stroke-opacity", 0.8)
        }
    }
    
    function mouseout(d) {   	
        for (var i = 0; i < d.related_nodes.length; i++) {
            d3.select('#' + d.related_nodes[i]).classed('highlight', false);
            d3.select('#' + d.related_nodes[i] + '-txt').attr("font-weight", 'normal')
        }
        
        for (var i = 0; i < d.related_links.length; i++) {
          d3.select('#' + d.related_links[i]).attr('stroke-width', link_width);
          d3.select('#' + d.related_links[i]).style("stroke-opacity", 0.2)
        }
    }
  }

  render() {
    const { width, height } = this.props;
    const style = {
      width,
      height,
      margin: "10px auto",
      border: "none"
    };

    return (
      <Split 
        sizes={[50, 50]}
        direction="horizontal"
        cursor="col-resize"
        className="split-flex"
      >
        <div className="graph-pane">
          <div style={style} ref="mountPointTest" />
        </div>
        <div className="details-pane" style={{backgroundColor: '#fff', height: '100%'}}>
        </div>
      </Split>
    ) 
  }
}
