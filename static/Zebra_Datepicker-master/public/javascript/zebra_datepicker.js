! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function(e) {
    "use strict";
    e.Zebra_DatePicker = function(t, s) {
        this.version = "1.9.10";
        var i, n, a, r, o, d, c, l, g, _, h, p, u, f, m, b, y, v, w, k, D, A, M, P, C, F, Z, S, Y, x, I, z, N, j, H, O, T, L, R, W, B, E, Q, J = {
                always_visible: !1,
                container: e("body"),
                custom_classes: !1,
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                days_abbr: !1,
                default_position: "above",
                direction: 0,
                disable_time_picker: !1,
                disabled_dates: !1,
                enabled_dates: !1,
                enabled_hours: !1,
                enabled_minutes: !1,
                enabled_seconds: !1,
                first_day_of_week: 1,
                format: "Y-m-d",
                header_captions: {
                    days: "F, Y",
                    months: "Y",
                    years: "Y1 - Y2"
                },
                icon_margin: !1,
                icon_position: "right",
                inside: !0,
                lang_clear_date: "Clear date",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                months_abbr: !1,
                navigation: ["&#9664;", "&#9654;", "&#9650;", "&#9660;"],
                offset: [5, -5],
                open_icon_only: !1,
                open_on_focus: !1,
                pair: !1,
                readonly_element: !0,
                select_other_months: !1,
                show_clear_date: 0,
                show_icon: !0,
                show_other_months: !0,
                show_select_today: "Today",
                show_week_number: !1,
                start_date: !1,
                strict: !1,
                view: "days",
                weekend_days: [0, 6],
                zero_pad: !1,
                onChange: null,
                onClear: null,
                onOpen: null,
                onClose: null,
                onSelect: null
            },
            G = {},
            U = [],
            V = [],
            $ = {},
            q = !1,
            X = "",
            K = !1,
            ee = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
            te = this,
            se = e(t);
        te.settings = {};
        var ie = function(t) {
            var _, C, j, B, ie = {
                    days: ["d", "j", "D"],
                    months: ["F", "m", "M", "n", "t"],
                    years: ["o", "Y", "y"],
                    hours: ["G", "g", "H", "h"],
                    minutes: ["i"],
                    seconds: ["s"],
                    ampm: ["A", "a"]
                },
                re = null;
            for (j = 0; j < 3; j++) X += Math.floor(65536 * (1 + Math.random())).toString(16);
            if (!t) {
                te.settings = e.extend({}, J, e.fn.Zebra_DatePicker.defaults, s), $.readonly = se.attr("readonly"), $.style = se.attr("style"), $.padding_left = parseInt(se.css("paddingLeft"), 10) || 0, $.padding_right = parseInt(se.css("paddingRight"), 10) || 0;
                for (_ in se.data()) 0 === _.indexOf("zdp_") && (_ = _.replace(/^zdp\_/, ""), void 0 !== J[_] && (te.settings[_] = "pair" === _ ? e(se.data("zdp_" + _)) : se.data("zdp_" + _)))
            }
            te.settings.readonly_element ? se.attr("readonly", "readonly") : se.removeAttr("readonly"), R = !1, Q = [];
            for (re in ie) e.each(ie[re], function(t, s) {
                var i, n;
                if (te.settings.format.indexOf(s) > -1)
                    if ("days" === re) Q.push("days");
                    else if ("months" === re) Q.push("months");
                else if ("years" === re) Q.push("years");
                else if (("hours" === re || "minutes" === re || "seconds" === re || "ampm" === re) && !te.settings.disable_time_picker)
                    if (R || (R = {
                            is12hour: !1
                        }, Q.push("time")), "hours" === re)
                        for ("g" === s || "h" == s ? (n = 12, R.is12hour = !0) : n = 24, R.hours = [], i = 12 === n ? 1 : 0; i < (12 === n ? 13 : n); i++)(!e.isArray(te.settings.enabled_hours) || e.inArray(i, te.settings.enabled_hours) > -1) && R.hours.push(i);
                    else if ("minutes" === re)
                    for (R.minutes = [], i = 0; i < 60; i++)(!e.isArray(te.settings.enabled_minutes) || e.inArray(i, te.settings.enabled_minutes) > -1) && R.minutes.push(i);
                else if ("seconds" === re)
                    for (R.seconds = [], i = 0; i < 60; i++)(!e.isArray(te.settings.enabled_seconds) || e.inArray(i, te.settings.enabled_seconds) > -1) && R.seconds.push(i);
                else R.ampm = ["am", "pm"]
            });
            0 === Q.length && (Q = ["years", "months", "days"]), -1 === e.inArray(te.settings.view, Q) && (te.settings.view = Q[Q.length - 1]), c = [];
            for (j in te.settings.custom_classes) te.settings.custom_classes.hasOwnProperty(j) && -1 === c.indexOf(j) && c.push(j);
            for (B = 0; B < 2 + c.length; B++) C = 0 === B ? te.settings.disabled_dates : 1 === B ? te.settings.enabled_dates : te.settings.custom_classes[c[B - 2]], e.isArray(C) && C.length > 0 && e.each(C, function() {
                var t, s, i, n, a = this.split(" ");
                for (t = 0; t < 4; t++) {
                    for (a[t] || (a[t] = "*"), a[t] = a[t].indexOf(",") > -1 ? a[t].split(",") : new Array(a[t]), s = 0; s < a[t].length; s++)
                        if (a[t][s].indexOf("-") > -1 && null !== (n = a[t][s].match(/^([0-9]+)\-([0-9]+)/))) {
                            for (i = we(n[1]); i <= we(n[2]); i++) - 1 === e.inArray(i, a[t]) && a[t].push(i + "");
                            a[t].splice(s, 1)
                        }
                    for (s = 0; s < a[t].length; s++) a[t][s] = isNaN(we(a[t][s])) ? a[t][s] : we(a[t][s])
                }
                0 === B ? U.push(a) : 1 === B ? V.push(a) : (void 0 === G[c[B - 2]] && (G[c[B - 2]] = []), G[c[B - 2]].push(a))
            });
            var de, ce, le = new Date,
                ge = te.settings.reference_date ? te.settings.reference_date : se.data("zdp_reference_date") && void 0 !== se.data("zdp_reference_date") ? se.data("zdp_reference_date") : le;
            if (O = void 0, f = void 0, b = ge.getMonth(), o = le.getMonth(), y = ge.getFullYear(), d = le.getFullYear(), m = ge.getDate(), r = le.getDate(), !0 === te.settings.direction) O = ge;
            else if (!1 === te.settings.direction) A = (f = ge).getMonth(), M = f.getFullYear(), D = f.getDate();
            else if (!e.isArray(te.settings.direction) && ue(te.settings.direction) && we(te.settings.direction) > 0 || e.isArray(te.settings.direction) && ((de = ne(te.settings.direction[0])) || !0 === te.settings.direction[0] || ue(te.settings.direction[0]) && te.settings.direction[0] > 0) && ((ce = ne(te.settings.direction[1])) || !1 === te.settings.direction[1] || ue(te.settings.direction[1]) && te.settings.direction[1] >= 0)) O = de || new Date(y, b, m + we(e.isArray(te.settings.direction) ? !0 === te.settings.direction[0] ? 0 : te.settings.direction[0] : te.settings.direction)), b = O.getMonth(), y = O.getFullYear(), m = O.getDate(), ce && +ce >= +O ? f = ce : !ce && !1 !== te.settings.direction[1] && e.isArray(te.settings.direction) && (f = new Date(y, b, m + we(te.settings.direction[1]))), f && (A = f.getMonth(), M = f.getFullYear(), D = f.getDate());
            else if (!e.isArray(te.settings.direction) && ue(te.settings.direction) && we(te.settings.direction) < 0 || e.isArray(te.settings.direction) && (!1 === te.settings.direction[0] || ue(te.settings.direction[0]) && te.settings.direction[0] < 0) && ((de = ne(te.settings.direction[1])) || ue(te.settings.direction[1]) && te.settings.direction[1] >= 0)) f = new Date(y, b, m + we(e.isArray(te.settings.direction) ? !1 === te.settings.direction[0] ? 0 : te.settings.direction[0] : te.settings.direction)), A = f.getMonth(), M = f.getFullYear(), D = f.getDate(), de && +de < +f ? O = de : !de && e.isArray(te.settings.direction) && (O = new Date(M, A, D - we(te.settings.direction[1]))), O && (b = O.getMonth(), y = O.getFullYear(), m = O.getDate());
            else if (e.isArray(te.settings.disabled_dates) && te.settings.disabled_dates.length > 0)
                for (var _e in U)
                    if ("*" === U[_e][0] && "*" === U[_e][1] && "*" === U[_e][2] && "*" === U[_e][3]) {
                        var he = [];
                        if (e.each(V, function() {
                                var e = this;
                                "*" !== e[2][0] && he.push(parseInt(e[2][0] + ("*" === e[1][0] ? "12" : ve(e[1][0], 2)) + ("*" === e[0][0] ? "*" === e[1][0] ? "31" : new Date(e[2][0], e[1][0], 0).getDate() : ve(e[0][0], 2)), 10))
                            }), he.sort(), he.length > 0) {
                            var fe = (he[0] + "").match(/([0-9]{4})([0-9]{2})([0-9]{2})/);
                            y = parseInt(fe[1], 10), b = parseInt(fe[2], 10) - 1, m = parseInt(fe[3], 10)
                        }
                        break
                    }
            if (pe(y, b, m)) {
                for (; pe(y);) O ? (y++, b = 0) : (y--, b = 11);
                for (; pe(y, b);) O ? (b++, m = 1) : (b--, m = new Date(y, b + 1, 0).getDate()), b > 11 ? (y++, b = 0, m = 1) : b < 0 && (y--, b = 11, m = new Date(y, b + 1, 0).getDate());
                for (; pe(y, b, m);) O ? m++ : m--, le = new Date(y, b, m), y = le.getFullYear(), b = le.getMonth(), m = le.getDate();
                le = new Date(y, b, m), y = le.getFullYear(), b = le.getMonth(), m = le.getDate()
            }
            var ye = ne(se.val() || (te.settings.start_date ? te.settings.start_date : ""));
            if (ye && te.settings.strict && pe(ye.getFullYear(), ye.getMonth(), ye.getDate()) && se.val(""), t || void 0 === O && void 0 === ye || ke(void 0 !== ye ? ye : O), !(te.settings.always_visible instanceof jQuery)) {
                if (!t) {
                    if (te.settings.show_icon) {
                        "firefox" === Ae.name && se.is('input[type="text"]') && "inline" === se.css("display") && se.css("display", "inline-block");
                        var De = parseInt(se.css("marginTop"), 10) || 0,
                            Me = parseInt(se.css("marginRight"), 10) || 0,
                            Pe = parseInt(se.css("marginBottom"), 10) || 0,
                            Ce = parseInt(se.css("marginLeft"), 10) || 0,
                            Fe = e('<span class="Zebra_DatePicker_Icon_Wrapper"></span>').css({
                                display: se.css("display"),
                                position: "static" === se.css("position") ? "relative" : se.css("position"),
                                float: se.css("float"),
                                top: se.css("top"),
                                right: se.css("right"),
                                bottom: se.css("bottom"),
                                left: se.css("left"),
                                marginTop: De < 0 ? De : 0,
                                marginRight: Me < 0 ? Me : 0,
                                marginBottom: Pe < 0 ? Pe : 0,
                                marginLeft: Ce < 0 ? Ce : 0,
                                paddingTop: De,
                                paddingRight: Me,
                                paddingBottom: Pe,
                                paddingLeft: Ce
                            });
                        "block" === se.css("display") && Fe.css("width", se.outerWidth(!0)), se.wrap(Fe).css({
                            position: "relative",
                            float: "none",
                            top: "auto",
                            right: "auto",
                            bottom: "auto",
                            left: "auto",
                            marginTop: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            marginLeft: 0
                        }), k = e('<button type="button" class="Zebra_DatePicker_Icon' + ("disabled" === se.attr("disabled") ? " Zebra_DatePicker_Icon_Disabled" : "") + '">Pick a date</button>'), te.icon = k, n = te.settings.open_icon_only ? k : k.add(se)
                    } else n = se;
                    n.on("click.Zebra_DatePicker_" + X + (te.settings.open_on_focus ? " focus.Zebra_DatePicker_" + X : ""), function() {
                        l.hasClass("dp_hidden") && !se.attr("disabled") && (!K || te.settings.readonly_element ? te.show() : (clearTimeout(T), T = setTimeout(function() {
                            te.show()
                        }, 600)))
                    }), n.on("keydown.Zebra_DatePicker_" + X, function(e) {
                        9 !== e.keyCode || l.hasClass("dp_hidden") || te.hide()
                    }), !te.settings.readonly_element && te.settings.pair && se.on("blur.Zebra_DatePicker_" + X, function() {
                        var t;
                        (t = ne(e(this).val())) && !pe(t.getFullYear(), t.getMonth(), t.getDate()) && ke(t)
                    }), void 0 !== k && k.insertAfter(se)
                }
                if (void 0 !== k) {
                    k.attr("style", "");
                    var Ze = se.outerWidth(),
                        Se = se.outerHeight(),
                        Ye = k.outerWidth(),
                        xe = k.outerHeight();
                    k.css("top", (Se - xe) / 2), te.settings.inside ? "right" === te.settings.icon_position ? (k.css("right", !1 !== te.settings.icon_margin ? te.settings.icon_margin : $.padding_right), se.css("paddingRight", 2 * (!1 !== te.settings.icon_margin ? te.settings.icon_margin : $.padding_right) + Ye)) : (k.css("left", !1 !== te.settings.icon_margin ? te.settings.icon_margin : $.padding_left), se.css("paddingLeft", 2 * (!1 !== te.settings.icon_margin ? te.settings.icon_margin : $.padding_left) + Ye)) : k.css("left", Ze + (!1 !== te.settings.icon_margin ? te.settings.icon_margin : $.padding_left)), k.removeClass("Zebra_DatePicker_Icon_Disabled"), "disabled" === se.attr("disabled") && k.addClass("Zebra_DatePicker_Icon_Disabled")
                }
            }
            if (H = !1 !== te.settings.show_select_today && e.inArray("days", Q) > -1 && !pe(d, o, r) && te.settings.show_select_today, t) return e(".dp_previous", l).html(te.settings.navigation[0]), e(".dp_next", l).html(te.settings.navigation[1]), e(".dp_time_controls_increase .dp_time_control", l).html(te.settings.navigation[2]), e(".dp_time_controls_decrease .dp_time_control", l).html(te.settings.navigation[3]), e(".dp_clear", l).html(te.settings.lang_clear_date), void e(".dp_today", l).html(te.settings.show_select_today);
            e(window).on("resize.Zebra_DatePicker_" + X + ", orientationchange.Zebra_DatePicker_" + X, function() {
                te.hide()
            });
            var Ie = '<div class="Zebra_DatePicker"><table class="dp_header dp_actions"><tr><td class="dp_previous">' + te.settings.navigation[0] + (ee ? "&#xFE0E;" : "") + '</td><td class="dp_caption"></td><td class="dp_next">' + te.settings.navigation[1] + (ee ? "&#xFE0E;" : "") + '</td></tr></table><table class="dp_daypicker' + (te.settings.show_week_number ? " dp_week_numbers" : "") + ' dp_body"></table><table class="dp_monthpicker dp_body"></table><table class="dp_yearpicker dp_body"></table><table class="dp_timepicker dp_body"></table><table class="dp_footer dp_actions"><tr><td class="dp_today">' + H + '</td><td class="dp_clear">' + te.settings.lang_clear_date + '</td><td class="dp_view_toggler dp_icon">&nbsp;&nbsp;&nbsp;&nbsp;</td><td class="dp_confirm dp_icon"></td></tr></table></div>';
            l = e(Ie), w = e("table.dp_header", l), g = e("table.dp_daypicker", l), P = e("table.dp_monthpicker", l), W = e("table.dp_yearpicker", l), L = e("table.dp_timepicker", l), v = e("table.dp_footer", l), N = e("td.dp_today", v), i = e("td.dp_clear", v), x = e("td.dp_view_toggler", v), a = e("td.dp_confirm", v), te.settings.always_visible instanceof jQuery ? se.attr("disabled") || (te.settings.always_visible.append(l), te.show()) : te.settings.container.append(l), l.on("mouseover", "td:not(.dp_disabled)", function() {
                e(this).addClass("dp_hover")
            }).on("mouseout", "td:not(.dp_disabled)", function() {
                e(this).removeClass("dp_hover")
            }), ae(l), e(".dp_previous", w).on("click", function() {
                "months" === E ? z-- : "years" === E ? z -= 12 : --I < 0 && (I = 11, z--), me()
            }), e(".dp_caption", w).on("click", function() {
                E = "days" === E ? e.inArray("months", Q) > -1 ? "months" : e.inArray("years", Q) > -1 ? "years" : "days" : "months" === E ? e.inArray("years", Q) > -1 ? "years" : e.inArray("days", Q) > -1 ? "days" : "months" : e.inArray("days", Q) > -1 ? "days" : e.inArray("months", Q) > -1 ? "months" : "years", me()
            }), e(".dp_next", w).on("click", function() {
                "months" === E ? z++ : "years" === E ? z += 12 : 12 == ++I && (I = 0, z++), me()
            }), g.on("click", "td:not(.dp_disabled)", function() {
                var t;
                te.settings.select_other_months && e(this).attr("class") && null !== (t = e(this).attr("class").match(/date\_([0-9]{4})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])/)) ? be(t[1], t[2] - 1, t[3], "days", e(this)) : be(z, I, we(e(this).html()), "days", e(this))
            }), P.on("click", "td:not(.dp_disabled)", function() {
                var t = e(this).attr("class").match(/dp\_month\_([0-9]+)/);
                I = we(t[1]), -1 === e.inArray("days", Q) ? be(z, I, 1, "months", e(this)) : (E = "days", te.settings.always_visible && se.val(""), me())
            }), W.on("click", "td:not(.dp_disabled)", function() {
                z = we(e(this).html()), -1 === e.inArray("months", Q) ? be(z, 1, 1, "years", e(this)) : (E = "months", te.settings.always_visible && se.val(""), me())
            }), N.on("click", function(t) {
                var s = new Date;
                t.preventDefault(), be(s.getFullYear(), s.getMonth(), s.getDate(), "days", e(".dp_current", g))
            }), i.on("click", function(t) {
                t.preventDefault(), se.val(""), h = null, p = null, u = null, te.settings.always_visible ? e("td.dp_selected", l).removeClass("dp_selected") : (I = null, z = null), se.focus(), te.hide(), te.settings.onClear && "function" == typeof te.settings.onClear && te.settings.onClear.call(se)
            }), x.on("click", function() {
                "time" !== E ? (E = "time", me()) : e(".dp_caption", w).trigger("click")
            }), a.on("click", function() {
                if (e(".dp_time_controls_increase td", L).trigger("click"), e(".dp_time_controls_decrease td", L).trigger("click"), te.settings.onSelect && "function" == typeof te.settings.onSelect) {
                    var t = new Date(z, I, h, R && R.hours ? F + (R.ampm && ("pm" === Y && F < 12 || "am" === Y && 12 === F) ? 12 : 0) : 0, R && R.minutes ? Z : 0, R && R.seconds ? S : 0);
                    te.settings.onSelect.call(se, oe(t), z + "-" + ve(I + 1, 2) + "-" + ve(h, 2) + (R ? " " + ve(t.getHours(), 2) + ":" + ve(t.getMinutes(), 2) + ":" + ve(t.getSeconds(), 2) : ""), t)
                }
                te.hide()
            }), l.on("click", ".dp_time_controls_increase td, .dp_time_controls_decrease td", function() {
                var t, s = e(this).parent(".dp_time_controls_increase").length > 0,
                    i = e(this).attr("class").match(/dp\_time\_([^\s]+)/i),
                    n = e(".dp_time_segments .dp_time_" + i[1] + ("ampm" !== i[1] ? "s" : ""), L),
                    a = n.text().toLowerCase(),
                    r = R[i[1] + ("ampm" !== i[1] ? "s" : "")],
                    o = e.inArray("ampm" !== i[1] ? parseInt(a, 10) : a, r),
                    d = -1 === o ? 0 : s ? o + 1 >= r.length ? 0 : o + 1 : o - 1 < 0 ? r.length - 1 : o - 1;
                "hour" === i[1] ? F = r[d] : "minute" === i[1] ? Z = r[d] : "second" === i[1] ? S = r[d] : Y = r[d], !h && te.settings.start_date && (t = ne(te.settings.start_date)) && (h = t.getDate()), h || (h = m), n.text(ve(r[d], 2).toUpperCase()), be(z, I, h)
            }), te.settings.always_visible instanceof jQuery || (e(document).on("touchmove.Zebra_DatePicker_" + X, function() {
                q = !0
            }), e(document).on("mousedown.Zebra_DatePicker_" + X + " touchend.Zebra_DatePicker_" + X, function(t) {
                if ("touchend" === t.type && q) return K = !0, q = !1;
                q = !1, l.hasClass("dp_hidden") || (!te.settings.open_icon_only || !te.icon || e(t.target).get(0) === te.icon.get(0)) && (te.settings.open_icon_only || e(t.target).get(0) === se.get(0) || te.icon && e(t.target).get(0) === te.icon.get(0)) || 0 !== e(t.target).parents().filter(".Zebra_DatePicker").length || te.hide(!0)
            }), e(document).on("keyup.Zebra_DatePicker_" + X, function(e) {
                l.hasClass("dp_hidden") || 27 !== e.which || te.hide()
            })), me()
        };
        te.clear_date = function() {
            e(i).trigger("click")
        }, te.destroy = function() {
            void 0 !== te.icon && (te.icon.off("click.Zebra_DatePicker_" + X), te.icon.off("focus.Zebra_DatePicker_" + X), te.icon.off("keydown.Zebra_DatePicker_" + X), te.icon.remove()), l.off(), l.remove(), !te.settings.show_icon || te.settings.always_visible instanceof jQuery || se.unwrap(), se.off("blur.Zebra_DatePicker_" + X), se.off("click.Zebra_DatePicker_" + X), se.off("focus.Zebra_DatePicker_" + X), se.off("keydown.Zebra_DatePicker_" + X), se.off("mousedown.Zebra_DatePicker_" + X), e(document).off("keyup.Zebra_DatePicker_" + X), e(document).off("mousedown.Zebra_DatePicker_" + X), e(document).off("touchend.Zebra_DatePicker_" + X), e(window).off("resize.Zebra_DatePicker_" + X), e(window).off("orientationchange.Zebra_DatePicker_" + X), se.removeData("Zebra_DatePicker"), se.attr("readonly", $.readonly), se.attr("style", $.style ? $.style : ""), se.css("paddingLeft", $.padding_left), se.css("paddingRight", $.padding_right)
        }, te.hide = function(e) {
            te.settings.always_visible && !e || (he("hide"), l.addClass("dp_hidden"), te.settings.onClose && "function" == typeof te.settings.onClose && te.settings.onClose.call(se))
        }, te.set_date = function(e) {
            var t;
            (t = ne(e)) && !pe(t.getFullYear(), t.getMonth(), t.getDate()) && (se.val(e), ke(t))
        }, te.show = function() {
            E = te.settings.view;
            var t, s = ne(se.val() || (te.settings.start_date ? te.settings.start_date : ""));
            if (s ? (p = s.getMonth(), I = s.getMonth(), u = s.getFullYear(), z = s.getFullYear(), h = s.getDate(), pe(u, p, h) && (te.settings.strict && se.val(""), I = b, z = y)) : (I = b, z = y), R && (t = s || new Date, F = t.getHours(), Z = t.getMinutes(), S = t.getSeconds(), Y = F >= 12 ? "pm" : "am", R.is12hour && (F = F % 12 == 0 ? 12 : F % 12), e.isArray(te.settings.enabled_hours) && -1 === e.inArray(F, te.settings.enabled_hours) && (F = te.settings.enabled_hours[0]), e.isArray(te.settings.enabled_minutes) && -1 === e.inArray(Z, te.settings.enabled_minutes) && (Z = te.settings.enabled_minutes[0]), e.isArray(te.settings.enabled_seconds) && -1 === e.inArray(S, te.settings.enabled_seconds) && (S = te.settings.enabled_seconds[0])), me(), te.settings.always_visible instanceof jQuery) l.removeClass("dp_hidden");
            else {
                if (te.settings.container.is("body")) {
                    var i = l.outerWidth(),
                        n = l.outerHeight(),
                        a = (void 0 !== k ? k.offset().left + k.outerWidth(!0) : se.offset().left + se.outerWidth(!0)) + te.settings.offset[0],
                        r = (void 0 !== k ? k.offset().top : se.offset().top) - n + te.settings.offset[1],
                        o = e(window).width(),
                        d = e(window).height(),
                        c = e(window).scrollTop(),
                        g = e(window).scrollLeft();
                    "below" === te.settings.default_position && (r = (void 0 !== k ? k.offset().top : se.offset().top) + te.settings.offset[1]), a + i > g + o && (a = g + o - i), a < g && (a = g), r + n > c + d && (r = c + d - n), r < c && (r = c), l.css({
                        left: a,
                        top: r
                    })
                } else l.css({
                    left: 0,
                    top: 0
                });
                l.removeClass("dp_hidden"), he()
            }
            te.settings.onOpen && "function" == typeof te.settings.onOpen && te.settings.onOpen.call(se)
        }, te.update = function(t) {
            te.original_direction && (te.original_direction = te.direction), te.settings = e.extend(te.settings, t), ie(!0)
        };
        var ne = function(t) {
                if (t += "", "" !== e.trim(t)) {
                    for (var s = re(te.settings.format), i = ["d", "D", "j", "l", "N", "S", "w", "F", "m", "M", "n", "Y", "y", "G", "g", "H", "h", "i", "s", "a", "A"], n = [], a = [], r = null, o = null, d = 0; d < i.length; d++)(r = s.indexOf(i[d])) > -1 && n.push({
                        character: i[d],
                        position: r
                    });
                    if (n.sort(function(e, t) {
                            return e.position - t.position
                        }), e.each(n, function(e, t) {
                            switch (t.character) {
                                case "d":
                                    a.push("0[1-9]|[12][0-9]|3[01]");
                                    break;
                                case "D":
                                    a.push("[a-z]{3}");
                                    break;
                                case "j":
                                    a.push("[1-9]|[12][0-9]|3[01]");
                                    break;
                                case "l":
                                    a.push("[a-zÀ-ɏ]+");
                                    break;
                                case "N":
                                    a.push("[1-7]");
                                    break;
                                case "S":
                                    a.push("st|nd|rd|th");
                                    break;
                                case "w":
                                    a.push("[0-6]");
                                    break;
                                case "F":
                                    a.push("[a-z]+");
                                    break;
                                case "m":
                                    a.push("0[1-9]|1[012]");
                                    break;
                                case "M":
                                    a.push("[a-z]{3}");
                                    break;
                                case "n":
                                    a.push("[1-9]|1[012]");
                                    break;
                                case "Y":
                                    a.push("[0-9]{4}");
                                    break;
                                case "y":
                                    a.push("[0-9]{2}");
                                    break;
                                case "G":
                                    a.push("[1-9]|1[0-9]|2[0123]");
                                    break;
                                case "g":
                                    a.push("[0-9]|1[012]");
                                    break;
                                case "H":
                                    a.push("0[0-9]|1[0-9]|2[0123]");
                                    break;
                                case "h":
                                    a.push("0[0-9]|1[012]");
                                    break;
                                case "i":
                                case "s":
                                    a.push("0[0-9]|[12345][0-9]");
                                    break;
                                case "a":
                                    a.push("am|pm");
                                    break;
                                case "A":
                                    a.push("AM|PM")
                            }
                        }), a.length && (n.reverse(), e.each(n, function(e, t) {
                            s = s.replace(t.character, "(" + a[a.length - e - 1] + ")")
                        }), a = new RegExp("^" + s + "$", "ig"), o = a.exec(t))) {
                        var c, l, g = new Date,
                            _ = 1,
                            h = g.getMonth() + 1,
                            p = g.getFullYear(),
                            u = g.getHours(),
                            f = g.getMinutes(),
                            m = g.getSeconds(),
                            b = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                            y = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            v = !0;
                        if (n.reverse(), e.each(n, function(t, s) {
                                if (!v) return !0;
                                switch (s.character) {
                                    case "m":
                                    case "n":
                                        h = we(o[t + 1]);
                                        break;
                                    case "d":
                                    case "j":
                                        _ = we(o[t + 1]);
                                        break;
                                    case "D":
                                    case "l":
                                    case "F":
                                    case "M":
                                        l = "D" === s.character || "l" === s.character ? te.settings.days : te.settings.months, v = !1, e.each(l, function(e, i) {
                                            if (v) return !0;
                                            if (o[t + 1].toLowerCase() === i.substring(0, "D" === s.character || "M" === s.character ? 3 : i.length).toLowerCase()) {
                                                switch (s.character) {
                                                    case "D":
                                                        o[t + 1] = b[e].substring(0, 3);
                                                        break;
                                                    case "l":
                                                        o[t + 1] = b[e];
                                                        break;
                                                    case "F":
                                                        o[t + 1] = y[e], h = e + 1;
                                                        break;
                                                    case "M":
                                                        o[t + 1] = y[e].substring(0, 3), h = e + 1
                                                }
                                                v = !0
                                            }
                                        });
                                        break;
                                    case "Y":
                                        p = we(o[t + 1]);
                                        break;
                                    case "y":
                                        p = "19" + we(o[t + 1]);
                                        break;
                                    case "G":
                                    case "H":
                                    case "g":
                                    case "h":
                                        u = we(o[t + 1]);
                                        break;
                                    case "i":
                                        f = we(o[t + 1]);
                                        break;
                                    case "s":
                                        m = we(o[t + 1]);
                                        break;
                                    case "a":
                                    case "A":
                                        c = o[t + 1].toLowerCase()
                                }
                            }), v) {
                            var w = new Date(p, (h || 1) - 1, _ || 1, u + ("pm" === c && u < 12 || "am" === c && 12 === u ? 12 : 0), f, m);
                            if (w.getFullYear() === p && w.getDate() === (_ || 1) && w.getMonth() === (h || 1) - 1) return w
                        }
                    }
                    return !1
                }
            },
            ae = function(t) {
                "firefox" === Ae.name ? t.css("MozUserSelect", "none") : "explorer" === Ae.name ? e(document).on("selectstart", t, function() {
                    return !1
                }) : t.mousedown(function() {
                    return !1
                })
            },
            re = function(e) {
                return e.replace(/([-.,*+?^${}()|[\]\/\\])/g, "\\$1")
            },
            oe = function(t) {
                var s, i, n = "",
                    a = t.getDate(),
                    r = t.getDay(),
                    o = te.settings.days[r],
                    d = t.getMonth() + 1,
                    c = te.settings.months[d - 1],
                    l = t.getFullYear() + "",
                    g = t.getHours(),
                    _ = g % 12 == 0 ? 12 : g % 12,
                    h = t.getMinutes(),
                    p = t.getSeconds(),
                    u = g >= 12 ? "pm" : "am";
                for (s = 0; s < te.settings.format.length; s++) switch (i = te.settings.format.charAt(s)) {
                    case "y":
                        l = l.substr(2);
                    case "Y":
                        n += l;
                        break;
                    case "m":
                        d = ve(d, 2);
                    case "n":
                        n += d;
                        break;
                    case "M":
                        c = e.isArray(te.settings.months_abbr) && void 0 !== te.settings.months_abbr[d - 1] ? te.settings.months_abbr[d - 1] : te.settings.months[d - 1].substr(0, 3);
                    case "F":
                        n += c;
                        break;
                    case "d":
                        a = ve(a, 2);
                    case "j":
                        n += a;
                        break;
                    case "D":
                        o = e.isArray(te.settings.days_abbr) && void 0 !== te.settings.days_abbr[r] ? te.settings.days_abbr[r] : te.settings.days[r].substr(0, 3);
                    case "l":
                        n += o;
                        break;
                    case "N":
                        r++;
                    case "w":
                        n += r;
                        break;
                    case "S":
                        n += a % 10 == 1 && "11" !== a ? "st" : a % 10 == 2 && "12" !== a ? "nd" : a % 10 == 3 && "13" !== a ? "rd" : "th";
                        break;
                    case "g":
                        n += _;
                        break;
                    case "h":
                        n += ve(_, 2);
                        break;
                    case "G":
                        n += g;
                        break;
                    case "H":
                        n += ve(g, 2);
                        break;
                    case "i":
                        n += ve(h, 2);
                        break;
                    case "s":
                        n += ve(p, 2);
                        break;
                    case "a":
                        n += u;
                        break;
                    case "A":
                        n += u.toUpperCase();
                        break;
                    default:
                        n += i
                }
                return n
            },
            de = function() {
                var t, s, i, n, a, c, l, f, m, b, y, v = new Date(z, I + 1, 0).getDate(),
                    w = new Date(z, I, 1).getDay(),
                    k = new Date(z, I, 0).getDate(),
                    D = w - te.settings.first_day_of_week;
                for (D = D < 0 ? 7 + D : D, fe(te.settings.header_captions.days), s = "<tr>", te.settings.show_week_number && (s += "<th>" + te.settings.show_week_number + "</th>"), t = 0; t < 7; t++) s += "<th>" + (e.isArray(te.settings.days_abbr) && void 0 !== te.settings.days_abbr[(te.settings.first_day_of_week + t) % 7] ? te.settings.days_abbr[(te.settings.first_day_of_week + t) % 7] : te.settings.days[(te.settings.first_day_of_week + t) % 7].substr(0, 2)) + "</th>";
                for (s += "</tr><tr>", t = 0; t < 42; t++) t > 0 && t % 7 == 0 && (s += "</tr><tr>"), t % 7 == 0 && te.settings.show_week_number && (s += "<th>" + De(new Date(z, I, t - D + 1)) + "</th>"), i = t - D + 1, te.settings.select_other_months && (t < D || i > v) && (a = (n = new Date(z, I, i)).getFullYear(), c = n.getMonth(), l = n.getDate(), n = a + ve(c + 1, 2) + ve(l, 2)), f = (te.settings.first_day_of_week + t) % 7, y = e.inArray(f, te.settings.weekend_days) > -1, t < D ? s += '<td class="dp_not_in_month ' + (y ? "dp_weekend " : "") + (te.settings.select_other_months && !pe(a, c, l) ? "date_" + n : "dp_disabled") + '">' + (te.settings.select_other_months || te.settings.show_other_months ? ve(k - D + t + 1, te.settings.zero_pad ? 2 : 0) : "&nbsp;") + "</td>" : i > v ? s += '<td class="dp_not_in_month ' + (y ? "dp_weekend " : "") + (te.settings.select_other_months && !pe(a, c, l) ? "date_" + n : "dp_disabled") + '">' + (te.settings.select_other_months || te.settings.show_other_months ? ve(i - v, te.settings.zero_pad ? 2 : 0) : "&nbsp;") + "</td>" : (m = "", b = _e(z, I, i), y && (m = " dp_weekend"), I === o && z === d && r === i && (m += " dp_current"), "" !== b && (m += " " + b), I === p && z === u && h === i && (m += " dp_selected"), pe(z, I, i) && (m += " dp_disabled"), s += "<td" + ("" !== m ? ' class="' + e.trim(m) + '"' : "") + ">" + ((te.settings.zero_pad ? ve(i, 2) : i) || "&nbsp;") + "</td>");
                s += "</tr>", g.html(e(s)), te.settings.always_visible && (_ = e("td:not(.dp_disabled)", g)), g.show()
            },
            ce = function() {
                fe(te.settings.header_captions.months);
                var t, s, i = "<tr>";
                for (t = 0; t < 12; t++) t > 0 && t % 3 == 0 && (i += "</tr><tr>"), s = "dp_month_" + t, pe(z, t) ? s += " dp_disabled" : !1 !== p && p === t && z === u ? s += " dp_selected" : o === t && d === z && (s += " dp_current"), i += '<td class="' + e.trim(s) + '">' + (e.isArray(te.settings.months_abbr) && void 0 !== te.settings.months_abbr[t] ? te.settings.months_abbr[t] : te.settings.months[t].substr(0, 3)) + "</td>";
                i += "</tr>", P.html(e(i)), te.settings.always_visible && (C = e("td:not(.dp_disabled)", P)), P.show()
            },
            le = function() {
                var t;
                t = '<tr class="dp_time_controls_increase">' + (R.hours ? '<td class="dp_time_hour dp_time_control">' + te.settings.navigation[2] + "</td>" : "") + (R.minutes ? '<td class="dp_time_minute dp_time_control">' + te.settings.navigation[2] + "</td>" : "") + (R.seconds ? '<td class="dp_time_second dp_time_control">' + te.settings.navigation[2] + "</td>" : "") + (R.ampm ? '<td class="dp_time_ampm dp_time_control">' + te.settings.navigation[2] + "</td>" : "") + "</tr>", t += '<tr class="dp_time_segments">', R.hours && (t += '<td class="dp_time_hours dp_disabled' + (R.minutes || R.seconds || R.ampm ? " dp_time_separator" : "") + '"><div>' + ve(F, 2) + "</div></td>"), R.minutes && (t += '<td class="dp_time_minutes dp_disabled' + (R.seconds || R.ampm ? " dp_time_separator" : "") + '"><div>' + ve(Z, 2) + "</div></td>"), R.seconds && (t += '<td class="dp_time_seconds dp_disabled' + (R.ampm ? " dp_time_separator" : "") + '"><div>' + ve(S, 2) + "</div></td>"), R.ampm && (t += '<td class="dp_time_ampm dp_disabled">' + Y.toUpperCase() + "</td>"), t += "</tr>", t += '<tr class="dp_time_controls_decrease">' + (R.hours ? '<td class="dp_time_hour dp_time_control">' + te.settings.navigation[3] + "</td>" : "") + (R.minutes ? '<td class="dp_time_minute dp_time_control">' + te.settings.navigation[3] + "</td>" : "") + (R.seconds ? '<td class="dp_time_second dp_time_control">' + te.settings.navigation[3] + "</td>" : "") + (R.ampm ? '<td class="dp_time_ampm dp_time_control">' + te.settings.navigation[3] + "</td>" : "") + "</tr>", L.html(e(t)), L.show()
            },
            ge = function() {
                fe(te.settings.header_captions.years);
                var t, s, i = "<tr>";
                for (t = 0; t < 12; t++) t > 0 && t % 3 == 0 && (i += "</tr><tr>"), s = "", pe(z - 7 + t) ? s += " dp_disabled" : u && u === z - 7 + t ? s += " dp_selected" : d === z - 7 + t && (s += " dp_current"), i += "<td" + ("" !== e.trim(s) ? ' class="' + e.trim(s) + '"' : "") + ">" + (z - 7 + t) + "</td>";
                i += "</tr>", W.html(e(i)), te.settings.always_visible && (B = e("td:not(.dp_disabled)", W)), W.show()
            },
            _e = function(t, s, i) {
                var n, a, r;
                void 0 !== s && (s += 1);
                for (a in c)
                    if (n = c[a], r = !1, e.isArray(G[n]) && e.each(G[n], function() {
                            if (!r) {
                                var a, o = this;
                                if ((e.inArray(t, o[2]) > -1 || e.inArray("*", o[2]) > -1) && (void 0 !== s && e.inArray(s, o[1]) > -1 || e.inArray("*", o[1]) > -1) && (void 0 !== i && e.inArray(i, o[0]) > -1 || e.inArray("*", o[0]) > -1)) {
                                    if (e.inArray("*", o[3]) > -1) return r = n;
                                    if (a = new Date(t, s - 1, i).getDay(), e.inArray(a, o[3]) > -1) return r = n
                                }
                            }
                        }), r) return r;
                return r || ""
            },
            he = function(t) {
                var s, i;
                if ("explorer" === Ae.name && 6 === Ae.version) switch (j || (s = we(l.css("zIndex")) - 1, j = e("<iframe>", {
                    src: 'javascript:document.write("")',
                    scrolling: "no",
                    frameborder: 0,
                    css: {
                        zIndex: s,
                        position: "absolute",
                        top: -1e3,
                        left: -1e3,
                        width: l.outerWidth(),
                        height: l.outerHeight(),
                        filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)",
                        display: "none"
                    }
                }), e("body").append(j)), t) {
                    case "hide":
                        j.hide();
                        break;
                    default:
                        i = l.offset(), j.css({
                            top: i.top,
                            left: i.left,
                            display: "block"
                        })
                }
            },
            pe = function(t, s, i) {
                var n, a, r, o;
                if (!(void 0 !== t && !isNaN(t) || void 0 !== s && !isNaN(s) || void 0 !== i && !isNaN(i))) return !1;
                if (t < 1e3) return !0;
                if (e.isArray(te.settings.direction) || 0 !== we(te.settings.direction)) {
                    if (n = we(ye(t, void 0 !== s ? ve(s, 2) : "", void 0 !== i ? ve(i, 2) : "")), 8 === (a = (n + "").length) && (void 0 !== O && n < we(ye(y, ve(b, 2), ve(m, 2))) || void 0 !== f && n > we(ye(M, ve(A, 2), ve(D, 2))))) return !0;
                    if (6 === a && (void 0 !== O && n < we(ye(y, ve(b, 2))) || void 0 !== f && n > we(ye(M, ve(A, 2))))) return !0;
                    if (4 === a && (void 0 !== O && n < y || void 0 !== f && n > M)) return !0
                }
                return void 0 !== s && (s += 1), r = !1, o = !1, e.isArray(U) && U.length && e.each(U, function() {
                    if (!r) {
                        var n, a = this;
                        if ((e.inArray(t, a[2]) > -1 || e.inArray("*", a[2]) > -1) && (void 0 !== s && e.inArray(s, a[1]) > -1 || e.inArray("*", a[1]) > -1) && (void 0 !== i && e.inArray(i, a[0]) > -1 || e.inArray("*", a[0]) > -1)) {
                            if (e.inArray("*", a[3]) > -1) return r = !0;
                            if (n = new Date(t, s - 1, i).getDay(), e.inArray(n, a[3]) > -1) return r = !0
                        }
                    }
                }), V && e.each(V, function() {
                    if (!o) {
                        var n, a = this;
                        if ((e.inArray(t, a[2]) > -1 || e.inArray("*", a[2]) > -1) && (o = !0, void 0 !== s))
                            if (o = !0, e.inArray(s, a[1]) > -1 || e.inArray("*", a[1]) > -1) {
                                if (void 0 !== i)
                                    if (o = !0, e.inArray(i, a[0]) > -1 || e.inArray("*", a[0]) > -1) {
                                        if (e.inArray("*", a[3]) > -1) return o = !0;
                                        if (n = new Date(t, s - 1, i).getDay(), e.inArray(n, a[3]) > -1) return o = !0;
                                        o = !1
                                    } else o = !1
                            } else o = !1
                    }
                }), (!V || !o) && !(!U || !r)
            },
            ue = function(e) {
                return (e + "").match(/^\-?[0-9]+$/)
            },
            fe = function(t) {
                !isNaN(parseFloat(I)) && isFinite(I) && (t = t.replace(/\bm\b|\bn\b|\bF\b|\bM\b/, function(t) {
                    switch (t) {
                        case "m":
                            return ve(I + 1, 2);
                        case "n":
                            return I + 1;
                        case "F":
                            return te.settings.months[I];
                        case "M":
                            return e.isArray(te.settings.months_abbr) && void 0 !== te.settings.months_abbr[I] ? te.settings.months_abbr[I] : te.settings.months[I].substr(0, 3);
                        default:
                            return t
                    }
                })), !isNaN(parseFloat(z)) && isFinite(z) && (t = t.replace(/\bY\b/, z).replace(/\by\b/, (z + "").substr(2)).replace(/\bY1\b/i, z - 7).replace(/\bY2\b/i, z + 4)), e(".dp_caption", w).html(t)
            },
            me = function() {
                var t, s;
                "" === g.text() || "days" === E ? ("" === g.text() ? (te.settings.always_visible instanceof jQuery || l.css("left", -1e3), l.removeClass("hidden"), de(), t = void 0 !== g[0].getBoundingClientRect && void 0 !== g[0].getBoundingClientRect().height ? g[0].getBoundingClientRect().height : g.outerHeight(!0), P.css("height", t), W.css("height", t), L.css("height", t + w.outerHeight(!0)), l.css("width", l.outerWidth()), l.addClass("dp_hidden")) : de(), w.show(), P.hide(), W.hide(), L.hide(), x.hide(), a.hide(), R && x.show().removeClass("dp_calendar")) : "months" === E ? (ce(), g.hide(), W.hide(), L.hide(), x.hide(), a.hide()) : "years" === E ? (ge(), g.hide(), P.hide(), L.hide(), x.hide(), a.hide()) : "time" === E && (le(), 1 === Q.length ? (x.hide(), a.show()) : (x.show().addClass("dp_calendar"), "" === se.val() ? a.hide() : a.show()), w.hide(), g.hide(), P.hide(), W.hide()), "time" !== E && te.settings.onChange && "function" == typeof te.settings.onChange && void 0 !== E && ((s = "days" === E ? g.find("td:not(.dp_disabled)") : "months" === E ? P.find("td:not(.dp_disabled)") : W.find("td:not(.dp_disabled)")).each(function() {
                    var t;
                    "days" === E ? e(this).hasClass("dp_not_in_month") && !e(this).hasClass("dp_disabled") ? (t = e(this).attr("class").match(/date\_([0-9]{4})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])/), e(this).data("date", t[1] + "-" + t[2] + "-" + t[3])) : e(this).data("date", z + "-" + ve(I + 1, 2) + "-" + ve(we(e(this).text()), 2)) : "months" === E ? (t = e(this).attr("class").match(/dp\_month\_([0-9]+)/), e(this).data("date", z + "-" + ve(we(t[1]) + 1, 2))) : e(this).data("date", we(e(this).text()))
                }), te.settings.onChange.call(se, E, s)), v.show(), "time" === E && Q.length > 1 ? (N.hide(), i.hide(), x.css("width", "" === se.val() ? "100%" : "50%")) : (N.show(), i.show(), !0 === te.settings.show_clear_date || 0 === te.settings.show_clear_date && "" !== se.val() || te.settings.always_visible && !1 !== te.settings.show_clear_date ? H ? (N.css("width", "50%"), i.css("width", "50%")) : (N.hide(), i.css("width", e.inArray(Q, "time") > -1 ? "50%" : "100%")) : (i.hide(), H ? N.css("width", "100%") : (N.hide(), (!R || "time" !== E && "days" !== E) && v.hide())))
            },
            be = function(e, t, s, i, n) {
                var a = new Date(e, t, s, R && R.hours ? F + (R.ampm && ("pm" === Y && F < 12 || "am" === Y && 12 === F) ? 12 : 0) : 0, R && R.minutes ? Z : 0, R && R.seconds ? S : 0),
                    r = "days" === i ? _ : "months" === i ? C : B,
                    o = oe(a);
                se.val(o), (te.settings.always_visible || R) && (p = a.getMonth(), I = a.getMonth(), u = a.getFullYear(), z = a.getFullYear(), h = a.getDate(), n && r && (r.removeClass("dp_selected"), n.addClass("dp_selected"), "days" === i && n.hasClass("dp_not_in_month") && !n.hasClass("dp_disabled") && te.show())), R ? (E = "time", me()) : (se.focus(), te.hide()), ke(a), !R && te.settings.onSelect && "function" == typeof te.settings.onSelect && te.settings.onSelect.call(se, o, e + "-" + ve(t + 1, 2) + "-" + ve(s, 2), a)
            },
            ye = function() {
                var e, t = "";
                for (e = 0; e < arguments.length; e++) t += arguments[e] + "";
                return t
            },
            ve = function(e, t) {
                for (e += ""; e.length < t;) e = "0" + e;
                return e
            },
            we = function(e) {
                return parseInt(e, 10)
            },
            ke = function(t) {
                te.settings.pair && e.each(te.settings.pair, function() {
                    var s, i = e(this);
                    i.data && i.data("Zebra_DatePicker") ? ((s = i.data("Zebra_DatePicker")).update({
                        reference_date: t,
                        direction: 0 === s.settings.direction ? 1 : s.settings.direction
                    }), s.settings.always_visible && s.show()) : i.data("zdp_reference_date", t)
                })
            },
            De = function(e) {
                var t, s, i, n, a, r, o, d = e.getFullYear(),
                    c = e.getMonth() + 1,
                    l = e.getDate();
                return c < 3 ? (i = (s = ((t = d - 1) / 4 | 0) - (t / 100 | 0) + (t / 400 | 0)) - (((t - 1) / 4 | 0) - ((t - 1) / 100 | 0) + ((t - 1) / 400 | 0)), n = 0, a = l - 1 + 31 * (c - 1)) : (n = (i = (s = ((t = d) / 4 | 0) - (t / 100 | 0) + (t / 400 | 0)) - (((t - 1) / 4 | 0) - ((t - 1) / 100 | 0) + ((t - 1) / 400 | 0))) + 1, a = l + ((153 * (c - 3) + 2) / 5 | 0) + 58 + i), r = (t + s) % 7, l = (a + r - n) % 7, o = a + 3 - l, o < 0 ? 53 - ((r - i) / 5 | 0) : o > 364 + i ? 1 : 1 + (o / 7 | 0)
            },
            Ae = {
                init: function() {
                    this.name = this.searchString(this.dataBrowser) || "", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || ""
                },
                searchString: function(e) {
                    var t, s, i;
                    for (t = 0; t < e.length; t++)
                        if (s = e[t].string, i = e[t].prop, this.versionSearchString = e[t].versionSearch || e[t].identity, s) {
                            if (-1 !== s.indexOf(e[t].subString)) return e[t].identity
                        } else if (i) return e[t].identity
                },
                searchVersion: function(e) {
                    var t = e.indexOf(this.versionSearchString);
                    if (-1 !== t) return parseFloat(e.substring(t + this.versionSearchString.length + 1))
                },
                dataBrowser: [{
                    string: navigator.userAgent,
                    subString: "Firefox",
                    identity: "firefox"
                }, {
                    string: navigator.userAgent,
                    subString: "MSIE",
                    identity: "explorer",
                    versionSearch: "MSIE"
                }]
            };
        Ae.init(), ie()
    }, e.fn.Zebra_DatePicker = function(t) {
        return this.each(function() {
            void 0 !== e(this).data("Zebra_DatePicker") && e(this).data("Zebra_DatePicker").destroy();
            var s = new e.Zebra_DatePicker(this, t);
            e(this).data("Zebra_DatePicker", s)
        })
    }, e.fn.Zebra_DatePicker.defaults = {}
});