!function l(i, o, s) {
    function u(t, e) {
        if (!o[t]) {
            if (!i[t]) {
                var r = "function" == typeof require && require;
                if (!e && r)
                    return r(t, !0);
                if (c)
                    return c(t, !0);
                var n = new Error("Cannot find module '" + t + "'");
                throw n.code = "MODULE_NOT_FOUND",
                n
            }
            var a = o[t] = {
                exports: {}
            };
            i[t][0].call(a.exports, function(e) {
                return u(i[t][1][e] || e)
            }, a, a.exports, l, i, o, s)
        }
        return o[t].exports
    }
    for (var c = "function" == typeof require && require, e = 0; e < s.length; e++)
        u(s[e]);
    return u
}({
    1: [function(e, t, r) {
        var n = e("../v2/js/templates/tile.hbs")
          , a = e("../v2/js/modules/image.bsfy");
        function l(e) {
            $(".js-selector2-target").removeClass("js-selector2-target"),
            e.addClass("js-selector2-target"),
            gg.selectors.positionSelectors()
        }
        e("../v2/js/helpers/common.bsfy"),
        e("../v2/js/modules/equalHeight.bsfy");
        var o = $(".js-tileParent").html();
        $(".js-searchFilterFeatured").on("click", function() {
            l($(this)),
            $(".js-tileParent").html(o)
        }),
        $(".js-searchFilter").each(function() {
            $(this).on("click", function() {
                l($(this)),
                $.getJSON("/search/query?size=5&" + $(this).data("filter"), function(e) {
                    console.log(e);
                    var t = e.hits.hits || [];
                    for (i = 0; i < t.length; i++) {
                        var r = t[i]._source;
                        $.extend(r, {
                            size: 0 == i ? "large" : "small",
                            projectUrl: r.url,
                            imageUrl: "/pfil/" + r.projid + "/" + r.image_large,
                            preText: '<a href="/search/?selectedCountries=' + r.projctryid + '" class="col_ggSecondary1LighterText text_fontSizeSmaller text_allCaps zindex_linkify layout_rel">' + r.countryname + "</a>"
                        }),
                        $(".tile").eq(i).replaceWith(n(r))
                    }
                    setTileHeights()
                })
            })
        }),
        a.loadBg("js-giftCardSection", "http://www.globalgiving.org/img/giftCards/banner_left", "jpg")
    }
    , {
        "../v2/js/helpers/common.bsfy": 2,
        "../v2/js/modules/equalHeight.bsfy": 5,
        "../v2/js/modules/image.bsfy": 6,
        "../v2/js/templates/tile.hbs": 8
    }],
    2: [function(e, t, r) {
        var a = e("hbsfy/runtime");
        e("./compare.js"),
        e("./math.js"),
        a.registerHelper("trunc", function(e, t, r) {
            if (null == e)
                return r;
            var n = e.substring(0, t);
            return n == e ? e : new a.SafeString(n + "&#8230;")
        }),
        a.registerHelper("formatNumber", function(e, t) {
            var r = 2 === t ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(\d{3})+$)/g;
            return e.toFixed(t).replace(r, "$1,")
        }),
        a.registerHelper("contains", function(e, t, r) {
            var n = e;
            "string" != typeof e && (n = e.toString());
            var a = -1 < n.indexOf(t);
            return console.log(a + " " + e + " " + t),
            a ? r.fn(this) : r.inverse(this)
        })
    }
    , {
        "./compare.js": 3,
        "./math.js": 4,
        "hbsfy/runtime": 28
    }],
    3: [function(e, t, r) {
        var n = n || e("hbsfy/runtime");
        n.registerHelper("compare", function(e, t, r, n) {
            var a;
            if (arguments.length < 3)
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
            if (void 0 === n && (n = r,
            r = t,
            t = "==="),
            !(a = {
                "==": function(e, t) {
                    return e == t
                },
                "===": function(e, t) {
                    return e === t
                },
                "!=": function(e, t) {
                    return e != t
                },
                "!==": function(e, t) {
                    return e !== t
                },
                "<": function(e, t) {
                    return e < t
                },
                ">": function(e, t) {
                    return t < e
                },
                "<=": function(e, t) {
                    return e <= t
                },
                ">=": function(e, t) {
                    return t <= e
                },
                typeof: function(e, t) {
                    return typeof e == t
                }
            })[t])
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + t);
            return a[t](e, r) ? n.fn(this) : n.inverse(this)
        })
    }
    , {
        "hbsfy/runtime": 28
    }],
    4: [function(e, t, r) {
        var n = n || e("hbsfy/runtime");
        n.registerHelper("math", function(e, t, r, n, a) {
            var l = {
                "+": (e = parseFloat(e)) + (r = parseFloat(r)),
                "-": e - r,
                "*": e * r,
                "/": e / r,
                "%": e % r
            }[t];
            return n ? l.toFixed(n) : l
        })
    }
    , {
        "hbsfy/runtime": 28
    }],
    5: [function(e, t, r) {
        function n(e) {
            $("." + e).css("height", "");
            var t = $("." + e).map(function() {
                return $(this).outerHeight()
            }).get()
              , r = Math.max.apply(null, t);
            $("." + e).css("height", r)
        }
        function a(t) {
            t || (t = ["js-equalHeight"]),
            deferred.push(function() {
                for (var e = 0; e < t.length; e++)
                    n(t[e])
            })
        }
        a(),
        t.exports = a
    }
    , {}],
    6: [function(e, t, r) {
        var n = e("./runWhenPresent.bsfy")
          , a = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        function l() {
            var e = "sm";
            return 568 < a && (e = "md"),
            1024 < a && (e = "lg"),
            e
        }
        t.exports = {
            loadBg: function(e, t, r) {
                n(e, function() {
                    document.getElementsByClassName(e)[0].style.backgroundImage = "url('" + t + "_" + l() + "." + r + "')"
                })
            },
            loadSrc: function(e, t, r) {
                n(e, function() {
                    document.getElementsByClassName(e)[0].setAttribute("src", t + "_" + l() + "." + r)
                })
            },
            getSize: l
        }
    }
    , {
        "./runWhenPresent.bsfy": 7
    }],
    7: [function(e, t, r) {
        t.exports = function e(t, r) {
            var n = document.getElementsByClassName(t);
            n.length ? r(n) : setTimeout(function() {
                e(t, r)
            }, 100)
        }
    }
    , {}],
    8: [function(e, t, r) {
        var n = e("hbsfy/runtime");
        t.exports = n.template({
            1: function(e, t, r, n, a) {
                return " tile-lg"
            },
            3: function(e, t, r, n, a) {
                var l;
                return '         <a href="' + e.escapeExpression("function" == typeof (l = null != (l = r.projectUrl || (null != t ? t.projectUrl : t)) ? l : r.helperMissing) ? l.call(null != t ? t : e.nullContext || {}, {
                    name: "projectUrl",
                    hash: {},
                    data: a
                }) : l) + '" onclick="gg.tracking.assignRefAndConversionCode(\'homepage\'); return true;">\n            <div class="grid-0 grid-md-12 box_verticalPadded3" style="position: absolute">\n               <img src=\'/img/svg/icons/trendingTag.svg\' style="height:2.5em;" alt="Trending"/>\n            </div>\n         </a>\n'
            },
            5: function(e, t, r, n, a) {
                return 'id="js-mainPhoto"'
            },
            7: function(e, t, r, n, a) {
                var l, i, o = null != t ? t : e.nullContext || {};
                return 'srcset="' + e.escapeExpression("function" == typeof (i = null != (i = r.srcset || (null != t ? t.srcset : t)) ? i : r.helperMissing) ? i.call(o, {
                    name: "srcset",
                    hash: {},
                    data: a
                }) : i) + '" ' + (null != (l = r.if.call(o, null != t ? t.srcsizes : t, {
                    name: "if",
                    hash: {},
                    fn: e.program(8, a, 0),
                    inverse: e.noop,
                    data: a
                })) ? l : "")
            },
            8: function(e, t, r, n, a) {
                var l;
                return 'sizes="' + e.escapeExpression("function" == typeof (l = null != (l = r.srcsizes || (null != t ? t.srcsizes : t)) ? l : r.helperMissing) ? l.call(null != t ? t : e.nullContext || {}, {
                    name: "srcsizes",
                    hash: {},
                    data: a
                }) : l) + '"'
            },
            10: function(e, t, r, n, a) {
                var l, i, o = null != t ? t : e.nullContext || {}, s = r.helperMissing, u = "function", c = e.escapeExpression;
                return '            <div class="col_ggSecondary1LighterText">\n               ' + (null != (l = typeof (i = null != (i = r.preText || (null != t ? t.preText : t)) ? i : s) === u ? i.call(o, {
                    name: "preText",
                    hash: {},
                    data: a
                }) : i) ? l : "") + '\n               <h2 class="text_fontSizeLarger text_title text_4n box_topMarginHalf"><a href="' + c(typeof (i = null != (i = r.projectUrl || (null != t ? t.projectUrl : t)) ? i : s) === u ? i.call(o, {
                    name: "projectUrl",
                    hash: {},
                    data: a
                }) : i) + '" class="link_subtle col_whiteText zindex_linkify layout_rel" onclick="gg.tracking.assignRefAndConversionCode(\'homepage\'); return true;">' + c(typeof (i = null != (i = r.projtitle || (null != t ? t.projtitle : t)) ? i : s) === u ? i.call(o, {
                    name: "projtitle",
                    hash: {},
                    data: a
                }) : i) + '</a></h2>\n            </div>\n            <div class="tile-hidden layout_center">\n               <a href="' + c(typeof (i = null != (i = r.projectUrl || (null != t ? t.projectUrl : t)) ? i : s) === u ? i.call(o, {
                    name: "projectUrl",
                    hash: {},
                    data: a
                }) : i) + '" class="grid-6 btn btn_short box_topMargin1 zindex_linkify">Donate</a>\n            </div>\n'
            },
            12: function(e, t, r, n, a) {
                var l, i, o = null != t ? t : e.nullContext || {}, s = r.helperMissing, u = "function", c = e.escapeExpression;
                return '\n            <div class="col_ggSecondary1LighterText text_lineHeightNatural">\n               ' + (null != (l = typeof (i = null != (i = r.preText || (null != t ? t.preText : t)) ? i : s) === u ? i.call(o, {
                    name: "preText",
                    hash: {},
                    data: a
                }) : i) ? l : "") + '\n               <h4 class="text_fontSizeBase text_lineHeightMedium box_topMargin1"><a href="' + c(typeof (i = null != (i = r.projectUrl || (null != t ? t.projectUrl : t)) ? i : s) === u ? i.call(o, {
                    name: "projectUrl",
                    hash: {},
                    data: a
                }) : i) + '" class="link_subtle col_whiteText zindex_linkify layout_rel" onclick="gg.tracking.assignRefAndConversionCode(\'homepage\'); return true;">' + c(typeof (i = null != (i = r.projtitle || (null != t ? t.projtitle : t)) ? i : s) === u ? i.call(o, {
                    name: "projtitle",
                    hash: {},
                    data: a
                }) : i) + '</a></h4>\n            </div>\n            <div class="tile-hidden">\n               <a href="' + c(typeof (i = null != (i = r.projectUrl || (null != t ? t.projectUrl : t)) ? i : s) === u ? i.call(o, {
                    name: "projectUrl",
                    hash: {},
                    data: a
                }) : i) + '" class="grid-12 btn btn_short box_topMargin2 zindex_linkify" onclick="gg.tracking.assignRefAndConversionCode(\'homepage\'); return true;">Donate</a>\n            </div>\n'
            },
            compiler: [7, ">= 4.0.0"],
            main: function(e, t, r, n, a) {
                var l, i, o = null != t ? t : e.nullContext || {}, s = r.helperMissing, u = "function", c = e.escapeExpression;
                return '   <div class="tile' + (null != (l = (r.compare || t && t.compare || s).call(o, null != t ? t.size : t, "==", "large", {
                    name: "compare",
                    hash: {},
                    fn: e.program(1, a, 0),
                    inverse: e.noop,
                    data: a
                })) ? l : "") + ' col_ggSecondary1Darker layout_rel">\n' + (null != (l = (r.compare || t && t.compare || s).call(o, null != t ? t.trending : t, "==", "true", {
                    name: "compare",
                    hash: {},
                    fn: e.program(3, a, 0),
                    inverse: e.noop,
                    data: a
                })) ? l : "") + '      <a href="' + c(typeof (i = null != (i = r.projectUrl || (null != t ? t.projectUrl : t)) ? i : s) === u ? i.call(o, {
                    name: "projectUrl",
                    hash: {},
                    data: a
                }) : i) + '" onclick="gg.tracking.assignRefAndConversionCode(\'homepage\'); return true;"><img src="' + c(typeof (i = null != (i = r.imageUrl || (null != t ? t.imageUrl : t)) ? i : s) === u ? i.call(o, {
                    name: "imageUrl",
                    hash: {},
                    data: a
                }) : i) + '" class="img-cover" ' + (null != (l = (r.compare || t && t.compare || s).call(o, null != t ? t.size : t, "==", "large", {
                    name: "compare",
                    hash: {},
                    fn: e.program(5, a, 0),
                    inverse: e.noop,
                    data: a
                })) ? l : "") + " " + (null != (l = r.if.call(o, null != t ? t.srcset : t, {
                    name: "if",
                    hash: {},
                    fn: e.program(7, a, 0),
                    inverse: e.noop,
                    data: a
                })) ? l : "") + ' alt="' + c(typeof (i = null != (i = r.projtitle || (null != t ? t.projtitle : t)) ? i : s) === u ? i.call(o, {
                    name: "projtitle",
                    hash: {},
                    data: a
                }) : i) + '"/></a>\n      <div class="tile-content col_whiteText">\n         <a href="' + c(typeof (i = null != (i = r.projectUrl || (null != t ? t.projectUrl : t)) ? i : s) === u ? i.call(o, {
                    name: "projectUrl",
                    hash: {},
                    data: a
                }) : i) + '"><span class="link_linkify text_fontSizeZero">' + c(typeof (i = null != (i = r.projtitle || (null != t ? t.projtitle : t)) ? i : s) === u ? i.call(o, {
                    name: "projtitle",
                    hash: {},
                    data: a
                }) : i) + "</span></a>\n" + (null != (l = (r.compare || t && t.compare || s).call(o, null != t ? t.size : t, "==", "large", {
                    name: "compare",
                    hash: {},
                    fn: e.program(10, a, 0),
                    inverse: e.program(12, a, 0),
                    data: a
                })) ? l : "") + "      </div>\n   </div>\n"
            },
            useData: !0
        })
    }
    , {
        "hbsfy/runtime": 28
    }],
    9: [function(e, t, r) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null != e)
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t.default = e,
            t
        }
        r.__esModule = !0;
        var l = a(e("./handlebars/base"))
          , i = n(e("./handlebars/safe-string"))
          , o = n(e("./handlebars/exception"))
          , s = a(e("./handlebars/utils"))
          , u = a(e("./handlebars/runtime"))
          , c = n(e("./handlebars/no-conflict"));
        function f() {
            var t = new l.HandlebarsEnvironment;
            return s.extend(t, l),
            t.SafeString = i.default,
            t.Exception = o.default,
            t.Utils = s,
            t.escapeExpression = s.escapeExpression,
            t.VM = u,
            t.template = function(e) {
                return u.template(e, t)
            }
            ,
            t
        }
        var p = f();
        p.create = f,
        c.default(p),
        p.default = p,
        r.default = p,
        t.exports = r.default
    }
    , {
        "./handlebars/base": 10,
        "./handlebars/exception": 13,
        "./handlebars/no-conflict": 23,
        "./handlebars/runtime": 24,
        "./handlebars/safe-string": 25,
        "./handlebars/utils": 26
    }],
    10: [function(e, t, r) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        r.__esModule = !0,
        r.HandlebarsEnvironment = c;
        var a = e("./utils")
          , l = n(e("./exception"))
          , i = e("./helpers")
          , o = e("./decorators")
          , s = n(e("./logger"));
        r.VERSION = "4.0.14";
        r.COMPILER_REVISION = 7;
        r.REVISION_CHANGES = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1",
            7: ">= 4.0.0"
        };
        var u = "[object Object]";
        function c(e, t, r) {
            this.helpers = e || {},
            this.partials = t || {},
            this.decorators = r || {},
            i.registerDefaultHelpers(this),
            o.registerDefaultDecorators(this)
        }
        c.prototype = {
            constructor: c,
            logger: s.default,
            log: s.default.log,
            registerHelper: function(e, t) {
                if (a.toString.call(e) === u) {
                    if (t)
                        throw new l.default("Arg not supported with multiple helpers");
                    a.extend(this.helpers, e)
                } else
                    this.helpers[e] = t
            },
            unregisterHelper: function(e) {
                delete this.helpers[e]
            },
            registerPartial: function(e, t) {
                if (a.toString.call(e) === u)
                    a.extend(this.partials, e);
                else {
                    if (void 0 === t)
                        throw new l.default('Attempting to register a partial called "' + e + '" as undefined');
                    this.partials[e] = t
                }
            },
            unregisterPartial: function(e) {
                delete this.partials[e]
            },
            registerDecorator: function(e, t) {
                if (a.toString.call(e) === u) {
                    if (t)
                        throw new l.default("Arg not supported with multiple decorators");
                    a.extend(this.decorators, e)
                } else
                    this.decorators[e] = t
            },
            unregisterDecorator: function(e) {
                delete this.decorators[e]
            }
        };
        var f = s.default.log;
        r.log = f,
        r.createFrame = a.createFrame,
        r.logger = s.default
    }
    , {
        "./decorators": 11,
        "./exception": 13,
        "./helpers": 14,
        "./logger": 22,
        "./utils": 26
    }],
    11: [function(e, t, r) {
        "use strict";
        r.__esModule = !0,
        r.registerDefaultDecorators = function(e) {
            l.default(e)
        }
        ;
        var n, a = e("./decorators/inline"), l = (n = a) && n.__esModule ? n : {
            default: n
        }
    }
    , {
        "./decorators/inline": 12
    }],
    12: [function(e, t, r) {
        "use strict";
        r.__esModule = !0;
        var o = e("../utils");
        r.default = function(e) {
            e.registerDecorator("inline", function(a, l, i, e) {
                var t = a;
                return l.partials || (l.partials = {},
                t = function(e, t) {
                    var r = i.partials;
                    i.partials = o.extend({}, r, l.partials);
                    var n = a(e, t);
                    return i.partials = r,
                    n
                }
                ),
                l.partials[e.args[0]] = e.fn,
                t
            })
        }
        ,
        t.exports = r.default
    }
    , {
        "../utils": 26
    }],
    13: [function(e, t, r) {
        "use strict";
        r.__esModule = !0;
        var o = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        function s(e, t) {
            var r = t && t.loc
              , n = void 0
              , a = void 0;
            r && (e += " - " + (n = r.start.line) + ":" + (a = r.start.column));
            for (var l = Error.prototype.constructor.call(this, e), i = 0; i < o.length; i++)
                this[o[i]] = l[o[i]];
            Error.captureStackTrace && Error.captureStackTrace(this, s);
            try {
                r && (this.lineNumber = n,
                Object.defineProperty ? Object.defineProperty(this, "column", {
                    value: a,
                    enumerable: !0
                }) : this.column = a)
            } catch (e) {}
        }
        s.prototype = new Error,
        r.default = s,
        t.exports = r.default
    }
    , {}],
    14: [function(e, t, r) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        r.__esModule = !0,
        r.registerDefaultHelpers = function(e) {
            a.default(e),
            l.default(e),
            i.default(e),
            o.default(e),
            s.default(e),
            u.default(e),
            c.default(e)
        }
        ;
        var a = n(e("./helpers/block-helper-missing"))
          , l = n(e("./helpers/each"))
          , i = n(e("./helpers/helper-missing"))
          , o = n(e("./helpers/if"))
          , s = n(e("./helpers/log"))
          , u = n(e("./helpers/lookup"))
          , c = n(e("./helpers/with"))
    }
    , {
        "./helpers/block-helper-missing": 15,
        "./helpers/each": 16,
        "./helpers/helper-missing": 17,
        "./helpers/if": 18,
        "./helpers/log": 19,
        "./helpers/lookup": 20,
        "./helpers/with": 21
    }],
    15: [function(e, t, r) {
        "use strict";
        r.__esModule = !0;
        var i = e("../utils");
        r.default = function(l) {
            l.registerHelper("blockHelperMissing", function(e, t) {
                var r = t.inverse
                  , n = t.fn;
                if (!0 === e)
                    return n(this);
                if (!1 === e || null == e)
                    return r(this);
                if (i.isArray(e))
                    return 0 < e.length ? (t.ids && (t.ids = [t.name]),
                    l.helpers.each(e, t)) : r(this);
                if (t.data && t.ids) {
                    var a = i.createFrame(t.data);
                    a.contextPath = i.appendContextPath(t.data.contextPath, t.name),
                    t = {
                        data: a
                    }
                }
                return n(e, t)
            })
        }
        ,
        t.exports = r.default
    }
    , {
        "../utils": 26
    }],
    16: [function(e, t, r) {
        "use strict";
        r.__esModule = !0;
        var n, p = e("../utils"), a = e("../exception"), d = (n = a) && n.__esModule ? n : {
            default: n
        };
        r.default = function(e) {
            e.registerHelper("each", function(n, e) {
                if (!e)
                    throw new d.default("Must pass iterator to #each");
                var a = e.fn
                  , t = e.inverse
                  , r = 0
                  , l = ""
                  , i = void 0
                  , o = void 0;
                function s(e, t, r) {
                    i && (i.key = e,
                    i.index = t,
                    i.first = 0 === t,
                    i.last = !!r,
                    o && (i.contextPath = o + e)),
                    l += a(n[e], {
                        data: i,
                        blockParams: p.blockParams([n[e], e], [o + e, null])
                    })
                }
                if (e.data && e.ids && (o = p.appendContextPath(e.data.contextPath, e.ids[0]) + "."),
                p.isFunction(n) && (n = n.call(this)),
                e.data && (i = p.createFrame(e.data)),
                n && "object" == typeof n)
                    if (p.isArray(n))
                        for (var u = n.length; r < u; r++)
                            r in n && s(r, r, r === n.length - 1);
                    else {
                        var c = void 0;
                        for (var f in n)
                            n.hasOwnProperty(f) && (void 0 !== c && s(c, r - 1),
                            c = f,
                            r++);
                        void 0 !== c && s(c, r - 1, !0)
                    }
                return 0 === r && (l = t(this)),
                l
            })
        }
        ,
        t.exports = r.default
    }
    , {
        "../exception": 13,
        "../utils": 26
    }],
    17: [function(e, t, r) {
        "use strict";
        r.__esModule = !0;
        var n, a = e("../exception"), l = (n = a) && n.__esModule ? n : {
            default: n
        };
        r.default = function(e) {
            e.registerHelper("helperMissing", function() {
                if (1 !== arguments.length)
                    throw new l.default('Missing helper: "' + arguments[arguments.length - 1].name + '"')
            })
        }
        ,
        t.exports = r.default
    }
    , {
        "../exception": 13
    }],
    18: [function(e, t, r) {
        "use strict";
        r.__esModule = !0;
        var n = e("../utils");
        r.default = function(r) {
            r.registerHelper("if", function(e, t) {
                return n.isFunction(e) && (e = e.call(this)),
                !t.hash.includeZero && !e || n.isEmpty(e) ? t.inverse(this) : t.fn(this)
            }),
            r.registerHelper("unless", function(e, t) {
                return r.helpers.if.call(this, e, {
                    fn: t.inverse,
                    inverse: t.fn,
                    hash: t.hash
                })
            })
        }
        ,
        t.exports = r.default
    }
    , {
        "../utils": 26
    }],
    19: [function(e, t, r) {
        "use strict";
        r.__esModule = !0,
        r.default = function(a) {
            a.registerHelper("log", function() {
                for (var e = [void 0], t = arguments[arguments.length - 1], r = 0; r < arguments.length - 1; r++)
                    e.push(arguments[r]);
                var n = 1;
                null != t.hash.level ? n = t.hash.level : t.data && null != t.data.level && (n = t.data.level),
                e[0] = n,
                a.log.apply(a, e)
            })
        }
        ,
        t.exports = r.default
    }
    , {}],
    20: [function(e, t, r) {
        "use strict";
        r.__esModule = !0,
        r.default = function(e) {
            e.registerHelper("lookup", function(e, t) {
                return e ? "constructor" !== t || e.propertyIsEnumerable(t) ? e[t] : void 0 : e
            })
        }
        ,
        t.exports = r.default
    }
    , {}],
    21: [function(e, t, r) {
        "use strict";
        r.__esModule = !0;
        var a = e("../utils");
        r.default = function(e) {
            e.registerHelper("with", function(e, t) {
                a.isFunction(e) && (e = e.call(this));
                var r = t.fn;
                if (a.isEmpty(e))
                    return t.inverse(this);
                var n = t.data;
                return t.data && t.ids && ((n = a.createFrame(t.data)).contextPath = a.appendContextPath(t.data.contextPath, t.ids[0])),
                r(e, {
                    data: n,
                    blockParams: a.blockParams([e], [n && n.contextPath])
                })
            })
        }
        ,
        t.exports = r.default
    }
    , {
        "../utils": 26
    }],
    22: [function(e, t, r) {
        "use strict";
        r.__esModule = !0;
        var n = e("./utils")
          , l = {
            methodMap: ["debug", "info", "warn", "error"],
            level: "info",
            lookupLevel: function(e) {
                if ("string" == typeof e) {
                    var t = n.indexOf(l.methodMap, e.toLowerCase());
                    e = 0 <= t ? t : parseInt(e, 10)
                }
                return e
            },
            log: function(e) {
                if (e = l.lookupLevel(e),
                "undefined" != typeof console && l.lookupLevel(l.level) <= e) {
                    var t = l.methodMap[e];
                    console[t] || (t = "log");
                    for (var r = arguments.length, n = Array(1 < r ? r - 1 : 0), a = 1; a < r; a++)
                        n[a - 1] = arguments[a];
                    console[t].apply(console, n)
                }
            }
        };
        r.default = l,
        t.exports = r.default
    }
    , {
        "./utils": 26
    }],
    23: [function(e, t, r) {
        (function(n) {
            "use strict";
            r.__esModule = !0,
            r.default = function(e) {
                var t = void 0 !== n ? n : window
                  , r = t.Handlebars;
                e.noConflict = function() {
                    return t.Handlebars === e && (t.Handlebars = r),
                    e
                }
            }
            ,
            t.exports = r.default
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}],
    24: [function(e, t, r) {
        "use strict";
        r.__esModule = !0,
        r.checkRevision = function(e) {
            var t = e && e[0] || 1
              , r = p.COMPILER_REVISION;
            if (t !== r) {
                if (t < r) {
                    var n = p.REVISION_CHANGES[r]
                      , a = p.REVISION_CHANGES[t];
                    throw new f.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + n + ") or downgrade your runtime to an older version (" + a + ").")
                }
                throw new f.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
            }
        }
        ,
        r.template = function(o, s) {
            if (!s)
                throw new f.default("No environment passed to template");
            if (!o || !o.main)
                throw new f.default("Unknown template object: " + typeof o);
            o.main.decorator = o.main_d,
            s.VM.checkRevision(o.compiler);
            var i = {
                strict: function(e, t) {
                    if (!(t in e))
                        throw new f.default('"' + t + '" not defined in ' + e);
                    return e[t]
                },
                lookup: function(e, t) {
                    for (var r = e.length, n = 0; n < r; n++)
                        if (e[n] && null != e[n][t])
                            return e[n][t]
                },
                lambda: function(e, t) {
                    return "function" == typeof e ? e.call(t) : e
                },
                escapeExpression: c.escapeExpression,
                invokePartial: function(e, t, r) {
                    r.hash && (t = c.extend({}, t, r.hash),
                    r.ids && (r.ids[0] = !0));
                    e = s.VM.resolvePartial.call(this, e, t, r);
                    var n = s.VM.invokePartial.call(this, e, t, r);
                    null == n && s.compile && (r.partials[r.name] = s.compile(e, o.compilerOptions, s),
                    n = r.partials[r.name](t, r));
                    {
                        if (null != n) {
                            if (r.indent) {
                                for (var a = n.split("\n"), l = 0, i = a.length; l < i && (a[l] || l + 1 !== i); l++)
                                    a[l] = r.indent + a[l];
                                n = a.join("\n")
                            }
                            return n
                        }
                        throw new f.default("The partial " + r.name + " could not be compiled when running in runtime-only mode")
                    }
                },
                fn: function(e) {
                    var t = o[e];
                    return t.decorator = o[e + "_d"],
                    t
                },
                programs: [],
                program: function(e, t, r, n, a) {
                    var l = this.programs[e]
                      , i = this.fn(e);
                    return t || a || n || r ? l = d(this, e, i, t, r, n, a) : l || (l = this.programs[e] = d(this, e, i)),
                    l
                },
                data: function(e, t) {
                    for (; e && t--; )
                        e = e._parent;
                    return e
                },
                merge: function(e, t) {
                    var r = e || t;
                    return e && t && e !== t && (r = c.extend({}, t, e)),
                    r
                },
                nullContext: Object.seal({}),
                noop: s.VM.noop,
                compilerInfo: o.compiler
            };
            function u(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
                  , r = t.data;
                u._setup(t),
                !t.partial && o.useData && (r = function(e, t) {
                    t && "root"in t || ((t = t ? p.createFrame(t) : {}).root = e);
                    return t
                }(e, r));
                var n = void 0
                  , a = o.useBlockParams ? [] : void 0;
                function l(e) {
                    return "" + o.main(i, e, i.helpers, i.partials, r, a, n)
                }
                return o.useDepths && (n = t.depths ? e != t.depths[0] ? [e].concat(t.depths) : t.depths : [e]),
                (l = h(o.main, l, i, t.depths || [], r, a))(e, t)
            }
            return u.isTop = !0,
            u._setup = function(e) {
                e.partial ? (i.helpers = e.helpers,
                i.partials = e.partials,
                i.decorators = e.decorators) : (i.helpers = i.merge(e.helpers, s.helpers),
                o.usePartial && (i.partials = i.merge(e.partials, s.partials)),
                (o.usePartial || o.useDecorators) && (i.decorators = i.merge(e.decorators, s.decorators)))
            }
            ,
            u._child = function(e, t, r, n) {
                if (o.useBlockParams && !r)
                    throw new f.default("must pass block params");
                if (o.useDepths && !n)
                    throw new f.default("must pass parent depths");
                return d(i, e, o[e], t, 0, r, n)
            }
            ,
            u
        }
        ,
        r.wrapProgram = d,
        r.resolvePartial = function(e, t, r) {
            e ? e.call || r.name || (r.name = e,
            e = r.partials[e]) : e = "@partial-block" === r.name ? r.data["partial-block"] : r.partials[r.name];
            return e
        }
        ,
        r.invokePartial = function(e, t, n) {
            var a = n.data && n.data["partial-block"];
            n.partial = !0,
            n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
            var l = void 0;
            n.fn && n.fn !== i && function() {
                n.data = p.createFrame(n.data);
                var r = n.fn;
                l = n.data["partial-block"] = function(e) {
                    var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                    return t.data = p.createFrame(t.data),
                    t.data["partial-block"] = a,
                    r(e, t)
                }
                ,
                r.partials && (n.partials = c.extend({}, n.partials, r.partials))
            }();
            void 0 === e && l && (e = l);
            {
                if (void 0 === e)
                    throw new f.default("The partial " + n.name + " could not be found");
                if (e instanceof Function)
                    return e(t, n)
            }
        }
        ,
        r.noop = i;
        var n, c = function(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null != e)
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t.default = e,
            t
        }(e("./utils")), a = e("./exception"), f = (n = a) && n.__esModule ? n : {
            default: n
        }, p = e("./base");
        function d(n, e, a, l, t, i, o) {
            function r(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
                  , r = o;
                return !o || e == o[0] || e === n.nullContext && null === o[0] || (r = [e].concat(o)),
                a(n, e, n.helpers, n.partials, t.data || l, i && [t.blockParams].concat(i), r)
            }
            return (r = h(a, r, n, o, l, i)).program = e,
            r.depth = o ? o.length : 0,
            r.blockParams = t || 0,
            r
        }
        function i() {
            return ""
        }
        function h(e, t, r, n, a, l) {
            if (e.decorator) {
                var i = {};
                t = e.decorator(t, i, r, n && n[0], a, l, n),
                c.extend(t, i)
            }
            return t
        }
    }
    , {
        "./base": 10,
        "./exception": 13,
        "./utils": 26
    }],
    25: [function(e, t, r) {
        "use strict";
        function n(e) {
            this.string = e
        }
        r.__esModule = !0,
        n.prototype.toString = n.prototype.toHTML = function() {
            return "" + this.string
        }
        ,
        r.default = n,
        t.exports = r.default
    }
    , {}],
    26: [function(e, t, r) {
        "use strict";
        r.__esModule = !0,
        r.extend = o,
        r.indexOf = function(e, t) {
            for (var r = 0, n = e.length; r < n; r++)
                if (e[r] === t)
                    return r;
            return -1
        }
        ,
        r.escapeExpression = function(e) {
            if ("string" != typeof e) {
                if (e && e.toHTML)
                    return e.toHTML();
                if (null == e)
                    return "";
                if (!e)
                    return e + "";
                e = "" + e
            }
            if (!l.test(e))
                return e;
            return e.replace(a, i)
        }
        ,
        r.isEmpty = function(e) {
            return !e && 0 !== e || !(!c(e) || 0 !== e.length)
        }
        ,
        r.createFrame = function(e) {
            var t = o({}, e);
            return t._parent = e,
            t
        }
        ,
        r.blockParams = function(e, t) {
            return e.path = t,
            e
        }
        ,
        r.appendContextPath = function(e, t) {
            return (e ? e + "." : "") + t
        }
        ;
        var n = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;",
            "=": "&#x3D;"
        }
          , a = /[&<>"'`=]/g
          , l = /[&<>"'`=]/;
        function i(e) {
            return n[e]
        }
        function o(e) {
            for (var t = 1; t < arguments.length; t++)
                for (var r in arguments[t])
                    Object.prototype.hasOwnProperty.call(arguments[t], r) && (e[r] = arguments[t][r]);
            return e
        }
        var s = Object.prototype.toString;
        r.toString = s;
        var u = function(e) {
            return "function" == typeof e
        };
        u(/x/) && (r.isFunction = u = function(e) {
            return "function" == typeof e && "[object Function]" === s.call(e)
        }
        ),
        r.isFunction = u;
        var c = Array.isArray || function(e) {
            return !(!e || "object" != typeof e) && "[object Array]" === s.call(e)
        }
        ;
        r.isArray = c
    }
    , {}],
    27: [function(e, t, r) {
        t.exports = e("./dist/cjs/handlebars.runtime").default
    }
    , {
        "./dist/cjs/handlebars.runtime": 9
    }],
    28: [function(e, t, r) {
        t.exports = e("handlebars/runtime").default
    }
    , {
        "handlebars/runtime": 27
    }]
}, {}, [1]);
