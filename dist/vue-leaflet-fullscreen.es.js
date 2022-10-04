import { toRefs as a, inject as f, watch as h, openBlock as m, createElementBlock as d } from "vue";
/*!
 * leaflet.fullscreen
 */
function F(e, r) {
  return e.Control.FullScreen = e.Control.extend({
    options: {
      position: "bottomright",
      title: "Full Screen",
      titleCancel: "Exit Full Screen",
      forceSeparateButton: !0,
      forcePseudoFullscreen: !1,
      fullscreenElement: !1
    },
    _screenfull: r,
    onAdd: function(n) {
      var o = "leaflet-control-zoom-fullscreen", l, s = "";
      return n.zoomControl && !this.options.forceSeparateButton ? l = n.zoomControl._container : l = e.DomUtil.create("div", "leaflet-bar"), this.options.content ? s = this.options.content : o += " leaflet-fullscreen-icon", this._createButton(
        this.options.title,
        o,
        s,
        l,
        this.toggleFullScreen,
        this
      ), this._map.fullscreenControl = this, this._map.on("enterFullscreen exitFullscreen", this._toggleState, this), l;
    },
    onRemove: function() {
      e.DomEvent.off(this.link, "click", e.DomEvent.stop).off(
        this.link,
        "click",
        this.toggleFullScreen,
        this
      ), this._screenfull.isEnabled && (e.DomEvent.off(
        this._container,
        this._screenfull.raw.fullscreenchange,
        e.DomEvent.stop
      ).off(
        this._container,
        this._screenfull.raw.fullscreenchange,
        this._handleFullscreenChange,
        this
      ), e.DomEvent.off(
        document,
        this._screenfull.raw.fullscreenchange,
        e.DomEvent.stop
      ).off(
        document,
        this._screenfull.raw.fullscreenchange,
        this._handleFullscreenChange,
        this
      ));
    },
    _createButton: function(n, o, l, s, t, i) {
      return this.link = e.DomUtil.create("a", o, s), this.link.href = "#", this.link.title = n, this.link.innerHTML = l, this.link.setAttribute("role", "button"), this.link.setAttribute("aria-label", n), e.DomEvent.disableClickPropagation(s), e.DomEvent.on(this.link, "click", e.DomEvent.stop).on(
        this.link,
        "click",
        t,
        i
      ), this._screenfull.isEnabled && (e.DomEvent.on(
        s,
        this._screenfull.raw.fullscreenchange,
        e.DomEvent.stop
      ).on(
        s,
        this._screenfull.raw.fullscreenchange,
        this._handleFullscreenChange,
        i
      ), e.DomEvent.on(
        document,
        this._screenfull.raw.fullscreenchange,
        e.DomEvent.stop
      ).on(
        document,
        this._screenfull.raw.fullscreenchange,
        this._handleFullscreenChange,
        i
      )), this.link;
    },
    toggleFullScreen: function() {
      var n = this._map;
      n._exitFired = !1, n._isFullscreen ? (this._screenfull.isEnabled && !this.options.forcePseudoFullscreen ? this._screenfull.exit() : (e.DomUtil.removeClass(
        this.options.fullscreenElement ? this.options.fullscreenElement : n._container,
        "leaflet-pseudo-fullscreen"
      ), n.invalidateSize()), n.fire("exitFullscreen"), n._exitFired = !0, n._isFullscreen = !1) : (this._screenfull.isEnabled && !this.options.forcePseudoFullscreen ? this._screenfull.request(
        this.options.fullscreenElement ? this.options.fullscreenElement : n._container
      ) : (e.DomUtil.addClass(
        this.options.fullscreenElement ? this.options.fullscreenElement : n._container,
        "leaflet-pseudo-fullscreen"
      ), n.invalidateSize()), n.fire("enterFullscreen"), n._isFullscreen = !0);
    },
    _toggleState: function() {
      this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel, this._map._isFullscreen ? e.DomUtil.removeClass(this.link, "leaflet-fullscreen-on") : e.DomUtil.addClass(this.link, "leaflet-fullscreen-on");
    },
    _handleFullscreenChange: function() {
      var n = this._map;
      n.invalidateSize(), !this._screenfull.isFullscreen && !n._exitFired && (n.fire("exitFullscreen"), n._exitFired = !0, n._isFullscreen = !1);
    }
  }), e.Map.include({
    toggleFullscreen: function() {
      this.fullscreenControl.toggleFullScreen();
    }
  }), e.Map.addInitHook(function() {
    this.options.fullscreenControl && this.addControl(
      e.control.fullscreen(this.options.fullscreenControlOptions)
    );
  }), e.control.fullscreen = function(n) {
    return new e.Control.FullScreen(n);
  }, { leaflet: e, screenfull: r };
}
/*!
 * Based on package 'screenfull'
 * v5.2.0 - 2021-11-03
 * (c) Sindre Sorhus; MIT License
 * Added definition for using screenfull as an amd module
 * Must be placed before the definition of leaflet.fullscreen
 * as it is required by that
 */
