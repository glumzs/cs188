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

