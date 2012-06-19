
var anspath_coord_x = 420;
var anspath_coord_y= 20;
var green = "#01df01";
var orange= "#ff9000";
var white = "#fff";
var pqsearch_hintbox = "#pqsearch_showhints";

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
    this.pseudocode = [];
    this.firstpass=1;
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
            
            obj.pathFld.attr({text: myTxt});
            var txtNodes = myTxt.split("-");
            for (i = 0; i < nodes.length; i++)
                nodes[i].attr({fill: "#000"});
            for (i = 0; i < txtNodes.length; i++)
                for (j = 0; j < nodes.length; j++)
                    if (labels[j].attr('text') == txtNodes[i])
                        nodes[j].attr({fill: green});

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
                    obj.attr({fill: "#848484"});
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
    
    
    
    var last="";
    var r = Raphael("holder", pq_search.paper_width, pq_search.paper_height);
    
    var fld = r.text(anspath_coord_x,anspath_coord_y,"");
    fld.attr({font: "14px Fontin-Sans, Arial"});
    var nodes = r.set();
    nodes.push(r.circle(20, 100, 20), // S
       r.circle(150, 20, 20), // A
       r.circle(150, 200, 20), // B
       r.circle(350,40,20), // C
       r.circle(300,200,20), // D
       r.circle(500,150,20) // G
       );
    nodes.attr({fill: "#000", stroke: "#fff", "stroke-dasharray": "- ", opacity: .2});
    var labels = r.set();
    labels.push(r.text(20, 100, "S"),
                r.text(150,20,"B"),
                r.text(150,200,"A"),
                r.text(350,40,"C"),
                r.text(300,200,"D"),
                r.text(500,150,"G")
                );
    labels.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
    r.arrow(40,100,130,20,5); // S-B
    r.arrow(40,100,130,200,5); // S-A
    r.arrow(170,200,280,200,5); // A-D
    r.arrow(300,180,350,60,5); // D-C
    r.arrow(370,40,500,130,5); // C-G
    r.arrow(300,180,170,20,5); // D-B
    r.arrow(170,20,330,40,5); // B-C

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
                //console.log($("#pqguide"+i).css('background-color'));
                if (RGBtoHEX($("#pqguide"+i).css('background-color')) == green)
                    show_hint(i);
                }
            }
        else
            toggle_hints(pq_search.pseudocode);
    });
    
    show_hint(0);
    };
