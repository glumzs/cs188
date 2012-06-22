
var anspath_coord_x = 420;
var anspath_coord_y= 20;
var curr_cons_x = 230;
var curr_cons_y = 410;
var green = "#01df01";
var orange= "#ff9000";
var white = "#fff";
var black = "#000";
var gray = "#E6E6E6";
var pqsearch_hintbox = "#pqsearch_showhints";
var pqsearch_area = "#hintbox";
var pqsearch_next_btn = '#next_step';
var arrow_size=10;

function rect_node_cl(r,x,y,problem,txt)
    {
    var newholder = r.rect(x, y, 100, 30, 10);
    newholder.attr({'fill': white, 'stroke-width': 3});
    var newtxt = r.text(x+50,y+15);
    problem.exp_x += 120;
    if (problem.exp_x >= problem.paper_width-120)
        {
        problem.exp_x = 3;
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
        if (RGBtoHEX($("#pqguide"+i).css('background-color')) == gray)
            $('#pqguide' + i + ' a:eq(0)').trigger('click.cluetip');
    }

function clear_highlight(code)
    {
    for (i = 0; i < code.length; i++)
        {
        $("#pqguide" + i).css('background-color',white);
        $("#pqguide" + i).css('list-style-type','none');
        }
    }
    
function highlight_line(problem,id)
    {
    clear_highlight(problem.pseudocode);
    $("#pqguide"+id).css('background-color',gray);
    $("#pqguide"+id).css('list-style-type','circle');
    }

function show_hint(id)
    {
    if (id > -1 && $(pqsearch_hintbox).attr('checked'))
        $('#pqguide' + id + ' a:eq(0)').trigger('click.cluetip');
    }


function search_problem()
    {
    this.demo=1;
    this.alg='DFS';
    this.alg_state="init_fringe";
    this.fringe = new Array;
    this.current_node="";
    this.current_node_last_state="";
    this.successor="";
    this.node_stage=0;
    this.explored_edges = new Array;
    this.add_next="";
    this.last_x = 3;
    this.last_y = 250;
    this.paper_width = 500;
    this.paper_height=1000;
    this.graph_height=200;
    this.graph_width= 500;
    this.node_radius = 20;
    this.pseudocode = [];
    this.firstpass=1;
    this.hedges = new Array;
    this.hnodes = new Array;
    this.exp_x = 105;
    this.exp_y = curr_cons_y+40;
    this.nodes = null;
    this.labels = null;
    this.pqset = null;
    this.draw_graph = draw_search_graph;
    }


function goal_test(obj)
    {
    var html = 'Goal State?';

    var search_done = function() {
        var r = obj.paper;
        //var ans_highlight = r.rect(anspath_coord_x-50, anspath_coord_y-12, 100, 30, 10);
        //ans_highlight.attr({stroke: green});
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
                //$("#pqguide3").css('background-color',green);
                highlight_line(obj.pair.problem,3);
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
    
    new_txt.attr({"font": "14px Fontin-Sans, Arial", "font-weight": "bold"});
    }

            
            
window.onload = function () 
    {
    var pq_search = new search_problem();
    if (pq_search.demo)
        pq_search.pseudocode = ['function Tree-Search(problem,strategy) returns a solution, or failure',
                                '&nbsp;&nbsp;&nbsp;&nbsp;initialize the fringe with the initial state of problem',
                                '&nbsp;&nbsp;&nbsp;&nbsp;loop do',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if fringe is empty',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;then return failure',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;current_node <- select_node(fringe,strategy)',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if current_node ends in a goal state',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;then return current_node',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else current_node_last_state <- get_state',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for successor in successors(current_node_last_state)',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;add(fringe,append(current_node,successor))',
                                '&nbsp;&nbsp;&nbsp;&nbsp;end'
                                ]
    else
        pq_search.pseudocode = ['initialize priority queue<a href="" title="|click on the start node, S, and then enter 0 for its priority"></a>',
                            "loop do",
                            "&nbsp;&nbsp;&nbsp;&nbsp;if there are no nodes for expansion return failure",
                            '&nbsp;&nbsp;&nbsp;&nbsp;pop node from the priority queue for expansion<a href="" title="|Click on the partial|unxpanded plan with the top priority"></a>',
                            '&nbsp;&nbsp;&nbsp;&nbsp;if the node contains a goal state return the solution<a href="" title="|If the node contains a goal state click on the Reached Goal button below. Otherwise click the Not A Goal button"></a>',
                            '&nbsp;&nbsp;&nbsp;&nbsp;else expand the node<a  href="" title="Click on each node|you want to add,|enter priority.|Click the Continue|button after all nodes are added."></a>',
                            "end loop"];
        
    for (i = 0; i < pq_search.pseudocode.length; i++)
        {
        $("#codeguide").append("<li id='pqguide" + i + "'>" + pq_search.pseudocode[i] + "</li>");
        if (!pq_search.demo)
            $('#pqguide' + i + ' a:eq(0)').cluetip({arrows: true, sticky: true, splitTitle: '|', cluetipClass: 'rounded', showTitle: false, activation: 'click'});
        }
        
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
                //var ans_highlight = r.rect(anspath_coord_x-50, anspath_coord_y-12, 100, 30, 10);
                //ans_highlight.attr({stroke: green});
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
                    obj.problem.curr_fld.attr({'text': ""});
                    $("#continue_alg").hide();
                    $("#continue_alg").unbind('click');  
                });
                $("#continue_alg").show();
                highlight_line(obj.problem,5);
                show_hint(5);
                $("#not_goal").unbind("click");
                $("#reached_goal").unbind("click");
                obj.problem.nodes.click(mk_fringe);
                obj.problem.labels.click(mk_fringe); 
                });
            $("#buttons").show();
            obj.problem.nodes.unclick(mk_fringe);
            obj.problem.labels.unclick(mk_fringe);
            console.log(obj.problem.pqset.length);
            obj.problem.pqset.unclick(choose_path);
            obj.problem.pqset.unclick(choose_path);
            obj.problem.pqset.unclick(choose_path);
            obj.problem.pqset.unclick(choose_path);
        }
        
            
        var obj = this.type == 'circle' ? this : this.pair;
        var newholder = r.rect(pq_search.last_x, pq_search.last_y, 110, 30, 10);
        newholder.attr({'fill': white, 'stroke-width': 3});
        var newtxt = r.text(pq_search.last_x+50,pq_search.last_y+15);
        pq_search.last_x += 130;
        if (pq_search.last_x >= pq_search.paper_width-120)
            {
            pq_search.last_x = 3;
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
        pq_search.pqset.push(newholder,newtxt);
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
                       "edges": ["SA","SB","AD","DB","DC","CG","BC"],
                       "alg": {"DFS" : ["S","S-A","S-A-D","S-A-D-B","S-A-D-B-C","S-A-D-B-C-G"]}};
    pq_search.graph_conf = graph_conf;
        
    var r = Raphael("holder", pq_search.paper_width, pq_search.paper_height);
     
    pq_search.curr_fld = r.text(curr_cons_x,curr_cons_y,"");
    pq_search.curr_fld.attr({font: "14px Fontin-Sans, Arial"});
    var nodes = r.set();
    var labels = r.set();
 
    // draw graph
    pq_search.draw_graph(r,nodes,labels);
    
   
    for (var i = 0, ii = nodes.length; i < ii; i++)
        {
        nodes[i].pair = labels[i];
        labels[i].pair = nodes[i];
        nodes[i].fld = pq_search.curr_fld;
        nodes[i].hnd = mk_fringe;
        nodes[i].problem = pq_search;
        }
    
    
    if (pq_search.demo)
        {
        $(pqsearch_area).hide();
        $(pqsearch_next_btn).button();
        $(pqsearch_next_btn).click(
        function()
            {
            if (pq_search.alg_state=="init_fringe")
                {
                pq_search.fringe.push(graph_conf.alg[pq_search.alg][0]);
                highlight_line(pq_search,3);
                pq_search.alg_state="chk_empty";
                }
            else if(pq_search.alg_state=="chk_empty")
                {
                highlight_line(pq_search,5);
                pq_search.alg_state="select_node";
                }
            else if (pq_search.alg_state=="select_node")
                {
                pq_search.current_node=graph_conf.alg[pq_search.alg][pq_search.node_stage];
                highlight_line(pq_search,6);
                pq_search.alg_state="goal_test";
                }
            else if (pq_search.alg_state=="goal_test")
                {
                if (pq_search.current_node.charAt(pq_search.current_node.length-1) == "G")
                    {
                    pq_search.alg_state="goal_reached";
                    //highlight_line(pq_search,7,green);
                    $("#current_node").css('background-color',green);
                    }
                else
                    {
                    pq_search.alg_state="get_last_state";
                    highlight_line(pq_search,8);
                    }
                }
            else if(pq_search.alg_state=="get_last_state")
                {
                pq_search.current_node_last_state = pq_search.current_node.charAt(pq_search.current_node.length-1);
                pq_search.alg_state="loop_successors";
                highlight_line(pq_search,9);
                }
            else if(pq_search.alg_state=="loop_successors")
                {
                pq_search.successor="";
                pq_search.add_next="";
                for (i=0; i < graph_conf.edges.length;i++)
                    {
                    if (graph_conf.edges[i].charAt(0)== pq_search.current_node_last_state
                        && !pq_search.explored_edges[graph_conf.edges[i]])
                        {
                        pq_search.explored_edges[graph_conf.edges[i]]=1;
                        pq_search.successor=graph_conf.edges[i].charAt(1);
                        pq_search.add_next = pq_search.current_node + "-" + pq_search.successor;
                        //pq_search.add_next=graph_conf.edges[i].charAt(0) + "-" + graph_conf.edges[i].charAt(1);
                        pq_search.alg_state="add_to_fringe";
                        highlight_line(pq_search,10);
                        break;
                        }
                    }
                if (!pq_search.successor)
                    {
                    pq_search.node_stage++;
                    pq_search.alg_state="chk_empty";
                    highlight_line(pq_search,3);
                    var idx_del=0;
                    for (i=0;i<pq_search.fringe.length;i++)
                        {
                        if (pq_search.fringe[i]==pq_search.current_node)
                            {
                            idx_del=i;
                            break;
                            }
                        }
                    pq_search.fringe.splice(idx_del,1);
                    }
                }
            else if(pq_search.alg_state=="add_to_fringe")
                {
                //pq_search.successor = pq_search.add_next.charAt(pq_search.add_next.length-1);
                pq_search.fringe.push(pq_search.add_next);
                pq_search.alg_state="loop_successors";
                highlight_line(pq_search,9);
                
                }
            else
                {
                //probably reached goal, this calls for a celebration
                }
                
            $("#fringe").html(pq_search.fringe.join("<br>"));
            $("#current_node").html(pq_search.current_node);
            $("#successor").html(pq_search.successor);
            $("#current_node_last_state").html(pq_search.current_node_last_state);
            }
        );
         highlight_line(pq_search,1);
        
        }
    else
        {
        nodes.click(mk_fringe);
        labels.click(mk_fringe);
        highlight_line(pq_search,0);
        
        var pqlbl = r.text(60,230,"Priority Queue:");
        pqlbl.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
        
        var currlbl = r.text(curr_cons_x-145,curr_cons_y,"Node currently considered:");
        currlbl.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
        
        var explbl = r.text(pq_search.exp_x,pq_search.exp_y,"Nodes that have been expanded:");
        explbl.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
        pq_search.exp_x = 3;
        pq_search.exp_y += 20;
        
        var curr_highlight = r.rect(curr_cons_x-50, curr_cons_y-12, 110, 30, 10);
        curr_highlight.attr({'stroke-width': 3});
        }
        
    pq_search.nodes = nodes;
    pq_search.labels = labels;
    pq_search.pqset = r.set();
    //$('div#holder').find('> svg,div').css({'border': '1px solid #f00'});
    
    $(pqsearch_hintbox).click(function() {
        if($(pqsearch_hintbox).prop('checked'))
            {
            for (i = 0; i < pq_search.pseudocode.length; i++)
                {
                if (RGBtoHEX($("#pqguide"+i).css('background-color')) == gray)
                    show_hint(i);
                }
            }
        else
            toggle_hints(pq_search.pseudocode);
    });
    
    show_hint(0);
    };
