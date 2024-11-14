import React, { Component } from "react";
import * as d3 from "d3";
import SplitterLayout from "react-splitter-layout";
import { Link, Button } from '@material-ui/core';
import "react-splitter-layout/lib/index.css";
import icons from "../datasets/ga_images_map.json";
import data from "../datasets/nllpv3.01.json";
import contents from "../datasets/nllpv3.01.content.json";
import {Tabs, Tab} from 'react-bootstrap';

var backStack = []
var b = {h: 25, s: 6, t: 10}
var char_space = 8
var len = []
var bcnodes = []
var nodelen = []

export default class TwoLevelsHierachyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      odata: data,
      nodedata: null,
      filterData: data
    };

    this.refreshNodes = this.refreshNodes.bind(this)
    this.getNewData = this.getNewData.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectClick = this.handleSelectClick.bind(this)
    this.handleOriginalClick = this.handleOriginalClick.bind(this)
    this.processKeyword = this.processKeyword.bind(this)
  }

  componentDidMount() {
    this.refreshNodes(null)
  }

  getNewData(d) {
    function getDescriptionByName(name) {
      var des = []
      if(contents.children !== undefined) {
        contents.children.forEach(
          ch1 => {
            ch1.children.forEach(
              ch2 => {
                ch2.children.forEach(
                  ch3 => {
                    if(ch3.name.indexOf(name) >= 0) {
                      des = ch3.description
                    }
                  }
                )
              }
            )
          }
        )
      }

      return des
    }

    var odata = this.state.odata
  
    backStack.push({d: d, odata: odata})

    if(d !== null && odata !== null) {
      var tdata = odata
      
      tdata.children.forEach(
        td => {
          if(td.name === d.parent.data.name) {
            td.children.forEach(
              ttd => {
                if(ttd.name === d.data.name) {
                  odata = ttd
                }
              }
            )
          } else if(td.name === d.data.name) {
            odata = td
          }
        }
      )
    }

    var dt = {}
    dt.name = odata.name
    dt.id = odata.id
    dt.children = []
    if(odata.children && odata.children.length > 0) {
      odata.children.forEach(
        tdt => {
          var dt1 = {}
          dt1.name = tdt.name
          dt1.id = tdt.id
          dt1.children = []
          if(tdt.children && tdt.children.length > 0) {
            tdt.children.forEach(
              ddt => {
              var dt2 = {}
              dt2.name = ddt.name
              dt2.id = ddt.id
              dt2.size = 1
              // dt2.description = ddt.description
              dt2.description = getDescriptionByName(ddt.name)
              dt1.children.push(dt2)
            })
          }
  
          dt1.description = tdt.description
          dt1.description = getDescriptionByName(tdt.name)
          dt.children.push(dt1)
        }
      )
    }

    return {dt, odata}
  }

  refreshNodes(d) {
    var _this = this
    len = []
    var thislinks = []
    var templinks = []

    var ret = this.getNewData(d)

    if(ret === null || ret.dt === null) {
      return
    }
    
    if(d3.select("#control_panel")) {
      d3.select("#control_panel").remove()
    }

    if(d3.select("#trail")) {
      d3.select("#trail").remove()
    }

    if(d3.select("#heb_network")) {
      d3.select("#heb_network").remove()
    }

    const { width, height } = this.props;

    initializeBreadcrumbTrail()

    var is_connected = function(d, opacity) {
      link.transition().style("stroke-opacity", function(o) {
        if(o === undefined) {
          return 0.8
        }
  
        return o.source === d || o.target === d ? 1 : opacity;
      });
    }

    var svg = d3
        .select(this.refs.mountPoint)
        .append('svg')
        .attr("id", 'heb_network')
        .attr("width", width)
        .attr("height", height)

    var radius = Math.min(width, height) / 2;

    var link = svg
      .append('g')
      .attr("transform", "translate(" + radius + "," + radius + ")");

    var cluster = d3
      .cluster()
      .size([360, radius - 120]);

    var root = d3.hierarchy(ret.dt, function(d) {
      return d.children;
    });

    cluster(root);

    var linksGenerator = d3
      .linkRadial()
      .angle(function(d) { 
        return d.x / 180 * Math.PI; 
      })
      .radius(function(d) { 
        return d.y; 
      });
    
    // build the arrow.
    svg.append("svg:defs")
      .selectAll("marker")
      .data(["end"])      // Different link/path types can be defined here
      .enter()
      .append("svg:marker")    // This section adds in the arrows
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5")
      .style("fill", '#2ca02c');

    svg
      .append("g")
      .append("circle")
      .attr("r", 114)
      .attr("cx", 350)
      .attr("cy", 350)
      .style("stroke-dasharray", ("5, 5"))
      .style("stroke-opacity", 0.3)
      .attr("stroke", '#2c2ca0')
      .attr("fill", 'none')

    svg
      .append("g")
      .append("circle")
      .attr("r", 230)
      .attr("cx", 350)
      .attr("cy", 350)
      .style("stroke-dasharray", ("5, 5"))
      .style("stroke-opacity", 0.3)
      .attr("stroke", '#2c2ca0')
      .attr("fill", 'none')

    link.selectAll('path')
      .data(root.links(), function(l) {
        l.highlight = false
        thislinks.push(l)
      })
      .enter()
      .append('path')
      .attr("class", "node-link")
      .attr("d", linksGenerator)
      .attr("fill", 'none')
      .attr("stroke-width", 1.5)
      .attr("stroke", '#ccc')
      // .attr("marker-end", "url(#end)")
      .style("stroke-opacity", 0.4)

    var node = link
      .selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", function(d) {
        return d.parent ? "rotate(" + (d.x - 90) + ")translate(" + d.y + ")" : null
      })

    node.append("circle")
      .attr("r", d => d.parent ? d.children ? (backStack.length <= 1) ? 12 : 14 : (backStack.length <= 1) ? 6 : 12 : 72)
      .attr("class", "node")
      .attr("stroke", 'steelblue')
      .attr("stroke-width", 3)
      .on("click", function(d) {
        if(d.parent !== undefined && d.parent !== null) {
          var sequenceArray = getAncestors(d);

          var ll = bcnodes.length
          var nl = 0

          if(sequenceArray.length > 0) {
            sequenceArray.forEach(
              sa => {
                if(bcnodes.length === 0) {
                  sa.depth += ll
                  bcnodes.push(sa)
                  nl++
                } else if(sa.data.name !== bcnodes[bcnodes.length - 1].data.name) {
                  sa.depth += ll
                  bcnodes.push(sa)
                  nl++
                } else {
                  ll--
                }
              }
            )
          }

          if(nl > 0) {
            nodelen.push(nl)
          }

          var nd = {name: d.data.name, id: d.data.id, leaf: true, description: []}
          if(d.data.children !== undefined && d.data.children.length > 0) {
            nd.leaf = false
          }

          if(d.data.description !== undefined && d.data.description.length > 0) {
            d.data.description.forEach(
              des => {
                nd.description.push(des)
              }
            )
          }

          _this.setState({
            odata: ret.odata,
            nodedata: nd,
            ..._this.state.filterData
          })
  
          _this.refreshNodes(d)

          updateBreadcrumbs(bcnodes);
        } else {
          if(backStack.length > 1) {
            backStack.pop()
            var pdata = backStack.pop()

            var nl = nodelen.pop()
            while(nl-- > 0) {
              bcnodes.pop()
              len.pop()
            }
    
            if(pdata !== undefined && pdata != null) {
              if(pdata.d != null) {
                var nd = {name: pdata.d.data.name, id: pdata.d.data.id, leaf: true, description: []}
                if(pdata.d.data.children !== undefined && pdata.d.data.children.length > 0) {
                  nd.leaf = false
                }
      
                if(pdata.d.data.description !== undefined && pdata.d.data.description.length > 0) {
                  pdata.d.data.description.forEach(
                    des => {
                      nd.description.push(des)
                    }
                  )
                }
  
                _this.setState({
                  nodedata: nd,
                  odata: pdata.odata,
                  ..._this.state.filterData
                })
              } else {
                _this.setState({
                  nodedata: null,
                  odata: pdata.odata,
                  ..._this.state.filterData
                })
              }
    
              _this.refreshNodes(pdata.d)

              updateBreadcrumbs(bcnodes);
            }
          }
        }
      })
      .on('mouseover', function(d) {
        setLinksHighlight(d)
        d3.selectAll('.node-link')
        .attr("stroke-width", l => l.highlight ? 3.0 : 1.5)
        .style("stroke-opacity", l => l.highlight ? 1 : 0.4)
      })
      .on('mouseout', function(d) {
        clearLinksHighlight()
        d3.selectAll('.node-link')
        .attr("stroke-width", 1.5)
        .style("stroke-opacity", l => l.highlight ? 1 : 0.4)
      })

    node.append("foreignObject")
      .attr("x", d => d.parent ? d.x < Math.PI ? -6 : 6 : -64)
      .attr('y', function(d) { 
        return d.parent ? d.data.name.length > 24 ? -16 : -8 : d.data.name.length > 24 ? -36 : -18
      })
      .attr("width", d => d.parent ? d.children ? 80 : 120 : 120)
      .attr("height", function(d) { 
        return d.parent ? d.children ? (d.data.name.length > 12 ? 48 : 16) : (d.data.name.length > 24 ? 32 : 16) : (d.data.name.length > 24 ? 72 : 36) 
      })
      .attr("transform", d => {
        return d.parent ? d.children ? d.x >= 180 ? "rotate(180)translate(-100)" : "translate(8)" : d.x >= 180 ? "rotate(180)translate(-140)" : "translate(8)" : null
      })
      .append("xhtml:div")
      .attr("transform", d => {
        return d.parent ? d.x >= 180 ? "rotate(180)translate(-8)" : "translate(8)" : null
      })
      .style('font', d => d.parent ? d.children ? '12px sans-serif' : '10px sans-serif' : '16px sans-serif')
      .style('text-align', d => d.parent ? d.x >= 180 ? 'right' : null : 'center')
      .style('vertical-align', d => d.parent ? null : 'middle')
      .style('color', d => d.parent ? '#444' : '#fff')
      .html(d => d.data.name)

    function setLinksHighlight(d) {
      thislinks.forEach(
        tl => {
          if((tl.source.data.name === d.data.name && tl.source.x === d.x && tl.source.y === d.y) 
            || (tl.target.data.name === d.data.name && tl.target.x === d.x && tl.target.y === d.y)) {
            tl.highlight = true
          } else {
            tl.highlight = false
          }
        }
      )
    } 

    function clearLinksHighlight() {
      thislinks.forEach(
        tl => {
          tl.highlight = false
        }
      )
    } 

    function getAncestors(node) {
      var path = [];
      var current = node;
      while (current.parent) {
        path.unshift(current);
        current = current.parent;
      }
      return path;
    }

    function initializeBreadcrumbTrail() {
      var trail = d3
        .select("#sequence")
        .append("svg")
        .attr("id", "trail")
        .attr("width", '100%')
        .attr("height", 30)
        .style("fill", "#4f4")
    }
      
    function getTextWidth(text, font) {
      var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
      var context = canvas.getContext("2d");
      context.font = font;
      var metrics = context.measureText(text);
      return metrics.width + 16;
    }

    function breadcrumbPoints(d, i) {
      var w = getTextWidth(d.data.name, "12px sans-serif")

      var tl = len[i] + i*(i === 0 ? 0 : b.s)
      var points = [];
      points.push(tl + ",0");
      points.push(tl + w + ",0");
      points.push(tl + w + b.t + "," + (b.h / 2));
      points.push(tl + w + "," + b.h);
      points.push(tl + "," + b.h);
      if (i > 0) {
        points.push(tl + b.t + "," + (b.h / 2));
      }
      return points.join(" ");
    }
      
    function updateBreadcrumbs(nodeArray) {
      var g = d3.select("#trail")
        .selectAll("g")
        .data(nodeArray, function(d, i) {
          if(i === 0) {
            len[0] = 0
          } else if(i > 0) {
            if(nodeArray[i - 1]) {
              len[i] = len[i - 1] + getTextWidth(nodeArray[i - 1].data.name, "12px sans-serif")  
            }
          }
        });

      var entering = g
        .enter()
        .append("g");
      
      entering
        .append("polygon")
        .attr("points", breadcrumbPoints)
        .style("fill", '#2c2ca0');

      entering.append("foreignObject")
        .attr("x", (d, i) => len[i] + i*(i === 0 ? 0 : b.s))
        .attr("y", 0)
        .attr("width", function(d, i) {
          return getTextWidth(d.data.name, "12px sans-serif")
        })
        .attr("height", 25)
        .attr("text-anchor", "middle")
        .append("xhtml:div")
        .style('font', '12px sans-serif')
        .style("width", function(d, i) {
          return getTextWidth(d.data.name, "12px sans-serif") + 'px'
        })
        .style("height", '25px')
        .style('text-align', 'center')
        .style('padding', '6px 0')
        .style('color', '#fff')
        .html(d => d.data.name)
      
      d3.select("#trail")
        .style("visibility", "visible");
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  processKeyword(keyword, filter) {
    function labelCovered(label, keyword) {
      if(label === keyword) {
        return true
      } else if(label === "foundation to year 2" && (keyword === "foundation year" || keyword === "year 1" || keyword === "year 2")) {
        return true
      } else if(label === "years 1 and 2" && (keyword === "year 1" || keyword === "year 2")) {
        return true
      } else if(label === "years 3 and 4" && (keyword === "year 3" || keyword === "year 4")) {
        return true
      } else if(label === "years 5 and 6" && (keyword === "year 5" || keyword === "year 6")) {
        return true
      } else if(label === "years 7 and 8" && (keyword === "year 7" || keyword === "year 8")) {
        return true
      } else if(label === "years 9 and 10" && (keyword === "year 9" || keyword === "year 10")) {
        return true
      }

      return false
    }

    function loadData(scs, od, keyword) {
      if(scs !== undefined && scs !== null && scs.length > 0) {
        scs.forEach(
          sc => {
            var node = {}
            node.name = sc.name
            node.id = sc.id
            node.flag = od.flag
            node.keyword = false
            node.children = []
            if(labelCovered(node.name.trim().toLowerCase(), keyword.trim().toLowerCase()) === true) {
              node.flag = true
              node.keyword = true
            }
            if(sc.children !== undefined) {
              loadData(sc.children, node, keyword)
            }
            node.description = sc.description
            od.children.push(node)
          }
        )

        var flag = false

        od.children.forEach(
          oc => {
            if(oc.flag === true) {
              flag = true
            }
          }
        )
        
        od.flag = (od.flag === true) ? true : flag
      }
    }

    function loadData1(scs, od) {
      if(scs !== undefined && scs !== null && scs.length > 0) {
        scs.forEach(
          sc => {
            if(sc.flag === true) {
              var node = {}
              node.name = sc.name
              node.id = sc.id
              node.keyword = sc.keyword
              node.children = []
              if(sc.children !== undefined) {
                loadData1(sc.children, node)
              }
              node.description = sc.description
              od.children.push(node)
            }
          }
        )
      }
    }

    function loadData2(td, keyword) {
      var scs = td.children
      if(scs !== undefined && scs !== null && scs.length > 0) {
        scs.forEach(
          sc => {
            var ln = null
            var cn = sc
            while(cn.keyword !== true) {
              if(cn.children.length > 1) {
                loadData2(cn, keyword)
                break;
              } else if(cn.children.length === 1) {
                ln = cn
                cn = cn.children[0]
              } else {
                break
              }
            }

            if(ln != null && cn.keyword === true) {
              ln.children = cn.children
            }
          }
        )
      }
    }

    var filterData = this.state.filterData

    var odata = {}
    odata.name = filterData.name
    odata.id = filterData.id
    odata.children = []
    odata.flag = false
    odata.keyword = false
    loadData(data.children, odata, keyword);

    // console.log(odata)

    var tdata = {}
    tdata.name = odata.name
    tdata.id = odata.id
    tdata.children = []
    tdata.keyword = false
    loadData1(odata.children, tdata);

    console.log(tdata)

    tdata.name = keyword
    tdata.parent = null
    loadData2(tdata, keyword);

    console.log(tdata)
    
    if(filter === true) {
      backStack = []
      len = []
      bcnodes = []
      nodelen = []
  
      this.state = {
        odata: tdata,
        nodedata: null,
        filterData: tdata
      }
    } else {
      this.state = {
        odata: tdata,
        nodedata: null,
        ...this.state.filterData
      }
    }

    this.refreshNodes(null)
  }

  handleClick(e) {
    var keyword = this.state.keyword;
    this.processKeyword(keyword, false)
  }

  handleSelectClick(event) {
    var keyword = this.state.filter
    if(keyword === "All") {
      this.handleOriginalClick(event)
    } else {
      this.processKeyword(keyword, true)
    }
  }

  handleOriginalClick(event) {
    this.state = {
      odata: data,
      nodedata: null,
      filterData: data
    };

    backStack = []
    len = []
    bcnodes = []
    nodelen = []

    this.refreshNodes(null)
  }

  render() {
    const { width, height } = this.props;
    const style = {
      width,
      height,
      margin: "10px auto",
      border: "none"
    };

    console.log(this.state.nodedata)

    var count = 0

    return (
      <SplitterLayout 
        horizontal={true}
        percentage={false}
        primaryMinSize={720}
        secondaryInitialSize={500}
      >
        <div className="graph-pane">
          <div id="control" style={{backgroundColor: '#555', textAlign: 'right'}}>
            <span>
              <Link to="#" onClick={event => this.handleOriginalClick(event)}><span className="pe-7s-back pe-2x pe-va" title="Back to original"></span></Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <select name="filter" onChange={event => this.handleChange(event)}>
                <option value="All"></option>
                <option value="Early Stage 1">Early Stage 1</option>
                <option value="Stage 1">Stage 1</option>
                <option value="Stage 2">Stage 2</option>
                <option value="Stage 3">Stage 3</option>
                <option value="Stage 4">Stage 4</option>
                <option value="Stage 5">Stage 5</option>
              </select>
              <Link to="#" onClick={event => this.handleSelectClick(event)}><span className="pe-7s-filter pe-2x pe-va" title="Filter"></span></Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" name="keyword" size="24" onChange={this.handleChange} />
              <Link to="#" onClick={event => this.handleClick(event)}><span className="pe-7s-search pe-2x pe-va" title="Label search"></span></Link>
            </span>
          </div>
          <div id="sequence"></div>
          <div style={style} ref="mountPoint" />
        </div>
        <div className="details-pane" style={{backgroundColor: '#fff', height: '100%'}}>
          <Tabs defaultActiveKey="graphview" id="uncontrolled-tab">
              <Tab eventKey="contentview" title="Contents">
                {this.state.nodedata !== null && this.state.nodedata.description !== undefined && this.state.nodedata.description.length > 0 &&
                  <div style={{height: '100%'}}>
                      <div style={{height: '40px', fontSize: '24px', textAlign: 'center', verticalAlign: 'middle', backgroundColor: 'black', color: 'white'}}>
                        {this.state.nodedata.name}
                      </div>
                      {
                        this.state.nodedata.description.map(
                          des => 
                            <div>
                              <div key={count++} dangerouslySetInnerHTML={{ __html: des}} />
                            </div>
                        )
                      }
                  </div>
                }
              </Tab>
              <Tab eventKey="mrview" title="Machine Readable">
                <div style={{paddingLeft: '6px', width: '100%', height: '100%', backgroundColor: '#fff'}}>
                  {this.state.nodedata !== null && 
                    <iframe src={this.state.nodedata.id} height='100%' width='100%' frameBorder="0"/>         
                  }
                  {this.state.nodedata === null && 
                    <iframe src='https://mrlp.australiancurriculum.edu.au/elements/learning-progressions/3.0/2020/09/c85675d0-91ea-4bd5-9e4d-ff619c943a56.html' height='100%' width='100%' frameBorder="0"/>         
                  }
                </div>
              </Tab>
          </Tabs>
        </div>
      </SplitterLayout>
    ) 
  }
}
