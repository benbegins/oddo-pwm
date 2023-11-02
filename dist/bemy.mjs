var tt = Object.defineProperty, nt = (e, t, n) => t in e ? tt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, P = (e, t, n) => (nt(e, typeof t != "symbol" ? t + "" : t, n), n);
function st(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function je(e) {
  if (v(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = L(s) ? ot(s) : je(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (L(e) || E(e))
    return e;
}
const rt = /;(?![^(]*\))/g, it = /:(.+)/;
function ot(e) {
  const t = {};
  return e.split(rt).forEach((n) => {
    if (n) {
      const s = n.split(it);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Re(e) {
  let t = "";
  if (L(e))
    t = e;
  else if (v(e))
    for (let n = 0; n < e.length; n++) {
      const s = Re(e[n]);
      s && (t += s + " ");
    }
  else if (E(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function ct(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = T(e[s], t[s]);
  return n;
}
function T(e, t) {
  if (e === t)
    return !0;
  let n = de(e), s = de(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = v(e), s = v(t), n || s)
    return n && s ? ct(e, t) : !1;
  if (n = E(e), s = E(t), n || s) {
    if (!n || !s)
      return !1;
    const r = Object.keys(e).length, i = Object.keys(t).length;
    if (r !== i)
      return !1;
    for (const o in e) {
      const c = e.hasOwnProperty(o), u = t.hasOwnProperty(o);
      if (c && !u || !c && u || !T(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function G(e, t) {
  return e.findIndex((n) => T(n, t));
}
const lt = Object.assign, ut = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ft = Object.prototype.hasOwnProperty, ce = (e, t) => ft.call(e, t), v = Array.isArray, U = (e) => Pe(e) === "[object Map]", de = (e) => e instanceof Date, L = (e) => typeof e == "string", le = (e) => typeof e == "symbol", E = (e) => e !== null && typeof e == "object", at = Object.prototype.toString, Pe = (e) => at.call(e), ht = (e) => Pe(e).slice(8, -1), ue = (e) => L(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ce = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, pt = /-(\w)/g, dt = Ce((e) => e.replace(pt, (t, n) => n ? n.toUpperCase() : "")), gt = /\B([A-Z])/g, Ne = Ce((e) => e.replace(gt, "-$1").toLowerCase()), mt = (e, t) => !Object.is(e, t), ge = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let vt;
function Me(e, t) {
  t = t || vt, t && t.active && t.effects.push(e);
}
const Te = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Le = (e) => (e.w & A) > 0, Be = (e) => (e.n & A) > 0, bt = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= A;
}, yt = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      Le(r) && !Be(r) ? r.delete(e) : t[n++] = r, r.w &= ~A, r.n &= ~A;
    }
    t.length = n;
  }
}, Q = /* @__PURE__ */ new WeakMap();
let H = 0, A = 1;
const X = 30, W = [];
let C;
const F = Symbol(""), me = Symbol("");
class xt {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], Me(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    if (!W.includes(this))
      try {
        return W.push(C = this), kt(), A = 1 << ++H, H <= X ? bt(this) : ve(this), this.fn();
      } finally {
        H <= X && yt(this), A = 1 << --H, We(), W.pop();
        const t = W.length;
        C = t > 0 ? W[t - 1] : void 0;
      }
  }
  stop() {
    this.active && (ve(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ve(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
function wt(e, t) {
  e.effect && (e = e.effect.fn);
  const n = new xt(e);
  t && (lt(n, t), t.scope && Me(n, t.scope)), (!t || !t.lazy) && n.run();
  const s = n.run.bind(n);
  return s.effect = n, s;
}
function _t(e) {
  e.effect.stop();
}
let B = !0;
const fe = [];
function $t() {
  fe.push(B), B = !1;
}
function kt() {
  fe.push(B), B = !0;
}
function We() {
  const e = fe.pop();
  B = e === void 0 ? !0 : e;
}
function q(e, t, n) {
  if (!St())
    return;
  let s = Q.get(e);
  s || Q.set(e, s = /* @__PURE__ */ new Map());
  let r = s.get(n);
  r || s.set(n, r = Te()), Ot(r);
}
function St() {
  return B && C !== void 0;
}
function Ot(e, t) {
  let n = !1;
  H <= X ? Be(e) || (e.n |= A, n = !Le(e)) : n = !e.has(C), n && (e.add(C), C.deps.push(e));
}
function ee(e, t, n, s, r, i) {
  const o = Q.get(e);
  if (!o)
    return;
  let c = [];
  if (t === "clear")
    c = [...o.values()];
  else if (n === "length" && v(e))
    o.forEach((u, l) => {
      (l === "length" || l >= s) && c.push(u);
    });
  else
    switch (n !== void 0 && c.push(o.get(n)), t) {
      case "add":
        v(e) ? ue(n) && c.push(o.get("length")) : (c.push(o.get(F)), U(e) && c.push(o.get(me)));
        break;
      case "delete":
        v(e) || (c.push(o.get(F)), U(e) && c.push(o.get(me)));
        break;
      case "set":
        U(e) && c.push(o.get(F));
        break;
    }
  if (c.length === 1)
    c[0] && be(c[0]);
  else {
    const u = [];
    for (const l of c)
      l && u.push(...l);
    be(Te(u));
  }
}
function be(e, t) {
  for (const n of v(e) ? e : [...e])
    (n !== C || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run());
}
const Et = st("__proto__,__v_isRef,__isVue"), He = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(le)), At = Ie(), jt = Ie(!0), ye = Rt();
function Rt() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = N(this);
      for (let i = 0, o = this.length; i < o; i++)
        q(s, "get", i + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(N)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      $t();
      const s = N(this)[t].apply(this, n);
      return We(), s;
    };
  }), e;
}
function Ie(e = !1, t = !1) {
  return function(n, s, r) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_raw" && r === (e ? t ? Ht : Fe : t ? Wt : Ke).get(n))
      return n;
    const i = v(n);
    if (!e && i && ce(ye, s))
      return Reflect.get(ye, s, r);
    const o = Reflect.get(n, s, r);
    return (le(s) ? He.has(s) : Et(s)) || (e || q(n, "get", s), t) ? o : te(o) ? !i || !ue(s) ? o.value : o : E(o) ? e ? Ft(o) : z(o) : o;
  };
}
const Pt = Ct();
function Ct(e = !1) {
  return function(t, n, s, r) {
    let i = t[n];
    if (!e && !Vt(s) && (s = N(s), i = N(i), !v(t) && te(i) && !te(s)))
      return i.value = s, !0;
    const o = v(t) && ue(n) ? Number(n) < t.length : ce(t, n), c = Reflect.set(t, n, s, r);
    return t === N(r) && (o ? mt(s, i) && ee(t, "set", n, s) : ee(t, "add", n, s)), c;
  };
}
function Nt(e, t) {
  const n = ce(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && ee(e, "delete", t, void 0), s;
}
function Mt(e, t) {
  const n = Reflect.has(e, t);
  return (!le(t) || !He.has(t)) && q(e, "has", t), n;
}
function Tt(e) {
  return q(e, "iterate", v(e) ? "length" : F), Reflect.ownKeys(e);
}
const Lt = { get: At, set: Pt, deleteProperty: Nt, has: Mt, ownKeys: Tt }, Bt = { get: jt, set(e, t) {
  return !0;
}, deleteProperty(e, t) {
  return !0;
} }, Ke = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap();
function It(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Kt(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : It(ht(e));
}
function z(e) {
  return e && e.__v_isReadonly ? e : Ve(e, !1, Lt, null, Ke);
}
function Ft(e) {
  return Ve(e, !0, Bt, null, Fe);
}
function Ve(e, t, n, s, r) {
  if (!E(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = Kt(e);
  if (o === 0)
    return e;
  const c = new Proxy(e, o === 2 ? s : n);
  return r.set(e, c), c;
}
function Vt(e) {
  return !!(e && e.__v_isReadonly);
}
function N(e) {
  const t = e && e.__v_raw;
  return t ? N(t) : e;
}
function te(e) {
  return !!(e && e.__v_isRef === !0);
}
Promise.resolve();
let ne = !1;
const V = [], qt = Promise.resolve(), J = (e) => qt.then(e), xe = (e) => {
  V.includes(e) || V.push(e), ne || (ne = !0, J(zt));
}, zt = () => {
  for (const e of V)
    e();
  V.length = 0, ne = !1;
}, Jt = /^(spellcheck|draggable|form|list|type)$/, se = ({ el: e, get: t, effect: n, arg: s, modifiers: r }) => {
  let i;
  s === "class" && (e._class = e.className), n(() => {
    let o = t();
    if (s)
      r != null && r.camel && (s = dt(s)), Y(e, s, o, i);
    else {
      for (const c in o)
        Y(e, c, o[c], i && i[c]);
      for (const c in i)
        (!o || !(c in o)) && Y(e, c, null);
    }
    i = o;
  });
}, Y = (e, t, n, s) => {
  if (t === "class")
    e.setAttribute("class", Re(e._class ? [e._class, n] : n) || "");
  else if (t === "style") {
    n = je(n);
    const { style: r } = e;
    if (!n)
      e.removeAttribute("style");
    else if (L(n))
      n !== s && (r.cssText = n);
    else {
      for (const i in n)
        re(r, i, n[i]);
      if (s && !L(s))
        for (const i in s)
          n[i] == null && re(r, i, "");
    }
  } else
    !(e instanceof SVGElement) && t in e && !Jt.test(t) ? (e[t] = n, t === "value" && (e._value = n)) : t === "true-value" ? e._trueValue = n : t === "false-value" ? e._falseValue = n : n != null ? e.setAttribute(t, n) : e.removeAttribute(t);
}, we = /\s*!important$/, re = (e, t, n) => {
  v(n) ? n.forEach((s) => re(e, t, s)) : t.startsWith("--") ? e.setProperty(t, n) : we.test(n) ? e.setProperty(Ne(t), n.replace(we, ""), "important") : e[t] = n;
}, O = (e, t) => {
  const n = e.getAttribute(t);
  return n != null && e.removeAttribute(t), n;
}, S = (e, t, n, s) => {
  e.addEventListener(t, n, s);
}, Zt = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, Dt = ["ctrl", "shift", "alt", "meta"], Gt = { stop: (e) => e.stopPropagation(), prevent: (e) => e.preventDefault(), self: (e) => e.target !== e.currentTarget, ctrl: (e) => !e.ctrlKey, shift: (e) => !e.shiftKey, alt: (e) => !e.altKey, meta: (e) => !e.metaKey, left: (e) => "button" in e && e.button !== 0, middle: (e) => "button" in e && e.button !== 1, right: (e) => "button" in e && e.button !== 2, exact: (e, t) => Dt.some((n) => e[`${n}Key`] && !t[n]) }, qe = ({ el: e, get: t, exp: n, arg: s, modifiers: r }) => {
  if (!s)
    return;
  let i = Zt.test(n) ? t(`(e => ${n}(e))`) : t(`($event => { ${n} })`);
  if (s === "vue:mounted") {
    J(i);
    return;
  } else if (s === "vue:unmounted")
    return () => i();
  if (r) {
    s === "click" && (r.right && (s = "contextmenu"), r.middle && (s = "mouseup"));
    const o = i;
    i = (c) => {
      if (!("key" in c && !(Ne(c.key) in r))) {
        for (const u in r) {
          const l = Gt[u];
          if (l && l(c, r))
            return;
        }
        return o(c);
      }
    };
  }
  S(e, s, i, r);
}, Ut = ({ el: e, get: t, effect: n }) => {
  const s = e.style.display;
  n(() => {
    e.style.display = t() ? s : "none";
  });
}, ze = ({ el: e, get: t, effect: n }) => {
  n(() => {
    e.textContent = Je(t());
  });
}, Je = (e) => e == null ? "" : E(e) ? JSON.stringify(e, null, 2) : String(e), Yt = ({ el: e, get: t, effect: n }) => {
  n(() => {
    e.innerHTML = t();
  });
}, Qt = ({ el: e, exp: t, get: n, effect: s, modifiers: r }) => {
  const i = e.type, o = n(`(val) => { ${t} = val }`), { trim: c, number: u = i === "number" } = r || {};
  if (e.tagName === "SELECT") {
    const l = e;
    S(e, "change", () => {
      const f = Array.prototype.filter.call(l.options, (a) => a.selected).map((a) => u ? ge(k(a)) : k(a));
      o(l.multiple ? f : f[0]);
    }), s(() => {
      const f = n(), a = l.multiple;
      for (let h = 0, y = l.options.length; h < y; h++) {
        const b = l.options[h], x = k(b);
        if (a)
          v(f) ? b.selected = G(f, x) > -1 : b.selected = f.has(x);
        else if (T(k(b), f)) {
          l.selectedIndex !== h && (l.selectedIndex = h);
          return;
        }
      }
      !a && l.selectedIndex !== -1 && (l.selectedIndex = -1);
    });
  } else if (i === "checkbox") {
    S(e, "change", () => {
      const f = n(), a = e.checked;
      if (v(f)) {
        const h = k(e), y = G(f, h), b = y !== -1;
        if (a && !b)
          o(f.concat(h));
        else if (!a && b) {
          const x = [...f];
          x.splice(y, 1), o(x);
        }
      } else
        o(_e(e, a));
    });
    let l;
    s(() => {
      const f = n();
      v(f) ? e.checked = G(f, k(e)) > -1 : f !== l && (e.checked = T(f, _e(e, !0))), l = f;
    });
  } else if (i === "radio") {
    S(e, "change", () => {
      o(k(e));
    });
    let l;
    s(() => {
      const f = n();
      f !== l && (e.checked = T(f, k(e)));
    });
  } else {
    const l = (f) => c ? f.trim() : u ? ge(f) : f;
    S(e, "compositionstart", Xt), S(e, "compositionend", en), S(e, r != null && r.lazy ? "change" : "input", () => {
      e.composing || o(l(e.value));
    }), c && S(e, "change", () => {
      e.value = e.value.trim();
    }), s(() => {
      if (e.composing)
        return;
      const f = e.value, a = n();
      document.activeElement === e && l(f) === a || f !== a && (e.value = a);
    });
  }
}, k = (e) => "_value" in e ? e._value : e.value, _e = (e, t) => {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}, Xt = (e) => {
  e.target.composing = !0;
}, en = (e) => {
  const t = e.target;
  t.composing && (t.composing = !1, tn(t, "input"));
}, tn = (e, t) => {
  const n = document.createEvent("HTMLEvents");
  n.initEvent(t, !0, !0), e.dispatchEvent(n);
}, $e = /* @__PURE__ */ Object.create(null), I = (e, t, n) => Ze(e, `return(${t})`, n), Ze = (e, t, n) => {
  const s = $e[t] || ($e[t] = nn(t));
  try {
    return s(e, n);
  } catch (r) {
    console.error(r);
  }
}, nn = (e) => {
  try {
    return new Function("$data", "$el", `with($data){${e}}`);
  } catch (t) {
    return console.error(`${t.message} in expression: ${e}`), () => {
    };
  }
}, sn = ({ el: e, ctx: t, exp: n, effect: s }) => {
  J(() => s(() => Ze(t.scope, n, e)));
}, rn = { bind: se, on: qe, show: Ut, text: ze, html: Yt, model: Qt, effect: sn }, on = (e, t, n) => {
  const s = e.parentElement, r = new Comment("v-if");
  s.insertBefore(r, e);
  const i = [{ exp: t, el: e }];
  let o, c;
  for (; (o = e.nextElementSibling) && (c = null, O(o, "v-else") === "" || (c = O(o, "v-else-if"))); )
    s.removeChild(o), i.push({ exp: c, el: o });
  const u = e.nextSibling;
  s.removeChild(e);
  let l, f = -1;
  const a = () => {
    l && (s.insertBefore(r, l.el), l.remove(), l = void 0);
  };
  return n.effect(() => {
    for (let h = 0; h < i.length; h++) {
      const { exp: y, el: b } = i[h];
      if (!y || I(n.scope, y)) {
        h !== f && (a(), l = new ae(b, n), l.insert(s, r), s.removeChild(r), f = h);
        return;
      }
    }
    f = -1, a();
  }), u;
}, cn = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, ke = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, ln = /^\(|\)$/g, un = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/, fn = (e, t, n) => {
  const s = t.match(cn);
  if (!s)
    return;
  const r = e.nextSibling, i = e.parentElement, o = new Text("");
  i.insertBefore(o, e), i.removeChild(e);
  const c = s[2].trim();
  let u = s[1].trim().replace(ln, "").trim(), l, f = !1, a, h, y = "key", b = e.getAttribute(y) || e.getAttribute(y = ":key") || e.getAttribute(y = "v-bind:key");
  b && (e.removeAttribute(y), y === "key" && (b = JSON.stringify(b)));
  let x;
  (x = u.match(ke)) && (u = u.replace(ke, "").trim(), a = x[1].trim(), x[2] && (h = x[2].trim())), (x = u.match(un)) && (l = x[1].split(",").map((g) => g.trim()), f = u[0] === "[");
  let he = !1, j, K, Z;
  const et = (g) => {
    const w = /* @__PURE__ */ new Map(), p = [];
    if (v(g))
      for (let d = 0; d < g.length; d++)
        p.push(D(w, g[d], d));
    else if (typeof g == "number")
      for (let d = 0; d < g; d++)
        p.push(D(w, d + 1, d));
    else if (E(g)) {
      let d = 0;
      for (const m in g)
        p.push(D(w, g[m], d++, m));
    }
    return [p, w];
  }, D = (g, w, p, d) => {
    const m = {};
    l ? l.forEach((R, $) => m[R] = w[f ? $ : R]) : m[u] = w, d ? (a && (m[a] = d), h && (m[h] = p)) : a && (m[a] = p);
    const M = Ye(n, m), _ = b ? I(M.scope, b) : p;
    return g.set(_, p), M.key = _, M;
  }, pe = (g, w) => {
    const p = new ae(e, g);
    return p.key = g.key, p.insert(i, w), p;
  };
  return n.effect(() => {
    const g = I(n.scope, c), w = Z;
    if ([K, Z] = et(g), !he)
      j = K.map((p) => pe(p, o)), he = !0;
    else {
      for (let _ = 0; _ < j.length; _++)
        Z.has(j[_].key) || j[_].remove();
      const p = [];
      let d = K.length, m, M;
      for (; d--; ) {
        const _ = K[d], R = w.get(_.key);
        let $;
        R == null ? $ = pe(_, m ? m.el : o) : ($ = j[R], Object.assign($.ctx.scope, _.scope), R !== d && (j[R + 1] !== m || M === m) && (M = $, $.insert(i, m ? m.el : o))), p.unshift(m = $);
      }
      j = p;
    }
  }), r;
}, De = ({ el: e, ctx: { scope: { $refs: t } }, get: n, effect: s }) => {
  let r;
  return s(() => {
    const i = n();
    t[i] = e, r && i !== r && delete t[r], r = i;
  }), () => {
    r && delete t[r];
  };
}, an = /^(?:v-|:|@)/, hn = /\.([\w-]+)/g;
let ie = !1;
const Ge = (e, t) => {
  const n = e.nodeType;
  if (n === 1) {
    const s = e;
    if (s.hasAttribute("v-pre"))
      return;
    O(s, "v-cloak");
    let r;
    if (r = O(s, "v-if"))
      return on(s, r, t);
    if (r = O(s, "v-for"))
      return fn(s, r, t);
    if ((r = O(s, "v-scope")) || r === "") {
      const c = r ? I(t.scope, r) : {};
      t = Ye(t, c), c.$template && pn(s, c.$template);
    }
    const i = O(s, "v-once") != null;
    i && (ie = !0), (r = O(s, "ref")) && oe(s, De, `"${r}"`, t), Se(s, t);
    const o = [];
    for (const { name: c, value: u } of [...s.attributes])
      an.test(c) && c !== "v-cloak" && (c === "v-model" ? o.unshift([c, u]) : c[0] === "@" || /^v-on\b/.test(c) ? o.push([c, u]) : Oe(s, c, u, t));
    for (const [c, u] of o)
      Oe(s, c, u, t);
    i && (ie = !1);
  } else if (n === 3) {
    const s = e.data;
    if (s.includes(t.delimiters[0])) {
      let r = [], i = 0, o;
      for (; o = t.delimitersRE.exec(s); ) {
        const c = s.slice(i, o.index);
        c && r.push(JSON.stringify(c)), r.push(`$s(${o[1]})`), i = o.index + o[0].length;
      }
      i < s.length && r.push(JSON.stringify(s.slice(i))), oe(e, ze, r.join("+"), t);
    }
  } else
    n === 11 && Se(e, t);
}, Se = (e, t) => {
  let n = e.firstChild;
  for (; n; )
    n = Ge(n, t) || n.nextSibling;
}, Oe = (e, t, n, s) => {
  let r, i, o;
  if (t = t.replace(hn, (c, u) => ((o || (o = {}))[u] = !0, "")), t[0] === ":")
    r = se, i = t.slice(1);
  else if (t[0] === "@")
    r = qe, i = t.slice(1);
  else {
    const c = t.indexOf(":"), u = c > 0 ? t.slice(2, c) : t.slice(2);
    r = rn[u] || s.dirs[u], i = c > 0 ? t.slice(c + 1) : void 0;
  }
  r && (r === se && i === "ref" && (r = De), oe(e, r, n, s, i, o), e.removeAttribute(t));
}, oe = (e, t, n, s, r, i) => {
  const o = t({ el: e, get: (c = n) => I(s.scope, c, e), effect: s.effect, ctx: s, exp: n, arg: r, modifiers: i });
  o && s.cleanups.push(o);
}, pn = (e, t) => {
  if (t[0] === "#") {
    const n = document.querySelector(t);
    e.appendChild(n.content.cloneNode(!0));
    return;
  }
  e.innerHTML = t;
}, Ue = (e) => {
  const t = { delimiters: ["{{", "}}"], delimitersRE: /\{\{([^]+?)\}\}/g, ...e, scope: e ? e.scope : z({}), dirs: e ? e.dirs : {}, effects: [], blocks: [], cleanups: [], effect: (n) => {
    if (ie)
      return xe(n), n;
    const s = wt(n, { scheduler: () => xe(s) });
    return t.effects.push(s), s;
  } };
  return t;
}, Ye = (e, t = {}) => {
  const n = e.scope, s = Object.create(n);
  Object.defineProperties(s, Object.getOwnPropertyDescriptors(t)), s.$refs = Object.create(n.$refs);
  const r = z(new Proxy(s, { set(i, o, c, u) {
    return u === r && !i.hasOwnProperty(o) ? Reflect.set(n, o, c) : Reflect.set(i, o, c, u);
  } }));
  return Qe(r), { ...e, scope: r };
}, Qe = (e) => {
  for (const t of Object.keys(e))
    typeof e[t] == "function" && (e[t] = e[t].bind(e));
};
class ae {
  constructor(t, n, s = !1) {
    P(this, "template"), P(this, "ctx"), P(this, "key"), P(this, "parentCtx"), P(this, "isFragment"), P(this, "start"), P(this, "end"), this.isFragment = t instanceof HTMLTemplateElement, s ? this.template = t : this.isFragment ? this.template = t.content.cloneNode(!0) : this.template = t.cloneNode(!0), s ? this.ctx = n : (this.parentCtx = n, n.blocks.push(this), this.ctx = Ue(n)), Ge(this.template, this.ctx);
  }
  get el() {
    return this.start || this.template;
  }
  insert(t, n = null) {
    if (this.isFragment)
      if (this.start) {
        let s = this.start, r;
        for (; s && (r = s.nextSibling, t.insertBefore(s, n), s !== this.end); )
          s = r;
      } else
        this.start = new Text(""), this.end = new Text(""), t.insertBefore(this.end, n), t.insertBefore(this.start, this.end), t.insertBefore(this.template, this.end);
    else
      t.insertBefore(this.template, n);
  }
  remove() {
    if (this.parentCtx && ut(this.parentCtx.blocks, this), this.start) {
      const t = this.start.parentNode;
      let n = this.start, s;
      for (; n && (s = n.nextSibling, t.removeChild(n), n !== this.end); )
        n = s;
    } else
      this.template.parentNode.removeChild(this.template);
    this.teardown();
  }
  teardown() {
    this.ctx.blocks.forEach((t) => {
      t.teardown();
    }), this.ctx.effects.forEach(_t), this.ctx.cleanups.forEach((t) => t());
  }
}
const Ee = (e) => e.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"), Xe = (e) => {
  const t = Ue();
  if (e && (t.scope = z(e), Qe(t.scope), e.$delimiters)) {
    const [s, r] = t.delimiters = e.$delimiters;
    t.delimitersRE = new RegExp(Ee(s) + "([^]+?)" + Ee(r), "g");
  }
  t.scope.$s = Je, t.scope.$nextTick = J, t.scope.$refs = /* @__PURE__ */ Object.create(null);
  let n;
  return { directive(s, r) {
    return r ? (t.dirs[s] = r, this) : t.dirs[s];
  }, mount(s) {
    if (typeof s == "string" && (s = document.querySelector(s), !s))
      return;
    s = s || document.documentElement;
    let r;
    return s.hasAttribute("v-scope") ? r = [s] : r = [...s.querySelectorAll("[v-scope]")].filter((i) => !i.matches("[v-scope] [v-scope]")), r.length || (r = [s]), n = r.map((i) => new ae(i, t, !0)), this;
  }, unmount() {
    n.forEach((s) => s.teardown());
  } };
}, Ae = document.currentScript;
Ae && Ae.hasAttribute("init") && Xe().mount();
function dn(e) {
  return {
    siteHeader: e,
    menuOpen: !1,
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    scrollEvent(t) {
      window.addEventListener("scroll", () => {
        window.scrollY > 50 ? t.classList.add("is-scrolling") : t.classList.remove("is-scrolling");
      });
    },
    toggleSubmenu(t) {
      const n = t.nextElementSibling, s = t.getAttribute("aria-expanded") === "true" || !1;
      if (s)
        n.style.height = 0;
      else {
        const r = n.scrollHeight;
        n.style.height = r + "px";
      }
      t.setAttribute("aria-expanded", !s);
    },
    closeAllSubmenus() {
      const t = e.querySelectorAll(".submenu"), n = e.querySelectorAll(".btn-submenu");
      t.forEach((s) => {
        s.style.height = 0;
      }), n.forEach((s) => {
        s.setAttribute("aria-expanded", !1);
      });
    }
  };
}
Xe({
  $delimiters: ["[[", "]]"],
  // define your apps here
  Menu: dn
}).mount();
