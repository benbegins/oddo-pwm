var ee = Object.defineProperty, ne = (t, e, n) => e in t ? ee(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, P = (t, e, n) => (ne(t, typeof e != "symbol" ? e + "" : e, n), n);
function se(t, e) {
  const n = /* @__PURE__ */ Object.create(null), s = t.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return e ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function At(t) {
  if (v(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n], r = B(s) ? oe(s) : At(s);
      if (r)
        for (const i in r)
          e[i] = r[i];
    }
    return e;
  } else if (B(t) || E(t))
    return t;
}
const re = /;(?![^(]*\))/g, ie = /:(.+)/;
function oe(t) {
  const e = {};
  return t.split(re).forEach((n) => {
    if (n) {
      const s = n.split(ie);
      s.length > 1 && (e[s[0].trim()] = s[1].trim());
    }
  }), e;
}
function Rt(t) {
  let e = "";
  if (B(t))
    e = t;
  else if (v(t))
    for (let n = 0; n < t.length; n++) {
      const s = Rt(t[n]);
      s && (e += s + " ");
    }
  else if (E(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
function ce(t, e) {
  if (t.length !== e.length)
    return !1;
  let n = !0;
  for (let s = 0; n && s < t.length; s++)
    n = T(t[s], e[s]);
  return n;
}
function T(t, e) {
  if (t === e)
    return !0;
  let n = dt(t), s = dt(e);
  if (n || s)
    return n && s ? t.getTime() === e.getTime() : !1;
  if (n = v(t), s = v(e), n || s)
    return n && s ? ce(t, e) : !1;
  if (n = E(t), s = E(e), n || s) {
    if (!n || !s)
      return !1;
    const r = Object.keys(t).length, i = Object.keys(e).length;
    if (r !== i)
      return !1;
    for (const o in t) {
      const c = t.hasOwnProperty(o), f = e.hasOwnProperty(o);
      if (c && !f || !c && f || !T(t[o], e[o]))
        return !1;
    }
  }
  return String(t) === String(e);
}
function G(t, e) {
  return t.findIndex((n) => T(n, e));
}
const le = Object.assign, fe = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, ue = Object.prototype.hasOwnProperty, ct = (t, e) => ue.call(t, e), v = Array.isArray, U = (t) => Pt(t) === "[object Map]", dt = (t) => t instanceof Date, B = (t) => typeof t == "string", lt = (t) => typeof t == "symbol", E = (t) => t !== null && typeof t == "object", ae = Object.prototype.toString, Pt = (t) => ae.call(t), pe = (t) => Pt(t).slice(8, -1), ft = (t) => B(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Ct = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, he = /-(\w)/g, de = Ct((t) => t.replace(he, (e, n) => n ? n.toUpperCase() : "")), ge = /\B([A-Z])/g, Nt = Ct((t) => t.replace(ge, "-$1").toLowerCase()), me = (t, e) => !Object.is(t, e), gt = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let ve;
function Mt(t, e) {
  e = e || ve, e && e.active && e.effects.push(t);
}
const Tt = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, Bt = (t) => (t.w & j) > 0, Lt = (t) => (t.n & j) > 0, ye = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= j;
}, be = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let s = 0; s < e.length; s++) {
      const r = e[s];
      Bt(r) && !Lt(r) ? r.delete(t) : e[n++] = r, r.w &= ~j, r.n &= ~j;
    }
    e.length = n;
  }
}, X = /* @__PURE__ */ new WeakMap();
let I = 0, j = 1;
const Y = 30, W = [];
let C;
const V = Symbol(""), mt = Symbol("");
class xe {
  constructor(e, n = null, s) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], Mt(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    if (!W.includes(this))
      try {
        return W.push(C = this), ke(), j = 1 << ++I, I <= Y ? ye(this) : vt(this), this.fn();
      } finally {
        I <= Y && be(this), j = 1 << --I, Wt(), W.pop();
        const e = W.length;
        C = e > 0 ? W[e - 1] : void 0;
      }
  }
  stop() {
    this.active && (vt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function vt(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
function _e(t, e) {
  t.effect && (t = t.effect.fn);
  const n = new xe(t);
  e && (le(n, e), e.scope && Mt(n, e.scope)), (!e || !e.lazy) && n.run();
  const s = n.run.bind(n);
  return s.effect = n, s;
}
function we(t) {
  t.effect.stop();
}
let L = !0;
const ut = [];
function $e() {
  ut.push(L), L = !1;
}
function ke() {
  ut.push(L), L = !0;
}
function Wt() {
  const t = ut.pop();
  L = t === void 0 ? !0 : t;
}
function H(t, e, n) {
  if (!Oe())
    return;
  let s = X.get(t);
  s || X.set(t, s = /* @__PURE__ */ new Map());
  let r = s.get(n);
  r || s.set(n, r = Tt()), Se(r);
}
function Oe() {
  return L && C !== void 0;
}
function Se(t, e) {
  let n = !1;
  I <= Y ? Lt(t) || (t.n |= j, n = !Bt(t)) : n = !t.has(C), n && (t.add(C), C.deps.push(t));
}
function tt(t, e, n, s, r, i) {
  const o = X.get(t);
  if (!o)
    return;
  let c = [];
  if (e === "clear")
    c = [...o.values()];
  else if (n === "length" && v(t))
    o.forEach((f, l) => {
      (l === "length" || l >= s) && c.push(f);
    });
  else
    switch (n !== void 0 && c.push(o.get(n)), e) {
      case "add":
        v(t) ? ft(n) && c.push(o.get("length")) : (c.push(o.get(V)), U(t) && c.push(o.get(mt)));
        break;
      case "delete":
        v(t) || (c.push(o.get(V)), U(t) && c.push(o.get(mt)));
        break;
      case "set":
        U(t) && c.push(o.get(V));
        break;
    }
  if (c.length === 1)
    c[0] && yt(c[0]);
  else {
    const f = [];
    for (const l of c)
      l && f.push(...l);
    yt(Tt(f));
  }
}
function yt(t, e) {
  for (const n of v(t) ? t : [...t])
    (n !== C || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run());
}
const Ee = se("__proto__,__v_isRef,__isVue"), It = new Set(Object.getOwnPropertyNames(Symbol).map((t) => Symbol[t]).filter(lt)), je = Kt(), Ae = Kt(!0), bt = Re();
function Re() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const s = N(this);
      for (let i = 0, o = this.length; i < o; i++)
        H(s, "get", i + "");
      const r = s[e](...n);
      return r === -1 || r === !1 ? s[e](...n.map(N)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      $e();
      const s = N(this)[e].apply(this, n);
      return Wt(), s;
    };
  }), t;
}
function Kt(t = !1, e = !1) {
  return function(n, s, r) {
    if (s === "__v_isReactive")
      return !t;
    if (s === "__v_isReadonly")
      return t;
    if (s === "__v_raw" && r === (t ? e ? Ie : Vt : e ? We : Ft).get(n))
      return n;
    const i = v(n);
    if (!t && i && ct(bt, s))
      return Reflect.get(bt, s, r);
    const o = Reflect.get(n, s, r);
    return (lt(s) ? It.has(s) : Ee(s)) || (t || H(n, "get", s), e) ? o : et(o) ? !i || !ft(s) ? o.value : o : E(o) ? t ? Ve(o) : J(o) : o;
  };
}
const Pe = Ce();
function Ce(t = !1) {
  return function(e, n, s, r) {
    let i = e[n];
    if (!t && !ze(s) && (s = N(s), i = N(i), !v(e) && et(i) && !et(s)))
      return i.value = s, !0;
    const o = v(e) && ft(n) ? Number(n) < e.length : ct(e, n), c = Reflect.set(e, n, s, r);
    return e === N(r) && (o ? me(s, i) && tt(e, "set", n, s) : tt(e, "add", n, s)), c;
  };
}
function Ne(t, e) {
  const n = ct(t, e);
  t[e];
  const s = Reflect.deleteProperty(t, e);
  return s && n && tt(t, "delete", e, void 0), s;
}
function Me(t, e) {
  const n = Reflect.has(t, e);
  return (!lt(e) || !It.has(e)) && H(t, "has", e), n;
}
function Te(t) {
  return H(t, "iterate", v(t) ? "length" : V), Reflect.ownKeys(t);
}
const Be = { get: je, set: Pe, deleteProperty: Ne, has: Me, ownKeys: Te }, Le = { get: Ae, set(t, e) {
  return !0;
}, deleteProperty(t, e) {
  return !0;
} }, Ft = /* @__PURE__ */ new WeakMap(), We = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap();
function Ke(t) {
  switch (t) {
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
function Fe(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Ke(pe(t));
}
function J(t) {
  return t && t.__v_isReadonly ? t : zt(t, !1, Be, null, Ft);
}
function Ve(t) {
  return zt(t, !0, Le, null, Vt);
}
function zt(t, e, n, s, r) {
  if (!E(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const i = r.get(t);
  if (i)
    return i;
  const o = Fe(t);
  if (o === 0)
    return t;
  const c = new Proxy(t, o === 2 ? s : n);
  return r.set(t, c), c;
}
function ze(t) {
  return !!(t && t.__v_isReadonly);
}
function N(t) {
  const e = t && t.__v_raw;
  return e ? N(e) : t;
}
function et(t) {
  return !!(t && t.__v_isRef === !0);
}
Promise.resolve();
let nt = !1;
const z = [], He = Promise.resolve(), Z = (t) => He.then(t), xt = (t) => {
  z.includes(t) || z.push(t), nt || (nt = !0, Z(Je));
}, Je = () => {
  for (const t of z)
    t();
  z.length = 0, nt = !1;
}, Ze = /^(spellcheck|draggable|form|list|type)$/, st = ({ el: t, get: e, effect: n, arg: s, modifiers: r }) => {
  let i;
  s === "class" && (t._class = t.className), n(() => {
    let o = e();
    if (s)
      r != null && r.camel && (s = de(s)), Q(t, s, o, i);
    else {
      for (const c in o)
        Q(t, c, o[c], i && i[c]);
      for (const c in i)
        (!o || !(c in o)) && Q(t, c, null);
    }
    i = o;
  });
}, Q = (t, e, n, s) => {
  if (e === "class")
    t.setAttribute("class", Rt(t._class ? [t._class, n] : n) || "");
  else if (e === "style") {
    n = At(n);
    const { style: r } = t;
    if (!n)
      t.removeAttribute("style");
    else if (B(n))
      n !== s && (r.cssText = n);
    else {
      for (const i in n)
        rt(r, i, n[i]);
      if (s && !B(s))
        for (const i in s)
          n[i] == null && rt(r, i, "");
    }
  } else
    !(t instanceof SVGElement) && e in t && !Ze.test(e) ? (t[e] = n, e === "value" && (t._value = n)) : e === "true-value" ? t._trueValue = n : e === "false-value" ? t._falseValue = n : n != null ? t.setAttribute(e, n) : t.removeAttribute(e);
}, _t = /\s*!important$/, rt = (t, e, n) => {
  v(n) ? n.forEach((s) => rt(t, e, s)) : e.startsWith("--") ? t.setProperty(e, n) : _t.test(n) ? t.setProperty(Nt(e), n.replace(_t, ""), "important") : t[e] = n;
}, S = (t, e) => {
  const n = t.getAttribute(e);
  return n != null && t.removeAttribute(e), n;
}, O = (t, e, n, s) => {
  t.addEventListener(e, n, s);
}, qe = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, De = ["ctrl", "shift", "alt", "meta"], Ge = { stop: (t) => t.stopPropagation(), prevent: (t) => t.preventDefault(), self: (t) => t.target !== t.currentTarget, ctrl: (t) => !t.ctrlKey, shift: (t) => !t.shiftKey, alt: (t) => !t.altKey, meta: (t) => !t.metaKey, left: (t) => "button" in t && t.button !== 0, middle: (t) => "button" in t && t.button !== 1, right: (t) => "button" in t && t.button !== 2, exact: (t, e) => De.some((n) => t[`${n}Key`] && !e[n]) }, Ht = ({ el: t, get: e, exp: n, arg: s, modifiers: r }) => {
  if (!s)
    return;
  let i = qe.test(n) ? e(`(e => ${n}(e))`) : e(`($event => { ${n} })`);
  if (s === "vue:mounted") {
    Z(i);
    return;
  } else if (s === "vue:unmounted")
    return () => i();
  if (r) {
    s === "click" && (r.right && (s = "contextmenu"), r.middle && (s = "mouseup"));
    const o = i;
    i = (c) => {
      if (!("key" in c && !(Nt(c.key) in r))) {
        for (const f in r) {
          const l = Ge[f];
          if (l && l(c, r))
            return;
        }
        return o(c);
      }
    };
  }
  O(t, s, i, r);
}, Ue = ({ el: t, get: e, effect: n }) => {
  const s = t.style.display;
  n(() => {
    t.style.display = e() ? s : "none";
  });
}, Jt = ({ el: t, get: e, effect: n }) => {
  n(() => {
    t.textContent = Zt(e());
  });
}, Zt = (t) => t == null ? "" : E(t) ? JSON.stringify(t, null, 2) : String(t), Qe = ({ el: t, get: e, effect: n }) => {
  n(() => {
    t.innerHTML = e();
  });
}, Xe = ({ el: t, exp: e, get: n, effect: s, modifiers: r }) => {
  const i = t.type, o = n(`(val) => { ${e} = val }`), { trim: c, number: f = i === "number" } = r || {};
  if (t.tagName === "SELECT") {
    const l = t;
    O(t, "change", () => {
      const u = Array.prototype.filter.call(l.options, (a) => a.selected).map((a) => f ? gt(k(a)) : k(a));
      o(l.multiple ? u : u[0]);
    }), s(() => {
      const u = n(), a = l.multiple;
      for (let p = 0, b = l.options.length; p < b; p++) {
        const y = l.options[p], x = k(y);
        if (a)
          v(u) ? y.selected = G(u, x) > -1 : y.selected = u.has(x);
        else if (T(k(y), u)) {
          l.selectedIndex !== p && (l.selectedIndex = p);
          return;
        }
      }
      !a && l.selectedIndex !== -1 && (l.selectedIndex = -1);
    });
  } else if (i === "checkbox") {
    O(t, "change", () => {
      const u = n(), a = t.checked;
      if (v(u)) {
        const p = k(t), b = G(u, p), y = b !== -1;
        if (a && !y)
          o(u.concat(p));
        else if (!a && y) {
          const x = [...u];
          x.splice(b, 1), o(x);
        }
      } else
        o(wt(t, a));
    });
    let l;
    s(() => {
      const u = n();
      v(u) ? t.checked = G(u, k(t)) > -1 : u !== l && (t.checked = T(u, wt(t, !0))), l = u;
    });
  } else if (i === "radio") {
    O(t, "change", () => {
      o(k(t));
    });
    let l;
    s(() => {
      const u = n();
      u !== l && (t.checked = T(u, k(t)));
    });
  } else {
    const l = (u) => c ? u.trim() : f ? gt(u) : u;
    O(t, "compositionstart", Ye), O(t, "compositionend", tn), O(t, r != null && r.lazy ? "change" : "input", () => {
      t.composing || o(l(t.value));
    }), c && O(t, "change", () => {
      t.value = t.value.trim();
    }), s(() => {
      if (t.composing)
        return;
      const u = t.value, a = n();
      document.activeElement === t && l(u) === a || u !== a && (t.value = a);
    });
  }
}, k = (t) => "_value" in t ? t._value : t.value, wt = (t, e) => {
  const n = e ? "_trueValue" : "_falseValue";
  return n in t ? t[n] : e;
}, Ye = (t) => {
  t.target.composing = !0;
}, tn = (t) => {
  const e = t.target;
  e.composing && (e.composing = !1, en(e, "input"));
}, en = (t, e) => {
  const n = document.createEvent("HTMLEvents");
  n.initEvent(e, !0, !0), t.dispatchEvent(n);
}, $t = /* @__PURE__ */ Object.create(null), K = (t, e, n) => qt(t, `return(${e})`, n), qt = (t, e, n) => {
  const s = $t[e] || ($t[e] = nn(e));
  try {
    return s(t, n);
  } catch (r) {
    console.error(r);
  }
}, nn = (t) => {
  try {
    return new Function("$data", "$el", `with($data){${t}}`);
  } catch (e) {
    return console.error(`${e.message} in expression: ${t}`), () => {
    };
  }
}, sn = ({ el: t, ctx: e, exp: n, effect: s }) => {
  Z(() => s(() => qt(e.scope, n, t)));
}, rn = { bind: st, on: Ht, show: Ue, text: Jt, html: Qe, model: Xe, effect: sn }, on = (t, e, n) => {
  const s = t.parentElement, r = new Comment("v-if");
  s.insertBefore(r, t);
  const i = [{ exp: e, el: t }];
  let o, c;
  for (; (o = t.nextElementSibling) && (c = null, S(o, "v-else") === "" || (c = S(o, "v-else-if"))); )
    s.removeChild(o), i.push({ exp: c, el: o });
  const f = t.nextSibling;
  s.removeChild(t);
  let l, u = -1;
  const a = () => {
    l && (s.insertBefore(r, l.el), l.remove(), l = void 0);
  };
  return n.effect(() => {
    for (let p = 0; p < i.length; p++) {
      const { exp: b, el: y } = i[p];
      if (!b || K(n.scope, b)) {
        p !== u && (a(), l = new at(y, n), l.insert(s, r), s.removeChild(r), u = p);
        return;
      }
    }
    u = -1, a();
  }), f;
}, cn = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, kt = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, ln = /^\(|\)$/g, fn = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/, un = (t, e, n) => {
  const s = e.match(cn);
  if (!s)
    return;
  const r = t.nextSibling, i = t.parentElement, o = new Text("");
  i.insertBefore(o, t), i.removeChild(t);
  const c = s[2].trim();
  let f = s[1].trim().replace(ln, "").trim(), l, u = !1, a, p, b = "key", y = t.getAttribute(b) || t.getAttribute(b = ":key") || t.getAttribute(b = "v-bind:key");
  y && (t.removeAttribute(b), b === "key" && (y = JSON.stringify(y)));
  let x;
  (x = f.match(kt)) && (f = f.replace(kt, "").trim(), a = x[1].trim(), x[2] && (p = x[2].trim())), (x = f.match(fn)) && (l = x[1].split(",").map((g) => g.trim()), u = f[0] === "[");
  let pt = !1, A, F, q;
  const te = (g) => {
    const _ = /* @__PURE__ */ new Map(), h = [];
    if (v(g))
      for (let d = 0; d < g.length; d++)
        h.push(D(_, g[d], d));
    else if (typeof g == "number")
      for (let d = 0; d < g; d++)
        h.push(D(_, d + 1, d));
    else if (E(g)) {
      let d = 0;
      for (const m in g)
        h.push(D(_, g[m], d++, m));
    }
    return [h, _];
  }, D = (g, _, h, d) => {
    const m = {};
    l ? l.forEach((R, $) => m[R] = _[u ? $ : R]) : m[f] = _, d ? (a && (m[a] = d), p && (m[p] = h)) : a && (m[a] = h);
    const M = Qt(n, m), w = y ? K(M.scope, y) : h;
    return g.set(w, h), M.key = w, M;
  }, ht = (g, _) => {
    const h = new at(t, g);
    return h.key = g.key, h.insert(i, _), h;
  };
  return n.effect(() => {
    const g = K(n.scope, c), _ = q;
    if ([F, q] = te(g), !pt)
      A = F.map((h) => ht(h, o)), pt = !0;
    else {
      for (let w = 0; w < A.length; w++)
        q.has(A[w].key) || A[w].remove();
      const h = [];
      let d = F.length, m, M;
      for (; d--; ) {
        const w = F[d], R = _.get(w.key);
        let $;
        R == null ? $ = ht(w, m ? m.el : o) : ($ = A[R], Object.assign($.ctx.scope, w.scope), R !== d && (A[R + 1] !== m || M === m) && (M = $, $.insert(i, m ? m.el : o))), h.unshift(m = $);
      }
      A = h;
    }
  }), r;
}, Dt = ({ el: t, ctx: { scope: { $refs: e } }, get: n, effect: s }) => {
  let r;
  return s(() => {
    const i = n();
    e[i] = t, r && i !== r && delete e[r], r = i;
  }), () => {
    r && delete e[r];
  };
}, an = /^(?:v-|:|@)/, pn = /\.([\w-]+)/g;
let it = !1;
const Gt = (t, e) => {
  const n = t.nodeType;
  if (n === 1) {
    const s = t;
    if (s.hasAttribute("v-pre"))
      return;
    S(s, "v-cloak");
    let r;
    if (r = S(s, "v-if"))
      return on(s, r, e);
    if (r = S(s, "v-for"))
      return un(s, r, e);
    if ((r = S(s, "v-scope")) || r === "") {
      const c = r ? K(e.scope, r) : {};
      e = Qt(e, c), c.$template && hn(s, c.$template);
    }
    const i = S(s, "v-once") != null;
    i && (it = !0), (r = S(s, "ref")) && ot(s, Dt, `"${r}"`, e), Ot(s, e);
    const o = [];
    for (const { name: c, value: f } of [...s.attributes])
      an.test(c) && c !== "v-cloak" && (c === "v-model" ? o.unshift([c, f]) : c[0] === "@" || /^v-on\b/.test(c) ? o.push([c, f]) : St(s, c, f, e));
    for (const [c, f] of o)
      St(s, c, f, e);
    i && (it = !1);
  } else if (n === 3) {
    const s = t.data;
    if (s.includes(e.delimiters[0])) {
      let r = [], i = 0, o;
      for (; o = e.delimitersRE.exec(s); ) {
        const c = s.slice(i, o.index);
        c && r.push(JSON.stringify(c)), r.push(`$s(${o[1]})`), i = o.index + o[0].length;
      }
      i < s.length && r.push(JSON.stringify(s.slice(i))), ot(t, Jt, r.join("+"), e);
    }
  } else
    n === 11 && Ot(t, e);
}, Ot = (t, e) => {
  let n = t.firstChild;
  for (; n; )
    n = Gt(n, e) || n.nextSibling;
}, St = (t, e, n, s) => {
  let r, i, o;
  if (e = e.replace(pn, (c, f) => ((o || (o = {}))[f] = !0, "")), e[0] === ":")
    r = st, i = e.slice(1);
  else if (e[0] === "@")
    r = Ht, i = e.slice(1);
  else {
    const c = e.indexOf(":"), f = c > 0 ? e.slice(2, c) : e.slice(2);
    r = rn[f] || s.dirs[f], i = c > 0 ? e.slice(c + 1) : void 0;
  }
  r && (r === st && i === "ref" && (r = Dt), ot(t, r, n, s, i, o), t.removeAttribute(e));
}, ot = (t, e, n, s, r, i) => {
  const o = e({ el: t, get: (c = n) => K(s.scope, c, t), effect: s.effect, ctx: s, exp: n, arg: r, modifiers: i });
  o && s.cleanups.push(o);
}, hn = (t, e) => {
  if (e[0] === "#") {
    const n = document.querySelector(e);
    t.appendChild(n.content.cloneNode(!0));
    return;
  }
  t.innerHTML = e;
}, Ut = (t) => {
  const e = { delimiters: ["{{", "}}"], delimitersRE: /\{\{([^]+?)\}\}/g, ...t, scope: t ? t.scope : J({}), dirs: t ? t.dirs : {}, effects: [], blocks: [], cleanups: [], effect: (n) => {
    if (it)
      return xt(n), n;
    const s = _e(n, { scheduler: () => xt(s) });
    return e.effects.push(s), s;
  } };
  return e;
}, Qt = (t, e = {}) => {
  const n = t.scope, s = Object.create(n);
  Object.defineProperties(s, Object.getOwnPropertyDescriptors(e)), s.$refs = Object.create(n.$refs);
  const r = J(new Proxy(s, { set(i, o, c, f) {
    return f === r && !i.hasOwnProperty(o) ? Reflect.set(n, o, c) : Reflect.set(i, o, c, f);
  } }));
  return Xt(r), { ...t, scope: r };
}, Xt = (t) => {
  for (const e of Object.keys(t))
    typeof t[e] == "function" && (t[e] = t[e].bind(t));
};
class at {
  constructor(e, n, s = !1) {
    P(this, "template"), P(this, "ctx"), P(this, "key"), P(this, "parentCtx"), P(this, "isFragment"), P(this, "start"), P(this, "end"), this.isFragment = e instanceof HTMLTemplateElement, s ? this.template = e : this.isFragment ? this.template = e.content.cloneNode(!0) : this.template = e.cloneNode(!0), s ? this.ctx = n : (this.parentCtx = n, n.blocks.push(this), this.ctx = Ut(n)), Gt(this.template, this.ctx);
  }
  get el() {
    return this.start || this.template;
  }
  insert(e, n = null) {
    if (this.isFragment)
      if (this.start) {
        let s = this.start, r;
        for (; s && (r = s.nextSibling, e.insertBefore(s, n), s !== this.end); )
          s = r;
      } else
        this.start = new Text(""), this.end = new Text(""), e.insertBefore(this.end, n), e.insertBefore(this.start, this.end), e.insertBefore(this.template, this.end);
    else
      e.insertBefore(this.template, n);
  }
  remove() {
    if (this.parentCtx && fe(this.parentCtx.blocks, this), this.start) {
      const e = this.start.parentNode;
      let n = this.start, s;
      for (; n && (s = n.nextSibling, e.removeChild(n), n !== this.end); )
        n = s;
    } else
      this.template.parentNode.removeChild(this.template);
    this.teardown();
  }
  teardown() {
    this.ctx.blocks.forEach((e) => {
      e.teardown();
    }), this.ctx.effects.forEach(we), this.ctx.cleanups.forEach((e) => e());
  }
}
const Et = (t) => t.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"), Yt = (t) => {
  const e = Ut();
  if (t && (e.scope = J(t), Xt(e.scope), t.$delimiters)) {
    const [s, r] = e.delimiters = t.$delimiters;
    e.delimitersRE = new RegExp(Et(s) + "([^]+?)" + Et(r), "g");
  }
  e.scope.$s = Zt, e.scope.$nextTick = Z, e.scope.$refs = /* @__PURE__ */ Object.create(null);
  let n;
  return { directive(s, r) {
    return r ? (e.dirs[s] = r, this) : e.dirs[s];
  }, mount(s) {
    if (typeof s == "string" && (s = document.querySelector(s), !s))
      return;
    s = s || document.documentElement;
    let r;
    return s.hasAttribute("v-scope") ? r = [s] : r = [...s.querySelectorAll("[v-scope]")].filter((i) => !i.matches("[v-scope] [v-scope]")), r.length || (r = [s]), n = r.map((i) => new at(i, e, !0)), this;
  }, unmount() {
    n.forEach((s) => s.teardown());
  } };
}, jt = document.currentScript;
jt && jt.hasAttribute("init") && Yt().mount();
function dn(t) {
  return {
    isOpen: !0,
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  };
}
Yt({
  $delimiters: ["[[", "]]"],
  // define your apps here
  Menu: dn
}).mount();
