
var anspath_coord_x = 420;
var anspath_coord_y= 20;
var curr_cons_x = 230;
var curr_cons_y = 410;
var green = "#01df01";
var orange= "#ff9000";
var white = "#fff";
var black = "#000";
var gray = "#848484";
var pqsearch_hintbox = "#pqsearch_showhints";
var arrow_size=10;

function rect_node_cl(r,x,y,problem,txt)
    {
    var newholder = r.rect(x, y, 100, 30, 10);
    newholder.attr({fill: white});
    var newtxt = r.text(x+50,y+15);
    problem.exp_x += 120;
    if (problem.exp_x >= problem.paper_width-120)
        {
        problem.exp_x = 0;
        problem.exp_y += 50;
        }
    newtxt.attr({text: txt, font: "14px Fontin-Sans, Arial",
                cursor: 'default'});
    }


function color_arrow(arrow,color)
    {
    arrow[0].attr({"stroke": color});
    arrow[1].attr({"fill": color});
    }
    
function toggle_hints(code)
    {
    for (i = 0; i < code.length; i++)
        if (RGBtoHEX($("#pqguide"+i).css('background-color')) == green)
            $('#pqguide' + i + ' a:eq(0)').trigger('click.cluetip');
    }

function clear_highlight(code)
    {
    //$(document).trigger('hideClueTip');
    for (i = 0; i < code.length; i++)
        {
        $("#pqguide" + i).css('background-color',white);
        }
    }
    
function highlight_line(problem,id)
    {
    clear_highlight(problem.pseudocode);
    $("#pqguide"+id).css('background-color',green);
    //show_hint(id);
    }

function show_hint(id)
    {
    //$(document).trigger('hideClueTip');
    if (id > -1 && $(pqsearch_hintbox).attr('checked'))
        $('#pqguide' + id + ' a:eq(0)').trigger('click.cluetip');
    }


function search_problem()
    {
    this.last_x = 0;
    this.last_y = 250;
    this.paper_width = 600;
    this.paper_height=1000;
    this.graph_height=200;
    this.graph_width= 550;
    this.node_radius = 20;
    this.pseudocode = [];
    this.firstpass=1;
    this.hedges = new Array;
    this.hnodes = new Array;
    this.exp_x = 105;
    this.exp_y = curr_cons_y+40;
    }


function goal_test(obj)
    {
    var html = 'Goal State?';

    var search_done = function() {
        var r = obj.paper;
        var ans_highlight = r.rect(anspath_coord_x-50, anspath_coord_y-12, 100, 30, 10);
        ans_highlight.attr({stroke: green});
        $(this).dialog("close");
    }
    var $dialog = $('<div id="goaltest"></div>')
        .html(html)
        .dialog({autoOpen: false,
	    modal: true,
	    title: 'Goal Test',
	    buttons: {"No": function() {$(this).dialog("close");},
                  "Yes": search_done}
	});
    $dialog.dialog('open');
    }
    
function set_priority(obj)
    {
    var curr_txt = obj.attr('text');
    var new_txt = obj.paper.text(obj.pair.attrs.x+93,obj.attrs.y,"");
    var handle_key = function (event) {
        if (event.which == 8)
            new_txt.attr({"text": ""});
        else if (event.which == 13)
            {
            new_txt.removeCursor();
            $(document).unbind('keyup');
            if (obj.pair.problem.firstpass)
                {
                clear_highlight(obj.pair.problem.pseudocode);
                $("#pqguide3").css('background-color',green);
                show_hint(3);
                obj.pair.problem.firstpass = 0;
                }
            
            }
        else if (event.which >= 48 && event.which <= 57)
              {
              var tmptxt = new_txt.attr("text");
              new_txt.attr({"text": tmptxt+String.fromCharCode(event.which)});           
              }
        };
    
    var edit_fld = function() {
        new_txt.addCursor();
        $(document).keyup( handle_key);
    };
    
    new_txt.addCursor();
    new_txt.click(edit_fld);
    $(document).keyup( handle_key);
    
    //new_txt.attr({"font": "14px Fontin-Sans, Arial", "font-weight": "bold", "text": "|"});
    }

            
            
