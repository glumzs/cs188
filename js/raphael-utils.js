Raphael.el.unbindAll = function(){
            while(this.events.length){          
                var e = this.events.pop();
                e.unbind();
            }
        }
        
        
Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
		    var angle = Math.atan2(x1-x2,y2-y1);
		    angle = (angle / (2 * Math.PI)) * 360;
		    var arrowPath = this.path("M" + x2 + " " + y2 + " L" + (x2  - size) + " " + (y2  - size) + " L" + (x2  - size)  + " " + (y2  + size) + " L" + x2 + " " + y2 ).attr("fill","black").rotate((90+angle),x2,y2);
		    var linePath = this.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2);
		    return [linePath,arrowPath];
        
	    };
        
Raphael.el.addCursor = function () {
            var a, b = this;
            return this.rotation != null && this.rotate(-this.rotation), this.cursor = this.paper.text(0, 0, "|"), this.updateCursor(), this.rotation != null && (this.rotate(this.rotation), this.cursor.rotate(this.rotation, this.attrs.x, this.attrs.y)), this.cursor.attr({
                "font-size": 24,
                "font-family": "Trebuchet MS"
            }), this.cursor.visible = !0, a = function () {
                var a;
                return b.cursor.visible = !b.cursor.visible, a = b.cursor.visible ? "|" : "", b.cursor.attr({
                    text: a
                }), b.updateCursor()
            }, this.cursor.blinker = setInterval(function () {
                return a()
            }, 500)
        };

Raphael.el.updateCursor = function () {
            var a;
            if (this.cursor == null) return;
            return this.attr("text") === "" ? a = 0 : a = this.getBBox(!0).width / 2, this.cursor.attr({
                x: this.attrs.x + a + 2,
                y: this.attrs.y - 2
            })
        };

Raphael.el.removeCursor = function () {
            if (this.cursor == null) return;
            return clearInterval(this.cursor.blinker), $(this.cursor.node).remove(), delete this.cursor
        };

var draw_tree_node = function(r,node,root)
    {
    var pos_x, pos_y,nodes,parent;
    parent="";
    if (this.stree_last_node && node==this.stree_last_node.attr('text'))
        return -1;
    
    if (root)
        {
        pos_x = this.stree_x;
        pos_y = this.stree_y;
        this.stree_node_placement[node] = [50,pos_y+100];
        }
    else
        {
        if (node.length>1)
            parent=node.substring(0,node.length-2);
        //console.log(parent);
        pos_x = this.stree_node_placement[parent][0];
        pos_y = this.stree_node_placement[parent][1];
        this.stree_node_placement[parent] = [pos_x+120,pos_y];
        this.stree_node_placement[node] = [pos_x,pos_y+100];
        r.arrow(this.stree_obj[parent].attrs.x+node_width/2,this.stree_obj[parent].attrs.y+node_height,pos_x+node_width/2,pos_y-3,arrow_size-3);
        }
    var newholder = r.rect(pos_x, pos_y, node_width, node_height, 10);
    newholder.attr({'fill': white, 'stroke-width': 3});
    var newtxt = r.text(pos_x+50,pos_y+15);  
    newtxt.attr({text: node, font: "14px Fontin-Sans, Arial", cursor: 'default'});
    this.stree_obj[node] = newholder;
    this.stree_last_node = newtxt;
    
    }