function p() {
  var e = typeof window < "u" && typeof window.document < "u" ? window.document : {}, r = function() {
    for (var l, s = [
      [
        "requestFullscreen",
        "exitFullscreen",
        "fullscreenElement",
        "fullscreenEnabled",
        "fullscreenchange",
        "fullscreenerror"
      ],
      [
        "webkitRequestFullscreen",
        "webkitExitFullscreen",
        "webkitFullscreenElement",
        "webkitFullscreenEnabled",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      [
        "webkitRequestFullScreen",
        "webkitCancelFullScreen",
        "webkitCurrentFullScreenElement",
        "webkitCancelFullScreen",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      [
        "mozRequestFullScreen",
        "mozCancelFullScreen",
        "mozFullScreenElement",
        "mozFullScreenEnabled",
        "mozfullscreenchange",
        "mozfullscreenerror"
      ],
      [
        "msRequestFullscreen",
        "msExitFullscreen",
        "msFullscreenElement",
        "msFullscreenEnabled",
        "MSFullscreenChange",
        "MSFullscreenError"
      ]
    ], t = 0, i = s.length, c = {}; t < i; t++)
      if (l = s[t], l && l[1] in e) {
        for (t = 0; t < l.length; t++)
          c[s[0][t]] = l[t];
        return c;
      }
    return !1;
  }(), n = {
    change: r.fullscreenchange,
    error: r.fullscreenerror
  }, o = {
    request: function(l, s) {
      return new Promise(
        function(t, i) {
          var c = function() {
            this.off("change", c), t();
          }.bind(this);
          this.on("change", c), l = l || e.documentElement;
          var u = l[r.requestFullscreen](s);
          u instanceof Promise && u.then(c).catch(i);
        }.bind(this)
      );
    },
    exit: function() {
      return new Promise(
        function(l, s) {
          if (!this.isFullscreen) {
            l();
            return;
          }
          var t = function() {
            this.off("change", t), l();
          }.bind(this);
          this.on("change", t);
          var i = e[r.exitFullscreen]();
          i instanceof Promise && i.then(t).catch(s);
        }.bind(this)
      );
    },
    toggle: function(l, s) {
      return this.isFullscreen ? this.exit() : this.request(l, s);
    },
    onchange: function(l) {
      this.on("change", l);
    },
    onerror: function(l) {
      this.on("error", l);
    },
    on: function(l, s) {
      var t = n[l];
      t && e.addEventListener(t, s, !1);
    },
    off: function(l, s) {
      var t = n[l];
      t && e.removeEventListener(t, s, !1);
    },
    raw: r
  };
  return r ? (Object.defineProperties(o, {
    isFullscreen: {
      get: function() {
        return Boolean(e[r.fullscreenElement]);
      }
    },
    element: {
      enumerable: !0,
      get: function() {
        return e[r.fullscreenElement];
      }
    },
    isEnabled: {
      enumerable: !0,
      get: function() {
        return Boolean(e[r.fullscreenEnabled]);
      }
    }
  }), o) : { isEnabled: !1 };
}
const g = {
  __name: "LFullScreen",
  props: ["mapRef", "position"],
  setup(e) {
    const r = e, n = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || void 0, { mapRef: o, position: l } = a(r), s = f("useGlobalLeaflet");
    return h(o, async (t) => {
      if (o.value) {
        const i = s ? n.L : await import("leaflet/dist/leaflet-src.esm");
        F(i, p()), new i.Control.FullScreen({ position: l.value || "topleft" }).addTo(
          t
        );
      }
    }), (t, i) => (m(), d("span"));
  }
};
export {
  g as default
};