window.onload = function () 
    {
    var pq_search = new search_problem();        
    pq_search.pseudocode = ['initialize priority queue<a href="" title="|Click on the start node|then type 0 or 1 to set|its priority and hit Enter"></a>',
                            "loop do",
                            "&nbsp;&nbsp;&nbsp;&nbsp;if there are no nodes for expansion return failure",
                            '&nbsp;&nbsp;&nbsp;&nbsp;choose a leaf node for expansion from the fringe<a href="" title="|Click on the partial|unxpanded plan with the top priority"></a>',
                            '&nbsp;&nbsp;&nbsp;&nbsp;if the node contains a goal state return the solution<a href="" title="|If the node contains a goal state click on the Reached Goal button below. Otherwise click the Not A Goal button"></a>',
                            '&nbsp;&nbsp;&nbsp;&nbsp;else expand the node<a  href="" title="Click on each node|you want to add,|enter priority.|Click the Continue|button after all nodes are added."></a>',
                            "end loop"];
    $("#reached_goal").button();
    $("#not_goal").button();
    $("#buttons").hide();
    $("#continue_alg").button();
    $("#continue_alg").hide();
    var mk_fringe = function () {
        var choose_path = function () {
            var obj = this.type == 'rect' ? this : this.pair;
            var myTxt = obj.pair.attr('text');
            var graph_conf = obj.problem.graph_conf;
            
            obj.pathFld.attr({text: myTxt});
            obj.problem.curr_fld.attr({text: myTxt});
            var txtNodes = myTxt.split("-");
            for (i = 0; i < nodes.length; i++)
                nodes[i].attr({fill: white});
            
            for (i = 0; i < graph_conf.edges.length; i++)
                color_arrow(pq_search.hedges[graph_conf.edges[i]],black);
            
            for (i = 0; i < txtNodes.length; i++)
                {
                if (txtNodes[i] && txtNodes[i+1]
                    && pq_search.hedges[txtNodes[i]+ txtNodes[i+1]])
                    color_arrow(pq_search.hedges[txtNodes[i]+ txtNodes[i+1]],green);
                
                for (j = 0; j < nodes.length; j++)
                    if (labels[j].attr('text') == txtNodes[i])
                        nodes[j].attr({fill: green});
                }

            highlight_line(obj.problem, 4);
            show_hint(4);
            $("#reached_goal").click(function() {
                var r = obj.paper;
                var ans_highlight = r.rect(anspath_coord_x-50, anspath_coord_y-12, 100, 30, 10);
                ans_highlight.attr({stroke: green});
                $("#buttons").hide();
                $("#reached_goal").unbind("click");
                clear_highlight(obj.problem.pseudocode);
                show_hint(-1);
                });
            $("#not_goal").click(function() {
                //highlight_line(obj.problem,5);
                $("#buttons").hide();
                $("#continue_alg").click(function() {
                    highlight_line(obj.problem,3);
                    show_hint(3);
                    obj.attr({fill: gray});
                    obj.unclick(choose_path);
                    rect_node_cl(obj.paper,obj.problem.exp_x,obj.problem.exp_y,obj.problem,obj.pair.attr('text'));
                    $("#continue_alg").hide();
                    $("#continue_alg").unbind('click');
                });
                $("#continue_alg").show();
                highlight_line(obj.problem,5);
                show_hint(5);
                $("#not_goal").unbind("click");
                $("#reached_goal").unbind("click");
                });
            $("#buttons").show();


                       
        }
        
            
        var obj = this.type == 'circle' ? this : this.pair;
        var newholder = r.rect(pq_search.last_x, pq_search.last_y, 100, 30, 10);
        newholder.attr({fill: '#fff'});
        var newtxt = r.text(pq_search.last_x+50,pq_search.last_y+15);
        pq_search.last_x += 120;
        if (pq_search.last_x >= pq_search.paper_width-120)
            {
            pq_search.last_x = 0;
            pq_search.last_y += 50;
            }
        var fldTxt = obj.fld.attr('text');
        if (fldTxt)
            fldTxt += '-';
        fldTxt += obj.pair.attr('text');
        newholder.pair = newtxt;
        newtxt.pair = newholder;
        newholder.pathFld = obj.fld;
        newtxt.attr({text: fldTxt, font: "14px Fontin-Sans, Arial",
                    cursor: 'default'});
        newholder.problem = obj.problem;
        
        set_priority(newtxt);
        newtxt.pair.click(choose_path);
        newtxt.click(choose_path);
        /*if (obj.problem.firstpass == 1)
            obj.problem.firstpass = 0;
        else
            {
            clear_highlight(pq_search.pseudocode);
            $("#pqguide3").css('background-color',green);
            }*/
        obj.attr({fill: orange});
        
    }
    
    
    
    var graph_conf = { "nodes": ["S","A","B","C","D","G"],
                       "edges": ["SA","SB","AD","DB","DC","CG","BC"]};
    pq_search.graph_conf = graph_conf;
                       
    var num_interm_nodes = graph_conf.nodes.length - 2;
    var r = Raphael("holder", pq_search.paper_width, pq_search.paper_height);
    
    var fld = r.text(anspath_coord_x,anspath_coord_y,"");
    fld.attr({font: "14px Fontin-Sans, Arial"});
    
    pq_search.curr_fld = r.text(curr_cons_x,curr_cons_y,"");
    pq_search.curr_fld.attr({font: "14px Fontin-Sans, Arial"});
    
    
    var nodes = r.set();
    var labels = r.set();
    
    var hnodes = new Array;
    
    // Starting node always in the left middle
    nodes.push(r.circle(3+pq_search.node_radius,pq_search.graph_height/2,pq_search.node_radius));
    labels.push(r.text(nodes[0].attr('cx'),nodes[0].attr('cy'),graph_conf.nodes[0]));
    hnodes[graph_conf.nodes[0]] = nodes[0];
    
    
    var interm_nodes_startx = 3+2*pq_search.node_radius;
    var interm_nodes_endx = pq_search.graph_width-2*pq_search.node_radius-3;
    var space_avail = interm_nodes_endx-interm_nodes_startx;
    var num_bottom_nodes = parseInt(num_interm_nodes/2);
    var num_top_nodes = num_interm_nodes-num_bottom_nodes;
    var space_between_bottom = space_avail/(num_bottom_nodes+1);
    var space_between_top = space_avail/(num_top_nodes+1);

    
    var curr_x = interm_nodes_startx+space_between_bottom;
    var curr_y = pq_search.graph_height-pq_search.node_radius-3;
    var pos = 0; // 0 - bottom, 1 - top
    for (i = 1; i <num_interm_nodes+1; i++)
        {
        if (pos)
            curr_y = pq_search.node_radius+3;
        else
            curr_y = pq_search.graph_height-pq_search.node_radius-3;
            
        nodes.push(r.circle(curr_x,curr_y,pq_search.node_radius));
        labels.push(r.text(nodes[i].attr('cx'),nodes[i].attr('cy'),graph_conf.nodes[i]));
        hnodes[graph_conf.nodes[i]] = nodes[nodes.length-1];
        pos = pos == 1 ? 0 : 1;
        if (!pos)
            curr_x += space_between_bottom;
        }
    
    // Goal node in the right middle
    nodes.push(r.circle(pq_search.graph_width-pq_search.node_radius-3,pq_search.graph_height/2,pq_search.node_radius));
    labels.push(r.text(nodes[5].attr('cx'),nodes[5].attr('cy'),graph_conf.nodes[5]));
    hnodes[graph_conf.nodes[5]] = nodes[5];
    
    //nodes.attr({fill: "#000", stroke: "#fff", "stroke-dasharray": "- ", opacity: .2});
    nodes.attr({"fill": white, "stroke-width": 3});
    labels.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
    
    // Draw the edges
    var edges = r.set();
    var hedges = new Array;
    for (i=0;i<graph_conf.edges.length;i++)
        {
        var s_node = graph_conf.edges[i].charAt(0);
        var e_node = graph_conf.edges[i].charAt(1);
        var from_x=0, from_y=0,to_x=0,to_y = 0;
        
        if (hnodes[s_node].attr('cx') == hnodes[e_node].attr('cx')) // same x
            {
                
            from_x = to_x = hnodes[s_node].attr('cx');
            if (hnodes[s_node].attr('cy') > hnodes[e_node].attr('cy')) //bottom to top
                {
                console.log("bottom to top ",s_node,e_node);
                from_y = hnodes[s_node].attr('cy')-20;
                to_y = hnodes[e_node].attr('cy')+20;
                }
            else // top to bottom
                {
                console.log("top to bottom",s_node,e_node);
                from_y = hnodes[s_node].attr('cy')+20;
                to_y = hnodes[e_node].attr('cy')-20;
                }
            }
        else if (hnodes[s_node].attr('cx') > hnodes[e_node].attr('cx')) // forward to back
            {
            from_x = hnodes[s_node].attr('cx')-20;
            to_x = hnodes[e_node].attr('cx')+20;
            if (hnodes[s_node].attr('cy') < hnodes[e_node].attr('cy')) //top to bottom
                {
                from_y = hnodes[s_node].attr('cy')+20;
                to_y = hnodes[e_node].attr('cy')-20;
                }
            else if (hnodes[s_node].attr('cy') > hnodes[e_node].attr('cy')) //bottom to top
                {
                from_y = hnodes[s_node].attr('cy')-20;
                to_y = hnodes[e_node].attr('cy')+20;
                }
            else
                {
                from_y = hnodes[s_node].attr('cy');
                to_y = hnodes[e_node].attr('cy');
                }
                
            }
        else // going forward
            {
            from_x = hnodes[s_node].attr('cx')+20;
            to_x = hnodes[e_node].attr('cx')-20;
            from_y = hnodes[s_node].attr('cy');
            to_y = hnodes[e_node].attr('cy');
            }
        hedges[graph_conf.edges[i]]=r.arrow(from_x,from_y,to_x,to_y,arrow_size);
    
        }
    
    pq_search.hnodes = hnodes;
    pq_search.hedges = hedges;
    
   
    for (var i = 0, ii = nodes.length; i < ii; i++)
        {
        nodes[i].pair = labels[i];
        labels[i].pair = nodes[i];
        nodes[i].fld = fld;
        nodes[i].hnd = mk_fringe;
        nodes[i].problem = pq_search;
        }
    
    var pqlbl = r.text(60,230,"Priority Queue:");
    pqlbl.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
    
    var currlbl = r.text(curr_cons_x-145,curr_cons_y,"Node currently considered:");
    currlbl.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
    
    var explbl = r.text(pq_search.exp_x,pq_search.exp_y,"Nodes that have been expanded:");
    explbl.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
    pq_search.exp_x = 0;
    pq_search.exp_y += 20;
    
    var curr_highlight = r.rect(curr_cons_x-50, curr_cons_y-12, 100, 30, 10);
    
    nodes.click(mk_fringe);
    labels.click(mk_fringe);

    //$('div#holder').find('> svg,div').css({'border': '1px solid #f00'});
    
    for (i = 0; i < pq_search.pseudocode.length; i++)
        {
        $("#codeguide").append("<li id='pqguide" + i + "'>" + pq_search.pseudocode[i] + "</li>");
        $('#pqguide' + i + ' a:eq(0)').cluetip({arrows: true, sticky: true, splitTitle: '|', cluetipClass: 'rounded', showTitle: false, activation: 'click'});
        }
    $("#pqguide0").css('background-color',green);
    
    $(pqsearch_hintbox).click(function() {
        if($(pqsearch_hintbox).prop('checked'))
            {
            for (i = 0; i < pq_search.pseudocode.length; i++)
                {
                if (RGBtoHEX($("#pqguide"+i).css('background-color')) == green)
                    show_hint(i);
                }
            }
        else
            toggle_hints(pq_search.pseudocode);
    });
    
    show_hint(0);
    };