var draw_search_graph = function (r,nodes,labels)
    {
    // Starting node always in the left middle
    nodes.push(r.circle(3+this.node_radius,this.graph_height/2,this.node_radius));
    labels.push(r.text(nodes[0].attr('cx'),nodes[0].attr('cy'),this.graph_conf.nodes[0]));
    this.hnodes[this.graph_conf.nodes[0]] = nodes[0];
    
    var num_interm_nodes = this.graph_conf.nodes.length - 2;
    var interm_nodes_startx = 3+2*this.node_radius;
    var interm_nodes_endx = this.graph_width-2*this.node_radius-3;
    var space_avail = interm_nodes_endx-interm_nodes_startx;
    var num_bottom_nodes = parseInt(num_interm_nodes/2);
    var num_top_nodes = num_interm_nodes-num_bottom_nodes;
    var space_between_bottom = (space_avail+num_bottom_nodes*this.node_radius)/(num_bottom_nodes+1);
    var space_between_top = space_avail/(num_top_nodes+1);
    
    var curr_x = interm_nodes_startx+space_between_bottom;
    var curr_y = this.graph_height-this.node_radius-3;
    var pos = 0; // 0 - bottom, 1 - top
    
    
    for (i = 1; i <num_interm_nodes+1; i++)
        {
        if (pos)
            curr_y = this.node_radius+3;
        else
            curr_y = this.graph_height-this.node_radius-3;
          
        nodes.push(r.circle(curr_x,curr_y,this.node_radius));
        labels.push(r.text(nodes[i].attr('cx'),nodes[i].attr('cy'),this.graph_conf.nodes[i]));
        this.hnodes[this.graph_conf.nodes[i]] = nodes[nodes.length-1];
        pos = pos == 1 ? 0 : 1;
        if (!pos)
            curr_x += space_between_bottom;
        }
    
    // Goal node in the right middle
    nodes.push(r.circle(this.graph_width-this.node_radius-3,this.graph_height/2,this.node_radius));
    labels.push(r.text(nodes[5].attr('cx'),nodes[5].attr('cy'),this.graph_conf.nodes[5]));
    this.hnodes[this.graph_conf.nodes[5]] = nodes[5];
    
    //nodes.attr({fill: "#000", stroke: "#fff", "stroke-dasharray": "- ", opacity: .2});
    nodes.attr({"fill": white, "stroke-width": 3});
    labels.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
    
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
                console.log("bottom to top ",s_node,e_node);
                from_y = this.hnodes[s_node].attr('cy')-20;
                to_y = this.hnodes[e_node].attr('cy')+20;
                }
            else // top to bottom
                {
                console.log("top to bottom",s_node,e_node);
                from_y = this.hnodes[s_node].attr('cy')+20;
                to_y = this.hnodes[e_node].attr('cy')-20;
                }
            }
        else if (this.hnodes[s_node].attr('cx') > this.hnodes[e_node].attr('cx')) // forward to back
            {
            from_x = this.hnodes[s_node].attr('cx')-20;
            to_x = this.hnodes[e_node].attr('cx')+20;
            if (this.hnodes[s_node].attr('cy') < this.hnodes[e_node].attr('cy')) //top to bottom
                {
                from_y = this.hnodes[s_node].attr('cy')+20;
                to_y = this.hnodes[e_node].attr('cy')-20;
                }
            else if (this.hnodes[s_node].attr('cy') > this.hnodes[e_node].attr('cy')) //bottom to top
                {
                from_y = this.hnodes[s_node].attr('cy')-20;
                to_y = this.hnodes[e_node].attr('cy')+20;
                }
            else
                {
                from_y = this.hnodes[s_node].attr('cy');
                to_y = this.hnodes[e_node].attr('cy');
                }
                
            }
        else // going forward
            {
            from_x = this.hnodes[s_node].attr('cx')+20;
            to_x = this.hnodes[e_node].attr('cx')-20;
            from_y = this.hnodes[s_node].attr('cy');
            to_y = this.hnodes[e_node].attr('cy');
            }
        this.hedges[this.graph_conf.edges[i]]=r.arrow(from_x,from_y,to_x,to_y,arrow_size);
    
        }
    
    }
    
function draw_edge(r,from_node,to_node)
    {
    var from_x,to_x, from_y,to_y;
    var arrow_size=10;
    if (from_node.attr('cx') == to_node.attr('cx')) // same x
            {
                
            from_x = to_x = from_node.attr('cx');
            if (from_node.attr('cy') > to_node.attr('cy')) //bottom to top
                {
                console.log("bottom to top ",s_node,e_node);
                from_y = from_node.attr('cy')-20;
                to_y = to_node.attr('cy')+20;
                }
            else // top to bottom
                {
                console.log("top to bottom",s_node,e_node);
                from_y = from_node.attr('cy')+20;
                to_y = to_node.attr('cy')-20;
                }
            }
        else if (from_node.attr('cx') > to_node.attr('cx')) // forward to back
            {
            from_x = from_node.attr('cx')-20;
            to_x = to_node.attr('cx')+20;
            if (from_node.attr('cy') < to_node.attr('cy')) //top to bottom
                {
                from_y = from_node.attr('cy')+20;
                to_y = to_node.attr('cy')-20;
                }
            else if (from_node.attr('cy') > to_node.attr('cy')) //bottom to top
                {
                from_y = from_node.attr('cy')-20;
                to_y = to_node.attr('cy')+20;
                }
            else
                {
                from_y = from_node.attr('cy');
                to_y = to_node.attr('cy');
                }
                
            }
        else // going forward
            {
            from_x = from_node.attr('cx')+20;
            to_x = to_node.attr('cx')-20;
            from_y = from_node.attr('cy');
            to_y = to_node.attr('cy');
            }
        r.arrow(from_x,from_y,to_x,to_y,arrow_size);
    }