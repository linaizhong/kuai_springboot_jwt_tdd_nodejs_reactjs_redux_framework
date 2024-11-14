import React, { Component } from "react";
import * as d3 from "d3";
import Split from "react-split";
import { Link, Button } from '@material-ui/core';
import "react-splitter-layout/lib/index.css";
import icons from "../datasets/ga_images_map.json";
import edata from "../datasets/english-k-10-syllabus-2012-radio.json";
import data from "../datasets/lrs_relationships.json";
import contents from "../datasets/nllpv3.01.content.json";
import {Tabs, Tab} from 'react-bootstrap';
import ViewToolbar from "./ViewToolbar";
import LectureResourcesRender from "./LectureResourcesRender";
import NswEducationalDocumentService from "../../../_services/edu-docs.service";

var backStack = []
var b = {h: 25, s: 6, t: 10}
var char_space = 8
var len = []
var bcnodes = []
var nodelen = []

export default class LearningResourceGraphViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lrs: data,
      lr: null,
      viewname: 'lrsview' 
    };

    this.refreshNodes = this.refreshNodes.bind(this)
    this.getNewData = this.getNewData.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectClick = this.handleSelectClick.bind(this)
    this.handleOriginalClick = this.handleOriginalClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSyllabusLink = this.handleSyllabusLink.bind(this)
    this.fetchDescription = this.fetchDescription.bind(this)
    this.renderList1 = this.renderList1.bind(this)
    this.renderList2 = this.renderList2.bind(this)
  }

  componentDidMount() {
    this.refreshNodes(null)
  }

  getNewData(d) {
    function get(lr, key) {
      var tar = []
      if(lr.children !== undefined && lr.children !== null && lr.children.length > 0) {
        lr.children.forEach(
          lrc => {
            if(lrc.name === key) {
              tar = lrc.children
            }
          }
        )
      }

      return tar
    }
    
    function addData(lrs, lr, children, key, name) {
      var tars = get(lr, key);
      if(tars != undefined && tars !== null && tars.length > 0) {
        tars.forEach(
          tar => {
            if(tar.name === name) {
              lrs.push(lr)

              var t = {}
              t.id = lr.id
              t.name = lr.name
              t.type = 'lr'
              t.children = []
              children.push(t)
            }
          }
        )
      }

      return {lrs, children}
    }

    var lrs = []

    var name = d.data.name
    var type = d.data.type

    var lr = {}
    lr.name = name
    lr.type = type
    lr.id = d.data.id
    var rchildren = []
    lr.children = rchildren
    var tlr = {}
    tlr.id = ''
    tlr.name = 'Learning Resources'
    tlr.type = 'lrs'
    var children = []
    tlr.children = children
    rchildren.push(tlr) 

    var ret = {lrs, children}
    data.forEach(
      d => {
        if(type === 'kla') {
          ret = addData(ret.lrs, d, ret.children, "KLAs", name)
        } else if(type === 'year') {
          ret = addData(ret.lrs, d, ret.children, "Years", name)
        } else if(type === 'tag') {
          ret = addData(ret.lrs, d, ret.children, "Tags", name)
        } else if(type === 'pl') {
          ret = addData(ret.lrs, d, ret.children, "Professional Learning", name)
        } else if(type === 'lp') {
          ret = addData(ret.lrs, d, ret.children, "Learning Progression", name)
        } else if(type === 'sb') {
          ret = addData(ret.lrs, d, ret.children, "NSW Syllabus", name)
        } else if(type === 'rr') {
          ret = addData(ret.lrs, d, ret.children, "Related Resources", name)
        } else if(type === 'lr') {
          if(d.name === name) {
            lr = d
          }
        }
      }
    )

    if(type === 'lr') {
      return {lrs, lr}
    } else {
      return {lrs: ret.lrs, lr: lr}
    }
  }

  refreshNodes(lr, name) {
    var _this = this
    len = []
    var thislinks = []
    var templinks = []

    if(lr === null || lr === undefined) {
       _this.setState({
         lrs: data,
         lr: null,
         viewname: 'lrsview' 
        })

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

    var is_connected = function(d, opacity) {
      link.transition().style("stroke-opacity", function(o) {
        if(o === undefined) {
          return 0.8
        }
  
        return o.source === d || o.target === d ? 1 : opacity;
      });
    }

    // Define the div for the tooltip
    var div = d3.select("body").append("div")	
      .attr("class", "tooltip")				
      .style("opacity", 0);

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

    var root = d3.hierarchy(lr, function(d) {
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
      .data(["end"]) 
      .enter()
      .append("svg:marker") 
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
      .attr("stroke-width", 1.5)
      .style("stroke", l => {
        console.log("Link")
        console.log(l)
        if(l.source.data.type === 'klas' || l.target.data.type === 'klas') {
          return '#0ff'
        } else if(l.source.data.type === 'years' || l.target.data.type === 'years') {
          return '#cc0'
        } else if(l.source.data.type === 'tags' || l.target.data.type === 'tags') {
          return '#0c0'
        } else if(l.source.data.type === 'pls' || l.target.data.type === 'pls') {
          return '#00c'
        } else if(l.source.data.type === 'lps' || l.target.data.type === 'lps') {
          return '#088'
        } else if(l.source.data.type === 'rrs' || l.target.data.type === 'rrs') {
          return '#880'
        } else if(l.source.data.type === 'sbs' || l.target.data.type === 'sbs') {
          return '#808'
        }
      })
      .style("stroke-opacity", 0.5)

    var node = link
      .selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", function(d) {
        return d.parent ? "rotate(" + (d.x - 90) + ")translate(" + d.y + ")" : null
      })

    node.append("circle")
      .attr("r", d => d.parent ? d.children ? (backStack.length <= 1) ? 12 : 14 : (backStack.length <= 1) ? 6 : 6 : 72)
      .attr("class", "node")
      .attr("stroke", 'steelblue')
      .attr("stroke-width", 3)
      .on("click", function(d) {
        console.log("You clciked:")
        console.log(d)

        if(d.data.type === 'sb') {
          div.transition()		
          .duration(100)		
          .style("opacity", 0);	
        }

        if(d.parent !== undefined && d.parent !== null) {
          if(d.children === undefined || d.children === null || d.children.length < 1) {
            console.log(d)

            var ret = _this.getNewData(d)
            console.log("Ret:")
            console.log(ret)

            _this.setState({
              lrs: ret.lrs,
              lr: ret.lr,
              ..._this.state.viewname 
            })
    
            _this.refreshNodes(ret.lr, d.data.name)
          }
        }
      })
      .on('mouseover', function(d) {
        console.log(d)

        setLinksHighlight(d)
        d3.selectAll('.node-link')

        .attr("stroke-width", l => l.highlight ? 3.0 : 1.5)
        .style("stroke-opacity", l => l.highlight ? 1 : 0.4)

        if(d.data.type === 'sb') {
          div.transition()		
            .duration(100)		
            .style("opacity", .9);		

          if(d.data.description !== undefined) {
            div.html(d.data.description[0])	
            .style("left", (d3.event.pageX + 6) + "px")		
            .style("top", (d3.event.pageY - 66) + "px");	
          }
        }
      })					
      .on('mouseout', function(d) {
        clearLinksHighlight()
        
        d3.selectAll('.node-link')
          .attr("stroke-width", 1.5)
          .style("stroke-opacity", l => l.highlight ? 1 : 0.4)

        if(d.data.type === 'sb') {
          div.transition()		
          .duration(100)		
          .style("opacity", 0);	
        }
      })

    node.append("foreignObject")
      .attr("x", d => d.parent ? d.x < Math.PI ? -6 : 6 : -64)
      .attr('y', function(d) {
        console.log(d) 
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
      // .style('font-weight', d => d.parent ? d.children ? 'bold' : 'plain' : 'bold')
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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  processKeyword(keyword, filter) {
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
    console.log("Handle Original Click")

    backStack = []
    len = []
    bcnodes = []
    nodelen = []

    this.setState({
      lrs: data,
      lr: null,
      ...this.state.viewname
    })
  }

  handleSelect(key) {
    console.log("Key: " + key)

    this.setState({ 
      ...this.state.lrs,
      ...this.state.lr,
      viewname: key 
    });
  }

  handleLink(event, name) {
    event.preventDefault()

    var lr = {}
    data.forEach(
      d => {
        if(d.name === name) {
          lr = d
        }
      }
    )

    this.setState({
      ...this.state.lrs,
      lr: lr,
      viewname: 'propertyview'
    })

    this.refreshNodes(lr, name)
  }

  handleSyllabusLink(event, sb) {
    event.preventDefault()

    var key = sb.substring(0, 3) + sb.substring(4)
    console.log("Syllabus key: " + key)

    var sbcontent = {}
    edata.children.forEach(
      ed1 => {
        ed1.children.forEach(
          ed2 => {
            ed2.children.forEach(
              ed3 => {
                ed3.children.forEach(
                  ed4 => {
                    if(ed4.name === key) {
                      ed4.nllpls = ed3.nllpls
                      sbcontent = ed4
                    }                   
                  }
                )
              }
            )
          }
        )
      }
    )

    console.log(sbcontent)

    this.setState({
      ...this.state.lrs,
      ...this.state.lr,
      sb: sbcontent, 
      viewname: 'contentview'
    })
  }

  fetchDescription(key) {
    console.log("Fetch description: " + key)
  
    var _this = this
  
    NswEducationalDocumentService.getCurriculum(key)
    .then(
        response => {
            console.log("Curriculum:");
            console.log(response);
            let curriculum = response;
  
            _this.setState({
              ..._this.state.lrs,
              ..._this.state.lr,
              curriculum: curriculum
            })
        }
    )
  }
  
  renderList1(des) {
    icons.forEach(
      icon => {
        des = des.replace(icon.label, "<a href='" + icon.url + "' target='_blank'><img width='20px' height='20px' src='http://172.16.35.209:3000/" + icon.filename + "' title='" + icon.label + "'></a>")
      }
    )
  
    var s1 = des
    var s2 = ""
    var s3 = ""
    var acs = []
    var ind = 0
    var index = des.indexOf('(AC')
    if(index > 0) {
      s1 = des.substring(0, index + 1)
      s2 = des.substring(index + 1)
      var index1 = s2.indexOf(")")

      if(index1 > 0) {
        s3 = s2.substring(index1)
        s2 = s2.substring(0, index1)
  
        if(s2.indexOf(",") > 0) {
          index = s2.indexOf(",");
          while(index > 0) {
            var ts = s2.substring(0, index).trim()
            acs.push({ts: ts, index: ind})
            ind++
            s2 = s2.substring(index + 1).trim()
            index = s2.indexOf(",")
          }
        }
  
        acs.push({ts: s2, index: ind})
      }
    }

    var v = {s1, acs, s3}
    // console.log(v)

    return v
  }
  
  renderList2(props) {
    var text = props.text
  
    return(
      <li>{text}</li>
    )
  }
  
  render() {
    function get(lr, key) {
      var tar = []
      if(lr.children !== undefined && lr.children !== null && lr.children.length > 0) {
        lr.children.forEach(
          lrc => {
            if(lrc.name === key) {
              tar = lrc.children
            }
          }
        )
      }

      return tar
    }
    
    const { width, height } = this.props;
    const style = {
      width,
      height,
      margin: "10px auto",
      border: "none"
    };

    var lr = this.state.lr
    var lrs = this.state.lrs

    var klas = ""
    var years = ""
    var pls = []
    var lpls = ""
    var sbs = []
    var kws = ""
    var rrs = []
    var des = ""
    if(lr !== undefined && lr !== null) {
      var tars = get(lr, "KLAs")
      if(tars !== undefined && tars !== null && tars.length > 0) {
        var first = true
        tars.map(
          tar => {
            if(first) {
              klas = tar.name
              first = false
            } else {
              klas += ", " + tar.name
            }
          }
        )
      }

      var tars = get(lr, "Years")
      if(tars !== undefined && tars !== null && tars.length > 0) {
        first = true
        tars.map(
          tar => {
            if(first) {
              years = tar.name
              first = false
            } else {
              years += ", " + tar.name
            }
          }
        )
      }

      var tars = get(lr, "Tags")
      if(tars !== undefined && tars !== null && tars.length > 0) {
        first = true
        tars.map(
          tar => {
            if(first) {
              kws = tar.name
              first = false
            } else {
              kws += ", " + tar.name
            }
          }
        )
      }

      var tars = get(lr, "Professional Learning")
      if(tars !== undefined && tars !== null && tars.length > 0) {
        first = true
        tars.map(
          tar => {
            pls.push(tar)
          }
        )
      }

      var tars = get(lr, "Learning Progression")
      if(tars !== undefined && tars !== null && tars.length > 0) {
        first = true
        tars.map(
          tar => {
            if(first) {
              lpls = "<a href='" + tar.id + "' target='_blank'>" + tar.name + "</a>"
              first = false
            } else {
              lpls += ", " + "<a href='" + tar.id + "' target='_blank'>" + tar.name + "</a>"
            }
          }
        )
      }

      var tars = get(lr, "NSW Syllabus")
      if(tars !== undefined && tars !== null && tars.length > 0) {
        first = true
        tars.map(
          tar => {
            sbs.push(tar)
          }
        )
      }

      var tars = get(lr, "Related Resources")
      if(tars !== undefined && tars !== null && tars.length > 0) {
        first = true
        tars.map(
          tar => {
            rrs.push(tar)
          }
        )
      }

      if(lr.description !== undefined && lr.description !== null && lr.description.length > 0) {
        des = lr.description[0]
        console.log("des: " + des)
        des = des.replaceAll("<br/>", "<br/><br/>")
        console.log("des: " + des)
      }
    }

    var count = 0;
  
    return (
      <Split
        sizes={[60, 40]}
        direction="horizontal"
        cursor="col-resize"
        className="split-flex"
      >
        <div className="graph-pane">
          <div id="control" style={{backgroundColor: '#555', textAlign: 'right'}}>
            <span>
              <Link to="#" component="button" color="primary" onClick={event => this.handleOriginalClick(event)}><span className="pe-7s-back pe-2x pe-va" title="Back to original"></span></Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <select name="filter" onChange={event => this.handleChange(event)}>
                <option value="All"></option>
              </select>
              <Link to="#" component="button" color="primary" onClick={event => this.handleSelectClick(event)}><span className="pe-7s-filter pe-2x pe-va" title="Filter"></span></Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" name="keyword" size="24" onChange={this.handleChange} />
              <Link to="#" component="button" color="primary" onClick={event => this.handleClick(event)}><span className="pe-7s-search pe-2x pe-va" title="Label search"></span></Link>
            </span>
          </div>
          <div style={style} ref="mountPoint" />
        </div>
        <div className="details-pane" style={{height: '100%'}}>
            <Tabs activeKey={this.state.viewname} onSelect={this.handleSelect} id="uncontrolled-tab">
              <Tab eventKey="lrsview" title="Learning Resources">
                {lrs !== undefined && lrs !== null && lrs.length > 0 &&
                  <table className="table table-striped table-bordered table-hover table-condensed" style={{tableLayout: 'fixed', width: '100%', wordBreak: 'break-all'}}>
                    <colgroup>
                      <col style={{width: '60px'}} />
                      <col style={{width: '200px'}} />
                      <col style={{width: '300px'}} />
                    </colgroup>
                    <tr>
                      <th style={{backgroundColor: '#444', color: '#fff'}}>No</th>
                      <th style={{backgroundColor: '#444', color: '#fff'}}>Name</th>
                      <th style={{backgroundColor: '#444', color: '#fff'}}>Description</th>
                    </tr>
                    <tbody>
                      {lrs !== undefined && lrs !== null &&
                      lrs.map(
                          tlr => 
                            <tr key={count++}>
                              <td style={{verticalAlign: 'top'}}>
                                {count}
                              </td>
                              <td style={{textAlign: 'left', verticalAlign: 'top'}}>
                                <Link component="button" color="primary" onClick={e => this.handleLink(e, tlr.name)}>
                                  <span style={{textAlign: 'left'}}>{tlr.name}</span>
                                </Link>
                              </td>
                              <td style={{verticalAlign: 'top'}}>
                                <div dangerouslySetInnerHTML={{ __html: tlr.description[0]}} />
                              </td>
                            </tr>
                        )
                      }
                    </tbody>
                  </table>
                }
              </Tab>
              <Tab eventKey="propertyview" title="Properties">
                {lr !== undefined && lr !== null &&
                  <table className="table table-striped table-bordered table-hover table-condensed" style={{tableLayout: 'fixed', width: '100%', wordBreak: 'break-all'}}>
                      <colgroup>
                        <col style={{width: '160px'}} />
                        <col style={{width: '400px'}} />
                      </colgroup>
                      <tr>
                        <th style={{backgroundColor: '#444', color: '#fff'}}>Name</th>
                        <th style={{backgroundColor: '#444', color: '#fff'}}>Value</th>
                      </tr>
                      <tbody>
                      <tr key={count++}>
                        <td style={{fontWeight: 'bold', verticalAlign: 'top'}}>Name</td>
                        <td style={{verticalAlign: 'top'}}>
                          <div>
                            <a href={lr.id} target="_blank">
                              <span style={{fontWeight: 'bold'}}>{lr.name}</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr key={count++}>
                        <td style={{fontWeight: 'bold', verticalAlign: 'top'}}>KLAs</td>
                        <td style={{verticalAlign: 'top'}}>
                          <div>{klas}</div>
                        </td>
                      </tr>
                      <tr key={count++}>
                        <td style={{fontWeight: 'bold', verticalAlign: 'top'}}>Years</td>
                        <td style={{verticalAlign: 'top'}}>
                          <div>{years}</div>
                        </td>
                      </tr>
                      <tr key={count++}>
                        <td style={{fontWeight: 'bold', verticalAlign: 'top'}}>Professional Learning</td>
                        <td style={{verticalAlign: 'top'}}>
                          {pls.length > 0 && 
                            pls.map(
                              pl => 
                                <div>
                                  <a href={pl.id} target="_blank">
                                    {pl.name}
                                  </a>
                                </div>
                            )
                          }
                        </td>
                      </tr>
                      <tr key={count++}>
                        <td style={{fontWeight: 'bold', verticalAlign: 'top'}}>Learning Progressions</td>
                        <td style={{verticalAlign: 'top'}}>
                          <div dangerouslySetInnerHTML={{ __html: lpls}} />
                        </td>
                      </tr>
                      <tr key={count++}>
                        <td style={{fontWeight: 'bold', verticalAlign: 'top'}}>NSW Syllabus</td>
                        <td style={{verticalAlign: 'top'}}>
                          {sbs.length > 0 && 
                            sbs.map(
                              sb =>
                                <div>
                                  {sb.name.indexOf('EN') === 0 && 
                                    <Link component="button" color="primary" onClick={e => this.handleSyllabusLink(e, sb.name)}>
                                      <span style={{textAlign: 'left'}}>{sb.name}</span>
                                    </Link>
                                  }
                                  {sb.name.indexOf('MA') === 0 && 
                                    <a href={sb.id} target="_blank">
                                      {sb.name}
                                    </a>
                                  }
                                </div> 
                            )
                          }
                        </td>
                      </tr>
                      <tr key={count++}>
                        <td style={{fontWeight: 'bold', verticalAlign: 'top'}}>Tags</td>
                        <td style={{verticalAlign: 'top'}}>
                          <div>{kws}</div>
                        </td>
                      </tr>
                      <tr key={count++}>
                        <td style={{fontWeight: 'bold', verticalAlign: 'top'}}>Related Resources</td>
                        <td style={{verticalAlign: 'top'}}>
                          {rrs.length > 0 && 
                            rrs.map(
                              rr => 
                                <div>
                                  {rr.id.indexOf("http") === 0 &&
                                    <a href={rr.id} target="_blank">
                                      {rr.name}
                                    </a>
                                  }
                                  {rr.id.indexOf("http") !== 0 &&
                                      <div>{rr.name}</div>
                                  }
                                </div>
                            )
                          }
                        </td>
                      </tr>
                      <tr key={count++}>
                        <td style={{fontWeight: 'bold', verticalAlign: 'top'}}>Description</td>
                        <td style={{verticalAlign: 'top'}}>
                          <div dangerouslySetInnerHTML={{ __html: des}} />
                        </td>
                      </tr>
                      </tbody>
                    </table>
                }
              </Tab>
              <Tab eventKey="contentview" title="Contents">
                {(this.state.curriculum === undefined || this.state.curriculum === null) &&
                  <div>
                    {this.state.sb !== undefined && this.state.sb !== null &&
                      <div style={{backgroundColor: '#fff'}}>
                        <div><b>{this.state.sb.name}</b></div>
                        <ul style={{listStylePosition: 'outside'}}>
                        {
                          this.state.sb.description.map(
                            des => 
                              <li>{des}</li>
                          )
                        }
                        </ul>
                        <br/>
                        {
                          this.state.sb.children.map(
                            sbc =>
                              <div>
                                <div><b>{sbc.name}</b></div>
                                <ul style={{listStylePosition: 'outside'}}>
                                {
                                  sbc.description.map(
                                    des =>
                                      <li>
                                        <span dangerouslySetInnerHTML={{ __html: this.renderList1(des).s1}} />
                                        {this.renderList1(des).acs.length > 0 &&
                                          this.renderList1(des).acs.map(
                                            ac => 
                                              <Link component="button" color="primary" to="#" onClick={() => this.fetchDescription(ac.ts)}>
                                                <b>
                                                {ac.index === 0 && 
                                                  <span>{ac.ts}</span>
                                                }
                                                {ac.index > 0 && 
                                                  <span>,&nbsp;{ac.ts}</span>
                                                }
                                                </b>
                                              </Link>
                                          )
                                        }
                                        <span dangerouslySetInnerHTML={{ __html: this.renderList1(des).s3}} />
                                      </li>
                                  )
                                }
                                </ul>
                            </div>
                          )
                        }
                        <br/>
                        {this.state.sb.nllpls.length === 1 &&
                          <div>
                            <div style={{fontSize: '24px'}}><b>{this.state.sb.nllpls[0].label}</b></div>
                            <ul style={{listStylePosition: 'outside'}}>
                              {
                                this.state.sb.nllpls[0].textLines.map(
                                  tl => 
                                    <li>{tl.text}</li>
                                )
                              }
                            </ul>
                          </div>
                        }
                        {this.state.sb.nllpls.length === 3 &&
                          <div>
                            <div style={{fontSize: '24px'}}><b>{this.state.sb.nllpls[0].label}</b></div>
                            <ul style={{listStylePosition: 'outside'}}>
                              <li>{this.state.sb.nllpls[1].label}</li>
                              <li>{this.state.sb.nllpls[2].label}</li>
                            </ul>
                          </div>
                        }
                      </div>
                    }
                  </div>
                }
                {(this.state.curriculum !== undefined && this.state.curriculum !== null) &&
                  <div>
                    <div style={{height: '40px', fontSize: '24px', textAlign: 'center', verticalAlign: 'middle', backgroundColor: 'black', color: 'white'}}>
                      {this.state.curriculum[0].name}
                    </div>
                    <b>
                    {this.state.curriculum[0].description[0].title}
                    <br/><br/>
                    Elaboration:
                    <br/><br/>
                    </b>
                    {
                      this.state.curriculum[0].description[0].stringList.map(
                        cs =>
                          <p key={count++}>
                            {cs}
                          </p>                        
                      )
                    }
                  </div>                              
                }
              </Tab>
              <Tab eventKey="mrview" title="Machine Readable">
              </Tab>
            </Tabs>
        </div>
      </Split>
    ) 
  }
}
