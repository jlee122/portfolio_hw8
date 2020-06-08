import React, { Component } from 'react'
import firebase from '../config'

var d3 = require('d3');
const data = {
    nodes: [],
    links: []
}
const itemRef = firebase.database().ref('GraphViz');
itemRef.once('value').then((snapshot) => {
    let items = snapshot.val();
    for( let item in items) {
        let title = items[item].title.replace(/ /g, "-");
        data.nodes.push({
            name: title,
            poster: items[item].poster,
            group: 1
        })
        let actors = items[item].actors;
        let movieIndex = data.nodes.findIndex((d, i) => {
            return d.name === title
        })
        for( let actor in actors) {
            let name = actors[actor];
            if(name[0] == " "){
                name = name.substring(1, name.length);
            }
            let actorIndex = data.nodes.findIndex((item, i) => {
                return item.name === name
            })
            if(actorIndex == -1) {
                data.nodes.push({
                    name: name,
                    group: 2
                })
                data.links.push({
                    source: movieIndex,
                    target: data.nodes.findIndex((item, i) => {
                        return item.name === name
                    })
                })
            }else{
                data.links.push({
                    source: movieIndex,
                    target: actorIndex
                })
            }
        }
    }
})

export class Demo extends Component {

    drag = (simulation) => {
        function dragStarted(d) {
            if(!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded);
    }

    chart(nodes, links) {
        const width= 1920;
        const height = 1080;
        const obj_links = links.map(d => Object.create(d));
        const obj_nodes = nodes.map(d => Object.create(d));

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);

        var defs = svg.append('svg:defs')
        for( let node in nodes) {
            if(nodes[node].group == 1){
                defs.append("svg:pattern")
                    .attr("id", nodes[node].name)
                    .attr("width", 1)
                    .attr("height", 1)
                    .append("svg:image")
                    .attr("xlink:href", nodes[node].poster)
                    .attr("width", 200)
                    .attr("height", 200)
                    .attr("x", 0)
                    .attr("y", 0);
            }
        }

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));
        
        const color = (node) => {
            if (node.group == 2)
                return d3.color("gray")
            return "url(#" + node.name + ")";
        }

        const radius = (node) => {
            if (node.group == 2)
                return 20;
            return 100;
        }

        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(links).id(d => { return d.index; }).distance(300))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width /2, height / 2));
        
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });
        const actorName = d3.select('body')
            .append('div')
            .style('z-index', '10')
            .style('position', 'absolute')
            .style('visibility', 'hidden')

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-opacity", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("r", radius)
            .attr("fill", color)
            .call(this.drag(simulation));
        
        node.on('mouseover', (node) => {
            if(node.group === 2) {
                actorName.text(node.name);
                actorName.style('visibility', 'visible');
                actorName.style('top', (d3.event.y-10)+'px').style('left', (d3.event.x+10)+'px');
            }
        })
            .on('mouseout', () => {
                return actorName.style('visibility', 'hidden');
            })

        return svg.node();
    }

    componentDidMount(){
        const elem = document.getElementById("mysvg");

        elem.appendChild(this.chart(data.nodes, data.links));
    }

    render() {
        return (
            <div id="mysvg"></div>
        )
    }
}
export default Demo;