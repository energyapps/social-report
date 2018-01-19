function on_resize(e, t) {
    return onresize = function() {
        clearTimeout(t), t = setTimeout(e, 100)
    }, e
}

function on_resize(e, t) {
    return onresize = function() {
        clearTimeout(t), t = setTimeout(e, 100)
    }, e
}
window.Modernizr = function(e, t, n) {
        function r(e) {
            y.cssText = e
        }

        function i(e, t) {
            return typeof e === t
        }

        function o(e, t) {
            return !!~("" + e).indexOf(t)
        }

        function a(e, t) {
            for (var r in e) {
                var i = e[r];
                if (!o(i, "-") && y[i] !== n) return "pfx" == t ? i : !0
            }
            return !1
        }

        function s(e, t, r) {
            for (var o in e) {
                var a = t[e[o]];
                if (a !== n) return r === !1 ? e[o] : i(a, "function") ? a.bind(r || t) : a
            }
            return !1
        }

        function c(e, t, n) {
            var r = e.charAt(0).toUpperCase() + e.slice(1),
                o = (e + " " + x.join(r + " ") + r).split(" ");
            return i(t, "string") || i(t, "undefined") ? a(o, t) : (o = (e + " " + C.join(r + " ") + r).split(" "), s(o, t, n))
        }

        function u() {
            f.input = function(n) {
                for (var r = 0, i = n.length; i > r; r++) F[n[r]] = !!(n[r] in w);
                return F.list && (F.list = !(!t.createElement("datalist") || !e.HTMLDataListElement)), F
            }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), f.inputtypes = function(e) {
                for (var r, i, o, a = 0, s = e.length; s > a; a++) w.setAttribute("type", i = e[a]), r = "text" !== w.type, r && (w.value = E, w.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(i) && w.style.WebkitAppearance !== n ? (h.appendChild(w), o = t.defaultView, r = o.getComputedStyle && "textfield" !== o.getComputedStyle(w, null).WebkitAppearance && 0 !== w.offsetHeight, h.removeChild(w)) : /^(search|tel)$/.test(i) || (r = /^(url|email)$/.test(i) ? w.checkValidity && w.checkValidity() === !1 : w.value != E)), N[e[a]] = !!r;
                return N
            }("search tel url email datetime date month week time datetime-local number range color".split(" "))
        }
        var l, d, m = "2.8.3",
            f = {},
            p = !0,
            h = t.documentElement,
            v = "modernizr",
            g = t.createElement(v),
            y = g.style,
            w = t.createElement("input"),
            E = ":)",
            b = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
            T = "Webkit Moz O ms",
            x = T.split(" "),
            C = T.toLowerCase().split(" "),
            S = {
                svg: "http://www.w3.org/2000/svg"
            },
            _ = {},
            N = {},
            F = {},
            A = [],
            z = A.slice,
            j = function(e, n, r, i) {
                var o, a, s, c, u = t.createElement("div"),
                    l = t.body,
                    d = l || t.createElement("body");
                if (parseInt(r, 10))
                    for (; r--;) s = t.createElement("div"), s.id = i ? i[r] : v + (r + 1), u.appendChild(s);
                return o = ["&#173;", '<style id="s', v, '">', e, "</style>"].join(""), u.id = v, (l ? u : d).innerHTML += o, d.appendChild(u), l || (d.style.background = "", d.style.overflow = "hidden", c = h.style.overflow, h.style.overflow = "hidden", h.appendChild(d)), a = n(u, e), l ? u.parentNode.removeChild(u) : (d.parentNode.removeChild(d), h.style.overflow = c), !!a
            },
            k = {}.hasOwnProperty;
        d = i(k, "undefined") || i(k.call, "undefined") ? function(e, t) {
            return t in e && i(e.constructor.prototype[t], "undefined")
        } : function(e, t) {
            return k.call(e, t)
        }, Function.prototype.bind || (Function.prototype.bind = function(e) {
            var t = this;
            if ("function" != typeof t) throw new TypeError;
            var n = z.call(arguments, 1),
                r = function() {
                    if (this instanceof r) {
                        var i = function() {};
                        i.prototype = t.prototype;
                        var o = new i,
                            a = t.apply(o, n.concat(z.call(arguments)));
                        return Object(a) === a ? a : o
                    }
                    return t.apply(e, n.concat(z.call(arguments)))
                };
            return r
        }), _.touch = function() {
            var n;
            return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : j(["@media (", b.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
                n = 9 === e.offsetTop
            }), n
        }, _.cssanimations = function() {
            return c("animationName")
        }, _.csstransitions = function() {
            return c("transition")
        }, _.svg = function() {
            return !!t.createElementNS && !!t.createElementNS(S.svg, "svg").createSVGRect
        };
        for (var $ in _) d(_, $) && (l = $.toLowerCase(), f[l] = _[$](), A.push((f[l] ? "" : "no-") + l));
        return f.input || u(), f.addTest = function(e, t) {
            if ("object" == typeof e)
                for (var r in e) d(e, r) && f.addTest(r, e[r]);
            else {
                if (e = e.toLowerCase(), f[e] !== n) return f;
                t = "function" == typeof t ? t() : t, "undefined" != typeof p && p && (h.className += " " + (t ? "" : "no-") + e), f[e] = t
            }
            return f
        }, r(""), g = w = null, f._version = m, f._prefixes = b, f._domPrefixes = C, f._cssomPrefixes = x, f.testProp = function(e) {
            return a([e])
        }, f.testAllProps = c, f.testStyles = j, h.className = h.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (p ? " js " + A.join(" ") : ""), f
    }(this, this.document),
    function(e, t) {
        function n(e, t) {
            var n = e.createElement("p"),
                r = e.getElementsByTagName("head")[0] || e.documentElement;
            return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
        }

        function r() {
            var e = x.elements;
            return "string" == typeof e ? e.split(" ") : e
        }

        function i(e) {
            var t = T[e[E]];
            return t || (t = {}, b++, e[E] = b, T[b] = t), t
        }

        function o(e, n, r) {
            if (n || (n = t), h) return n.createElement(e);
            r || (r = i(n));
            var o;
            return o = r.cache[e] ? r.cache[e].cloneNode() : w.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !o.canHaveChildren || y.test(e) || o.tagUrn ? o : r.frag.appendChild(o)
        }

        function a(e, n) {
            if (e || (e = t), h) return e.createDocumentFragment();
            n = n || i(e);
            for (var o = n.frag.cloneNode(), a = 0, s = r(), c = s.length; c > a; a++) o.createElement(s[a]);
            return o
        }

        function s(e, t) {
            t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                return x.shivMethods ? o(n, e, t) : t.createElem(n)
            }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/\w+/g, function(e) {
                return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
            }) + ");return n}")(x, t.frag)
        }

        function c(e) {
            e || (e = t);
            var r = i(e);
            return !x.shivCSS || p || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), h || s(e, r), e
        }

        function u(e) {
            for (var t, n = e.getElementsByTagName("*"), i = n.length, o = RegExp("^(?:" + r().join("|") + ")$", "i"), a = []; i--;) t = n[i], o.test(t.nodeName) && a.push(t.applyElement(l(t)));
            return a
        }

        function l(e) {
            for (var t, n = e.attributes, r = n.length, i = e.ownerDocument.createElement(S + ":" + e.nodeName); r--;) t = n[r], t.specified && i.setAttribute(t.nodeName, t.nodeValue);
            return i.style.cssText = e.style.cssText, i
        }

        function d(e) {
            for (var t, n = e.split("{"), i = n.length, o = RegExp("(^|[\\s,>+~])(" + r().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), a = "$1" + S + "\\:$2"; i--;) t = n[i] = n[i].split("}"), t[t.length - 1] = t[t.length - 1].replace(o, a), n[i] = t.join("}");
            return n.join("{")
        }

        function m(e) {
            for (var t = e.length; t--;) e[t].removeNode()
        }

        function f(e) {
            function t() {
                clearTimeout(a._removeSheetTimer), r && r.removeNode(!0), r = null
            }
            var r, o, a = i(e),
                s = e.namespaces,
                c = e.parentWindow;
            return !_ || e.printShived ? e : ("undefined" == typeof s[S] && s.add(S), c.attachEvent("onbeforeprint", function() {
                t();
                for (var i, a, s, c = e.styleSheets, l = [], m = c.length, f = Array(m); m--;) f[m] = c[m];
                for (; s = f.pop();)
                    if (!s.disabled && C.test(s.media)) {
                        try {
                            i = s.imports, a = i.length
                        } catch (p) {
                            a = 0
                        }
                        for (m = 0; a > m; m++) f.push(i[m]);
                        try {
                            l.push(s.cssText)
                        } catch (p) {}
                    }
                l = d(l.reverse().join("")), o = u(e), r = n(e, l)
            }), c.attachEvent("onafterprint", function() {
                m(o), clearTimeout(a._removeSheetTimer), a._removeSheetTimer = setTimeout(t, 500)
            }), e.printShived = !0, e)
        }
        var p, h, v = "3.7.0",
            g = e.html5 || {},
            y = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            w = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            E = "_html5shiv",
            b = 0,
            T = {};
        ! function() {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", p = "hidden" in e, h = 1 == e.childNodes.length || function() {
                    t.createElement("a");
                    var e = t.createDocumentFragment();
                    return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                }()
            } catch (n) {
                p = !0, h = !0
            }
        }();
        var x = {
            elements: g.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: v,
            shivCSS: g.shivCSS !== !1,
            supportsUnknownElements: h,
            shivMethods: g.shivMethods !== !1,
            type: "default",
            shivDocument: c,
            createElement: o,
            createDocumentFragment: a
        };
        e.html5 = x, c(t);
        var C = /^$|\b(?:all|print)\b/,
            S = "html5shiv",
            _ = !h && function() {
                var n = t.documentElement;
                return !("undefined" == typeof t.namespaces || "undefined" == typeof t.parentWindow || "undefined" == typeof n.applyElement || "undefined" == typeof n.removeNode || "undefined" == typeof e.attachEvent)
            }();
        x.type += " print", x.shivPrint = f, f(t)
    }(this, document), Modernizr.addTest("pointerevents", function() {
        var e, t = document.createElement("x"),
            n = document.documentElement,
            r = window.getComputedStyle;
        return "pointerEvents" in t.style ? (t.style.pointerEvents = "auto", t.style.pointerEvents = "x", n.appendChild(t), e = r && "auto" === r(t, "").pointerEvents, n.removeChild(t), !!e) : !1
    }),
    function() {
        for (var e = 0, t = ["webkit", "moz"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t, n) {
            var r = (new Date).getTime(),
                i = Math.max(0, 16 - (r - e)),
                o = window.setTimeout(function() {
                    t(r + i)
                }, i);
            return e = r + i, o
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
            clearTimeout(e)
        })
    }(), Array.prototype.filter || (Array.prototype.filter = function(e) {
        "use strict";
        if (void 0 === this || null === this) throw new TypeError;
        var t = Object(this),
            n = t.length >>> 0;
        if ("function" != typeof e) throw new TypeError;
        for (var r = [], i = arguments.length >= 2 ? arguments[1] : void 0, o = 0; n > o; o++)
            if (o in t) {
                var a = t[o];
                e.call(i, a, o, t) && r.push(a)
            }
        return r
    }),
    function() {
        window.OSDetector = function() {
            function e() {
                this.platform = navigator.platform, this.user_agent = navigator.userAgent, this.os = this._search(this._os_data, this._agent_data) || "unknown"
            }
            return e.setup = function() {
                return this.self = new e
            }, e.desktop = function() {
                return -1 !== ["windows", "mac", "linux"].indexOf(this.self.os)
            }, e.prototype._search = function(e, t) {
                var n, r;
                for (n = 0; n < e.length;) null !== this.platform.match(e[n].match) && (r = e[n].os), n++;
                if ("linux" === r || !r)
                    for (n = 0; n < t.length;) {
                        if (null !== this.user_agent.match(t[n].match)) return t[n].os;
                        n++
                    }
                return r
            }, e.prototype._os_data = [{
                match: "Win",
                os: "windows"
            }, {
                match: "Mac",
                os: "mac"
            }, {
                match: "iPad",
                os: "ios"
            }, {
                match: "iPhone",
                os: "ios"
            }, {
                match: "Android",
                os: "android"
            }, {
                match: "Linux",
                os: "linux"
            }], e.prototype._agent_data = [{
                match: "Android",
                os: "android"
            }], e
        }()
    }.call(this),
    /*!
     **  Sizrizr v0.3.1 | MIT
     **  https://github.com/stevenosloan/Sizrizr
     **  built: Apr 10,2013
     */
    window.Sizrizr = function(e, t) {
        var n = t.documentElement,
            r = {};
        return r.points = [], r.width = function() {
            var r = 0,
                i = t.body;
            return "number" == typeof e.innerWidth ? r = e.innerWidth : n && n.clientWidth ? r = n.clientWidth : i && (i.clientWidth || i.clientHeight) && (r = i.clientWidth), r
        }, r.testPoint = function(e, t) {
            var n = r[e].point,
                i = r[e].type;
            test = !1, test = "between" === i && t >= n[0] && t < n[1] ? !0 : test, test = "under" === i && n > t ? !0 : test, test = "over" === i && t >= n ? !0 : test, test === !0 ? (r[e].hasOwnProperty("onchange_to") && !r[e].test && r[e].onchange_to(), r[e].test = !0, r.classes.push("sizrizr-" + e)) : r[e].test = !1
        }, r.addPoint = function(e, t, n) {
            return r.points.push(e), r[e] = {
                point: n,
                type: t
            }, r
        }, r.onchange_to = function(e, t) {
            r[e].onchange_to = t
        }, r.run = function() {
            r.classes = ["sizrizr"];
            for (var e = r.width(), t = r.points.length, i = 0; t > i; i++) r.testPoint(r.points[i], e);
            return n.className = n.className.replace(/(^|\s)no-js(\s|$)/, "$1$2").replace(/(\s)?sizrizr(-\w*)?/g, "") + " " + r.classes.join(" "), r
        }, r
    }(this, this.document),
    function() {}.call(this);