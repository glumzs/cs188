var last_x = 0;

function goal_test()
    {
    var html = 'Goal State?';

    var $dialog = $('<div id="goaltest"></div>')
        .html(html)
        .dialog({autoOpen: false,
	    modal: true,
	    title: 'Goal Test',
	    buttons: {"No": function() {$(this).dialog("close");},
                  "Yes": function() {$(this).dialog("close");}}
	});
    $dialog.dialog('open');
    }

            
            
window.onload = function () 
    {
                
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
                        nodes[j].attr({fill: "#01DF01"});

            goal_test();


                       
        }
        
            
        var obj = this.type == 'circle' ? this : this.pair;
        var newholder = r.rect(window['last_x'], 250, 100, 30, 10);
        newholder.attr({fill: '#fff'});
        var newtxt = r.text(window['last_x']+50,265);
        window['last_x'] += 120;
        var fldTxt = obj.fld.attr('text');
        if (fldTxt)
            fldTxt += '-';
        fldTxt += obj.pair.attr('text');
        newholder.pair = newtxt;
        newtxt.pair = newholder;
        newholder.pathFld = obj.fld;
        newtxt.attr({text: fldTxt, font: "14px Fontin-Sans, Arial",
                    cursor: 'default'});
        newtxt.pair.click(choose_path);
        newtxt.click(choose_path);
        
    }
    
    
    
    var last="";
    var r = Raphael("holder", 2000, 1000);
    
    var fld = r.text(220,10,"");
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
        nodes[i].nodes = nodes;
        nodes[i].labels = labels;
        }
    
    
    nodes.click(mk_fringe);
    labels.click(mk_fringe);


    };
