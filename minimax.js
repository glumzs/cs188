(function () {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z = Object.prototype.hasOwnProperty,
        A = function (a, b) {
            function d() {
                this.constructor = a
            }
            for (var c in b) z.call(b, c) && (a[c] = b[c]);
            return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
        },
        B = Array.prototype.indexOf ||
    function (a) {
        for (var b = 0, c = this.length; b < c; b++) if (b in this && this[b] === a) return b;
        return -1
    }, C = function (a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    };
    i = 40, j = 100, h = function () {
        function a(a, b, c) {
            var e, f, g, h, k, l, m, n, o, p, q, r;
            this.paper = a, this.numActionsPerLevel = b.numActionsPerLevel, this.numLevels = this.numActionsPerLevel.length, this.inputField = b.inputField, this.alphabeta = (l = b.alphabeta) != null ? l : !1, this.expectimax = (m = b.expectimax) != null ? m : !1, this.displaySolution = (n = b.solution) != null ? n : !1, this.chosenValues = [], h = this.numActionsPerLevel.reduce(function (a, b) {
                return a * b
            }), f = Math.min(i, this.paper.height / this.numLevels * .2), g = Math.min(j, this.paper.width / h * 1.5), k = {
                root: !0,
                problem: this,
                expectimax: (o = b.expectimax) != null ? o : !1,
                alphabeta: (p = b.alphabeta) != null ? p : !1,
                drawerOpts: {
                    editable: (q = b.editable) != null ? q : !0,
                    feedback: (r = b.feedback) != null ? r : !0,
                    paper: this.paper,
                    x: this.paper.width / 2,
                    y: 50,
                    leftBound: 10,
                    rightBound: this.paper.width - 10,
                    height: f,
                    width: g
                }
            }, this.rootNode = new d(k), e = 0, this.rootNode.createTree(this.numActionsPerLevel, e), c && (this.rootNode.setData(c.values), this.alphabeta && this.rootNode.setAlphaBetaValues(c.alphabetaValues)), this.solve(), this.displaySolution && this.showSolution(), this.setFieldValue()
        }
        return a.prototype.solve = function () {
            return this.alphabeta ? this.rootNode.getValueAlphaBeta(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY) : this.rootNode.getValue()
        }, a.prototype.validate = function () {
            return this.rootNode.validateTree()
        }, a.prototype.draw = function () {
            return this.rootNode.draw(), this.validate()
        }, a.prototype.showSolution = function () {
            return this.rootNode.showSolution()
        }, a.prototype.setFieldValue = function () {
            return this.inputField.val(JSON.stringify(this.getData()))
        }, a.prototype.getData = function () {
            var a, b, c, d, e;
            return b = {}, e = [], this.rootNode.getValueData(e), b.values = e, this.alphabeta && (a = [], this.rootNode.getAlphaBetaValues(a), b.alphabetaValues = a), c = this.rootNode.isCorrect(), this.alphabeta ? d = (c ? "23" : "") + hex_md5(JSON.stringify(e) + JSON.stringify(a) + JSON.stringify(c)) : d = (c ? "23" : "") + hex_md5(JSON.stringify(e) + JSON.stringify(c)), b.submission = d, b
        }, a
    }(), q = function (a) {
        function b(a, b, c) {
            var d, e, f, g, h, k, l, n;
            this.paper = a, this.numActionsPerLevel = b.numActionsPerLevel, this.numLevels = this.numActionsPerLevel.length, this.inputField = b.inputField, this.displaySolution = (k = b.solution) != null ? k : !1, this.chosenValues = [], g = this.numActionsPerLevel.reduce(function (a, b) {
                return a * b
            }), e = Math.min(i, this.paper.height / this.numLevels * .2), f = Math.min(j, this.paper.width / g * 1.5), h = {
                root: !0,
                problem: this,
                drawerOpts: {
                    editable: (l = b.editable) != null ? l : !0,
                    feedback: (n = b.feedback) != null ? n : !0,
                    paper: this.paper,
                    x: this.paper.width / 2,
                    y: 50,
                    leftBound: 10,
                    rightBound: this.paper.width - 10,
                    height: e,
                    width: f
                }
            }, this.rootNode = new m(h), d = 0, this.rootNode.createTree(this.numActionsPerLevel, d), c && this.rootNode.setData(c.values), this.solve(), this.displaySolution && this.showSolution(), this.setFieldValue()
        }
        return A(b, a), b.prototype.solve = function () {
            return this.rootNode.getValues()
        }, b.prototype.validate = function () {
            return this.rootNode.validateTree()
        }, b.prototype.draw = function () {
            return this.rootNode.draw(), this.validate()
        }, b.prototype.showSolution = function () {
            return this.rootNode.showSolution()
        }, b.prototype.setFieldValue = function () {
            return this.inputField.val(JSON.stringify(this.getData()))
        }, b.prototype.getData = function () {
            var a, b, c, d;
            return a = {}, d = [], this.rootNode.getValueData(d), a.values = d, b = this.rootNode.isCorrect(), c = (b ? "23" : "") + hex_md5(JSON.stringify(d) + JSON.stringify(b)), a.submission = c, a
        }, b
    }(h), k = function () {
        function a(a) {
            var b, c, d, e;
            a == null && (a = {}), this.problem = a.problem, this.parent = (b = a.parent) != null ? b : null, this.expectimax = a.expectimax, this.alphabeta = a.alphabeta, this.setValue = (c = a.value) != null ? c : null, this.trueValue = (d = a.value) != null ? d : null, this.root = (e = a.root) != null ? e : !1, this.children = [], this.alphabeta && (this.setAlpha = null, this.setBeta = null, this.trueAlpha = null, this.trueBeta = null), a.drawerOpts.node = this, this.createDrawer(a.drawerOpts)
        }
        return a.prototype.getChildOpts = function (a, b) {
            return {
                parent: this,
                problem: this.problem,
                alphabeta: this.alphabeta,
                expectimax: this.expectimax,
                drawerOpts: this.drawer.getChildOpts(a, b)
            }
        }, a.prototype.createTree = function (a, b) {
            var c, d, e, f, g, h, i, j, k, l;
            e = a[b];
            if (b < a.length - 1) {
                for (d = 0, h = e - 1; 0 <= h ? d <= h : d >= h; 0 <= h ? d++ : d--) this.children.push(this.createChild(this.getChildOpts(d, e)));
                i = this.children, k = [];
                for (f = 0, g = i.length; f < g; f++) c = i[f], k.push(c.createTree(a, b + 1));
                return k
            }
            l = [];
            for (d = 0, j = e - 1; 0 <= j ? d <= j : d >= j; 0 <= j ? d++ : d--) l.push(this.children.push(this.createLeaf(a, this.getChildOpts(d, e))));
            return l
        }, a.prototype.createLeaf = function (a, b) {
            var c, d, e, f;
            b == null && (b = {}), f = 10, c = 0;
            while (d == null || B.call(this.problem.chosenValues, d) >= 0) d = Math.floor((Math.random() - .5) * f), c += 1, c === 30 && (f += 10, c = 0), this.expectimax && (e = a[a.length - 1], d = Math.floor((d + e - 1) / e) * e);
            return this.problem.chosenValues.push(d), b.value = d, new x(b)
        }, a.prototype.showSolution = function () {
            var a, b, c, d, e;
            this.setValue = this.trueValue, this.problem.alphabeta && (this.setAlpha = this.trueAlpha, this.setBeta = this.trueBeta), this.drawer.draw(), d = this.children, e = [];
            for (b = 0, c = d.length; b < c; b++) a = d[b], e.push(a.showSolution());
            return e
        }, a.prototype.draw = function () {
            var a, b, c, d, e, f, g, h, i, j, k;
            this.drawer.draw();
            if (this.alphabeta) {
                h = this.children;
                for (b = 0, e = h.length; b < e; b++) a = h[b], this.drawer.makeAlphaBetaBoxes(a.drawer)
            }
            i = this.children;
            for (c = 0, f = i.length; c < f; c++) a = i[c], this.drawer.connectTo(a.drawer);
            j = this.children, k = [];
            for (d = 0, g = j.length; d < g; d++) a = j[d], k.push(a.draw());
            return k
        }, a.prototype.validateTree = function () {
            var a, b, c, d, e;
            this.drawer.validate(), d = this.children, e = [];
            for (b = 0, c = d.length; b < c; b++) a = d[b], e.push(a.validateTree());
            return e
        }, a.prototype.isCorrect = function () {
            var a, b, c, d, e, f;
            if (this.trueValue === this.setValue || this.trueValue === null && this.setValue === "") {
                a = this.setAlpha, b = this.setBeta;
                if ( !! this.root || this.trueAlpha === a && this.trueBeta === b) {
                    f = this.children;
                    for (d = 0, e = f.length; d < e; d++) {
                        c = f[d];
                        if (!c.isCorrect()) return !1
                    }
                    return !0
                }
                return !1
            }
            return !1
        }, a.prototype.getValue = function () {
            var a;
            return this.trueValue == null && (this.trueValue = function () {
                var b, c, d, e;
                d = this.children, e = [];
                for (b = 0, c = d.length; b < c; b++) a = d[b], e.push(a.getValue());
                return e
            }.call(this).reduce(this.reduceFunction)), this.trueValue
        }, a.prototype.getValueData = function (a) {
            var b, c, d, e, f;
            a.push(this.setValue), e = this.children, f = [];
            for (c = 0, d = e.length; c < d; c++) b = e[c], f.push(b.getValueData(a));
            return f
        }, a.prototype.setData = function (a) {
            var b, c, d, e, f;
            this.setValue = a.shift(), this.drawer.drawValue(), e = this.children, f = [];
            for (c = 0, d = e.length; c < d; c++) b = e[c], f.push(b.setData(a));
            return f
        }, a.prototype.getAlphaBetaValues = function (a) {
            var b, c, d, e, f, g, h;
            b = function () {
                switch (this.setAlpha) {
                case Number.POSITIVE_INFINITY:
                    return "inf";
                case Number.NEGATIVE_INFINITY:
                    return "-inf";
                default:
                    return this.setAlpha
                }
            }.call(this), c = function () {
                switch (this.setBeta) {
                case Number.POSITIVE_INFINITY:
                    return "inf";
                case Number.NEGATIVE_INFINITY:
                    return "-inf";
                default:
                    return this.setBeta
                }
            }.call(this), a.push([b, c]), g = this.children, h = [];
            for (e = 0, f = g.length; e < f; e++) d = g[e], h.push(d.getAlphaBetaValues(a));
            return h
        }, a.prototype.setAlphaBetaValues = function (a) {
            var b, c, d, e, f, g, h, i;
            g = a.shift(), b = g[0], c = g[1], this.setAlpha = function () {
                switch (b) {
                case "inf":
                    return Number.POSITIVE_INFINITY;
                case "-inf":
                    return Number.NEGATIVE_INFINITY;
                default:
                    return b
                }
            }(), this.setBeta = function () {
                switch (c) {
                case "inf":
                    return Number.POSITIVE_INFINITY;
                case "-inf":
                    return Number.NEGATIVE_INFINITY;
                default:
                    return c
                }
            }(), this.drawer.drawValue(), h = this.children, i = [];
            for (e = 0, f = h.length; e < f; e++) d = h[e], i.push(d.setAlphaBetaValues(a));
            return i
        }, a
    }(), d = function (a) {
        function b() {
            b.__super__.constructor.apply(this, arguments)
        }
        return A(b, a), b.prototype.reduceFunction = function (a, b) {
            return Math.max(a, b)
        }, b.prototype.createChild = function (a) {
            return a == null && (a = {}), new f(a)
        }, b.prototype.createDrawer = function (a) {
            return this.drawer = new e(a)
        }, b.prototype.getValueAlphaBeta = function (a, b) {
            var c, d, e, f, g;
            this.trueAlpha = a, this.trueBeta = b, d = Number.NEGATIVE_INFINITY;
            if (this.trueValue == null) {
                g = this.children;
                for (e = 0, f = g.length; e < f; e++) {
                    c = g[e], d = Math.max(d, c.getValueAlphaBeta(a, b));
                    if (d >= b) return this.trueValue = d, this.trueValue;
                    a = Math.max(a, d)
                }
                this.trueValue = d
            }
            return this.trueValue
        }, b
    }(k), a = function (a) {
        function c() {
            c.__super__.constructor.apply(this, arguments)
        }
        return A(c, a), c.prototype.getValue = function () {
            var a, b;
            return this.trueValue == null && (b = function () {
                var b, c, d, e;
                d = this.children, e = [];
                for (b = 0, c = d.length; b < c; b++) a = d[b], e.push(a.getValue());
                return e
            }.call(this).reduce(function (a, b) {
                return a += b
            }), this.trueValue = b / this.children.length), this.trueValue
        }, c.prototype.createChild = function (a) {
            return a == null && (a = {}), new d(a)
        }, c.prototype.createDrawer = function (a) {
            return this.drawer = new b(a)
        }, c
    }(k), f = function (b) {
        function c() {
            c.__super__.constructor.apply(this, arguments)
        }
        return A(c, b), c.prototype.reduceFunction = function (a, b) {
            return Math.min(a, b)
        }, c.prototype.createChild = function (b) {
            return this.expectimax ? new a(b) : new d(b)
        }, c.prototype.getValueAlphaBeta = function (a, b) {
            var c, d, e, f, g;
            this.trueAlpha = a, this.trueBeta = b, d = Number.POSITIVE_INFINITY;
            if (this.trueValue == null) {
                g = this.children;
                for (e = 0, f = g.length; e < f; e++) {
                    c = g[e], d = Math.min(d, c.getValueAlphaBeta(a, b));
                    if (d <= a) return this.trueValue = d, this.trueValue;
                    b = Math.min(b, d)
                }
                this.trueValue = d
            }
            return this.trueValue
        }, c.prototype.createDrawer = function (a) {
            return this.drawer = new g(a)
        }, c
    }(k), x = function (a) {
        function b() {
            b.__super__.constructor.apply(this, arguments)
        }
        return A(b, a), b.prototype.createDrawer = function (a) {
            return this.drawer = new y(a)
        }, b.prototype.setData = function (a) {
            var b, c, d, e, f;
            this.trueValue = a.shift(), this.setValue = this.trueValue, this.drawer.drawValue(), e = this.children, f = [];
            for (c = 0, d = e.length; c < d; c++) b = e[c], f.push(b.setData(a));
            return f
        }, b.prototype.getValueAlphaBeta = function (a, b) {
            return this.trueAlpha = a, this.trueBeta = b, this.trueValue
        }, b
    }(k), v = function () {
        function a(a, b, c) {
            this.paper = a, this.x = b, this.y = c
        }
        return a.prototype.lineTo = function (a, b) {
            var c;
            return b == null && (b = 2), c = this.paper.path("M " + this.x + " " + this.y + "L" + a.x + " " + a.y), c.attr({
                stroke: "#000",
                "stroke-width": b
            }), c
        }, a.prototype.angleTo = function (a) {
            return Raphael.angle(this.x, this.y, a.x, a.y)
        }, a.prototype.midpointTo = function (b) {
            return new a(this.paper, (this.x + b.x) / 2, (this.y + b.y) / 2)
        }, a.prototype.pointAtPercent = function (b, c) {
            return new a(this.paper, this.x * (1 - c) + b.x * c, this.y * (1 - c) + b.y * c)
        }, a.prototype.drawText = function (a, b) {
            var c, d, e, f, g, h, i, j, k, l, m, n = this;
            return b == null && (b = {}), a === Number.POSITIVE_INFINITY ? a = "∞" : a === Number.NEGATIVE_INFINITY && (a = "-∞"), e = (i = b.fontSize) != null ? i : 16, d = (j = b.color) != null ? j : "#000", c = (k = b.backgroundColor) != null ? k : "#fff", f = (l = b.outlineColor) != null ? l : "#fff", g = (m = b.outlineWidth) != null ? m : 2, a = this.paper.text(this.x, this.y, a), a.attr({
                "font-size": e,
                "font-family": "sans-serif",
                fill: d
            }), h = this.paper.rect(this.x - a.getBBox().width / 2, this.y - a.getBBox().height / 2, a.getBBox().width * 1.1, a.getBBox().height).attr({
                fill: c,
                stroke: f,
                "stroke-width": g
            }), a.rect = h, a.updateBox = function (b) {
                return b == null && (b = 5), a.rect.attr({
                    x: n.x - a.getBBox(!0).width / 2,
                    y: n.y - a.getBBox(!0).height / 2,
                    width: a.getBBox(!0).width * 1.1 + b,
                    height: a.getBBox(!0).height
                })
            }, a.updateBoxColor = function (b) {
                return a.rect.attr({
                    stroke: b
                })
            }, a.updateBoxFill = function (b) {
                return a.rect.attr({
                    fill: b
                })
            }, b.angle != null && (b.angle < 270 && (b.angle += 180), a.rotate(b.angle), a.rotation = b.angle, h.rotate(b.angle)), a.toFront(), a
        }, a
    }(), o = function (a) {
        function b(a) {
            var b, c, d, e;
            a == null && (a = {}), this.problem = a.problem, this.parent = (b = a.parent) != null ? b : null, this.setValues = (c = a.values) != null ? c : null, this.trueValues = (d = a.values) != null ? d : null, this.root = (e = a.root) != null ? e : !1, this.children = [], a.drawerOpts.node = this, this.createDrawer(a.drawerOpts)
        }
        return A(b, a), b.prototype.getChildOpts = function (a, b) {
            return {
                parent: this,
                problem: this.problem,
                drawerOpts: this.drawer.getChildOpts(a, b)
            }
        }, b.prototype.createLeaf = function (a, b) {
            var c, d, e, f, g;
            b == null && (b = {}), f = 10, g = [];
            for (d = 0; d <= 1; d++) {
                c = 0;
                while (e == null || B.call(this.problem.chosenValues, e) >= 0) e = Math.floor((Math.random() - .5) * f), c += 1, c === 30 && (f += 10, c = 0);
                g.push(e), this.problem.chosenValues.push(e)
            }
            return b.values = g, new t(b)
        }, b.prototype.showSolution = function () {
            var a, b, c, d, e;
            this.setValues = this.trueValues, this.drawer.draw(), d = this.children, e = [];
            for (b = 0, c = d.length; b < c; b++) a = d[b], e.push(a.showSolution());
            return e
        }, b.prototype.draw = function () {
            var a, b, c, d, e, f, g, h;
            this.drawer.draw(), f = this.children;
            for (b = 0, d = f.length; b < d; b++) a = f[b], this.drawer.connectTo(a.drawer);
            g = this.children, h = [];
            for (c = 0, e = g.length; c < e; c++) a = g[c], h.push(a.draw());
            return h
        }, b.prototype.validateTree = function () {
            var a, b, c, d, e;
            this.drawer.validate(), d = this.children, e = [];
            for (b = 0, c = d.length; b < c; b++) a = d[b], e.push(a.validateTree());
            return e
        }, b.prototype.isCorrect = function () {
            var a, b, c, d;
            if (this.setValues == null || this.trueValues[0] !== this.setValues[0] || this.trueValues[1] !== this.setValues[1]) return !1;
            d = this.children;
            for (b = 0, c = d.length; b < c; b++) {
                a = d[b];
                if (!a.isCorrect()) return !1
            }
            return !0
        }, b.prototype.getValues = function () {
            var a;
            return this.trueValues == null && (this.trueValues = function () {
                var b, c, d, e;
                d = this.children, e = [];
                for (b = 0, c = d.length; b < c; b++) a = d[b], e.push(a.getValues());
                return e
            }.call(this).reduce(this.reduceFunction)), this.trueValues
        }, b.prototype.getValueData = function (a) {
            var b, c, d, e, f;
            a.push(this.setValues), e = this.children, f = [];
            for (c = 0, d = e.length; c < d; c++) b = e[c], f.push(b.getValueData(a));
            return f
        }, b.prototype.setData = function (a) {
            var b, c, d, e, f;
            this.setValues = a.shift(), this.drawer.drawValue(), e = this.children, f = [];
            for (c = 0, d = e.length; c < d; c++) b = e[c], f.push(b.setData(a));
            return f
        }, b
    }(k), t = function (a) {
        function b() {
            b.__super__.constructor.apply(this, arguments)
        }
        return A(b, a), b.prototype.createDrawer = function (a) {
            return this.drawer = new u(a)
        }, b.prototype.setData = function (a) {
            var b, c, d, e, f;
            this.trueValues = a.shift(), this.setValues = this.trueValues, this.drawer.drawValue(), e = this.children, f = [];
            for (c = 0, d = e.length; c < d; c++) b = e[c], f.push(b.setData(a));
            return f
        }, b
    }(o), m = function (a) {
        function b() {
            b.__super__.constructor.apply(this, arguments)
        }
        return A(b, a), b.prototype.reduceFunction = function (a, b) {
            return a[0] >= b[0] ? a : b
        }, b.prototype.createChild = function (a) {
            return new r(a)
        }, b.prototype.createDrawer = function (a) {
            return this.drawer = new n(a)
        }, b
    }(o), r = function (a) {
        function b() {
            b.__super__.constructor.apply(this, arguments)
        }
        return A(b, a), b.prototype.reduceFunction = function (a, b) {
            return a[1] >= b[1] ? a : b
        }, b.prototype.createChild = function (a) {
            return new m(a)
        }, b.prototype.createDrawer = function (a) {
            return this.drawer = new s(a)
        }, b
    }(o), p = function () {
        function a(a) {
            this.unHighlight = C(this.unHighlight, this), this.highlight = C(this.highlight, this), this.sendValue = C(this.sendValue, this);
            var b, c;
            this.paper = a.paper, this.node = a.node || null, this.x = a.x, this.y = a.y, this.leftBound = a.leftBound, this.rightBound = a.rightBound, this.width = a.width || j, this.height = a.height || i, this.editable = (b = a.editable) != null ? b : !1, this.feedback = (c = a.feedback) != null ? c : !1, this.correct = !1, this.error = !1, this.green = "#0f0", this.red = "#f00", this.blue = "#00f", this.yellow = "#d4c84a", this.white = "#fff", this.minX = this.x - this.width / 2, this.minY = this.y - this.height / 2, this.maxX = this.x + this.width / 2, this.maxY = this.y + this.height / 2, this.topAnchor = new v(this.paper, (this.minX + this.maxX) / 2, this.minY), this.bottomAnchor = new v(this.paper, (this.minX + this.maxX) / 2, this.maxY)
        }
        return a.prototype.connectTo = function (a) {
            return a.parentConnection = this.bottomAnchor.lineTo(a.topAnchor)
        }, a.prototype.draw = function () {
            return this.makeDrawing(), this.unHighlight(), this.setCallbacks(), this.drawValue()
        }, a.prototype.getBordersForChild = function (a, b) {
            var c, d, e;
            return e = (this.rightBound - this.leftBound) / b, d = this.leftBound + e * a, c = d + e, [d, c]
        }, a.prototype.getChildOpts = function (a, b) {
            var c, d, e, f;
            return f = this.getBordersForChild(a, b), c = f[0], e = f[1], d = {
                editable: this.editable,
                feedback: this.feedback,
                paper: this.paper,
                x: (c + e) / 2,
                y: this.y + this.height * 5,
                leftBound: c,
                rightBound: e,
                height: this.height,
                width: this.width
            }, d
        }, a.prototype.makeDrawing = function () {
            return this.drawing = this.paper.path("M " + this.topLeft.x + "     " + this.topLeft.y + "                            L" + this.topRight.x + "     " + this.topRight.y + "                            L" + this.bottomRight.x + "  " + this.bottomRight.y + "                            L" + this.bottomLeft.x + "   " + this.bottomLeft.y + "                            L" + this.topLeft.x + "      " + this.topLeft.y)
        }, a.prototype.sendValue = function () {
            return this.node.parent != null && (this.node.parent.setValues = this.node.setValues, this.node.parent.drawer.drawValue()), this.node.problem.setFieldValue()
        }, a.prototype.drawValue = function () {
            this.text != null && ($(this.text.node).remove(), delete this.text);
            if (this.node.setValues != null) {
                this.text = this.paper.text(this.x, this.y, "(" + this.node.setValues[0] + ", " + this.node.setValues[1] + ")"), this.text.attr({
                    "font-size": 16,
                    "font-family": "Trebuchet MS"
                });
                if (this.editable) return $(this.text.node).click(this.sendValue), $(this.text.node).mouseover(this.highlight), $(this.text.node).mouseout(this.unHighlight)
            }
        }, a.prototype.setCallbacks = function () {
            if (this.editable) return $(this.drawing.node).mouseover(this.highlight), $(this.drawing.node).mouseout(this.unHighlight), $(this.drawing.node).click(this.sendValue)
        }, a.prototype.validate = function () {
            if (this.feedback) return this.validateValue(), this.updateValueBoxColor()
        }, a.prototype.validateValue = function () {
            return this.error = this.node.setValues == null || this.node.setValues[0] !== this.node.trueValues[0] || this.node.setValues[1] !== this.node.trueValues[1], this.correct = !this.error
        }, a.prototype.highlight = function (a) {
            return this.drawing.attr({
                stroke: this.yellow,
                "stroke-width": 4
            })
        }, a.prototype.unHighlight = function (a) {
            return this.updateValueBoxColor()
        }, a.prototype.updateValueBoxColor = function () {
            return this.error ? this.drawing.attr({
                stroke: "#f00",
                fill: "#fee",
                "stroke-width": 4
            }) : this.correct ? this.drawing.attr({
                stroke: "#0f0",
                fill: "#fff",
                "stroke-width": 4
            }) : this.drawing.attr({
                fill: this.white,
                stroke: this.blue,
                "stroke-width": 3
            })
        }, a
    }(), s = function (a) {
        function b(a) {
            var c;
            b.__super__.constructor.call(this, a), c = .9, this.topLeft = new v(this.paper, this.minX, this.minY), this.topRight = new v(this.paper, this.maxX - this.width * (1 - c), this.minY), this.bottomLeft = new v(this.paper, this.minX, this.maxY), this.bottomRight = new v(this.paper, this.maxX - this.width * (1 - c), this.maxY), this.corner = new v(this.paper, this.maxX, (this.minY + this.maxY) / 2)
        }
        return A(b, a), b.prototype.makeDrawing = function () {
            return this.drawing = this.paper.path("M " + this.topLeft.x + "     " + this.topLeft.y + "                            L" + this.topRight.x + "     " + this.topRight.y + "                            L" + this.corner.x + "       " + this.corner.y + "                            L" + this.bottomRight.x + "  " + this.bottomRight.y + "                            L" + this.bottomLeft.x + "   " + this.bottomLeft.y + "                            L" + this.topLeft.x + "      " + this.topLeft.y)
        }, b
    }(p), n = function (a) {
        function b(a) {
            var c;
            b.__super__.constructor.call(this, a), c = .9, this.topLeft = new v(this.paper, this.minX + this.width * (1 - c), this.minY), this.topRight = new v(this.paper, this.maxX, this.minY), this.bottomLeft = new v(this.paper, this.minX + this.width * (1 - c), this.maxY), this.bottomRight = new v(this.paper, this.maxX, this.maxY), this.corner = new v(this.paper, this.minX, (this.minY + this.maxY) / 2)
        }
        return A(b, a), b.prototype.makeDrawing = function () {
            return this.drawing = this.paper.path("M " + this.topLeft.x + "     " + this.topLeft.y + "                            L" + this.topRight.x + "     " + this.topRight.y + "                            L" + this.bottomRight.x + "  " + this.bottomRight.y + "                            L" + this.bottomLeft.x + "   " + this.bottomLeft.y + "                            L" + this.corner.x + "       " + this.corner.y + "                            L" + this.topLeft.x + "      " + this.topLeft.y)
        }, b
    }(p), u = function (a) {
        function b(a) {
            b.__super__.constructor.call(this, a), this.topLeft = new v(this.paper, this.minX, this.minY), this.topRight = new v(this.paper, this.maxX, this.minY), this.bottomLeft = new v(this.paper, this.minX, this.maxY), this.bottomRight = new v(this.paper, this.maxX, this.maxY)
        }
        return A(b, a), b.prototype.updateValueBoxColor = function () {
            return this.drawing.attr({
                fill: this.white,
                stroke: "#000",
                "stroke-width": 3
            })
        }, b
    }(p), l = function () {
        function a(a) {
            this.unHighlight = C(this.unHighlight, this), this.highlightBeta = C(this.highlightBeta, this), this.highlightAlpha = C(this.highlightAlpha, this), this.highlight = C(this.highlight, this), this.editBeta = C(this.editBeta, this), this.editAlpha = C(this.editAlpha, this), this.editValue = C(this.editValue, this), this.clearFocus = C(this.clearFocus, this), this.handleKey = C(this.handleKey, this);
            var b, c;
            this.paper = a.paper, this.node = a.node || null, this.x = a.x, this.y = a.y, this.leftBound = a.leftBound, this.rightBound = a.rightBound, this.width = a.width || j, this.height = a.height || i, this.editable = (b = a.editable) != null ? b : !1, this.feedback = (c = a.feedback) != null ? c : !1, this.correct = !1, this.error = !1, this.node.problem.alphabeta && (this.alphaCorrect = !1, this.betaCorrect = !1, this.alphaError = !1, this.betaError = !1), this.green = "#0f0", this.red = "#f00", this.blue = "#00f", this.yellow = "#d4c84a", this.white = "#fff"
        }
        return a.prototype.draw = function () {
            return this.makeDrawing(), this.unHighlight(), this.setCallbacks(), this.drawValue()
        }, a.prototype.setCallbacks = function () {
            if (this.editable) return $(this.drawing.node).mouseover(this.highlight), $(this.drawing.node).mouseout(this.unHighlight), $(this.drawing.node).click(this.editValue)
        }, a.prototype.handleKey = function (a) {
            var b;
            switch (this.focusedField) {
            case "value":
                switch (a) {
                case "bs":
                    this.tempValue = this.tempValue.slice(0, -1);
                    break;
                case "i":
                case "I":
                    (function () {});
                    break;
                case "-":
                    this.tempValue.length === 0 && (this.tempValue = a);
                    break;
                default:
                    this.tempValue += a
                }
                return this.text.attr({
                    text: this.tempValue
                }), this.text.updateCursor(), this.updateValue();
            case "alpha":
                switch (a) {
                case "bs":
                    this.tempAlpha = this.tempAlpha.slice(0, -1);
                    break;
                case "i":
                case "I":
                    if (this.tempAlpha.length === 0 || this.tempAlpha.length === 1 && this.tempAlpha[0] === "-") this.tempAlpha += "∞";
                    break;
                case "-":
                    this.tempAlpha.length === 0 && (this.tempAlpha = a);
                    break;
                default:
                    this.tempAlpha.length <= 3 && this.tempAlpha[0] !== "∞" && this.tempAlpha[1] !== "∞" && (this.tempAlpha += a)
                }
                return this.alphaText.attr({
                    text: "α:" + this.tempAlpha
                }), this.alphaText.updateCursor(), b = this.tempAlpha.length === 0 ? 10 : 3, this.alphaText.updateBox(b), this.updateAlpha();
            case "beta":
                switch (a) {
                case "bs":
                    this.tempBeta = this.tempBeta.slice(0, -1);
                    break;
                case "i":
                case "I":
                    if (this.tempBeta.length === 0 || this.tempBeta.length === 1 && this.tempBeta[0] === "-") this.tempBeta += "∞";
                    break;
                case "-":
                    this.tempBeta.length === 0 && (this.tempBeta = a);
                    break;
                default:
                    this.tempBeta.length <= 3 && this.tempBeta[0] !== "∞" && this.tempBeta[1] !== "∞" && (this.tempBeta += a)
                }
                return this.betaText.attr({
                    text: "β:" + this.tempBeta
                }), this.betaText.updateCursor(), b = this.tempBeta.length === 0 ? 10 : 3, this.betaText.updateBox(b), this.updateBeta();
            case "":
                return function () {}
            }
        }, a.prototype.clearFocus = function () {
            this.paper.focused = null, this.paper.focusedTime = 0;
            switch (this.focusedField) {
            case "value":
                this.text.removeCursor(), this.tempValue = "";
                break;
            case "alpha":
                this.alphaText.removeCursor(), this.tempAlpha = "";
                break;
            case "beta":
                this.betaText.removeCursor(), this.tempBeta = ""
            }
            return this.focusedField = ""
        }, a.prototype.editValue = function (a) {
            var b, c, d;
            return (b = this.paper.focused) != null && b.clearFocus(), this.paper.focused = this, this.paper.focusedTime = (new Date).getTime(), this.focusedField = "value", this.tempValue = (c = (d = this.node.setValue) != null ? d.toString() : void 0) != null ? c : "", this.text != null ? this.text.attr({
                text: this.tempValue
            }) : (this.text = this.paper.text(this.x, this.y, this.tempValue), this.text.attr({
                "font-size": 24,
                "font-family": "Trebuchet MS"
            }), $(this.text.node).click(this.editValue)), this.text.addCursor()
        }, a.prototype.editAlpha = function (a) {
            var b, c;
            return (c = this.paper.focused) != null && c.clearFocus(), this.paper.focused = this, this.paper.focusedTime = (new Date).getTime(), this.focusedField = "alpha", this.tempAlpha = function () {
                switch (this.node.setAlpha) {
                case null:
                    return "";
                case Number.NEGATIVE_INFINITY:
                    return "-∞";
                case Number.POSITIVE_INFINITY:
                    return "∞";
                default:
                    return this.node.setAlpha.toString()
                }
            }.call(this), this.alphaText.attr({
                text: "α:" + this.tempAlpha
            }), this.alphaText.addCursor(), b = this.tempAlpha.length === 0 ? 10 : 3, this.alphaText.updateBox(b)
        }, a.prototype.editBeta = function (a) {
            var b, c;
            return (c = this.paper.focused) != null && c.clearFocus(), this.paper.focused = this, this.paper.focusedTime = (new Date).getTime(), this.focusedField = "beta", this.tempBeta = function () {
                switch (this.node.setBeta) {
                case null:
                    return "";
                case Number.NEGATIVE_INFINITY:
                    return "-∞";
                case Number.POSITIVE_INFINITY:
                    return "∞";
                default:
                    return this.node.setBeta.toString()
                }
            }.call(this), this.betaText.attr({
                text: "β:" + this.tempBeta
            }), this.betaText.addCursor(), b = this.tempBeta.length === 0 ? 10 : 3, this.betaText.updateBox(b)
        }, a.prototype.updateValue = function () {
            switch (this.tempValue) {
            case "":
                this.node.setValue = null;
                break;
            default:
                this.node.setValue = parseInt(this.tempValue)
            }
            return this.node.problem.setFieldValue(), this.validate()
        }, a.prototype.updateAlpha = function () {
            this.tempAlpha == null && (this.tempAlpha = null);
            switch (this.tempAlpha) {
            case null:
                this.node.setAlpha = null;
                break;
            case "":
                this.node.setAlpha = null;
                break;
            case "-":
                this.node.setAlpha = "-";
                break;
            case "-∞":
                this.node.setAlpha = Number.NEGATIVE_INFINITY;
                break;
            case "∞":
                this.node.setAlpha = Number.POSITIVE_INFINITY;
                break;
            default:
                this.node.setAlpha = parseInt(this.tempAlpha)
            }
            return this.node.problem.setFieldValue(), this.validate()
        }, a.prototype.updateBeta = function () {
            this.tempBeta == null && (this.tempBeta = null);
            switch (this.tempBeta) {
            case null:
                this.node.setBeta = null;
                break;
            case "":
                this.node.setBeta = null;
                break;
            case "-":
                this.node.setBeta = "-";
                break;
            case "-∞":
                this.node.setBeta = Number.NEGATIVE_INFINITY;
                break;
            case "∞":
                this.node.setBeta = Number.POSITIVE_INFINITY;
                break;
            default:
                this.node.setBeta = parseInt(this.tempBeta)
            }
            return this.node.problem.setFieldValue(), this.validate()
        }, a.prototype.validate = function () {
            if (this.feedback) {
                this.validateValue(), this.updateValueBoxColor();
                if (this.node.problem.alphabeta) return this.validateAlphaBeta(), this.updateAlphaBetaColors()
            }
        }, a.prototype.validateValue = function () {
            return this.error = this.node.setValue !== this.node.trueValue, this.correct = this.node.setValue === this.node.trueValue
        }, a.prototype.validateAlphaBeta = function () {
            var a, b;
            return a = this.node.setAlpha, b = this.node.setBeta, this.alphaError = this.node.trueAlpha !== a, this.betaError = this.node.trueBeta !== b, this.alphaCorrect = this.node.trueAlpha === a, this.betaCorrect = this.node.trueBeta === b
        }, a.prototype.highlight = function (a) {
            return this.drawing.attr({
                stroke: this.yellow,
                "stroke-width": 4
            })
        }, a.prototype.highlightAlpha = function (a) {
            return this.alphaText.updateBoxColor(this.yellow)
        }, a.prototype.highlightBeta = function (a) {
            return this.betaText.updateBoxColor(this.yellow)
        }, a.prototype.unHighlight = function (a) {
            this.updateValueBoxColor();
            if (this.node.problem.alphabeta) return this.updateAlphaBetaColors()
        }, a.prototype.updateValueBoxColor = function () {
            return this.error ? this.drawing.attr({
                stroke: "#f00",
                fill: "#fee",
                "stroke-width": 4
            }) : this.correct ? this.drawing.attr({
                stroke: "#0f0",
                fill: "#fff",
                "stroke-width": 4
            }) : this.drawing.attr({
                fill: this.white,
                stroke: this.blue,
                "stroke-width": 3
            })
        }, a.prototype.updateAlphaBetaColors = function () {
            if (this.node.problem.alphabeta && this.alphaText && this.betaText) return this.alphaError ? (this.alphaText.updateBoxColor(this.red), this.alphaText.updateBoxFill("#fee")) : this.alphaCorrect ? (this.alphaText.updateBoxColor(this.green), this.alphaText.updateBoxFill(this.white)) : (this.alphaText.updateBoxColor(this.blue), this.alphaText.updateBoxFill(this.white)), this.betaError ? (this.betaText.updateBoxColor(this.red), this.betaText.updateBoxFill("#fee")) : this.betaCorrect ? (this.betaText.updateBoxColor(this.green), this.betaText.updateBoxFill(this.white)) : (this.betaText.updateBoxColor(this.blue), this.betaText.updateBoxFill(this.white))
        }, a.prototype.connectTo = function (a) {
            return a.parentConnection = this.bottomAnchor.lineTo(a.topAnchor)
        }, a.prototype.makeAlphaBetaBoxes = function (a) {
            var b, c, d;
            c = this.bottomAnchor.angleTo(a.topAnchor), c < 270 ? (b = this.bottomAnchor.pointAtPercent(a.topAnchor, .35), d = this.bottomAnchor.pointAtPercent(a.topAnchor, .75), b.x -= 15 * Math.sin(c * Math.PI / 180), b.y += 15 * Math.cos(c * Math.PI / 180), d.x -= 15 * Math.sin(c * Math.PI / 180), d.y += 15 * Math.cos(c * Math.PI / 180)) : (b = this.bottomAnchor.pointAtPercent(a.topAnchor, .75), d = this.bottomAnchor.pointAtPercent(a.topAnchor, .35), b.x += 20 * Math.sin(c * Math.PI / 180), b.y -= 20 * Math.cos(c * Math.PI / 180), d.x += 20 * Math.sin(c * Math.PI / 180), d.y -= 20 * Math.cos(c * Math.PI / 180)), a.alphaText = b.drawText("α:", {
                fontSize: 20,
                angle: c,
                outlineColor: "#00f"
            }), a.betaText = d.drawText("β:", {
                fontSize: 20,
                angle: c,
                outlineColor: "#00f"
            }), a.alphaText.updateBox(10), a.betaText.updateBox(10);
            if (this.editable) return a.alphaText.click(a.editAlpha), a.alphaText.rect.click(a.editAlpha), a.betaText.click(a.editBeta), a.betaText.rect.click(a.editBeta), $(a.alphaText.rect.node).mouseover(a.highlightAlpha), $(a.betaText.rect.node).mouseover(a.highlightBeta), $(a.alphaText.node).mouseover(a.highlightAlpha), $(a.betaText.node).mouseover(a.highlightBeta), $(a.alphaText.node).mouseout(a.unHighlight), $(a.betaText.node).mouseout(a.unHighlight), $(a.alphaText.rect.node).mouseout(a.unHighlight), $(a.betaText.rect.node).mouseout(a.unHighlight)
        }, a.prototype.getBordersForChild = function (a, b) {
            var c, d, e;
            return e = (this.rightBound - this.leftBound) / b, d = this.leftBound + e * a, c = d + e, [d, c]
        }, a.prototype.getChildOpts = function (a, b) {
            var c, d, e, f;
            return f = this.getBordersForChild(a, b), c = f[0], e = f[1], d = {
                editable: this.editable,
                feedback: this.feedback,
                paper: this.paper,
                x: (c + e) / 2,
                y: this.y + this.height * 5,
                leftBound: c,
                rightBound: e,
                height: this.height,
                width: this.width
            }, d
        }, a.prototype.drawValue = function () {
            var a, b, c, d;
            this.node.setValue != null && (this.text != null && ($(this.text.node).remove(), delete this.text), this.text = this.paper.text(this.x, this.y, this.node.setValue), this.text.attr({
                "font-size": 24,
                "font-family": "Trebuchet MS"
            }));
            if (this.node.problem.alphabeta) {
                a = function () {
                    switch (this.node.setAlpha) {
                    case null:
                        return "";
                    case Number.NEGATIVE_INFINITY:
                        return "-∞";
                    case Number.POSITIVE_INFINITY:
                        return "∞";
                    default:
                        return this.node.setAlpha.toString()
                    }
                }.call(this), b = function () {
                    switch (this.node.setBeta) {
                    case null:
                        return "";
                    case Number.NEGATIVE_INFINITY:
                        return "-∞";
                    case Number.POSITIVE_INFINITY:
                        return "∞";
                    default:
                        return this.node.setBeta.toString()
                    }
                }.call(this);
                if (this.alphaText != null && this.betaText != null) return this.alphaText.attr({
                    text: "α:" + a
                }), this.betaText.attr({
                    text: "β:" + b
                }), c = a.length === 0 ? 10 : 3, d = b.length === 0 ? 10 : 3, this.alphaText.updateBox(c), this.betaText.updateBox(d)
            }
        }, a
    }(), c = function (a) {
        function b(a) {
            b.__super__.constructor.call(this, a), this.radius = (this.width + this.height) / 4, this.topAnchor = new v(this.paper, this.x, this.y - this.radius), this.bottomAnchor = new v(this.paper, this.x, this.y + this.radius)
        }
        return A(b, a), b.prototype.makeDrawing = function () {
            return this.drawing = this.paper.circle(this.x, this.y, this.radius)
        }, b
    }(l), b = function (a) {
        function b() {
            b.__super__.constructor.apply(this, arguments)
        }
        return A(b, a), b
    }(c), w = function (a) {
        function b(a) {
            b.__super__.constructor.call(this, a), this.minX = this.x - this.width / 2, this.minY = this.y - this.height / 2, this.maxX = this.x + this.width / 2, this.maxY = this.y + this.height / 2, this.topAnchor = new v(this.paper, (this.minX + this.maxX) / 2, this.minY), this.bottomAnchor = new v(this.paper, (this.minX + this.maxX) / 2, this.maxY)
        }
        return A(b, a), b.prototype.makeDrawing = function () {
            return this.drawing = this.paper.path("M " + this.topLeft.x + "     " + this.topLeft.y + "                            L" + this.topRight.x + "     " + this.topRight.y + "                            L" + this.bottomRight.x + "  " + this.bottomRight.y + "                            L" + this.bottomLeft.x + "   " + this.bottomLeft.y + "                            L" + this.topLeft.x + "      " + this.topLeft.y)
        }, b
    }(l), e = function (a) {
        function b(a) {
            var c;
            b.__super__.constructor.call(this, a), c = .65, this.topLeft = new v(this.paper, this.minX + this.width * ((1 - c) / 2), this.minY), this.topRight = new v(this.paper, this.maxX - this.width * ((1 - c) / 2), this.minY), this.bottomLeft = new v(this.paper, this.minX, this.maxY), this.bottomRight = new v(this.paper, this.maxX, this.maxY)
        }
        return A(b, a), b
    }(w), g = function (a) {
        function b(a) {
            var c;
            b.__super__.constructor.call(this, a), c = .65, this.topLeft = new v(this.paper, this.minX, this.minY), this.topRight = new v(this.paper, this.maxX, this.minY), this.bottomLeft = new v(this.paper, this.minX + this.width * ((1 - c) / 2), this.maxY), this.bottomRight = new v(this.paper, this.maxX - this.width * ((1 - c) / 2), this.maxY)
        }
        return A(b, a), b
    }(w), y = function (a) {
        function b(a) {
            a.width *= .45, b.__super__.constructor.call(this, a), this.bottomLeft = new v(this.paper, this.maxX, this.minY), this.bottomRight = new v(this.paper, this.maxX, this.maxY), this.topLeft = new v(this.paper, this.minX, this.minY), this.topRight = new v(this.paper, this.minX, this.maxY)
        }
        return A(b, a), b.prototype.setCallbacks = function () {}, b.prototype.validateValue = function () {}, b.prototype.updateValueBoxColor = function () {
            return this.drawing.attr({
                stroke: "#fff"
            })
        }, b
    }(w), $(document).ready(function () {
        var a, b, c, d;
        return Raphael.el.addCursor = function () {
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
        }, Raphael.el.updateCursor = function () {
            var a;
            if (this.cursor == null) return;
            return this.attr("text") === "" ? a = 0 : a = this.getBBox(!0).width / 2, this.cursor.attr({
                x: this.attrs.x + a + 2,
                y: this.attrs.y - 2
            })
        }, Raphael.el.removeCursor = function () {
            if (this.cursor == null) return;
            return clearInterval(this.cursor.blinker), $(this.cursor.node).remove(), delete this.cursor
        }, b = [], c = [], $(".minimax").each(function (a) {
            var d, e, f, g, j, k, l = this;
            return j = JSON.parse($(this).siblings(".parameters").text()), d = JSON.parse($(this).siblings(".data").text()), f = j.numActionsPerLevel.length, e = $(this).siblings(".json_submission").find("input"), j.inputField = e, g = new Raphael(this, $(this).parents(":first").width(), (f * 6 + 1) * i), k = new h(g, j, d), k.draw(), $(g.canvas).click(function (a) {
                if ($(g.canvas)[0] === a.target && g.focused != null) return g.focused.clearFocus()
            }), b.push(g), c.push(k)
        }), a = function () {
            var a, c, d, e, f, g, h, i, j;
            c = 0, d = null, a = 0;
            for (f = 0, h = b.length; f < h; f++) e = b[f], e.focused != null && (a += 1, e.focusedTime > c && (d = e, c = e.focusedTime));
            if (a > 1) {
                j = [];
                for (g = 0, i = b.length; g < i; g++) e = b[g], e !== d && e.focused != null ? j.push(e.focused.clearFocus()) : j.push(void 0);
                return j
            }
        }, $(document).click(function (b) {
            return a(), !0
        }), $(document).keyup(function (c) {
            var d, e, f, g;
            a(), g = [];
            for (e = 0, f = b.length; e < f; e++) {
                d = b[e];
                if (d.focused != null) switch (c.which) {
                case 8:
                    g.push(d.focused.handleKey("bs"));
                    break;
                case 9:
                case 10:
                case 13:
                    g.push(d.focused.clearFocus());
                    break;
                case 109:
                case 189:
                    g.push(d.focused.handleKey("-"));
                    break;
                default:
                    c.which >= 48 && c.which <= 57 || c.which === 73 ? g.push(d.focused.handleKey(String.fromCharCode(c.which))) : g.push(void 0)
                } else g.push(void 0)
            }
            return g
        }), $(".nonzerosum").each(function (a) {
            var b, c, d, e, f, g;
            return f = JSON.parse($(this).siblings(".parameters").text()), b = JSON.parse($(this).siblings(".data").text()), d = f.numActionsPerLevel.length, c = $(this).siblings(".json_submission").find("input"), f.inputField = c, e = new Raphael(this, $(this).parents(":first").width(), (d * 6 + 1) * i), g = new q(e, f, b), g.draw()
        }), d = function (a) {
            var b;
            b = 0, window.event ? b = window.event.keyCode : a.which && (b = a.which);
            switch (b) {
            case 8:
            case 9:
            case 189:
                return !1;
            default:
                return !(b >= 48 && b <= 57)
            }
            return !0
        }, document.onkeydown = d, document.onkeypress = d
    })
}).call(this);