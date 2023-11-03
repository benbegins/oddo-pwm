var tt = Object.defineProperty, nt = (e, t, n) => t in e ? tt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, P = (e, t, n) => (nt(e, typeof t != "symbol" ? t + "" : t, n), n);
function st(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let i = 0; i < s.length; i++)
    n[s[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function je(e) {
  if (v(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = M(s) ? lt(s) : je(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (M(e) || A(e))
    return e;
}
const it = /;(?![^(]*\))/g, rt = /:(.+)/;
function lt(e) {
  const t = {};
  return e.split(it).forEach((n) => {
    if (n) {
      const s = n.split(rt);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Re(e) {
  let t = "";
  if (M(e))
    t = e;
  else if (v(e))
    for (let n = 0; n < e.length; n++) {
      const s = Re(e[n]);
      s && (t += s + " ");
    }
  else if (A(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function ot(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = N(e[s], t[s]);
  return n;
}
function N(e, t) {
  if (e === t)
    return !0;
  let n = de(e), s = de(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = v(e), s = v(t), n || s)
    return n && s ? ot(e, t) : !1;
  if (n = A(e), s = A(t), n || s) {
    if (!n || !s)
      return !1;
    const i = Object.keys(e).length, r = Object.keys(t).length;
    if (i !== r)
      return !1;
    for (const l in e) {
      const o = e.hasOwnProperty(l), a = t.hasOwnProperty(l);
      if (o && !a || !o && a || !N(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function G(e, t) {
  return e.findIndex((n) => N(n, t));
}
const ct = Object.assign, at = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ut = Object.prototype.hasOwnProperty, oe = (e, t) => ut.call(e, t), v = Array.isArray, U = (e) => Pe(e) === "[object Map]", de = (e) => e instanceof Date, M = (e) => typeof e == "string", ce = (e) => typeof e == "symbol", A = (e) => e !== null && typeof e == "object", ft = Object.prototype.toString, Pe = (e) => ft.call(e), ht = (e) => Pe(e).slice(8, -1), ae = (e) => M(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ce = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, pt = /-(\w)/g, dt = Ce((e) => e.replace(pt, (t, n) => n ? n.toUpperCase() : "")), gt = /\B([A-Z])/g, Le = Ce((e) => e.replace(gt, "-$1").toLowerCase()), mt = (e, t) => !Object.is(e, t), ge = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let vt;
function Te(e, t) {
  t = t || vt, t && t.active && t.effects.push(e);
}
const Ne = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Me = (e) => (e.w & E) > 0, Be = (e) => (e.n & E) > 0, bt = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= E;
}, yt = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      Me(i) && !Be(i) ? i.delete(e) : t[n++] = i, i.w &= ~E, i.n &= ~E;
    }
    t.length = n;
  }
}, Q = /* @__PURE__ */ new WeakMap();
let V = 0, E = 1;
const X = 30, H = [];
let C;
const q = Symbol(""), me = Symbol("");
class St {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], Te(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    if (!H.includes(this))
      try {
        return H.push(C = this), Ot(), E = 1 << ++V, V <= X ? bt(this) : ve(this), this.fn();
      } finally {
        V <= X && yt(this), E = 1 << --V, He(), H.pop();
        const t = H.length;
        C = t > 0 ? H[t - 1] : void 0;
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
function xt(e, t) {
  e.effect && (e = e.effect.fn);
  const n = new St(e);
  t && (ct(n, t), t.scope && Te(n, t.scope)), (!t || !t.lazy) && n.run();
  const s = n.run.bind(n);
  return s.effect = n, s;
}
function wt(e) {
  e.effect.stop();
}
let B = !0;
const ue = [];
function _t() {
  ue.push(B), B = !1;
}
function Ot() {
  ue.push(B), B = !0;
}
function He() {
  const e = ue.pop();
  B = e === void 0 ? !0 : e;
}
function K(e, t, n) {
  if (!$t())
    return;
  let s = Q.get(e);
  s || Q.set(e, s = /* @__PURE__ */ new Map());
  let i = s.get(n);
  i || s.set(n, i = Ne()), kt(i);
}
function $t() {
  return B && C !== void 0;
}
function kt(e, t) {
  let n = !1;
  V <= X ? Be(e) || (e.n |= E, n = !Me(e)) : n = !e.has(C), n && (e.add(C), C.deps.push(e));
}
function ee(e, t, n, s, i, r) {
  const l = Q.get(e);
  if (!l)
    return;
  let o = [];
  if (t === "clear")
    o = [...l.values()];
  else if (n === "length" && v(e))
    l.forEach((a, c) => {
      (c === "length" || c >= s) && o.push(a);
    });
  else
    switch (n !== void 0 && o.push(l.get(n)), t) {
      case "add":
        v(e) ? ae(n) && o.push(l.get("length")) : (o.push(l.get(q)), U(e) && o.push(l.get(me)));
        break;
      case "delete":
        v(e) || (o.push(l.get(q)), U(e) && o.push(l.get(me)));
        break;
      case "set":
        U(e) && o.push(l.get(q));
        break;
    }
  if (o.length === 1)
    o[0] && be(o[0]);
  else {
    const a = [];
    for (const c of o)
      c && a.push(...c);
    be(Ne(a));
  }
}
function be(e, t) {
  for (const n of v(e) ? e : [...e])
    (n !== C || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run());
}
const At = st("__proto__,__v_isRef,__isVue"), Ve = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(ce)), Et = Ie(), jt = Ie(!0), ye = Rt();
function Rt() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = L(this);
      for (let r = 0, l = this.length; r < l; r++)
        K(s, "get", r + "");
      const i = s[t](...n);
      return i === -1 || i === !1 ? s[t](...n.map(L)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      _t();
      const s = L(this)[t].apply(this, n);
      return He(), s;
    };
  }), e;
}
function Ie(e = !1, t = !1) {
  return function(n, s, i) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_raw" && i === (e ? t ? Vt : qe : t ? Ht : We).get(n))
      return n;
    const r = v(n);
    if (!e && r && oe(ye, s))
      return Reflect.get(ye, s, i);
    const l = Reflect.get(n, s, i);
    return (ce(s) ? Ve.has(s) : At(s)) || (e || K(n, "get", s), t) ? l : te(l) ? !r || !ae(s) ? l.value : l : A(l) ? e ? qt(l) : z(l) : l;
  };
}
const Pt = Ct();
function Ct(e = !1) {
  return function(t, n, s, i) {
    let r = t[n];
    if (!e && !Ft(s) && (s = L(s), r = L(r), !v(t) && te(r) && !te(s)))
      return r.value = s, !0;
    const l = v(t) && ae(n) ? Number(n) < t.length : oe(t, n), o = Reflect.set(t, n, s, i);
    return t === L(i) && (l ? mt(s, r) && ee(t, "set", n, s) : ee(t, "add", n, s)), o;
  };
}
function Lt(e, t) {
  const n = oe(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && ee(e, "delete", t, void 0), s;
}
function Tt(e, t) {
  const n = Reflect.has(e, t);
  return (!ce(t) || !Ve.has(t)) && K(e, "has", t), n;
}
function Nt(e) {
  return K(e, "iterate", v(e) ? "length" : q), Reflect.ownKeys(e);
}
const Mt = { get: Et, set: Pt, deleteProperty: Lt, has: Tt, ownKeys: Nt }, Bt = { get: jt, set(e, t) {
  return !0;
}, deleteProperty(e, t) {
  return !0;
} }, We = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap();
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
function Wt(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : It(ht(e));
}
function z(e) {
  return e && e.__v_isReadonly ? e : Fe(e, !1, Mt, null, We);
}
function qt(e) {
  return Fe(e, !0, Bt, null, qe);
}
function Fe(e, t, n, s, i) {
  if (!A(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const l = Wt(e);
  if (l === 0)
    return e;
  const o = new Proxy(e, l === 2 ? s : n);
  return i.set(e, o), o;
}
function Ft(e) {
  return !!(e && e.__v_isReadonly);
}
function L(e) {
  const t = e && e.__v_raw;
  return t ? L(t) : e;
}
function te(e) {
  return !!(e && e.__v_isRef === !0);
}
Promise.resolve();
let ne = !1;
const F = [], Kt = Promise.resolve(), D = (e) => Kt.then(e), Se = (e) => {
  F.includes(e) || F.push(e), ne || (ne = !0, D(zt));
}, zt = () => {
  for (const e of F)
    e();
  F.length = 0, ne = !1;
}, Dt = /^(spellcheck|draggable|form|list|type)$/, se = ({ el: e, get: t, effect: n, arg: s, modifiers: i }) => {
  let r;
  s === "class" && (e._class = e.className), n(() => {
    let l = t();
    if (s)
      i != null && i.camel && (s = dt(s)), Y(e, s, l, r);
    else {
      for (const o in l)
        Y(e, o, l[o], r && r[o]);
      for (const o in r)
        (!l || !(o in l)) && Y(e, o, null);
    }
    r = l;
  });
}, Y = (e, t, n, s) => {
  if (t === "class")
    e.setAttribute("class", Re(e._class ? [e._class, n] : n) || "");
  else if (t === "style") {
    n = je(n);
    const { style: i } = e;
    if (!n)
      e.removeAttribute("style");
    else if (M(n))
      n !== s && (i.cssText = n);
    else {
      for (const r in n)
        ie(i, r, n[r]);
      if (s && !M(s))
        for (const r in s)
          n[r] == null && ie(i, r, "");
    }
  } else
    !(e instanceof SVGElement) && t in e && !Dt.test(t) ? (e[t] = n, t === "value" && (e._value = n)) : t === "true-value" ? e._trueValue = n : t === "false-value" ? e._falseValue = n : n != null ? e.setAttribute(t, n) : e.removeAttribute(t);
}, xe = /\s*!important$/, ie = (e, t, n) => {
  v(n) ? n.forEach((s) => ie(e, t, s)) : t.startsWith("--") ? e.setProperty(t, n) : xe.test(n) ? e.setProperty(Le(t), n.replace(xe, ""), "important") : e[t] = n;
}, k = (e, t) => {
  const n = e.getAttribute(t);
  return n != null && e.removeAttribute(t), n;
}, $ = (e, t, n, s) => {
  e.addEventListener(t, n, s);
}, Jt = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, Zt = ["ctrl", "shift", "alt", "meta"], Gt = { stop: (e) => e.stopPropagation(), prevent: (e) => e.preventDefault(), self: (e) => e.target !== e.currentTarget, ctrl: (e) => !e.ctrlKey, shift: (e) => !e.shiftKey, alt: (e) => !e.altKey, meta: (e) => !e.metaKey, left: (e) => "button" in e && e.button !== 0, middle: (e) => "button" in e && e.button !== 1, right: (e) => "button" in e && e.button !== 2, exact: (e, t) => Zt.some((n) => e[`${n}Key`] && !t[n]) }, Ke = ({ el: e, get: t, exp: n, arg: s, modifiers: i }) => {
  if (!s)
    return;
  let r = Jt.test(n) ? t(`(e => ${n}(e))`) : t(`($event => { ${n} })`);
  if (s === "vue:mounted") {
    D(r);
    return;
  } else if (s === "vue:unmounted")
    return () => r();
  if (i) {
    s === "click" && (i.right && (s = "contextmenu"), i.middle && (s = "mouseup"));
    const l = r;
    r = (o) => {
      if (!("key" in o && !(Le(o.key) in i))) {
        for (const a in i) {
          const c = Gt[a];
          if (c && c(o, i))
            return;
        }
        return l(o);
      }
    };
  }
  $(e, s, r, i);
}, Ut = ({ el: e, get: t, effect: n }) => {
  const s = e.style.display;
  n(() => {
    e.style.display = t() ? s : "none";
  });
}, ze = ({ el: e, get: t, effect: n }) => {
  n(() => {
    e.textContent = De(t());
  });
}, De = (e) => e == null ? "" : A(e) ? JSON.stringify(e, null, 2) : String(e), Yt = ({ el: e, get: t, effect: n }) => {
  n(() => {
    e.innerHTML = t();
  });
}, Qt = ({ el: e, exp: t, get: n, effect: s, modifiers: i }) => {
  const r = e.type, l = n(`(val) => { ${t} = val }`), { trim: o, number: a = r === "number" } = i || {};
  if (e.tagName === "SELECT") {
    const c = e;
    $(e, "change", () => {
      const u = Array.prototype.filter.call(c.options, (f) => f.selected).map((f) => a ? ge(O(f)) : O(f));
      l(c.multiple ? u : u[0]);
    }), s(() => {
      const u = n(), f = c.multiple;
      for (let h = 0, y = c.options.length; h < y; h++) {
        const b = c.options[h], S = O(b);
        if (f)
          v(u) ? b.selected = G(u, S) > -1 : b.selected = u.has(S);
        else if (N(O(b), u)) {
          c.selectedIndex !== h && (c.selectedIndex = h);
          return;
        }
      }
      !f && c.selectedIndex !== -1 && (c.selectedIndex = -1);
    });
  } else if (r === "checkbox") {
    $(e, "change", () => {
      const u = n(), f = e.checked;
      if (v(u)) {
        const h = O(e), y = G(u, h), b = y !== -1;
        if (f && !b)
          l(u.concat(h));
        else if (!f && b) {
          const S = [...u];
          S.splice(y, 1), l(S);
        }
      } else
        l(we(e, f));
    });
    let c;
    s(() => {
      const u = n();
      v(u) ? e.checked = G(u, O(e)) > -1 : u !== c && (e.checked = N(u, we(e, !0))), c = u;
    });
  } else if (r === "radio") {
    $(e, "change", () => {
      l(O(e));
    });
    let c;
    s(() => {
      const u = n();
      u !== c && (e.checked = N(u, O(e)));
    });
  } else {
    const c = (u) => o ? u.trim() : a ? ge(u) : u;
    $(e, "compositionstart", Xt), $(e, "compositionend", en), $(e, i != null && i.lazy ? "change" : "input", () => {
      e.composing || l(c(e.value));
    }), o && $(e, "change", () => {
      e.value = e.value.trim();
    }), s(() => {
      if (e.composing)
        return;
      const u = e.value, f = n();
      document.activeElement === e && c(u) === f || u !== f && (e.value = f);
    });
  }
}, O = (e) => "_value" in e ? e._value : e.value, we = (e, t) => {
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
}, _e = /* @__PURE__ */ Object.create(null), I = (e, t, n) => Je(e, `return(${t})`, n), Je = (e, t, n) => {
  const s = _e[t] || (_e[t] = nn(t));
  try {
    return s(e, n);
  } catch (i) {
    console.error(i);
  }
}, nn = (e) => {
  try {
    return new Function("$data", "$el", `with($data){${e}}`);
  } catch (t) {
    return console.error(`${t.message} in expression: ${e}`), () => {
    };
  }
}, sn = ({ el: e, ctx: t, exp: n, effect: s }) => {
  D(() => s(() => Je(t.scope, n, e)));
}, rn = { bind: se, on: Ke, show: Ut, text: ze, html: Yt, model: Qt, effect: sn }, ln = (e, t, n) => {
  const s = e.parentElement, i = new Comment("v-if");
  s.insertBefore(i, e);
  const r = [{ exp: t, el: e }];
  let l, o;
  for (; (l = e.nextElementSibling) && (o = null, k(l, "v-else") === "" || (o = k(l, "v-else-if"))); )
    s.removeChild(l), r.push({ exp: o, el: l });
  const a = e.nextSibling;
  s.removeChild(e);
  let c, u = -1;
  const f = () => {
    c && (s.insertBefore(i, c.el), c.remove(), c = void 0);
  };
  return n.effect(() => {
    for (let h = 0; h < r.length; h++) {
      const { exp: y, el: b } = r[h];
      if (!y || I(n.scope, y)) {
        h !== u && (f(), c = new fe(b, n), c.insert(s, i), s.removeChild(i), u = h);
        return;
      }
    }
    u = -1, f();
  }), a;
}, on = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, Oe = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, cn = /^\(|\)$/g, an = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/, un = (e, t, n) => {
  const s = t.match(on);
  if (!s)
    return;
  const i = e.nextSibling, r = e.parentElement, l = new Text("");
  r.insertBefore(l, e), r.removeChild(e);
  const o = s[2].trim();
  let a = s[1].trim().replace(cn, "").trim(), c, u = !1, f, h, y = "key", b = e.getAttribute(y) || e.getAttribute(y = ":key") || e.getAttribute(y = "v-bind:key");
  b && (e.removeAttribute(y), y === "key" && (b = JSON.stringify(b)));
  let S;
  (S = a.match(Oe)) && (a = a.replace(Oe, "").trim(), f = S[1].trim(), S[2] && (h = S[2].trim())), (S = a.match(an)) && (c = S[1].split(",").map((g) => g.trim()), u = a[0] === "[");
  let he = !1, j, W, J;
  const et = (g) => {
    const x = /* @__PURE__ */ new Map(), p = [];
    if (v(g))
      for (let d = 0; d < g.length; d++)
        p.push(Z(x, g[d], d));
    else if (typeof g == "number")
      for (let d = 0; d < g; d++)
        p.push(Z(x, d + 1, d));
    else if (A(g)) {
      let d = 0;
      for (const m in g)
        p.push(Z(x, g[m], d++, m));
    }
    return [p, x];
  }, Z = (g, x, p, d) => {
    const m = {};
    c ? c.forEach((R, _) => m[R] = x[u ? _ : R]) : m[a] = x, d ? (f && (m[f] = d), h && (m[h] = p)) : f && (m[f] = p);
    const T = Ye(n, m), w = b ? I(T.scope, b) : p;
    return g.set(w, p), T.key = w, T;
  }, pe = (g, x) => {
    const p = new fe(e, g);
    return p.key = g.key, p.insert(r, x), p;
  };
  return n.effect(() => {
    const g = I(n.scope, o), x = J;
    if ([W, J] = et(g), !he)
      j = W.map((p) => pe(p, l)), he = !0;
    else {
      for (let w = 0; w < j.length; w++)
        J.has(j[w].key) || j[w].remove();
      const p = [];
      let d = W.length, m, T;
      for (; d--; ) {
        const w = W[d], R = x.get(w.key);
        let _;
        R == null ? _ = pe(w, m ? m.el : l) : (_ = j[R], Object.assign(_.ctx.scope, w.scope), R !== d && (j[R + 1] !== m || T === m) && (T = _, _.insert(r, m ? m.el : l))), p.unshift(m = _);
      }
      j = p;
    }
  }), i;
}, Ze = ({ el: e, ctx: { scope: { $refs: t } }, get: n, effect: s }) => {
  let i;
  return s(() => {
    const r = n();
    t[r] = e, i && r !== i && delete t[i], i = r;
  }), () => {
    i && delete t[i];
  };
}, fn = /^(?:v-|:|@)/, hn = /\.([\w-]+)/g;
let re = !1;
const Ge = (e, t) => {
  const n = e.nodeType;
  if (n === 1) {
    const s = e;
    if (s.hasAttribute("v-pre"))
      return;
    k(s, "v-cloak");
    let i;
    if (i = k(s, "v-if"))
      return ln(s, i, t);
    if (i = k(s, "v-for"))
      return un(s, i, t);
    if ((i = k(s, "v-scope")) || i === "") {
      const o = i ? I(t.scope, i) : {};
      t = Ye(t, o), o.$template && pn(s, o.$template);
    }
    const r = k(s, "v-once") != null;
    r && (re = !0), (i = k(s, "ref")) && le(s, Ze, `"${i}"`, t), $e(s, t);
    const l = [];
    for (const { name: o, value: a } of [...s.attributes])
      fn.test(o) && o !== "v-cloak" && (o === "v-model" ? l.unshift([o, a]) : o[0] === "@" || /^v-on\b/.test(o) ? l.push([o, a]) : ke(s, o, a, t));
    for (const [o, a] of l)
      ke(s, o, a, t);
    r && (re = !1);
  } else if (n === 3) {
    const s = e.data;
    if (s.includes(t.delimiters[0])) {
      let i = [], r = 0, l;
      for (; l = t.delimitersRE.exec(s); ) {
        const o = s.slice(r, l.index);
        o && i.push(JSON.stringify(o)), i.push(`$s(${l[1]})`), r = l.index + l[0].length;
      }
      r < s.length && i.push(JSON.stringify(s.slice(r))), le(e, ze, i.join("+"), t);
    }
  } else
    n === 11 && $e(e, t);
}, $e = (e, t) => {
  let n = e.firstChild;
  for (; n; )
    n = Ge(n, t) || n.nextSibling;
}, ke = (e, t, n, s) => {
  let i, r, l;
  if (t = t.replace(hn, (o, a) => ((l || (l = {}))[a] = !0, "")), t[0] === ":")
    i = se, r = t.slice(1);
  else if (t[0] === "@")
    i = Ke, r = t.slice(1);
  else {
    const o = t.indexOf(":"), a = o > 0 ? t.slice(2, o) : t.slice(2);
    i = rn[a] || s.dirs[a], r = o > 0 ? t.slice(o + 1) : void 0;
  }
  i && (i === se && r === "ref" && (i = Ze), le(e, i, n, s, r, l), e.removeAttribute(t));
}, le = (e, t, n, s, i, r) => {
  const l = t({ el: e, get: (o = n) => I(s.scope, o, e), effect: s.effect, ctx: s, exp: n, arg: i, modifiers: r });
  l && s.cleanups.push(l);
}, pn = (e, t) => {
  if (t[0] === "#") {
    const n = document.querySelector(t);
    e.appendChild(n.content.cloneNode(!0));
    return;
  }
  e.innerHTML = t;
}, Ue = (e) => {
  const t = { delimiters: ["{{", "}}"], delimitersRE: /\{\{([^]+?)\}\}/g, ...e, scope: e ? e.scope : z({}), dirs: e ? e.dirs : {}, effects: [], blocks: [], cleanups: [], effect: (n) => {
    if (re)
      return Se(n), n;
    const s = xt(n, { scheduler: () => Se(s) });
    return t.effects.push(s), s;
  } };
  return t;
}, Ye = (e, t = {}) => {
  const n = e.scope, s = Object.create(n);
  Object.defineProperties(s, Object.getOwnPropertyDescriptors(t)), s.$refs = Object.create(n.$refs);
  const i = z(new Proxy(s, { set(r, l, o, a) {
    return a === i && !r.hasOwnProperty(l) ? Reflect.set(n, l, o) : Reflect.set(r, l, o, a);
  } }));
  return Qe(i), { ...e, scope: i };
}, Qe = (e) => {
  for (const t of Object.keys(e))
    typeof e[t] == "function" && (e[t] = e[t].bind(e));
};
class fe {
  constructor(t, n, s = !1) {
    P(this, "template"), P(this, "ctx"), P(this, "key"), P(this, "parentCtx"), P(this, "isFragment"), P(this, "start"), P(this, "end"), this.isFragment = t instanceof HTMLTemplateElement, s ? this.template = t : this.isFragment ? this.template = t.content.cloneNode(!0) : this.template = t.cloneNode(!0), s ? this.ctx = n : (this.parentCtx = n, n.blocks.push(this), this.ctx = Ue(n)), Ge(this.template, this.ctx);
  }
  get el() {
    return this.start || this.template;
  }
  insert(t, n = null) {
    if (this.isFragment)
      if (this.start) {
        let s = this.start, i;
        for (; s && (i = s.nextSibling, t.insertBefore(s, n), s !== this.end); )
          s = i;
      } else
        this.start = new Text(""), this.end = new Text(""), t.insertBefore(this.end, n), t.insertBefore(this.start, this.end), t.insertBefore(this.template, this.end);
    else
      t.insertBefore(this.template, n);
  }
  remove() {
    if (this.parentCtx && at(this.parentCtx.blocks, this), this.start) {
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
    }), this.ctx.effects.forEach(wt), this.ctx.cleanups.forEach((t) => t());
  }
}
const Ae = (e) => e.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"), Xe = (e) => {
  const t = Ue();
  if (e && (t.scope = z(e), Qe(t.scope), e.$delimiters)) {
    const [s, i] = t.delimiters = e.$delimiters;
    t.delimitersRE = new RegExp(Ae(s) + "([^]+?)" + Ae(i), "g");
  }
  t.scope.$s = De, t.scope.$nextTick = D, t.scope.$refs = /* @__PURE__ */ Object.create(null);
  let n;
  return { directive(s, i) {
    return i ? (t.dirs[s] = i, this) : t.dirs[s];
  }, mount(s) {
    if (typeof s == "string" && (s = document.querySelector(s), !s))
      return;
    s = s || document.documentElement;
    let i;
    return s.hasAttribute("v-scope") ? i = [s] : i = [...s.querySelectorAll("[v-scope]")].filter((r) => !r.matches("[v-scope] [v-scope]")), i.length || (i = [s]), n = i.map((r) => new fe(r, t, !0)), this;
  }, unmount() {
    n.forEach((s) => s.teardown());
  } };
}, Ee = document.currentScript;
Ee && Ee.hasAttribute("init") && Xe().mount();
function dn(e) {
  return {
    siteHeader: null,
    menuOpen: !1,
    submenuOpen: !1,
    toggleMenu() {
      this.menuOpen = !this.menuOpen, this.menuOpen || this.closeAllSubmenus();
    },
    scrollEvent(t) {
      this.siteHeader = t, window.addEventListener("scroll", () => {
        window.scrollY > 50 ? t.classList.add("is-scrolling") : t.classList.remove("is-scrolling");
      });
    },
    toggleSubmenu(t) {
      const n = t.nextElementSibling, s = t.getAttribute("aria-expanded") === "true" || !1;
      if (this.submenuOpen && window.innerWidth >= 1024 && this.closeAllSubmenus(), s)
        this.submenuOpen = !1, n.style.height = 0, n.setAttribute("aria-hidden", !0);
      else {
        this.submenuOpen = !0;
        const i = n.scrollHeight;
        n.style.height = i + "px", n.setAttribute("aria-hidden", !1);
      }
      t.setAttribute("aria-expanded", !s);
    },
    closeAllSubmenus() {
      const t = this.siteHeader.querySelectorAll(".site-header__submenu"), n = this.siteHeader.querySelectorAll(".btn-submenu");
      t.length !== 0 && n.length !== 0 && (t.forEach((s) => {
        s.style.height = 0, s.setAttribute("aria-hidden", !0);
      }), n.forEach((s) => {
        s.setAttribute("aria-expanded", !1);
      }));
    }
  };
}
function gn() {
  return {
    popinDisplayed: !1,
    countrySelectOpen: !1,
    languageSelectOpen: !1,
    languages: {
      fr: "Français",
      en: "English",
      de: "Deutsch"
    },
    versionsAvailable: {
      france: ["fr", "en"],
      germany: ["de", "en"],
      switzerland: ["fr", "de", "en"]
    },
    languagesAvailable: [],
    versionSelected: null,
    versionSelectedLabel: null,
    languageSelected: null,
    languageSelectedLabel: null,
    initVersionSelection() {
      setTimeout(() => {
        if (!sessionStorage.getItem("version")) {
          const t = document.querySelector("body");
          t.style.overflow = "hidden", this.popinDisplayed = !0;
        }
      }, 1e3);
    },
    toggleSelectVersion() {
      this.countrySelectOpen = !this.countrySelectOpen, this.languageSelectOpen = !1;
    },
    toggleSelectLanguage() {
      this.languageSelectOpen = !this.languageSelectOpen, this.countrySelectOpen = !1;
    },
    selectVersion(e) {
      this.countrySelectOpen = !1, this.languageSelected = null, this.languageSelectedLabel = null, this.versionSelected = e.dataset.version, this.versionSelectedLabel = e.innerText, this.versionsAvailable[this.versionSelected] && (this.languagesAvailable = this.versionsAvailable[this.versionSelected]);
    },
    selectLanguage(e) {
      this.languageSelectOpen = !1, this.languageSelected = e.dataset.language, this.languageSelectedLabel = e.innerText, this.apiRequest();
    },
    apiRequest() {
      const e = `/wp-json/bemy/v1/version?version=${this.versionSelected}&lang=${this.languageSelected}`;
      axios.get(e).then((t) => {
        t.data.success && (sessionStorage.setItem("version", this.versionSelected), window.location.href = t.data.home_url);
      }).catch((t) => {
        console.log(t);
      });
    }
  };
}
Xe({
  $delimiters: ["[[", "]]"],
  // define your apps here
  Menu: dn,
  VersionSelection: gn
}).mount();
