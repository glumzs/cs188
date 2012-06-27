var canvas_width=500;
var canvas_height=200;
var arrow_size=7;

function graph_object(paper,graph_conf)
    {
    this.graph_conf=graph_conf;    
    this.r = paper;
    this.nodes = paper.set();
    this.labels = paper.set();
    this.edges = paper.set();
    this.rect = null;
    this.canvas_width=canvas_width;
    this.canvas_height=canvas_height;
    this.node_radius=23;
    this.hnodes = new Array;
    this.hedges = new Array;

    this.draw_graph = draw_search_graph;
    }


var draw_search_graph = function ()
    {
    
    //this.nodes.push(r.circle(3+this.node_radius,this.canvas_height/2,this.node_radius));
    //this.labels.push(r.text(nodes[0].attr('cx'),nodes[0].attr('cy'),this.graph_conf.nodes[0]));
    //this.hnodes[this.graph_conf.nodes[0]] = nodes[0];
    var r = this.r;
    var num_interm_nodes = this.graph_conf.nodes.length;
    var interm_nodes_startx = 2*this.node_radius;
    var interm_nodes_endx = this.canvas_width-2*this.node_radius;
    var space_avail = interm_nodes_endx-interm_nodes_startx;
    var num_bottom_nodes = parseInt(num_interm_nodes/2);
    var num_top_nodes = num_interm_nodes-num_bottom_nodes;
    var space_between_bottom = (space_avail+num_bottom_nodes*this.node_radius)/(num_bottom_nodes+1);
    var space_between_top = space_avail/(num_top_nodes+1);
    
    var curr_x = interm_nodes_startx+space_between_bottom;
    var curr_y = this.canvas_height-this.node_radius-3;
    var pos = 0; // 0 - bottom, 1 - top
    
    
    for (i = 0; i <num_interm_nodes; i++)
        {
        if (pos)
            curr_y = this.node_radius+3;
        else
            curr_y = this.canvas_height-this.node_radius-3;
          
        this.nodes.push(r.circle(curr_x,curr_y,this.node_radius));
        this.labels.push(r.text(this.nodes[i].attr('cx'),this.nodes[i].attr('cy'),this.graph_conf.nodes[i]));
        this.hnodes[this.graph_conf.nodes[i]] = this.nodes[this.nodes.length-1];
        pos = pos == 1 ? 0 : 1;
        if (!pos)
            curr_x += space_between_bottom;
        }
    
    
    //nodes.attr({fill: "#000", stroke: "#fff", "stroke-dasharray": "- ", opacity: .2});
    this.nodes.attr({"fill": "white", "stroke-width": 3});
    this.labels.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
    
    // Draw the edges

    for (i=0;i<this.graph_conf.edges.length;i++)
        {
        var s_node = this.graph_conf.edges[i].charAt(0);
        var e_node = this.graph_conf.edges[i].charAt(1);
        var from_x=0, from_y=0,to_x=0,to_y = 0;
        
        if (this.hnodes[s_node].attr('cx') == this.hnodes[e_node].attr('cx')) // same x
            {
                
            from_x = to_x = this.hnodes[s_node].attr('cx');
            if (this.hnodes[s_node].attr('cy') > this.hnodes[e_node].attr('cy')) //bottom to top
                {
                from_y = this.hnodes[s_node].attr('cy')-23;
                to_y = this.hnodes[e_node].attr('cy')+23;
                }
            else // top to bottom
                {
                from_y = this.hnodes[s_node].attr('cy')+23;
                to_y = this.hnodes[e_node].attr('cy')-23;
                }
            }
        else if (this.hnodes[s_node].attr('cx') > this.hnodes[e_node].attr('cx')) // forward to back
            {
            from_x = this.hnodes[s_node].attr('cx')-14;
            to_x = this.hnodes[e_node].attr('cx')+14;
            if (this.hnodes[s_node].attr('cy') < this.hnodes[e_node].attr('cy')) //top to bottom
                {
                from_y = this.hnodes[s_node].attr('cy')+23;
                to_y = this.hnodes[e_node].attr('cy')-23;
                }
            else if (this.hnodes[s_node].attr('cy') > this.hnodes[e_node].attr('cy')) //bottom to top
                {
                from_y = this.hnodes[s_node].attr('cy')-23;
                to_y = this.hnodes[e_node].attr('cy')+23;
                }
            else
                {
                from_y = this.hnodes[s_node].attr('cy');
                to_y = this.hnodes[e_node].attr('cy');
                }
                
            }
        else // going forward
            {
            from_x = this.hnodes[s_node].attr('cx')+23;
            to_x = this.hnodes[e_node].attr('cx')-23;
            from_y = this.hnodes[s_node].attr('cy');
            to_y = this.hnodes[e_node].attr('cy');
            }
        var new_edge = r.arrow(from_x,from_y,to_x,to_y,arrow_size);
        this.edges.push(new_edge);
        this.hedges[this.graph_conf.edges[i]]=new_edge;
    
        }
    
    }
    
window.onload = function()
    {
    var graph_conf = { "nodes": ["A","B","C","D","E","F"],
                       "edges": ["AB","BC","DA","CD","EF","FC","AF"] };
                       
    var r = Raphael("holder", canvas_width, canvas_height);
    var transp = r.rect(0, 0, canvas_width, canvas_height);
    transp.attr({fill: "white", stroke: "none"});
    
    var graph = new graph_object(r,graph_conf);
    graph.rect = transp;
    graph.draw_graph();
    }