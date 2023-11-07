var Ft = Object.defineProperty, Rt = (e, t, i) => t in e ? Ft(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, j = (e, t, i) => (Rt(e, typeof t != "symbol" ? t + "" : t, i), i);
function Ht(e, t) {
  const i = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let n = 0; n < s.length; n++)
    i[s[n]] = !0;
  return t ? (n) => !!i[n.toLowerCase()] : (n) => !!i[n];
}
function at(e) {
  if (k(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++) {
      const s = e[i], n = X(s) ? qt(s) : at(s);
      if (n)
        for (const r in n)
          t[r] = n[r];
    }
    return t;
  } else if (X(e) || R(e))
    return e;
}
const jt = /;(?![^(]*\))/g, Wt = /:(.+)/;
function qt(e) {
  const t = {};
  return e.split(jt).forEach((i) => {
    if (i) {
      const s = i.split(Wt);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function dt(e) {
  let t = "";
  if (X(e))
    t = e;
  else if (k(e))
    for (let i = 0; i < e.length; i++) {
      const s = dt(e[i]);
      s && (t += s + " ");
    }
  else if (R(e))
    for (const i in e)
      e[i] && (t += i + " ");
  return t.trim();
}
function Yt(e, t) {
  if (e.length !== t.length)
    return !1;
  let i = !0;
  for (let s = 0; i && s < e.length; s++)
    i = Y(e[s], t[s]);
  return i;
}
function Y(e, t) {
  if (e === t)
    return !0;
  let i = Be(e), s = Be(t);
  if (i || s)
    return i && s ? e.getTime() === t.getTime() : !1;
  if (i = k(e), s = k(t), i || s)
    return i && s ? Yt(e, t) : !1;
  if (i = R(e), s = R(t), i || s) {
    if (!i || !s)
      return !1;
    const n = Object.keys(e).length, r = Object.keys(t).length;
    if (n !== r)
      return !1;
    for (const l in e) {
      const o = e.hasOwnProperty(l), a = t.hasOwnProperty(l);
      if (o && !a || !o && a || !Y(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function fe(e, t) {
  return e.findIndex((i) => Y(i, t));
}
const Xt = Object.assign, Kt = (e, t) => {
  const i = e.indexOf(t);
  i > -1 && e.splice(i, 1);
}, Ut = Object.prototype.hasOwnProperty, Ae = (e, t) => Ut.call(e, t), k = Array.isArray, ue = (e) => ct(e) === "[object Map]", Be = (e) => e instanceof Date, X = (e) => typeof e == "string", ke = (e) => typeof e == "symbol", R = (e) => e !== null && typeof e == "object", Jt = Object.prototype.toString, ct = (e) => Jt.call(e), Zt = (e) => ct(e).slice(8, -1), ze = (e) => X(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ft = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (i) => t[i] || (t[i] = e(i));
}, Qt = /-(\w)/g, ei = ft((e) => e.replace(Qt, (t, i) => i ? i.toUpperCase() : "")), ti = /\B([A-Z])/g, ut = ft((e) => e.replace(ti, "-$1").toLowerCase()), ii = (e, t) => !Object.is(e, t), Fe = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let si;
function pt(e, t) {
  t = t || si, t && t.active && t.effects.push(e);
}
const ht = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, mt = (e) => (e.w & H) > 0, gt = (e) => (e.n & H) > 0, ni = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= H;
}, ri = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let i = 0;
    for (let s = 0; s < t.length; s++) {
      const n = t[s];
      mt(n) && !gt(n) ? n.delete(e) : t[i++] = n, n.w &= ~H, n.n &= ~H;
    }
    t.length = i;
  }
}, be = /* @__PURE__ */ new WeakMap();
let Z = 0, H = 1;
const Te = 30, J = [];
let W;
const ie = Symbol(""), Re = Symbol("");
class li {
  constructor(t, i = null, s) {
    this.fn = t, this.scheduler = i, this.active = !0, this.deps = [], pt(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    if (!J.includes(this))
      try {
        return J.push(W = this), ci(), H = 1 << ++Z, Z <= Te ? ni(this) : He(this), this.fn();
      } finally {
        Z <= Te && ri(this), H = 1 << --Z, vt(), J.pop();
        const t = J.length;
        W = t > 0 ? J[t - 1] : void 0;
      }
  }
  stop() {
    this.active && (He(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function He(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let i = 0; i < t.length; i++)
      t[i].delete(e);
    t.length = 0;
  }
}
function oi(e, t) {
  e.effect && (e = e.effect.fn);
  const i = new li(e);
  t && (Xt(i, t), t.scope && pt(i, t.scope)), (!t || !t.lazy) && i.run();
  const s = i.run.bind(i);
  return s.effect = i, s;
}
function ai(e) {
  e.effect.stop();
}
let K = !0;
const _e = [];
function di() {
  _e.push(K), K = !1;
}
function ci() {
  _e.push(K), K = !0;
}
function vt() {
  const e = _e.pop();
  K = e === void 0 ? !0 : e;
}
function ae(e, t, i) {
  if (!fi())
    return;
  let s = be.get(e);
  s || be.set(e, s = /* @__PURE__ */ new Map());
  let n = s.get(i);
  n || s.set(i, n = ht()), ui(n);
}
function fi() {
  return K && W !== void 0;
}
function ui(e, t) {
  let i = !1;
  Z <= Te ? gt(e) || (e.n |= H, i = !mt(e)) : i = !e.has(W), i && (e.add(W), W.deps.push(e));
}
function ye(e, t, i, s, n, r) {
  const l = be.get(e);
  if (!l)
    return;
  let o = [];
  if (t === "clear")
    o = [...l.values()];
  else if (i === "length" && k(e))
    l.forEach((a, d) => {
      (d === "length" || d >= s) && o.push(a);
    });
  else
    switch (i !== void 0 && o.push(l.get(i)), t) {
      case "add":
        k(e) ? ze(i) && o.push(l.get("length")) : (o.push(l.get(ie)), ue(e) && o.push(l.get(Re)));
        break;
      case "delete":
        k(e) || (o.push(l.get(ie)), ue(e) && o.push(l.get(Re)));
        break;
      case "set":
        ue(e) && o.push(l.get(ie));
        break;
    }
  if (o.length === 1)
    o[0] && je(o[0]);
  else {
    const a = [];
    for (const d of o)
      d && a.push(...d);
    je(ht(a));
  }
}
function je(e, t) {
  for (const i of k(e) ? e : [...e])
    (i !== W || i.allowRecurse) && (i.scheduler ? i.scheduler() : i.run());
}
const pi = Ht("__proto__,__v_isRef,__isVue"), wt = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(ke)), hi = St(), mi = St(!0), We = gi();
function gi() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...i) {
      const s = q(this);
      for (let r = 0, l = this.length; r < l; r++)
        ae(s, "get", r + "");
      const n = s[t](...i);
      return n === -1 || n === !1 ? s[t](...i.map(q)) : n;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...i) {
      di();
      const s = q(this)[t].apply(this, i);
      return vt(), s;
    };
  }), e;
}
function St(e = !1, t = !1) {
  return function(i, s, n) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_raw" && n === (e ? t ? Pi : Tt : t ? Ei : bt).get(i))
      return i;
    const r = k(i);
    if (!e && r && Ae(We, s))
      return Reflect.get(We, s, n);
    const l = Reflect.get(i, s, n);
    return (ke(s) ? wt.has(s) : pi(s)) || (e || ae(i, "get", s), t) ? l : xe(l) ? !r || !ze(s) ? l.value : l : R(l) ? e ? Ii(l) : de(l) : l;
  };
}
const vi = wi();
function wi(e = !1) {
  return function(t, i, s, n) {
    let r = t[i];
    if (!e && !Oi(s) && (s = q(s), r = q(r), !k(t) && xe(r) && !xe(s)))
      return r.value = s, !0;
    const l = k(t) && ze(i) ? Number(i) < t.length : Ae(t, i), o = Reflect.set(t, i, s, n);
    return t === q(n) && (l ? ii(s, r) && ye(t, "set", i, s) : ye(t, "add", i, s)), o;
  };
}
function Si(e, t) {
  const i = Ae(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && i && ye(e, "delete", t, void 0), s;
}
function bi(e, t) {
  const i = Reflect.has(e, t);
  return (!ke(t) || !wt.has(t)) && ae(e, "has", t), i;
}
function Ti(e) {
  return ae(e, "iterate", k(e) ? "length" : ie), Reflect.ownKeys(e);
}
const yi = { get: hi, set: vi, deleteProperty: Si, has: bi, ownKeys: Ti }, xi = { get: mi, set(e, t) {
  return !0;
}, deleteProperty(e, t) {
  return !0;
} }, bt = /* @__PURE__ */ new WeakMap(), Ei = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap(), Pi = /* @__PURE__ */ new WeakMap();
function Mi(e) {
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
function Ci(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Mi(Zt(e));
}
function de(e) {
  return e && e.__v_isReadonly ? e : yt(e, !1, yi, null, bt);
}
function Ii(e) {
  return yt(e, !0, xi, null, Tt);
}
function yt(e, t, i, s, n) {
  if (!R(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = n.get(e);
  if (r)
    return r;
  const l = Ci(e);
  if (l === 0)
    return e;
  const o = new Proxy(e, l === 2 ? s : i);
  return n.set(e, o), o;
}
function Oi(e) {
  return !!(e && e.__v_isReadonly);
}
function q(e) {
  const t = e && e.__v_raw;
  return t ? q(t) : e;
}
function xe(e) {
  return !!(e && e.__v_isRef === !0);
}
Promise.resolve();
let Ee = !1;
const ne = [], Li = Promise.resolve(), ce = (e) => Li.then(e), qe = (e) => {
  ne.includes(e) || ne.push(e), Ee || (Ee = !0, ce(Ai));
}, Ai = () => {
  for (const e of ne)
    e();
  ne.length = 0, Ee = !1;
}, ki = /^(spellcheck|draggable|form|list|type)$/, Pe = ({ el: e, get: t, effect: i, arg: s, modifiers: n }) => {
  let r;
  s === "class" && (e._class = e.className), i(() => {
    let l = t();
    if (s)
      n != null && n.camel && (s = ei(s)), pe(e, s, l, r);
    else {
      for (const o in l)
        pe(e, o, l[o], r && r[o]);
      for (const o in r)
        (!l || !(o in l)) && pe(e, o, null);
    }
    r = l;
  });
}, pe = (e, t, i, s) => {
  if (t === "class")
    e.setAttribute("class", dt(e._class ? [e._class, i] : i) || "");
  else if (t === "style") {
    i = at(i);
    const { style: n } = e;
    if (!i)
      e.removeAttribute("style");
    else if (X(i))
      i !== s && (n.cssText = i);
    else {
      for (const r in i)
        Me(n, r, i[r]);
      if (s && !X(s))
        for (const r in s)
          i[r] == null && Me(n, r, "");
    }
  } else
    !(e instanceof SVGElement) && t in e && !ki.test(t) ? (e[t] = i, t === "value" && (e._value = i)) : t === "true-value" ? e._trueValue = i : t === "false-value" ? e._falseValue = i : i != null ? e.setAttribute(t, i) : e.removeAttribute(t);
}, Ye = /\s*!important$/, Me = (e, t, i) => {
  k(i) ? i.forEach((s) => Me(e, t, s)) : t.startsWith("--") ? e.setProperty(t, i) : Ye.test(i) ? e.setProperty(ut(t), i.replace(Ye, ""), "important") : e[t] = i;
}, B = (e, t) => {
  const i = e.getAttribute(t);
  return i != null && e.removeAttribute(t), i;
}, N = (e, t, i, s) => {
  e.addEventListener(t, i, s);
}, zi = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, _i = ["ctrl", "shift", "alt", "meta"], Gi = { stop: (e) => e.stopPropagation(), prevent: (e) => e.preventDefault(), self: (e) => e.target !== e.currentTarget, ctrl: (e) => !e.ctrlKey, shift: (e) => !e.shiftKey, alt: (e) => !e.altKey, meta: (e) => !e.metaKey, left: (e) => "button" in e && e.button !== 0, middle: (e) => "button" in e && e.button !== 1, right: (e) => "button" in e && e.button !== 2, exact: (e, t) => _i.some((i) => e[`${i}Key`] && !t[i]) }, xt = ({ el: e, get: t, exp: i, arg: s, modifiers: n }) => {
  if (!s)
    return;
  let r = zi.test(i) ? t(`(e => ${i}(e))`) : t(`($event => { ${i} })`);
  if (s === "vue:mounted") {
    ce(r);
    return;
  } else if (s === "vue:unmounted")
    return () => r();
  if (n) {
    s === "click" && (n.right && (s = "contextmenu"), n.middle && (s = "mouseup"));
    const l = r;
    r = (o) => {
      if (!("key" in o && !(ut(o.key) in n))) {
        for (const a in n) {
          const d = Gi[a];
          if (d && d(o, n))
            return;
        }
        return l(o);
      }
    };
  }
  N(e, s, r, n);
}, Di = ({ el: e, get: t, effect: i }) => {
  const s = e.style.display;
  i(() => {
    e.style.display = t() ? s : "none";
  });
}, Et = ({ el: e, get: t, effect: i }) => {
  i(() => {
    e.textContent = Pt(t());
  });
}, Pt = (e) => e == null ? "" : R(e) ? JSON.stringify(e, null, 2) : String(e), Vi = ({ el: e, get: t, effect: i }) => {
  i(() => {
    e.innerHTML = t();
  });
}, $i = ({ el: e, exp: t, get: i, effect: s, modifiers: n }) => {
  const r = e.type, l = i(`(val) => { ${t} = val }`), { trim: o, number: a = r === "number" } = n || {};
  if (e.tagName === "SELECT") {
    const d = e;
    N(e, "change", () => {
      const c = Array.prototype.filter.call(d.options, (f) => f.selected).map((f) => a ? Fe($(f)) : $(f));
      l(d.multiple ? c : c[0]);
    }), s(() => {
      const c = i(), f = d.multiple;
      for (let u = 0, p = d.options.length; u < p; u++) {
        const m = d.options[u], h = $(m);
        if (f)
          k(c) ? m.selected = fe(c, h) > -1 : m.selected = c.has(h);
        else if (Y($(m), c)) {
          d.selectedIndex !== u && (d.selectedIndex = u);
          return;
        }
      }
      !f && d.selectedIndex !== -1 && (d.selectedIndex = -1);
    });
  } else if (r === "checkbox") {
    N(e, "change", () => {
      const c = i(), f = e.checked;
      if (k(c)) {
        const u = $(e), p = fe(c, u), m = p !== -1;
        if (f && !m)
          l(c.concat(u));
        else if (!f && m) {
          const h = [...c];
          h.splice(p, 1), l(h);
        }
      } else
        l(Xe(e, f));
    });
    let d;
    s(() => {
      const c = i();
      k(c) ? e.checked = fe(c, $(e)) > -1 : c !== d && (e.checked = Y(c, Xe(e, !0))), d = c;
    });
  } else if (r === "radio") {
    N(e, "change", () => {
      l($(e));
    });
    let d;
    s(() => {
      const c = i();
      c !== d && (e.checked = Y(c, $(e)));
    });
  } else {
    const d = (c) => o ? c.trim() : a ? Fe(c) : c;
    N(e, "compositionstart", Ni), N(e, "compositionend", Bi), N(e, n != null && n.lazy ? "change" : "input", () => {
      e.composing || l(d(e.value));
    }), o && N(e, "change", () => {
      e.value = e.value.trim();
    }), s(() => {
      if (e.composing)
        return;
      const c = e.value, f = i();
      document.activeElement === e && d(c) === f || c !== f && (e.value = f);
    });
  }
}, $ = (e) => "_value" in e ? e._value : e.value, Xe = (e, t) => {
  const i = t ? "_trueValue" : "_falseValue";
  return i in e ? e[i] : t;
}, Ni = (e) => {
  e.target.composing = !0;
}, Bi = (e) => {
  const t = e.target;
  t.composing && (t.composing = !1, Fi(t, "input"));
}, Fi = (e, t) => {
  const i = document.createEvent("HTMLEvents");
  i.initEvent(t, !0, !0), e.dispatchEvent(i);
}, Ke = /* @__PURE__ */ Object.create(null), Q = (e, t, i) => Mt(e, `return(${t})`, i), Mt = (e, t, i) => {
  const s = Ke[t] || (Ke[t] = Ri(t));
  try {
    return s(e, i);
  } catch (n) {
    console.error(n);
  }
}, Ri = (e) => {
  try {
    return new Function("$data", "$el", `with($data){${e}}`);
  } catch (t) {
    return console.error(`${t.message} in expression: ${e}`), () => {
    };
  }
}, Hi = ({ el: e, ctx: t, exp: i, effect: s }) => {
  ce(() => s(() => Mt(t.scope, i, e)));
}, ji = { bind: Pe, on: xt, show: Di, text: Et, html: Vi, model: $i, effect: Hi }, Wi = (e, t, i) => {
  const s = e.parentElement, n = new Comment("v-if");
  s.insertBefore(n, e);
  const r = [{ exp: t, el: e }];
  let l, o;
  for (; (l = e.nextElementSibling) && (o = null, B(l, "v-else") === "" || (o = B(l, "v-else-if"))); )
    s.removeChild(l), r.push({ exp: o, el: l });
  const a = e.nextSibling;
  s.removeChild(e);
  let d, c = -1;
  const f = () => {
    d && (s.insertBefore(n, d.el), d.remove(), d = void 0);
  };
  return i.effect(() => {
    for (let u = 0; u < r.length; u++) {
      const { exp: p, el: m } = r[u];
      if (!p || Q(i.scope, p)) {
        u !== c && (f(), d = new Ge(m, i), d.insert(s, n), s.removeChild(n), c = u);
        return;
      }
    }
    c = -1, f();
  }), a;
}, qi = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, Ue = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, Yi = /^\(|\)$/g, Xi = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/, Ki = (e, t, i) => {
  const s = t.match(qi);
  if (!s)
    return;
  const n = e.nextSibling, r = e.parentElement, l = new Text("");
  r.insertBefore(l, e), r.removeChild(e);
  const o = s[2].trim();
  let a = s[1].trim().replace(Yi, "").trim(), d, c = !1, f, u, p = "key", m = e.getAttribute(p) || e.getAttribute(p = ":key") || e.getAttribute(p = "v-bind:key");
  m && (e.removeAttribute(p), p === "key" && (m = JSON.stringify(m)));
  let h;
  (h = a.match(Ue)) && (a = a.replace(Ue, "").trim(), f = h[1].trim(), h[2] && (u = h[2].trim())), (h = a.match(Xi)) && (d = h[1].split(",").map((I) => I.trim()), c = a[0] === "[");
  let w = !1, g, T, v;
  const b = (I) => {
    const M = /* @__PURE__ */ new Map(), O = [];
    if (k(I))
      for (let S = 0; S < I.length; S++)
        O.push(P(M, I[S], S));
    else if (typeof I == "number")
      for (let S = 0; S < I; S++)
        O.push(P(M, S + 1, S));
    else if (R(I)) {
      let S = 0;
      for (const y in I)
        O.push(P(M, I[y], S++, y));
    }
    return [O, M];
  }, P = (I, M, O, S) => {
    const y = {};
    d ? d.forEach((C, A) => y[C] = M[c ? A : C]) : y[a] = M, S ? (f && (y[f] = S), u && (y[u] = O)) : f && (y[f] = O);
    const E = Lt(i, y), x = m ? Q(E.scope, m) : O;
    return I.set(x, O), E.key = x, E;
  }, L = (I, M) => {
    const O = new Ge(e, I);
    return O.key = I.key, O.insert(r, M), O;
  };
  return i.effect(() => {
    const I = Q(i.scope, o), M = v;
    if ([T, v] = b(I), !w)
      g = T.map((O) => L(O, l)), w = !0;
    else {
      for (let x = 0; x < g.length; x++)
        v.has(g[x].key) || g[x].remove();
      const O = [];
      let S = T.length, y, E;
      for (; S--; ) {
        const x = T[S], C = M.get(x.key);
        let A;
        C == null ? A = L(x, y ? y.el : l) : (A = g[C], Object.assign(A.ctx.scope, x.scope), C !== S && (g[C + 1] !== y || E === y) && (E = A, A.insert(r, y ? y.el : l))), O.unshift(y = A);
      }
      g = O;
    }
  }), n;
}, Ct = ({ el: e, ctx: { scope: { $refs: t } }, get: i, effect: s }) => {
  let n;
  return s(() => {
    const r = i();
    t[r] = e, n && r !== n && delete t[n], n = r;
  }), () => {
    n && delete t[n];
  };
}, Ui = /^(?:v-|:|@)/, Ji = /\.([\w-]+)/g;
let Ce = !1;
const It = (e, t) => {
  const i = e.nodeType;
  if (i === 1) {
    const s = e;
    if (s.hasAttribute("v-pre"))
      return;
    B(s, "v-cloak");
    let n;
    if (n = B(s, "v-if"))
      return Wi(s, n, t);
    if (n = B(s, "v-for"))
      return Ki(s, n, t);
    if ((n = B(s, "v-scope")) || n === "") {
      const o = n ? Q(t.scope, n) : {};
      t = Lt(t, o), o.$template && Zi(s, o.$template);
    }
    const r = B(s, "v-once") != null;
    r && (Ce = !0), (n = B(s, "ref")) && Ie(s, Ct, `"${n}"`, t), Je(s, t);
    const l = [];
    for (const { name: o, value: a } of [...s.attributes])
      Ui.test(o) && o !== "v-cloak" && (o === "v-model" ? l.unshift([o, a]) : o[0] === "@" || /^v-on\b/.test(o) ? l.push([o, a]) : Ze(s, o, a, t));
    for (const [o, a] of l)
      Ze(s, o, a, t);
    r && (Ce = !1);
  } else if (i === 3) {
    const s = e.data;
    if (s.includes(t.delimiters[0])) {
      let n = [], r = 0, l;
      for (; l = t.delimitersRE.exec(s); ) {
        const o = s.slice(r, l.index);
        o && n.push(JSON.stringify(o)), n.push(`$s(${l[1]})`), r = l.index + l[0].length;
      }
      r < s.length && n.push(JSON.stringify(s.slice(r))), Ie(e, Et, n.join("+"), t);
    }
  } else
    i === 11 && Je(e, t);
}, Je = (e, t) => {
  let i = e.firstChild;
  for (; i; )
    i = It(i, t) || i.nextSibling;
}, Ze = (e, t, i, s) => {
  let n, r, l;
  if (t = t.replace(Ji, (o, a) => ((l || (l = {}))[a] = !0, "")), t[0] === ":")
    n = Pe, r = t.slice(1);
  else if (t[0] === "@")
    n = xt, r = t.slice(1);
  else {
    const o = t.indexOf(":"), a = o > 0 ? t.slice(2, o) : t.slice(2);
    n = ji[a] || s.dirs[a], r = o > 0 ? t.slice(o + 1) : void 0;
  }
  n && (n === Pe && r === "ref" && (n = Ct), Ie(e, n, i, s, r, l), e.removeAttribute(t));
}, Ie = (e, t, i, s, n, r) => {
  const l = t({ el: e, get: (o = i) => Q(s.scope, o, e), effect: s.effect, ctx: s, exp: i, arg: n, modifiers: r });
  l && s.cleanups.push(l);
}, Zi = (e, t) => {
  if (t[0] === "#") {
    const i = document.querySelector(t);
    e.appendChild(i.content.cloneNode(!0));
    return;
  }
  e.innerHTML = t;
}, Ot = (e) => {
  const t = { delimiters: ["{{", "}}"], delimitersRE: /\{\{([^]+?)\}\}/g, ...e, scope: e ? e.scope : de({}), dirs: e ? e.dirs : {}, effects: [], blocks: [], cleanups: [], effect: (i) => {
    if (Ce)
      return qe(i), i;
    const s = oi(i, { scheduler: () => qe(s) });
    return t.effects.push(s), s;
  } };
  return t;
}, Lt = (e, t = {}) => {
  const i = e.scope, s = Object.create(i);
  Object.defineProperties(s, Object.getOwnPropertyDescriptors(t)), s.$refs = Object.create(i.$refs);
  const n = de(new Proxy(s, { set(r, l, o, a) {
    return a === n && !r.hasOwnProperty(l) ? Reflect.set(i, l, o) : Reflect.set(r, l, o, a);
  } }));
  return At(n), { ...e, scope: n };
}, At = (e) => {
  for (const t of Object.keys(e))
    typeof e[t] == "function" && (e[t] = e[t].bind(e));
};
class Ge {
  constructor(t, i, s = !1) {
    j(this, "template"), j(this, "ctx"), j(this, "key"), j(this, "parentCtx"), j(this, "isFragment"), j(this, "start"), j(this, "end"), this.isFragment = t instanceof HTMLTemplateElement, s ? this.template = t : this.isFragment ? this.template = t.content.cloneNode(!0) : this.template = t.cloneNode(!0), s ? this.ctx = i : (this.parentCtx = i, i.blocks.push(this), this.ctx = Ot(i)), It(this.template, this.ctx);
  }
  get el() {
    return this.start || this.template;
  }
  insert(t, i = null) {
    if (this.isFragment)
      if (this.start) {
        let s = this.start, n;
        for (; s && (n = s.nextSibling, t.insertBefore(s, i), s !== this.end); )
          s = n;
      } else
        this.start = new Text(""), this.end = new Text(""), t.insertBefore(this.end, i), t.insertBefore(this.start, this.end), t.insertBefore(this.template, this.end);
    else
      t.insertBefore(this.template, i);
  }
  remove() {
    if (this.parentCtx && Kt(this.parentCtx.blocks, this), this.start) {
      const t = this.start.parentNode;
      let i = this.start, s;
      for (; i && (s = i.nextSibling, t.removeChild(i), i !== this.end); )
        i = s;
    } else
      this.template.parentNode.removeChild(this.template);
    this.teardown();
  }
  teardown() {
    this.ctx.blocks.forEach((t) => {
      t.teardown();
    }), this.ctx.effects.forEach(ai), this.ctx.cleanups.forEach((t) => t());
  }
}
const Qe = (e) => e.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"), kt = (e) => {
  const t = Ot();
  if (e && (t.scope = de(e), At(t.scope), e.$delimiters)) {
    const [s, n] = t.delimiters = e.$delimiters;
    t.delimitersRE = new RegExp(Qe(s) + "([^]+?)" + Qe(n), "g");
  }
  t.scope.$s = Pt, t.scope.$nextTick = ce, t.scope.$refs = /* @__PURE__ */ Object.create(null);
  let i;
  return { directive(s, n) {
    return n ? (t.dirs[s] = n, this) : t.dirs[s];
  }, mount(s) {
    if (typeof s == "string" && (s = document.querySelector(s), !s))
      return;
    s = s || document.documentElement;
    let n;
    return s.hasAttribute("v-scope") ? n = [s] : n = [...s.querySelectorAll("[v-scope]")].filter((r) => !r.matches("[v-scope] [v-scope]")), n.length || (n = [s]), i = n.map((r) => new Ge(r, t, !0)), this;
  }, unmount() {
    i.forEach((s) => s.teardown());
  } };
}, et = document.currentScript;
et && et.hasAttribute("init") && kt().mount();
function Qi(e) {
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
      const i = t.nextElementSibling, s = t.getAttribute("aria-expanded") === "true" || !1;
      if (this.submenuOpen && window.innerWidth >= 1024 && this.closeAllSubmenus(), s)
        this.submenuOpen = !1, i.style.height = 0, i.setAttribute("aria-hidden", !0);
      else {
        this.submenuOpen = !0;
        const n = i.scrollHeight;
        i.style.height = n + "px", i.setAttribute("aria-hidden", !1);
      }
      t.setAttribute("aria-expanded", !s);
    },
    closeAllSubmenus() {
      const t = this.siteHeader.querySelectorAll(".site-header__submenu"), i = this.siteHeader.querySelectorAll(".btn-submenu");
      t.length !== 0 && i.length !== 0 && (t.forEach((s) => {
        s.style.height = 0, s.setAttribute("aria-hidden", !0);
      }), i.forEach((s) => {
        s.setAttribute("aria-expanded", !1);
      }));
    }
  };
}
function es() {
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
        sessionStorage.getItem("version") || this.openPopin();
      }, 1e3);
    },
    openPopin() {
      const e = document.querySelector("body");
      e.style.overflow = "hidden", this.popinDisplayed = !0;
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
    },
    homepage(e) {
      const t = sessionStorage.getItem("version");
      if (t && e) {
        const i = e.split(",");
        let s = i[0];
        switch (t) {
          case "france":
            s = i[0];
            break;
          case "germany":
            s = i[1];
            break;
          case "switzerland":
            s = i[2];
            break;
        }
        setTimeout(() => {
          window.location.href = s;
        }, 250);
      }
    }
  };
}
function tt(e) {
  return e !== null && typeof e == "object" && "constructor" in e && e.constructor === Object;
}
function De(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = {}), Object.keys(t).forEach((i) => {
    typeof e[i] > "u" ? e[i] = t[i] : tt(t[i]) && tt(e[i]) && Object.keys(t[i]).length > 0 && De(e[i], t[i]);
  });
}
const zt = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function U() {
  const e = typeof document < "u" ? document : {};
  return De(e, zt), e;
}
const ts = {
  document: zt,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > "u" || clearTimeout(e);
  }
};
function _() {
  const e = typeof window < "u" ? window : {};
  return De(e, ts), e;
}
function is(e) {
  return e === void 0 && (e = ""), e.trim().split(" ").filter((t) => !!t.trim());
}
function ss(e) {
  const t = e;
  Object.keys(t).forEach((i) => {
    try {
      t[i] = null;
    } catch {
    }
    try {
      delete t[i];
    } catch {
    }
  });
}
function Oe(e, t) {
  return t === void 0 && (t = 0), setTimeout(e, t);
}
function re() {
  return Date.now();
}
function ns(e) {
  const t = _();
  let i;
  return t.getComputedStyle && (i = t.getComputedStyle(e, null)), !i && e.currentStyle && (i = e.currentStyle), i || (i = e.style), i;
}
function rs(e, t) {
  t === void 0 && (t = "x");
  const i = _();
  let s, n, r;
  const l = ns(e);
  return i.WebKitCSSMatrix ? (n = l.transform || l.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map((o) => o.replace(",", ".")).join(", ")), r = new i.WebKitCSSMatrix(n === "none" ? "" : n)) : (r = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), s = r.toString().split(",")), t === "x" && (i.WebKitCSSMatrix ? n = r.m41 : s.length === 16 ? n = parseFloat(s[12]) : n = parseFloat(s[4])), t === "y" && (i.WebKitCSSMatrix ? n = r.m42 : s.length === 16 ? n = parseFloat(s[13]) : n = parseFloat(s[5])), n || 0;
}
function ee(e) {
  return typeof e == "object" && e !== null && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object";
}
function ls(e) {
  return typeof window < "u" && typeof window.HTMLElement < "u" ? e instanceof HTMLElement : e && (e.nodeType === 1 || e.nodeType === 11);
}
function z() {
  const e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < arguments.length; i += 1) {
    const s = i < 0 || arguments.length <= i ? void 0 : arguments[i];
    if (s != null && !ls(s)) {
      const n = Object.keys(Object(s)).filter((r) => t.indexOf(r) < 0);
      for (let r = 0, l = n.length; r < l; r += 1) {
        const o = n[r], a = Object.getOwnPropertyDescriptor(s, o);
        a !== void 0 && a.enumerable && (ee(e[o]) && ee(s[o]) ? s[o].__swiper__ ? e[o] = s[o] : z(e[o], s[o]) : !ee(e[o]) && ee(s[o]) ? (e[o] = {}, s[o].__swiper__ ? e[o] = s[o] : z(e[o], s[o])) : e[o] = s[o]);
      }
    }
  }
  return e;
}
function te(e, t, i) {
  e.style.setProperty(t, i);
}
function _t(e) {
  let {
    swiper: t,
    targetPosition: i,
    side: s
  } = e;
  const n = _(), r = -t.translate;
  let l = null, o;
  const a = t.params.speed;
  t.wrapperEl.style.scrollSnapType = "none", n.cancelAnimationFrame(t.cssModeFrameID);
  const d = i > r ? "next" : "prev", c = (u, p) => d === "next" && u >= p || d === "prev" && u <= p, f = () => {
    o = (/* @__PURE__ */ new Date()).getTime(), l === null && (l = o);
    const u = Math.max(Math.min((o - l) / a, 1), 0), p = 0.5 - Math.cos(u * Math.PI) / 2;
    let m = r + p * (i - r);
    if (c(m, i) && (m = i), t.wrapperEl.scrollTo({
      [s]: m
    }), c(m, i)) {
      t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
          [s]: m
        });
      }), n.cancelAnimationFrame(t.cssModeFrameID);
      return;
    }
    t.cssModeFrameID = n.requestAnimationFrame(f);
  };
  f();
}
function D(e, t) {
  return t === void 0 && (t = ""), [...e.children].filter((i) => i.matches(t));
}
function le(e) {
  try {
    console.warn(e);
    return;
  } catch {
  }
}
function oe(e, t) {
  t === void 0 && (t = []);
  const i = document.createElement(e);
  return i.classList.add(...Array.isArray(t) ? t : is(t)), i;
}
function os(e, t) {
  const i = [];
  for (; e.previousElementSibling; ) {
    const s = e.previousElementSibling;
    t ? s.matches(t) && i.push(s) : i.push(s), e = s;
  }
  return i;
}
function as(e, t) {
  const i = [];
  for (; e.nextElementSibling; ) {
    const s = e.nextElementSibling;
    t ? s.matches(t) && i.push(s) : i.push(s), e = s;
  }
  return i;
}
function F(e, t) {
  return _().getComputedStyle(e, null).getPropertyValue(t);
}
function it(e) {
  let t = e, i;
  if (t) {
    for (i = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (i += 1);
    return i;
  }
}
function ds(e, t) {
  const i = [];
  let s = e.parentElement;
  for (; s; )
    t ? s.matches(t) && i.push(s) : i.push(s), s = s.parentElement;
  return i;
}
function st(e, t, i) {
  const s = _();
  return i ? e[t === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getComputedStyle(e, null).getPropertyValue(t === "width" ? "margin-right" : "margin-top")) + parseFloat(s.getComputedStyle(e, null).getPropertyValue(t === "width" ? "margin-left" : "margin-bottom")) : e.offsetWidth;
}
let he;
function cs() {
  const e = _(), t = U();
  return {
    smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
    touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
  };
}
function Gt() {
  return he || (he = cs()), he;
}
let me;
function fs(e) {
  let {
    userAgent: t
  } = e === void 0 ? {} : e;
  const i = Gt(), s = _(), n = s.navigator.platform, r = t || s.navigator.userAgent, l = {
    ios: !1,
    android: !1
  }, o = s.screen.width, a = s.screen.height, d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let c = r.match(/(iPad).*OS\s([\d_]+)/);
  const f = r.match(/(iPod)(.*OS\s([\d_]+))?/), u = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/), p = n === "Win32";
  let m = n === "MacIntel";
  const h = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !c && m && i.touch && h.indexOf(`${o}x${a}`) >= 0 && (c = r.match(/(Version)\/([\d.]+)/), c || (c = [0, 1, "13_0_0"]), m = !1), d && !p && (l.os = "android", l.android = !0), (c || u || f) && (l.os = "ios", l.ios = !0), l;
}
function us(e) {
  return e === void 0 && (e = {}), me || (me = fs(e)), me;
}
let ge;
function ps() {
  const e = _();
  let t = !1;
  function i() {
    const s = e.navigator.userAgent.toLowerCase();
    return s.indexOf("safari") >= 0 && s.indexOf("chrome") < 0 && s.indexOf("android") < 0;
  }
  if (i()) {
    const s = String(e.navigator.userAgent);
    if (s.includes("Version/")) {
      const [n, r] = s.split("Version/")[1].split(" ")[0].split(".").map((l) => Number(l));
      t = n < 16 || n === 16 && r < 2;
    }
  }
  return {
    isSafari: t || i(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
  };
}
function hs() {
  return ge || (ge = ps()), ge;
}
function ms(e) {
  let {
    swiper: t,
    on: i,
    emit: s
  } = e;
  const n = _();
  let r = null, l = null;
  const o = () => {
    !t || t.destroyed || !t.initialized || (s("beforeResize"), s("resize"));
  }, a = () => {
    !t || t.destroyed || !t.initialized || (r = new ResizeObserver((f) => {
      l = n.requestAnimationFrame(() => {
        const {
          width: u,
          height: p
        } = t;
        let m = u, h = p;
        f.forEach((w) => {
          let {
            contentBoxSize: g,
            contentRect: T,
            target: v
          } = w;
          v && v !== t.el || (m = T ? T.width : (g[0] || g).inlineSize, h = T ? T.height : (g[0] || g).blockSize);
        }), (m !== u || h !== p) && o();
      });
    }), r.observe(t.el));
  }, d = () => {
    l && n.cancelAnimationFrame(l), r && r.unobserve && t.el && (r.unobserve(t.el), r = null);
  }, c = () => {
    !t || t.destroyed || !t.initialized || s("orientationchange");
  };
  i("init", () => {
    if (t.params.resizeObserver && typeof n.ResizeObserver < "u") {
      a();
      return;
    }
    n.addEventListener("resize", o), n.addEventListener("orientationchange", c);
  }), i("destroy", () => {
    d(), n.removeEventListener("resize", o), n.removeEventListener("orientationchange", c);
  });
}
function gs(e) {
  let {
    swiper: t,
    extendParams: i,
    on: s,
    emit: n
  } = e;
  const r = [], l = _(), o = function(c, f) {
    f === void 0 && (f = {});
    const u = l.MutationObserver || l.WebkitMutationObserver, p = new u((m) => {
      if (t.__preventObserver__)
        return;
      if (m.length === 1) {
        n("observerUpdate", m[0]);
        return;
      }
      const h = function() {
        n("observerUpdate", m[0]);
      };
      l.requestAnimationFrame ? l.requestAnimationFrame(h) : l.setTimeout(h, 0);
    });
    p.observe(c, {
      attributes: typeof f.attributes > "u" ? !0 : f.attributes,
      childList: typeof f.childList > "u" ? !0 : f.childList,
      characterData: typeof f.characterData > "u" ? !0 : f.characterData
    }), r.push(p);
  }, a = () => {
    if (t.params.observer) {
      if (t.params.observeParents) {
        const c = ds(t.hostEl);
        for (let f = 0; f < c.length; f += 1)
          o(c[f]);
      }
      o(t.hostEl, {
        childList: t.params.observeSlideChildren
      }), o(t.wrapperEl, {
        attributes: !1
      });
    }
  }, d = () => {
    r.forEach((c) => {
      c.disconnect();
    }), r.splice(0, r.length);
  };
  i({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), s("init", a), s("destroy", d);
}
var vs = {
  on(e, t, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != "function")
      return s;
    const n = i ? "unshift" : "push";
    return e.split(" ").forEach((r) => {
      s.eventsListeners[r] || (s.eventsListeners[r] = []), s.eventsListeners[r][n](t);
    }), s;
  },
  once(e, t, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != "function")
      return s;
    function n() {
      s.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
      for (var r = arguments.length, l = new Array(r), o = 0; o < r; o++)
        l[o] = arguments[o];
      t.apply(s, l);
    }
    return n.__emitterProxy = t, s.on(e, n, i);
  },
  onAny(e, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function")
      return i;
    const s = t ? "unshift" : "push";
    return i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners)
      return t;
    const i = t.eventsAnyListeners.indexOf(e);
    return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
  },
  off(e, t) {
    const i = this;
    return !i.eventsListeners || i.destroyed || !i.eventsListeners || e.split(" ").forEach((s) => {
      typeof t > "u" ? i.eventsListeners[s] = [] : i.eventsListeners[s] && i.eventsListeners[s].forEach((n, r) => {
        (n === t || n.__emitterProxy && n.__emitterProxy === t) && i.eventsListeners[s].splice(r, 1);
      });
    }), i;
  },
  emit() {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsListeners)
      return e;
    let t, i, s;
    for (var n = arguments.length, r = new Array(n), l = 0; l < n; l++)
      r[l] = arguments[l];
    return typeof r[0] == "string" || Array.isArray(r[0]) ? (t = r[0], i = r.slice(1, r.length), s = e) : (t = r[0].events, i = r[0].data, s = r[0].context || e), i.unshift(s), (Array.isArray(t) ? t : t.split(" ")).forEach((a) => {
      e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((d) => {
        d.apply(s, [a, ...i]);
      }), e.eventsListeners && e.eventsListeners[a] && e.eventsListeners[a].forEach((d) => {
        d.apply(s, i);
      });
    }), e;
  }
};
function ws() {
  const e = this;
  let t, i;
  const s = e.el;
  typeof e.params.width < "u" && e.params.width !== null ? t = e.params.width : t = s.clientWidth, typeof e.params.height < "u" && e.params.height !== null ? i = e.params.height : i = s.clientHeight, !(t === 0 && e.isHorizontal() || i === 0 && e.isVertical()) && (t = t - parseInt(F(s, "padding-left") || 0, 10) - parseInt(F(s, "padding-right") || 0, 10), i = i - parseInt(F(s, "padding-top") || 0, 10) - parseInt(F(s, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(i) && (i = 0), Object.assign(e, {
    width: t,
    height: i,
    size: e.isHorizontal() ? t : i
  }));
}
function Ss() {
  const e = this;
  function t(S, y) {
    return parseFloat(S.getPropertyValue(e.getDirectionLabel(y)) || 0);
  }
  const i = e.params, {
    wrapperEl: s,
    slidesEl: n,
    size: r,
    rtlTranslate: l,
    wrongRTL: o
  } = e, a = e.virtual && i.virtual.enabled, d = a ? e.virtual.slides.length : e.slides.length, c = D(n, `.${e.params.slideClass}, swiper-slide`), f = a ? e.virtual.slides.length : c.length;
  let u = [];
  const p = [], m = [];
  let h = i.slidesOffsetBefore;
  typeof h == "function" && (h = i.slidesOffsetBefore.call(e));
  let w = i.slidesOffsetAfter;
  typeof w == "function" && (w = i.slidesOffsetAfter.call(e));
  const g = e.snapGrid.length, T = e.slidesGrid.length;
  let v = i.spaceBetween, b = -h, P = 0, L = 0;
  if (typeof r > "u")
    return;
  typeof v == "string" && v.indexOf("%") >= 0 ? v = parseFloat(v.replace("%", "")) / 100 * r : typeof v == "string" && (v = parseFloat(v)), e.virtualSize = -v, c.forEach((S) => {
    l ? S.style.marginLeft = "" : S.style.marginRight = "", S.style.marginBottom = "", S.style.marginTop = "";
  }), i.centeredSlides && i.cssMode && (te(s, "--swiper-centered-offset-before", ""), te(s, "--swiper-centered-offset-after", ""));
  const I = i.grid && i.grid.rows > 1 && e.grid;
  I ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
  let M;
  const O = i.slidesPerView === "auto" && i.breakpoints && Object.keys(i.breakpoints).filter((S) => typeof i.breakpoints[S].slidesPerView < "u").length > 0;
  for (let S = 0; S < f; S += 1) {
    M = 0;
    let y;
    if (c[S] && (y = c[S]), I && e.grid.updateSlide(S, y, c), !(c[S] && F(y, "display") === "none")) {
      if (i.slidesPerView === "auto") {
        O && (c[S].style[e.getDirectionLabel("width")] = "");
        const E = getComputedStyle(y), x = y.style.transform, C = y.style.webkitTransform;
        if (x && (y.style.transform = "none"), C && (y.style.webkitTransform = "none"), i.roundLengths)
          M = e.isHorizontal() ? st(y, "width", !0) : st(y, "height", !0);
        else {
          const A = t(E, "width"), V = t(E, "padding-left"), $t = t(E, "padding-right"), Ve = t(E, "margin-left"), $e = t(E, "margin-right"), Ne = E.getPropertyValue("box-sizing");
          if (Ne && Ne === "border-box")
            M = A + Ve + $e;
          else {
            const {
              clientWidth: Nt,
              offsetWidth: Bt
            } = y;
            M = A + V + $t + Ve + $e + (Bt - Nt);
          }
        }
        x && (y.style.transform = x), C && (y.style.webkitTransform = C), i.roundLengths && (M = Math.floor(M));
      } else
        M = (r - (i.slidesPerView - 1) * v) / i.slidesPerView, i.roundLengths && (M = Math.floor(M)), c[S] && (c[S].style[e.getDirectionLabel("width")] = `${M}px`);
      c[S] && (c[S].swiperSlideSize = M), m.push(M), i.centeredSlides ? (b = b + M / 2 + P / 2 + v, P === 0 && S !== 0 && (b = b - r / 2 - v), S === 0 && (b = b - r / 2 - v), Math.abs(b) < 1 / 1e3 && (b = 0), i.roundLengths && (b = Math.floor(b)), L % i.slidesPerGroup === 0 && u.push(b), p.push(b)) : (i.roundLengths && (b = Math.floor(b)), (L - Math.min(e.params.slidesPerGroupSkip, L)) % e.params.slidesPerGroup === 0 && u.push(b), p.push(b), b = b + M + v), e.virtualSize += M + v, P = M, L += 1;
    }
  }
  if (e.virtualSize = Math.max(e.virtualSize, r) + w, l && o && (i.effect === "slide" || i.effect === "coverflow") && (s.style.width = `${e.virtualSize + v}px`), i.setWrapperSize && (s.style[e.getDirectionLabel("width")] = `${e.virtualSize + v}px`), I && e.grid.updateWrapperSize(M, u), !i.centeredSlides) {
    const S = [];
    for (let y = 0; y < u.length; y += 1) {
      let E = u[y];
      i.roundLengths && (E = Math.floor(E)), u[y] <= e.virtualSize - r && S.push(E);
    }
    u = S, Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - r);
  }
  if (a && i.loop) {
    const S = m[0] + v;
    if (i.slidesPerGroup > 1) {
      const y = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup), E = S * i.slidesPerGroup;
      for (let x = 0; x < y; x += 1)
        u.push(u[u.length - 1] + E);
    }
    for (let y = 0; y < e.virtual.slidesBefore + e.virtual.slidesAfter; y += 1)
      i.slidesPerGroup === 1 && u.push(u[u.length - 1] + S), p.push(p[p.length - 1] + S), e.virtualSize += S;
  }
  if (u.length === 0 && (u = [0]), v !== 0) {
    const S = e.isHorizontal() && l ? "marginLeft" : e.getDirectionLabel("marginRight");
    c.filter((y, E) => !i.cssMode || i.loop ? !0 : E !== c.length - 1).forEach((y) => {
      y.style[S] = `${v}px`;
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let S = 0;
    m.forEach((E) => {
      S += E + (v || 0);
    }), S -= v;
    const y = S - r;
    u = u.map((E) => E <= 0 ? -h : E > y ? y + w : E);
  }
  if (i.centerInsufficientSlides) {
    let S = 0;
    if (m.forEach((y) => {
      S += y + (v || 0);
    }), S -= v, S < r) {
      const y = (r - S) / 2;
      u.forEach((E, x) => {
        u[x] = E - y;
      }), p.forEach((E, x) => {
        p[x] = E + y;
      });
    }
  }
  if (Object.assign(e, {
    slides: c,
    snapGrid: u,
    slidesGrid: p,
    slidesSizesGrid: m
  }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
    te(s, "--swiper-centered-offset-before", `${-u[0]}px`), te(s, "--swiper-centered-offset-after", `${e.size / 2 - m[m.length - 1] / 2}px`);
    const S = -e.snapGrid[0], y = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map((E) => E + S), e.slidesGrid = e.slidesGrid.map((E) => E + y);
  }
  if (f !== d && e.emit("slidesLengthChange"), u.length !== g && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), p.length !== T && e.emit("slidesGridLengthChange"), i.watchSlidesProgress && e.updateSlidesOffset(), !a && !i.cssMode && (i.effect === "slide" || i.effect === "fade")) {
    const S = `${i.containerModifierClass}backface-hidden`, y = e.el.classList.contains(S);
    f <= i.maxBackfaceHiddenSlides ? y || e.el.classList.add(S) : y && e.el.classList.remove(S);
  }
}
function bs(e) {
  const t = this, i = [], s = t.virtual && t.params.virtual.enabled;
  let n = 0, r;
  typeof e == "number" ? t.setTransition(e) : e === !0 && t.setTransition(t.params.speed);
  const l = (o) => s ? t.slides[t.getSlideIndexByData(o)] : t.slides[o];
  if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((o) => {
        i.push(o);
      });
    else
      for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
        const o = t.activeIndex + r;
        if (o > t.slides.length && !s)
          break;
        i.push(l(o));
      }
  else
    i.push(l(t.activeIndex));
  for (r = 0; r < i.length; r += 1)
    if (typeof i[r] < "u") {
      const o = i[r].offsetHeight;
      n = o > n ? o : n;
    }
  (n || n === 0) && (t.wrapperEl.style.height = `${n}px`);
}
function Ts() {
  const e = this, t = e.slides, i = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
  for (let s = 0; s < t.length; s += 1)
    t[s].swiperSlideOffset = (e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop) - i - e.cssOverflowAdjustment();
}
function ys(e) {
  e === void 0 && (e = this && this.translate || 0);
  const t = this, i = t.params, {
    slides: s,
    rtlTranslate: n,
    snapGrid: r
  } = t;
  if (s.length === 0)
    return;
  typeof s[0].swiperSlideOffset > "u" && t.updateSlidesOffset();
  let l = -e;
  n && (l = e), s.forEach((a) => {
    a.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass);
  }), t.visibleSlidesIndexes = [], t.visibleSlides = [];
  let o = i.spaceBetween;
  typeof o == "string" && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * t.size : typeof o == "string" && (o = parseFloat(o));
  for (let a = 0; a < s.length; a += 1) {
    const d = s[a];
    let c = d.swiperSlideOffset;
    i.cssMode && i.centeredSlides && (c -= s[0].swiperSlideOffset);
    const f = (l + (i.centeredSlides ? t.minTranslate() : 0) - c) / (d.swiperSlideSize + o), u = (l - r[0] + (i.centeredSlides ? t.minTranslate() : 0) - c) / (d.swiperSlideSize + o), p = -(l - c), m = p + t.slidesSizesGrid[a], h = p >= 0 && p <= t.size - t.slidesSizesGrid[a];
    (p >= 0 && p < t.size - 1 || m > 1 && m <= t.size || p <= 0 && m >= t.size) && (t.visibleSlides.push(d), t.visibleSlidesIndexes.push(a), s[a].classList.add(i.slideVisibleClass)), h && s[a].classList.add(i.slideFullyVisibleClass), d.progress = n ? -f : f, d.originalProgress = n ? -u : u;
  }
}
function xs(e) {
  const t = this;
  if (typeof e > "u") {
    const c = t.rtlTranslate ? -1 : 1;
    e = t && t.translate && t.translate * c || 0;
  }
  const i = t.params, s = t.maxTranslate() - t.minTranslate();
  let {
    progress: n,
    isBeginning: r,
    isEnd: l,
    progressLoop: o
  } = t;
  const a = r, d = l;
  if (s === 0)
    n = 0, r = !0, l = !0;
  else {
    n = (e - t.minTranslate()) / s;
    const c = Math.abs(e - t.minTranslate()) < 1, f = Math.abs(e - t.maxTranslate()) < 1;
    r = c || n <= 0, l = f || n >= 1, c && (n = 0), f && (n = 1);
  }
  if (i.loop) {
    const c = t.getSlideIndexByData(0), f = t.getSlideIndexByData(t.slides.length - 1), u = t.slidesGrid[c], p = t.slidesGrid[f], m = t.slidesGrid[t.slidesGrid.length - 1], h = Math.abs(e);
    h >= u ? o = (h - u) / m : o = (h + m - p) / m, o > 1 && (o -= 1);
  }
  Object.assign(t, {
    progress: n,
    progressLoop: o,
    isBeginning: r,
    isEnd: l
  }), (i.watchSlidesProgress || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), r && !a && t.emit("reachBeginning toEdge"), l && !d && t.emit("reachEnd toEdge"), (a && !r || d && !l) && t.emit("fromEdge"), t.emit("progress", n);
}
function Es() {
  const e = this, {
    slides: t,
    params: i,
    slidesEl: s,
    activeIndex: n
  } = e, r = e.virtual && i.virtual.enabled, l = e.grid && i.grid && i.grid.rows > 1, o = (f) => D(s, `.${i.slideClass}${f}, swiper-slide${f}`)[0];
  t.forEach((f) => {
    f.classList.remove(i.slideActiveClass, i.slideNextClass, i.slidePrevClass);
  });
  let a, d, c;
  if (r)
    if (i.loop) {
      let f = n - e.virtual.slidesBefore;
      f < 0 && (f = e.virtual.slides.length + f), f >= e.virtual.slides.length && (f -= e.virtual.slides.length), a = o(`[data-swiper-slide-index="${f}"]`);
    } else
      a = o(`[data-swiper-slide-index="${n}"]`);
  else
    l ? (a = t.filter((f) => f.column === n)[0], c = t.filter((f) => f.column === n + 1)[0], d = t.filter((f) => f.column === n - 1)[0]) : a = t[n];
  a && (a.classList.add(i.slideActiveClass), l ? (c && c.classList.add(i.slideNextClass), d && d.classList.add(i.slidePrevClass)) : (c = as(a, `.${i.slideClass}, swiper-slide`)[0], i.loop && !c && (c = t[0]), c && c.classList.add(i.slideNextClass), d = os(a, `.${i.slideClass}, swiper-slide`)[0], i.loop && !d === 0 && (d = t[t.length - 1]), d && d.classList.add(i.slidePrevClass))), e.emitSlidesClasses();
}
const se = (e, t) => {
  if (!e || e.destroyed || !e.params)
    return;
  const i = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`, s = t.closest(i());
  if (s) {
    let n = s.querySelector(`.${e.params.lazyPreloaderClass}`);
    !n && e.isElement && (s.shadowRoot ? n = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      s.shadowRoot && (n = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), n && n.remove());
    })), n && n.remove();
  }
}, ve = (e, t) => {
  if (!e.slides[t])
    return;
  const i = e.slides[t].querySelector('[loading="lazy"]');
  i && i.removeAttribute("loading");
}, Le = (e) => {
  if (!e || e.destroyed || !e.params)
    return;
  let t = e.params.lazyPreloadPrevNext;
  const i = e.slides.length;
  if (!i || !t || t < 0)
    return;
  t = Math.min(t, i);
  const s = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), n = e.activeIndex;
  if (e.params.grid && e.params.grid.rows > 1) {
    const l = n, o = [l - t];
    o.push(...Array.from({
      length: t
    }).map((a, d) => l + s + d)), e.slides.forEach((a, d) => {
      o.includes(a.column) && ve(e, d);
    });
    return;
  }
  const r = n + s - 1;
  if (e.params.rewind || e.params.loop)
    for (let l = n - t; l <= r + t; l += 1) {
      const o = (l % i + i) % i;
      (o < n || o > r) && ve(e, o);
    }
  else
    for (let l = Math.max(n - t, 0); l <= Math.min(r + t, i - 1); l += 1)
      l !== n && (l > r || l < n) && ve(e, l);
};
function Ps(e) {
  const {
    slidesGrid: t,
    params: i
  } = e, s = e.rtlTranslate ? e.translate : -e.translate;
  let n;
  for (let r = 0; r < t.length; r += 1)
    typeof t[r + 1] < "u" ? s >= t[r] && s < t[r + 1] - (t[r + 1] - t[r]) / 2 ? n = r : s >= t[r] && s < t[r + 1] && (n = r + 1) : s >= t[r] && (n = r);
  return i.normalizeSlideIndex && (n < 0 || typeof n > "u") && (n = 0), n;
}
function Ms(e) {
  const t = this, i = t.rtlTranslate ? t.translate : -t.translate, {
    snapGrid: s,
    params: n,
    activeIndex: r,
    realIndex: l,
    snapIndex: o
  } = t;
  let a = e, d;
  const c = (p) => {
    let m = p - t.virtual.slidesBefore;
    return m < 0 && (m = t.virtual.slides.length + m), m >= t.virtual.slides.length && (m -= t.virtual.slides.length), m;
  };
  if (typeof a > "u" && (a = Ps(t)), s.indexOf(i) >= 0)
    d = s.indexOf(i);
  else {
    const p = Math.min(n.slidesPerGroupSkip, a);
    d = p + Math.floor((a - p) / n.slidesPerGroup);
  }
  if (d >= s.length && (d = s.length - 1), a === r && !t.params.loop) {
    d !== o && (t.snapIndex = d, t.emit("snapIndexChange"));
    return;
  }
  if (a === r && t.params.loop && t.virtual && t.params.virtual.enabled) {
    t.realIndex = c(a);
    return;
  }
  const f = t.grid && n.grid && n.grid.rows > 1;
  let u;
  if (t.virtual && n.virtual.enabled && n.loop)
    u = c(a);
  else if (f) {
    const p = t.slides.filter((h) => h.column === a)[0];
    let m = parseInt(p.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(m) && (m = Math.max(t.slides.indexOf(p), 0)), u = Math.floor(m / n.grid.rows);
  } else if (t.slides[a]) {
    const p = t.slides[a].getAttribute("data-swiper-slide-index");
    p ? u = parseInt(p, 10) : u = a;
  } else
    u = a;
  Object.assign(t, {
    previousSnapIndex: o,
    snapIndex: d,
    previousRealIndex: l,
    realIndex: u,
    previousIndex: r,
    activeIndex: a
  }), t.initialized && Le(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && (l !== u && t.emit("realIndexChange"), t.emit("slideChange"));
}
function Cs(e, t) {
  const i = this, s = i.params;
  let n = e.closest(`.${s.slideClass}, swiper-slide`);
  !n && i.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((o) => {
    !n && o.matches && o.matches(`.${s.slideClass}, swiper-slide`) && (n = o);
  });
  let r = !1, l;
  if (n) {
    for (let o = 0; o < i.slides.length; o += 1)
      if (i.slides[o] === n) {
        r = !0, l = o;
        break;
      }
  }
  if (n && r)
    i.clickedSlide = n, i.virtual && i.params.virtual.enabled ? i.clickedIndex = parseInt(n.getAttribute("data-swiper-slide-index"), 10) : i.clickedIndex = l;
  else {
    i.clickedSlide = void 0, i.clickedIndex = void 0;
    return;
  }
  s.slideToClickedSlide && i.clickedIndex !== void 0 && i.clickedIndex !== i.activeIndex && i.slideToClickedSlide();
}
var Is = {
  updateSize: ws,
  updateSlides: Ss,
  updateAutoHeight: bs,
  updateSlidesOffset: Ts,
  updateSlidesProgress: ys,
  updateProgress: xs,
  updateSlidesClasses: Es,
  updateActiveIndex: Ms,
  updateClickedSlide: Cs
};
function Os(e) {
  e === void 0 && (e = this.isHorizontal() ? "x" : "y");
  const t = this, {
    params: i,
    rtlTranslate: s,
    translate: n,
    wrapperEl: r
  } = t;
  if (i.virtualTranslate)
    return s ? -n : n;
  if (i.cssMode)
    return n;
  let l = rs(r, e);
  return l += t.cssOverflowAdjustment(), s && (l = -l), l || 0;
}
function Ls(e, t) {
  const i = this, {
    rtlTranslate: s,
    params: n,
    wrapperEl: r,
    progress: l
  } = i;
  let o = 0, a = 0;
  const d = 0;
  i.isHorizontal() ? o = s ? -e : e : a = e, n.roundLengths && (o = Math.floor(o), a = Math.floor(a)), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? o : a, n.cssMode ? r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -o : -a : n.virtualTranslate || (i.isHorizontal() ? o -= i.cssOverflowAdjustment() : a -= i.cssOverflowAdjustment(), r.style.transform = `translate3d(${o}px, ${a}px, ${d}px)`);
  let c;
  const f = i.maxTranslate() - i.minTranslate();
  f === 0 ? c = 0 : c = (e - i.minTranslate()) / f, c !== l && i.updateProgress(e), i.emit("setTranslate", i.translate, t);
}
function As() {
  return -this.snapGrid[0];
}
function ks() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function zs(e, t, i, s, n) {
  e === void 0 && (e = 0), t === void 0 && (t = this.params.speed), i === void 0 && (i = !0), s === void 0 && (s = !0);
  const r = this, {
    params: l,
    wrapperEl: o
  } = r;
  if (r.animating && l.preventInteractionOnTransition)
    return !1;
  const a = r.minTranslate(), d = r.maxTranslate();
  let c;
  if (s && e > a ? c = a : s && e < d ? c = d : c = e, r.updateProgress(c), l.cssMode) {
    const f = r.isHorizontal();
    if (t === 0)
      o[f ? "scrollLeft" : "scrollTop"] = -c;
    else {
      if (!r.support.smoothScroll)
        return _t({
          swiper: r,
          targetPosition: -c,
          side: f ? "left" : "top"
        }), !0;
      o.scrollTo({
        [f ? "left" : "top"]: -c,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return t === 0 ? (r.setTransition(0), r.setTranslate(c), i && (r.emit("beforeTransitionStart", t, n), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), i && (r.emit("beforeTransitionStart", t, n), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(u) {
    !r || r.destroyed || u.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, i && r.emit("transitionEnd"));
  }), r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))), !0;
}
var _s = {
  getTranslate: Os,
  setTranslate: Ls,
  minTranslate: As,
  maxTranslate: ks,
  translateTo: zs
};
function Gs(e, t) {
  const i = this;
  i.params.cssMode || (i.wrapperEl.style.transitionDuration = `${e}ms`, i.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : ""), i.emit("setTransition", e, t);
}
function Dt(e) {
  let {
    swiper: t,
    runCallbacks: i,
    direction: s,
    step: n
  } = e;
  const {
    activeIndex: r,
    previousIndex: l
  } = t;
  let o = s;
  if (o || (r > l ? o = "next" : r < l ? o = "prev" : o = "reset"), t.emit(`transition${n}`), i && r !== l) {
    if (o === "reset") {
      t.emit(`slideResetTransition${n}`);
      return;
    }
    t.emit(`slideChangeTransition${n}`), o === "next" ? t.emit(`slideNextTransition${n}`) : t.emit(`slidePrevTransition${n}`);
  }
}
function Ds(e, t) {
  e === void 0 && (e = !0);
  const i = this, {
    params: s
  } = i;
  s.cssMode || (s.autoHeight && i.updateAutoHeight(), Dt({
    swiper: i,
    runCallbacks: e,
    direction: t,
    step: "Start"
  }));
}
function Vs(e, t) {
  e === void 0 && (e = !0);
  const i = this, {
    params: s
  } = i;
  i.animating = !1, !s.cssMode && (i.setTransition(0), Dt({
    swiper: i,
    runCallbacks: e,
    direction: t,
    step: "End"
  }));
}
var $s = {
  setTransition: Gs,
  transitionStart: Ds,
  transitionEnd: Vs
};
function Ns(e, t, i, s, n) {
  e === void 0 && (e = 0), t === void 0 && (t = this.params.speed), i === void 0 && (i = !0), typeof e == "string" && (e = parseInt(e, 10));
  const r = this;
  let l = e;
  l < 0 && (l = 0);
  const {
    params: o,
    snapGrid: a,
    slidesGrid: d,
    previousIndex: c,
    activeIndex: f,
    rtlTranslate: u,
    wrapperEl: p,
    enabled: m
  } = r;
  if (r.animating && o.preventInteractionOnTransition || !m && !s && !n)
    return !1;
  const h = Math.min(r.params.slidesPerGroupSkip, l);
  let w = h + Math.floor((l - h) / r.params.slidesPerGroup);
  w >= a.length && (w = a.length - 1);
  const g = -a[w];
  if (o.normalizeSlideIndex)
    for (let v = 0; v < d.length; v += 1) {
      const b = -Math.floor(g * 100), P = Math.floor(d[v] * 100), L = Math.floor(d[v + 1] * 100);
      typeof d[v + 1] < "u" ? b >= P && b < L - (L - P) / 2 ? l = v : b >= P && b < L && (l = v + 1) : b >= P && (l = v);
    }
  if (r.initialized && l !== f && (!r.allowSlideNext && (u ? g > r.translate && g > r.minTranslate() : g < r.translate && g < r.minTranslate()) || !r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (f || 0) !== l))
    return !1;
  l !== (c || 0) && i && r.emit("beforeSlideChangeStart"), r.updateProgress(g);
  let T;
  if (l > f ? T = "next" : l < f ? T = "prev" : T = "reset", u && -g === r.translate || !u && g === r.translate)
    return r.updateActiveIndex(l), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), o.effect !== "slide" && r.setTranslate(g), T !== "reset" && (r.transitionStart(i, T), r.transitionEnd(i, T)), !1;
  if (o.cssMode) {
    const v = r.isHorizontal(), b = u ? g : -g;
    if (t === 0) {
      const P = r.virtual && r.params.virtual.enabled;
      P && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), P && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0 ? (r._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        p[v ? "scrollLeft" : "scrollTop"] = b;
      })) : p[v ? "scrollLeft" : "scrollTop"] = b, P && requestAnimationFrame(() => {
        r.wrapperEl.style.scrollSnapType = "", r._immediateVirtual = !1;
      });
    } else {
      if (!r.support.smoothScroll)
        return _t({
          swiper: r,
          targetPosition: b,
          side: v ? "left" : "top"
        }), !0;
      p.scrollTo({
        [v ? "left" : "top"]: b,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return r.setTransition(t), r.setTranslate(g), r.updateActiveIndex(l), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, T), t === 0 ? r.transitionEnd(i, T) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(b) {
    !r || r.destroyed || b.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, T));
  }), r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)), !0;
}
function Bs(e, t, i, s) {
  e === void 0 && (e = 0), t === void 0 && (t = this.params.speed), i === void 0 && (i = !0), typeof e == "string" && (e = parseInt(e, 10));
  const n = this, r = n.grid && n.params.grid && n.params.grid.rows > 1;
  let l = e;
  if (n.params.loop)
    if (n.virtual && n.params.virtual.enabled)
      l = l + n.virtual.slidesBefore;
    else {
      let o;
      if (r) {
        const u = l * n.params.grid.rows;
        o = n.slides.filter((p) => p.getAttribute("data-swiper-slide-index") * 1 === u)[0].column;
      } else
        o = n.getSlideIndexByData(l);
      const a = r ? Math.ceil(n.slides.length / n.params.grid.rows) : n.slides.length, {
        centeredSlides: d
      } = n.params;
      let c = n.params.slidesPerView;
      c === "auto" ? c = n.slidesPerViewDynamic() : (c = Math.ceil(parseFloat(n.params.slidesPerView, 10)), d && c % 2 === 0 && (c = c + 1));
      let f = a - o < c;
      if (d && (f = f || o < Math.ceil(c / 2)), f) {
        const u = d ? o < n.activeIndex ? "prev" : "next" : o - n.activeIndex - 1 < n.params.slidesPerView ? "next" : "prev";
        n.loopFix({
          direction: u,
          slideTo: !0,
          activeSlideIndex: u === "next" ? o + 1 : o - a + 1,
          slideRealIndex: u === "next" ? n.realIndex : void 0
        });
      }
      if (r) {
        const u = l * n.params.grid.rows;
        l = n.slides.filter((p) => p.getAttribute("data-swiper-slide-index") * 1 === u)[0].column;
      } else
        l = n.getSlideIndexByData(l);
    }
  return requestAnimationFrame(() => {
    n.slideTo(l, t, i, s);
  }), n;
}
function Fs(e, t, i) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0);
  const s = this, {
    enabled: n,
    params: r,
    animating: l
  } = s;
  if (!n)
    return s;
  let o = r.slidesPerGroup;
  r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (o = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const a = s.activeIndex < r.slidesPerGroupSkip ? 1 : o, d = s.virtual && r.virtual.enabled;
  if (r.loop) {
    if (l && !d && r.loopPreventsSliding)
      return !1;
    if (s.loopFix({
      direction: "next"
    }), s._clientLeft = s.wrapperEl.clientLeft, s.activeIndex === s.slides.length - 1 && r.cssMode)
      return requestAnimationFrame(() => {
        s.slideTo(s.activeIndex + a, e, t, i);
      }), !0;
  }
  return r.rewind && s.isEnd ? s.slideTo(0, e, t, i) : s.slideTo(s.activeIndex + a, e, t, i);
}
function Rs(e, t, i) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0);
  const s = this, {
    params: n,
    snapGrid: r,
    slidesGrid: l,
    rtlTranslate: o,
    enabled: a,
    animating: d
  } = s;
  if (!a)
    return s;
  const c = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (d && !c && n.loopPreventsSliding)
      return !1;
    s.loopFix({
      direction: "prev"
    }), s._clientLeft = s.wrapperEl.clientLeft;
  }
  const f = o ? s.translate : -s.translate;
  function u(g) {
    return g < 0 ? -Math.floor(Math.abs(g)) : Math.floor(g);
  }
  const p = u(f), m = r.map((g) => u(g));
  let h = r[m.indexOf(p) - 1];
  if (typeof h > "u" && n.cssMode) {
    let g;
    r.forEach((T, v) => {
      p >= T && (g = v);
    }), typeof g < "u" && (h = r[g > 0 ? g - 1 : g]);
  }
  let w = 0;
  if (typeof h < "u" && (w = l.indexOf(h), w < 0 && (w = s.activeIndex - 1), n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (w = w - s.slidesPerViewDynamic("previous", !0) + 1, w = Math.max(w, 0))), n.rewind && s.isBeginning) {
    const g = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
    return s.slideTo(g, e, t, i);
  } else if (n.loop && s.activeIndex === 0 && n.cssMode)
    return requestAnimationFrame(() => {
      s.slideTo(w, e, t, i);
    }), !0;
  return s.slideTo(w, e, t, i);
}
function Hs(e, t, i) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0);
  const s = this;
  return s.slideTo(s.activeIndex, e, t, i);
}
function js(e, t, i, s) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0), s === void 0 && (s = 0.5);
  const n = this;
  let r = n.activeIndex;
  const l = Math.min(n.params.slidesPerGroupSkip, r), o = l + Math.floor((r - l) / n.params.slidesPerGroup), a = n.rtlTranslate ? n.translate : -n.translate;
  if (a >= n.snapGrid[o]) {
    const d = n.snapGrid[o], c = n.snapGrid[o + 1];
    a - d > (c - d) * s && (r += n.params.slidesPerGroup);
  } else {
    const d = n.snapGrid[o - 1], c = n.snapGrid[o];
    a - d <= (c - d) * s && (r -= n.params.slidesPerGroup);
  }
  return r = Math.max(r, 0), r = Math.min(r, n.slidesGrid.length - 1), n.slideTo(r, e, t, i);
}
function Ws() {
  const e = this, {
    params: t,
    slidesEl: i
  } = e, s = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView;
  let n = e.clickedIndex, r;
  const l = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
  if (t.loop) {
    if (e.animating)
      return;
    r = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? n < e.loopedSlides - s / 2 || n > e.slides.length - e.loopedSlides + s / 2 ? (e.loopFix(), n = e.getSlideIndex(D(i, `${l}[data-swiper-slide-index="${r}"]`)[0]), Oe(() => {
      e.slideTo(n);
    })) : e.slideTo(n) : n > e.slides.length - s ? (e.loopFix(), n = e.getSlideIndex(D(i, `${l}[data-swiper-slide-index="${r}"]`)[0]), Oe(() => {
      e.slideTo(n);
    })) : e.slideTo(n);
  } else
    e.slideTo(n);
}
var qs = {
  slideTo: Ns,
  slideToLoop: Bs,
  slideNext: Fs,
  slidePrev: Rs,
  slideReset: Hs,
  slideToClosest: js,
  slideToClickedSlide: Ws
};
function Ys(e) {
  const t = this, {
    params: i,
    slidesEl: s
  } = t;
  if (!i.loop || t.virtual && t.params.virtual.enabled)
    return;
  const n = () => {
    D(s, `.${i.slideClass}, swiper-slide`).forEach((f, u) => {
      f.setAttribute("data-swiper-slide-index", u);
    });
  }, r = t.grid && i.grid && i.grid.rows > 1, l = i.slidesPerGroup * (r ? i.grid.rows : 1), o = t.slides.length % l !== 0, a = r && t.slides.length % i.grid.rows !== 0, d = (c) => {
    for (let f = 0; f < c; f += 1) {
      const u = t.isElement ? oe("swiper-slide", [i.slideBlankClass]) : oe("div", [i.slideClass, i.slideBlankClass]);
      t.slidesEl.append(u);
    }
  };
  if (o) {
    if (i.loopAddBlankSlides) {
      const c = l - t.slides.length % l;
      d(c), t.recalcSlides(), t.updateSlides();
    } else
      le("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n();
  } else if (a) {
    if (i.loopAddBlankSlides) {
      const c = i.grid.rows - t.slides.length % i.grid.rows;
      d(c), t.recalcSlides(), t.updateSlides();
    } else
      le("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n();
  } else
    n();
  t.loopFix({
    slideRealIndex: e,
    direction: i.centeredSlides ? void 0 : "next"
  });
}
function Xs(e) {
  let {
    slideRealIndex: t,
    slideTo: i = !0,
    direction: s,
    setTranslate: n,
    activeSlideIndex: r,
    byController: l,
    byMousewheel: o
  } = e === void 0 ? {} : e;
  const a = this;
  if (!a.params.loop)
    return;
  a.emit("beforeLoopFix");
  const {
    slides: d,
    allowSlidePrev: c,
    allowSlideNext: f,
    slidesEl: u,
    params: p
  } = a, {
    centeredSlides: m
  } = p;
  if (a.allowSlidePrev = !0, a.allowSlideNext = !0, a.virtual && p.virtual.enabled) {
    i && (!p.centeredSlides && a.snapIndex === 0 ? a.slideTo(a.virtual.slides.length, 0, !1, !0) : p.centeredSlides && a.snapIndex < p.slidesPerView ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0) : a.snapIndex === a.snapGrid.length - 1 && a.slideTo(a.virtual.slidesBefore, 0, !1, !0)), a.allowSlidePrev = c, a.allowSlideNext = f, a.emit("loopFix");
    return;
  }
  let h = p.slidesPerView;
  h === "auto" ? h = a.slidesPerViewDynamic() : (h = Math.ceil(parseFloat(p.slidesPerView, 10)), m && h % 2 === 0 && (h = h + 1));
  const w = p.slidesPerGroupAuto ? h : p.slidesPerGroup;
  let g = w;
  g % w !== 0 && (g += w - g % w), g += p.loopAdditionalSlides, a.loopedSlides = g;
  const T = a.grid && p.grid && p.grid.rows > 1;
  d.length < h + g ? le("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : T && p.grid.fill === "row" && le("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const v = [], b = [];
  let P = a.activeIndex;
  typeof r > "u" ? r = a.getSlideIndex(d.filter((x) => x.classList.contains(p.slideActiveClass))[0]) : P = r;
  const L = s === "next" || !s, I = s === "prev" || !s;
  let M = 0, O = 0;
  const S = T ? Math.ceil(d.length / p.grid.rows) : d.length, E = (T ? d[r].column : r) + (m && typeof n > "u" ? -h / 2 + 0.5 : 0);
  if (E < g) {
    M = Math.max(g - E, w);
    for (let x = 0; x < g - E; x += 1) {
      const C = x - Math.floor(x / S) * S;
      if (T) {
        const A = S - C - 1;
        for (let V = d.length - 1; V >= 0; V -= 1)
          d[V].column === A && v.push(V);
      } else
        v.push(S - C - 1);
    }
  } else if (E + h > S - g) {
    O = Math.max(E - (S - g * 2), w);
    for (let x = 0; x < O; x += 1) {
      const C = x - Math.floor(x / S) * S;
      T ? d.forEach((A, V) => {
        A.column === C && b.push(V);
      }) : b.push(C);
    }
  }
  if (a.__preventObserver__ = !0, requestAnimationFrame(() => {
    a.__preventObserver__ = !1;
  }), I && v.forEach((x) => {
    d[x].swiperLoopMoveDOM = !0, u.prepend(d[x]), d[x].swiperLoopMoveDOM = !1;
  }), L && b.forEach((x) => {
    d[x].swiperLoopMoveDOM = !0, u.append(d[x]), d[x].swiperLoopMoveDOM = !1;
  }), a.recalcSlides(), p.slidesPerView === "auto" ? a.updateSlides() : T && (v.length > 0 && I || b.length > 0 && L) && a.slides.forEach((x, C) => {
    a.grid.updateSlide(C, x, a.slides);
  }), p.watchSlidesProgress && a.updateSlidesOffset(), i) {
    if (v.length > 0 && I) {
      if (typeof t > "u") {
        const x = a.slidesGrid[P], A = a.slidesGrid[P + M] - x;
        o ? a.setTranslate(a.translate - A) : (a.slideTo(P + M, 0, !1, !0), n && (a.touchEventsData.startTranslate = a.touchEventsData.startTranslate - A, a.touchEventsData.currentTranslate = a.touchEventsData.currentTranslate - A));
      } else if (n) {
        const x = T ? v.length / p.grid.rows : v.length;
        a.slideTo(a.activeIndex + x, 0, !1, !0), a.touchEventsData.currentTranslate = a.translate;
      }
    } else if (b.length > 0 && L)
      if (typeof t > "u") {
        const x = a.slidesGrid[P], A = a.slidesGrid[P - O] - x;
        o ? a.setTranslate(a.translate - A) : (a.slideTo(P - O, 0, !1, !0), n && (a.touchEventsData.startTranslate = a.touchEventsData.startTranslate - A, a.touchEventsData.currentTranslate = a.touchEventsData.currentTranslate - A));
      } else {
        const x = T ? b.length / p.grid.rows : b.length;
        a.slideTo(a.activeIndex - x, 0, !1, !0);
      }
  }
  if (a.allowSlidePrev = c, a.allowSlideNext = f, a.controller && a.controller.control && !l) {
    const x = {
      slideRealIndex: t,
      direction: s,
      setTranslate: n,
      activeSlideIndex: r,
      byController: !0
    };
    Array.isArray(a.controller.control) ? a.controller.control.forEach((C) => {
      !C.destroyed && C.params.loop && C.loopFix({
        ...x,
        slideTo: C.params.slidesPerView === p.slidesPerView ? i : !1
      });
    }) : a.controller.control instanceof a.constructor && a.controller.control.params.loop && a.controller.control.loopFix({
      ...x,
      slideTo: a.controller.control.params.slidesPerView === p.slidesPerView ? i : !1
    });
  }
  a.emit("loopFix");
}
function Ks() {
  const e = this, {
    params: t,
    slidesEl: i
  } = e;
  if (!t.loop || e.virtual && e.params.virtual.enabled)
    return;
  e.recalcSlides();
  const s = [];
  e.slides.forEach((n) => {
    const r = typeof n.swiperSlideIndex > "u" ? n.getAttribute("data-swiper-slide-index") * 1 : n.swiperSlideIndex;
    s[r] = n;
  }), e.slides.forEach((n) => {
    n.removeAttribute("data-swiper-slide-index");
  }), s.forEach((n) => {
    i.append(n);
  }), e.recalcSlides(), e.slideTo(e.realIndex, 0);
}
var Us = {
  loopCreate: Ys,
  loopFix: Xs,
  loopDestroy: Ks
};
function Js(e) {
  const t = this;
  if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
    return;
  const i = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
  t.isElement && (t.__preventObserver__ = !0), i.style.cursor = "move", i.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame(() => {
    t.__preventObserver__ = !1;
  });
}
function Zs() {
  const e = this;
  e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1;
  }));
}
var Qs = {
  setGrabCursor: Js,
  unsetGrabCursor: Zs
};
function en(e, t) {
  t === void 0 && (t = this);
  function i(s) {
    if (!s || s === U() || s === _())
      return null;
    s.assignedSlot && (s = s.assignedSlot);
    const n = s.closest(e);
    return !n && !s.getRootNode ? null : n || i(s.getRootNode().host);
  }
  return i(t);
}
function nt(e, t, i) {
  const s = _(), {
    params: n
  } = e, r = n.edgeSwipeDetection, l = n.edgeSwipeThreshold;
  return r && (i <= l || i >= s.innerWidth - l) ? r === "prevent" ? (t.preventDefault(), !0) : !1 : !0;
}
function tn(e) {
  const t = this, i = U();
  let s = e;
  s.originalEvent && (s = s.originalEvent);
  const n = t.touchEventsData;
  if (s.type === "pointerdown") {
    if (n.pointerId !== null && n.pointerId !== s.pointerId)
      return;
    n.pointerId = s.pointerId;
  } else
    s.type === "touchstart" && s.targetTouches.length === 1 && (n.touchId = s.targetTouches[0].identifier);
  if (s.type === "touchstart") {
    nt(t, s, s.targetTouches[0].pageX);
    return;
  }
  const {
    params: r,
    touches: l,
    enabled: o
  } = t;
  if (!o || !r.simulateTouch && s.pointerType === "mouse" || t.animating && r.preventInteractionOnTransition)
    return;
  !t.animating && r.cssMode && r.loop && t.loopFix();
  let a = s.target;
  if (r.touchEventsTarget === "wrapper" && !t.wrapperEl.contains(a) || "which" in s && s.which === 3 || "button" in s && s.button > 0 || n.isTouched && n.isMoved)
    return;
  const d = !!r.noSwipingClass && r.noSwipingClass !== "", c = s.composedPath ? s.composedPath() : s.path;
  d && s.target && s.target.shadowRoot && c && (a = c[0]);
  const f = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`, u = !!(s.target && s.target.shadowRoot);
  if (r.noSwiping && (u ? en(f, a) : a.closest(f))) {
    t.allowClick = !0;
    return;
  }
  if (r.swipeHandler && !a.closest(r.swipeHandler))
    return;
  l.currentX = s.pageX, l.currentY = s.pageY;
  const p = l.currentX, m = l.currentY;
  if (!nt(t, s, p))
    return;
  Object.assign(n, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), l.startX = p, l.startY = m, n.touchStartTime = re(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, r.threshold > 0 && (n.allowThresholdMove = !1);
  let h = !0;
  a.matches(n.focusableElements) && (h = !1, a.nodeName === "SELECT" && (n.isTouched = !1)), i.activeElement && i.activeElement.matches(n.focusableElements) && i.activeElement !== a && i.activeElement.blur();
  const w = h && t.allowTouchMove && r.touchStartPreventDefault;
  (r.touchStartForcePreventDefault || w) && !a.isContentEditable && s.preventDefault(), r.freeMode && r.freeMode.enabled && t.freeMode && t.animating && !r.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", s);
}
function sn(e) {
  const t = U(), i = this, s = i.touchEventsData, {
    params: n,
    touches: r,
    rtlTranslate: l,
    enabled: o
  } = i;
  if (!o || !n.simulateTouch && e.pointerType === "mouse")
    return;
  let a = e;
  if (a.originalEvent && (a = a.originalEvent), a.type === "pointermove" && (s.touchId !== null || a.pointerId !== s.pointerId))
    return;
  let d;
  if (a.type === "touchmove") {
    if (d = [...a.changedTouches].filter((L) => L.identifier === s.touchId)[0], !d || d.identifier !== s.touchId)
      return;
  } else
    d = a;
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && i.emit("touchMoveOpposite", a);
    return;
  }
  const c = d.pageX, f = d.pageY;
  if (a.preventedByNestedSwiper) {
    r.startX = c, r.startY = f;
    return;
  }
  if (!i.allowTouchMove) {
    a.target.matches(s.focusableElements) || (i.allowClick = !1), s.isTouched && (Object.assign(r, {
      startX: c,
      startY: f,
      currentX: c,
      currentY: f
    }), s.touchStartTime = re());
    return;
  }
  if (n.touchReleaseOnEdges && !n.loop) {
    if (i.isVertical()) {
      if (f < r.startY && i.translate <= i.maxTranslate() || f > r.startY && i.translate >= i.minTranslate()) {
        s.isTouched = !1, s.isMoved = !1;
        return;
      }
    } else if (c < r.startX && i.translate <= i.maxTranslate() || c > r.startX && i.translate >= i.minTranslate())
      return;
  }
  if (t.activeElement && a.target === t.activeElement && a.target.matches(s.focusableElements)) {
    s.isMoved = !0, i.allowClick = !1;
    return;
  }
  s.allowTouchCallbacks && i.emit("touchMove", a), r.previousX = r.currentX, r.previousY = r.currentY, r.currentX = c, r.currentY = f;
  const u = r.currentX - r.startX, p = r.currentY - r.startY;
  if (i.params.threshold && Math.sqrt(u ** 2 + p ** 2) < i.params.threshold)
    return;
  if (typeof s.isScrolling > "u") {
    let L;
    i.isHorizontal() && r.currentY === r.startY || i.isVertical() && r.currentX === r.startX ? s.isScrolling = !1 : u * u + p * p >= 25 && (L = Math.atan2(Math.abs(p), Math.abs(u)) * 180 / Math.PI, s.isScrolling = i.isHorizontal() ? L > n.touchAngle : 90 - L > n.touchAngle);
  }
  if (s.isScrolling && i.emit("touchMoveOpposite", a), typeof s.startMoving > "u" && (r.currentX !== r.startX || r.currentY !== r.startY) && (s.startMoving = !0), s.isScrolling) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving)
    return;
  i.allowClick = !1, !n.cssMode && a.cancelable && a.preventDefault(), n.touchMoveStopPropagation && !n.nested && a.stopPropagation();
  let m = i.isHorizontal() ? u : p, h = i.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
  n.oneWayMovement && (m = Math.abs(m) * (l ? 1 : -1), h = Math.abs(h) * (l ? 1 : -1)), r.diff = m, m *= n.touchRatio, l && (m = -m, h = -h);
  const w = i.touchesDirection;
  i.swipeDirection = m > 0 ? "prev" : "next", i.touchesDirection = h > 0 ? "prev" : "next";
  const g = i.params.loop && !n.cssMode, T = i.touchesDirection === "next" && i.allowSlideNext || i.touchesDirection === "prev" && i.allowSlidePrev;
  if (!s.isMoved) {
    if (g && T && i.loopFix({
      direction: i.swipeDirection
    }), s.startTranslate = i.getTranslate(), i.setTransition(0), i.animating) {
      const L = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0
      });
      i.wrapperEl.dispatchEvent(L);
    }
    s.allowMomentumBounce = !1, n.grabCursor && (i.allowSlideNext === !0 || i.allowSlidePrev === !0) && i.setGrabCursor(!0), i.emit("sliderFirstMove", a);
  }
  let v;
  if ((/* @__PURE__ */ new Date()).getTime(), s.isMoved && s.allowThresholdMove && w !== i.touchesDirection && g && T && Math.abs(m) >= 1) {
    Object.assign(r, {
      startX: c,
      startY: f,
      currentX: c,
      currentY: f,
      startTranslate: s.currentTranslate
    }), s.loopSwapReset = !0, s.startTranslate = s.currentTranslate;
    return;
  }
  i.emit("sliderMove", a), s.isMoved = !0, s.currentTranslate = m + s.startTranslate;
  let b = !0, P = n.resistanceRatio;
  if (n.touchReleaseOnEdges && (P = 0), m > 0 ? (g && T && !v && s.allowThresholdMove && s.currentTranslate > (n.centeredSlides ? i.minTranslate() - i.slidesSizesGrid[i.activeIndex + 1] : i.minTranslate()) && i.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), s.currentTranslate > i.minTranslate() && (b = !1, n.resistance && (s.currentTranslate = i.minTranslate() - 1 + (-i.minTranslate() + s.startTranslate + m) ** P))) : m < 0 && (g && T && !v && s.allowThresholdMove && s.currentTranslate < (n.centeredSlides ? i.maxTranslate() + i.slidesSizesGrid[i.slidesSizesGrid.length - 1] : i.maxTranslate()) && i.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: i.slides.length - (n.slidesPerView === "auto" ? i.slidesPerViewDynamic() : Math.ceil(parseFloat(n.slidesPerView, 10)))
  }), s.currentTranslate < i.maxTranslate() && (b = !1, n.resistance && (s.currentTranslate = i.maxTranslate() + 1 - (i.maxTranslate() - s.startTranslate - m) ** P))), b && (a.preventedByNestedSwiper = !0), !i.allowSlideNext && i.swipeDirection === "next" && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !i.allowSlidePrev && i.swipeDirection === "prev" && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), !i.allowSlidePrev && !i.allowSlideNext && (s.currentTranslate = s.startTranslate), n.threshold > 0)
    if (Math.abs(m) > n.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        s.allowThresholdMove = !0, r.startX = r.currentX, r.startY = r.currentY, s.currentTranslate = s.startTranslate, r.diff = i.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY;
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !n.followFinger || n.cssMode || ((n.freeMode && n.freeMode.enabled && i.freeMode || n.watchSlidesProgress) && (i.updateActiveIndex(), i.updateSlidesClasses()), n.freeMode && n.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(), i.updateProgress(s.currentTranslate), i.setTranslate(s.currentTranslate));
}
function nn(e) {
  const t = this, i = t.touchEventsData;
  let s = e;
  s.originalEvent && (s = s.originalEvent);
  let n;
  if (s.type === "touchend" || s.type === "touchcancel") {
    if (n = [...s.changedTouches].filter((b) => b.identifier === i.touchId)[0], !n || n.identifier !== i.touchId)
      return;
  } else {
    if (i.touchId !== null || s.pointerId !== i.pointerId)
      return;
    n = s;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(s.type) && !(["pointercancel", "contextmenu"].includes(s.type) && (t.browser.isSafari || t.browser.isWebView)))
    return;
  i.pointerId = null, i.touchId = null;
  const {
    params: l,
    touches: o,
    rtlTranslate: a,
    slidesGrid: d,
    enabled: c
  } = t;
  if (!c || !l.simulateTouch && s.pointerType === "mouse")
    return;
  if (i.allowTouchCallbacks && t.emit("touchEnd", s), i.allowTouchCallbacks = !1, !i.isTouched) {
    i.isMoved && l.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, i.startMoving = !1;
    return;
  }
  l.grabCursor && i.isMoved && i.isTouched && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!1);
  const f = re(), u = f - i.touchStartTime;
  if (t.allowClick) {
    const b = s.path || s.composedPath && s.composedPath();
    t.updateClickedSlide(b && b[0] || s.target, b), t.emit("tap click", s), u < 300 && f - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", s);
  }
  if (i.lastClickTime = re(), Oe(() => {
    t.destroyed || (t.allowClick = !0);
  }), !i.isTouched || !i.isMoved || !t.swipeDirection || o.diff === 0 && !i.loopSwapReset || i.currentTranslate === i.startTranslate && !i.loopSwapReset) {
    i.isTouched = !1, i.isMoved = !1, i.startMoving = !1;
    return;
  }
  i.isTouched = !1, i.isMoved = !1, i.startMoving = !1;
  let p;
  if (l.followFinger ? p = a ? t.translate : -t.translate : p = -i.currentTranslate, l.cssMode)
    return;
  if (l.freeMode && l.freeMode.enabled) {
    t.freeMode.onTouchEnd({
      currentPos: p
    });
    return;
  }
  let m = 0, h = t.slidesSizesGrid[0];
  for (let b = 0; b < d.length; b += b < l.slidesPerGroupSkip ? 1 : l.slidesPerGroup) {
    const P = b < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
    typeof d[b + P] < "u" ? p >= d[b] && p < d[b + P] && (m = b, h = d[b + P] - d[b]) : p >= d[b] && (m = b, h = d[d.length - 1] - d[d.length - 2]);
  }
  let w = null, g = null;
  l.rewind && (t.isBeginning ? g = l.virtual && l.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (w = 0));
  const T = (p - d[m]) / h, v = m < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
  if (u > l.longSwipesMs) {
    if (!l.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.swipeDirection === "next" && (T >= l.longSwipesRatio ? t.slideTo(l.rewind && t.isEnd ? w : m + v) : t.slideTo(m)), t.swipeDirection === "prev" && (T > 1 - l.longSwipesRatio ? t.slideTo(m + v) : g !== null && T < 0 && Math.abs(T) > l.longSwipesRatio ? t.slideTo(g) : t.slideTo(m));
  } else {
    if (!l.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.navigation && (s.target === t.navigation.nextEl || s.target === t.navigation.prevEl) ? s.target === t.navigation.nextEl ? t.slideTo(m + v) : t.slideTo(m) : (t.swipeDirection === "next" && t.slideTo(w !== null ? w : m + v), t.swipeDirection === "prev" && t.slideTo(g !== null ? g : m));
  }
}
function rt() {
  const e = this, {
    params: t,
    el: i
  } = e;
  if (i && i.offsetWidth === 0)
    return;
  t.breakpoints && e.setBreakpoint();
  const {
    allowSlideNext: s,
    allowSlidePrev: n,
    snapGrid: r
  } = e, l = e.virtual && e.params.virtual.enabled;
  e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
  const o = l && t.loop;
  (t.slidesPerView === "auto" || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !o ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.params.loop && !l ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout(() => {
    e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
  }, 500)), e.allowSlidePrev = n, e.allowSlideNext = s, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
}
function rn(e) {
  const t = this;
  t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function ln() {
  const e = this, {
    wrapperEl: t,
    rtlTranslate: i,
    enabled: s
  } = e;
  if (!s)
    return;
  e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
  let n;
  const r = e.maxTranslate() - e.minTranslate();
  r === 0 ? n = 0 : n = (e.translate - e.minTranslate()) / r, n !== e.progress && e.updateProgress(i ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
function on(e) {
  const t = this;
  se(t, e.target), !(t.params.cssMode || t.params.slidesPerView !== "auto" && !t.params.autoHeight) && t.update();
}
function an() {
  const e = this;
  e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
const Vt = (e, t) => {
  const i = U(), {
    params: s,
    el: n,
    wrapperEl: r,
    device: l
  } = e, o = !!s.nested, a = t === "on" ? "addEventListener" : "removeEventListener", d = t;
  i[a]("touchstart", e.onDocumentTouchStart, {
    passive: !1,
    capture: o
  }), n[a]("touchstart", e.onTouchStart, {
    passive: !1
  }), n[a]("pointerdown", e.onTouchStart, {
    passive: !1
  }), i[a]("touchmove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), i[a]("pointermove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), i[a]("touchend", e.onTouchEnd, {
    passive: !0
  }), i[a]("pointerup", e.onTouchEnd, {
    passive: !0
  }), i[a]("pointercancel", e.onTouchEnd, {
    passive: !0
  }), i[a]("touchcancel", e.onTouchEnd, {
    passive: !0
  }), i[a]("pointerout", e.onTouchEnd, {
    passive: !0
  }), i[a]("pointerleave", e.onTouchEnd, {
    passive: !0
  }), i[a]("contextmenu", e.onTouchEnd, {
    passive: !0
  }), (s.preventClicks || s.preventClicksPropagation) && n[a]("click", e.onClick, !0), s.cssMode && r[a]("scroll", e.onScroll), s.updateOnWindowResize ? e[d](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", rt, !0) : e[d]("observerUpdate", rt, !0), n[a]("load", e.onLoad, {
    capture: !0
  });
};
function dn() {
  const e = this, {
    params: t
  } = e;
  e.onTouchStart = tn.bind(e), e.onTouchMove = sn.bind(e), e.onTouchEnd = nn.bind(e), e.onDocumentTouchStart = an.bind(e), t.cssMode && (e.onScroll = ln.bind(e)), e.onClick = rn.bind(e), e.onLoad = on.bind(e), Vt(e, "on");
}
function cn() {
  Vt(this, "off");
}
var fn = {
  attachEvents: dn,
  detachEvents: cn
};
const lt = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function un() {
  const e = this, {
    realIndex: t,
    initialized: i,
    params: s,
    el: n
  } = e, r = s.breakpoints;
  if (!r || r && Object.keys(r).length === 0)
    return;
  const l = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
  if (!l || e.currentBreakpoint === l)
    return;
  const a = (l in r ? r[l] : void 0) || e.originalParams, d = lt(e, s), c = lt(e, a), f = s.enabled;
  d && !c ? (n.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`), e.emitContainerClasses()) : !d && c && (n.classList.add(`${s.containerModifierClass}grid`), (a.grid.fill && a.grid.fill === "column" || !a.grid.fill && s.grid.fill === "column") && n.classList.add(`${s.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((g) => {
    if (typeof a[g] > "u")
      return;
    const T = s[g] && s[g].enabled, v = a[g] && a[g].enabled;
    T && !v && e[g].disable(), !T && v && e[g].enable();
  });
  const u = a.direction && a.direction !== s.direction, p = s.loop && (a.slidesPerView !== s.slidesPerView || u), m = s.loop;
  u && i && e.changeDirection(), z(e.params, a);
  const h = e.params.enabled, w = e.params.loop;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }), f && !h ? e.disable() : !f && h && e.enable(), e.currentBreakpoint = l, e.emit("_beforeBreakpoint", a), i && (p ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides()) : !m && w ? (e.loopCreate(t), e.updateSlides()) : m && !w && e.loopDestroy()), e.emit("breakpoint", a);
}
function pn(e, t, i) {
  if (t === void 0 && (t = "window"), !e || t === "container" && !i)
    return;
  let s = !1;
  const n = _(), r = t === "window" ? n.innerHeight : i.clientHeight, l = Object.keys(e).map((o) => {
    if (typeof o == "string" && o.indexOf("@") === 0) {
      const a = parseFloat(o.substr(1));
      return {
        value: r * a,
        point: o
      };
    }
    return {
      value: o,
      point: o
    };
  });
  l.sort((o, a) => parseInt(o.value, 10) - parseInt(a.value, 10));
  for (let o = 0; o < l.length; o += 1) {
    const {
      point: a,
      value: d
    } = l[o];
    t === "window" ? n.matchMedia(`(min-width: ${d}px)`).matches && (s = a) : d <= i.clientWidth && (s = a);
  }
  return s || "max";
}
var hn = {
  setBreakpoint: un,
  getBreakpoint: pn
};
function mn(e, t) {
  const i = [];
  return e.forEach((s) => {
    typeof s == "object" ? Object.keys(s).forEach((n) => {
      s[n] && i.push(t + n);
    }) : typeof s == "string" && i.push(t + s);
  }), i;
}
function gn() {
  const e = this, {
    classNames: t,
    params: i,
    rtl: s,
    el: n,
    device: r
  } = e, l = mn(["initialized", i.direction, {
    "free-mode": e.params.freeMode && i.freeMode.enabled
  }, {
    autoheight: i.autoHeight
  }, {
    rtl: s
  }, {
    grid: i.grid && i.grid.rows > 1
  }, {
    "grid-column": i.grid && i.grid.rows > 1 && i.grid.fill === "column"
  }, {
    android: r.android
  }, {
    ios: r.ios
  }, {
    "css-mode": i.cssMode
  }, {
    centered: i.cssMode && i.centeredSlides
  }, {
    "watch-progress": i.watchSlidesProgress
  }], i.containerModifierClass);
  t.push(...l), n.classList.add(...t), e.emitContainerClasses();
}
function vn() {
  const e = this, {
    el: t,
    classNames: i
  } = e;
  t.classList.remove(...i), e.emitContainerClasses();
}
var wn = {
  addClasses: gn,
  removeClasses: vn
};
function Sn() {
  const e = this, {
    isLocked: t,
    params: i
  } = e, {
    slidesOffsetBefore: s
  } = i;
  if (s) {
    const n = e.slides.length - 1, r = e.slidesGrid[n] + e.slidesSizesGrid[n] + s * 2;
    e.isLocked = e.size > r;
  } else
    e.isLocked = e.snapGrid.length === 1;
  i.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), i.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var bn = {
  checkOverflow: Sn
}, ot = {
  init: !0,
  direction: "horizontal",
  oneWayMovement: !1,
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  eventsPrefix: "swiper",
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: !1,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: !1,
  // Set wrapper width
  setWrapperSize: !1,
  // Virtual Translate
  virtualTranslate: !1,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: !0,
  // Round length
  roundLengths: !1,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 5,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  // Unique Navigation Elements
  uniqueNavElements: !0,
  // Resistance
  resistance: !0,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: !1,
  // Cursor
  grabCursor: !1,
  // Clicks
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  // loop
  loop: !1,
  loopAddBlankSlides: !0,
  loopAdditionalSlides: 0,
  loopPreventsSliding: !0,
  // rewind
  rewind: !1,
  // Swiping/no swiping
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: !0,
  // Internals
  _emitClasses: !1
};
function Tn(e, t) {
  return function(s) {
    s === void 0 && (s = {});
    const n = Object.keys(s)[0], r = s[n];
    if (typeof r != "object" || r === null) {
      z(t, s);
      return;
    }
    if (e[n] === !0 && (e[n] = {
      enabled: !0
    }), n === "navigation" && e[n] && e[n].enabled && !e[n].prevEl && !e[n].nextEl && (e[n].auto = !0), ["pagination", "scrollbar"].indexOf(n) >= 0 && e[n] && e[n].enabled && !e[n].el && (e[n].auto = !0), !(n in e && "enabled" in r)) {
      z(t, s);
      return;
    }
    typeof e[n] == "object" && !("enabled" in e[n]) && (e[n].enabled = !0), e[n] || (e[n] = {
      enabled: !1
    }), z(t, s);
  };
}
const we = {
  eventsEmitter: vs,
  update: Is,
  translate: _s,
  transition: $s,
  slide: qs,
  loop: Us,
  grabCursor: Qs,
  events: fn,
  breakpoints: hn,
  checkOverflow: bn,
  classes: wn
}, Se = {};
class G {
  constructor() {
    let t, i;
    for (var s = arguments.length, n = new Array(s), r = 0; r < s; r++)
      n[r] = arguments[r];
    n.length === 1 && n[0].constructor && Object.prototype.toString.call(n[0]).slice(8, -1) === "Object" ? i = n[0] : [t, i] = n, i || (i = {}), i = z({}, i), t && !i.el && (i.el = t);
    const l = U();
    if (i.el && typeof i.el == "string" && l.querySelectorAll(i.el).length > 1) {
      const c = [];
      return l.querySelectorAll(i.el).forEach((f) => {
        const u = z({}, i, {
          el: f
        });
        c.push(new G(u));
      }), c;
    }
    const o = this;
    o.__swiper__ = !0, o.support = Gt(), o.device = us({
      userAgent: i.userAgent
    }), o.browser = hs(), o.eventsListeners = {}, o.eventsAnyListeners = [], o.modules = [...o.__modules__], i.modules && Array.isArray(i.modules) && o.modules.push(...i.modules);
    const a = {};
    o.modules.forEach((c) => {
      c({
        params: i,
        swiper: o,
        extendParams: Tn(i, a),
        on: o.on.bind(o),
        once: o.once.bind(o),
        off: o.off.bind(o),
        emit: o.emit.bind(o)
      });
    });
    const d = z({}, ot, a);
    return o.params = z({}, d, Se, i), o.originalParams = z({}, o.params), o.passedParams = z({}, i), o.params && o.params.on && Object.keys(o.params.on).forEach((c) => {
      o.on(c, o.params.on[c]);
    }), o.params && o.params.onAny && o.onAny(o.params.onAny), Object.assign(o, {
      enabled: o.params.enabled,
      el: t,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return o.params.direction === "horizontal";
      },
      isVertical() {
        return o.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: !0,
      isEnd: !1,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: o.params.allowSlideNext,
      allowSlidePrev: o.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: o.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: !0,
      // Touches
      allowTouchMove: o.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    }), o.emit("_swiper"), o.params.init && o.init(), o;
  }
  getDirectionLabel(t) {
    return this.isHorizontal() ? t : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[t];
  }
  getSlideIndex(t) {
    const {
      slidesEl: i,
      params: s
    } = this, n = D(i, `.${s.slideClass}, swiper-slide`), r = it(n[0]);
    return it(t) - r;
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(this.slides.filter((i) => i.getAttribute("data-swiper-slide-index") * 1 === t)[0]);
  }
  recalcSlides() {
    const t = this, {
      slidesEl: i,
      params: s
    } = t;
    t.slides = D(i, `.${s.slideClass}, swiper-slide`);
  }
  enable() {
    const t = this;
    t.enabled || (t.enabled = !0, t.params.grabCursor && t.setGrabCursor(), t.emit("enable"));
  }
  disable() {
    const t = this;
    t.enabled && (t.enabled = !1, t.params.grabCursor && t.unsetGrabCursor(), t.emit("disable"));
  }
  setProgress(t, i) {
    const s = this;
    t = Math.min(Math.max(t, 0), 1);
    const n = s.minTranslate(), l = (s.maxTranslate() - n) * t + n;
    s.translateTo(l, typeof i > "u" ? 0 : i), s.updateActiveIndex(), s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el)
      return;
    const i = t.el.className.split(" ").filter((s) => s.indexOf("swiper") === 0 || s.indexOf(t.params.containerModifierClass) === 0);
    t.emit("_containerClasses", i.join(" "));
  }
  getSlideClasses(t) {
    const i = this;
    return i.destroyed ? "" : t.className.split(" ").filter((s) => s.indexOf("swiper-slide") === 0 || s.indexOf(i.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el)
      return;
    const i = [];
    t.slides.forEach((s) => {
      const n = t.getSlideClasses(s);
      i.push({
        slideEl: s,
        classNames: n
      }), t.emit("_slideClass", s, n);
    }), t.emit("_slideClasses", i);
  }
  slidesPerViewDynamic(t, i) {
    t === void 0 && (t = "current"), i === void 0 && (i = !1);
    const s = this, {
      params: n,
      slides: r,
      slidesGrid: l,
      slidesSizesGrid: o,
      size: a,
      activeIndex: d
    } = s;
    let c = 1;
    if (typeof n.slidesPerView == "number")
      return n.slidesPerView;
    if (n.centeredSlides) {
      let f = r[d] ? r[d].swiperSlideSize : 0, u;
      for (let p = d + 1; p < r.length; p += 1)
        r[p] && !u && (f += r[p].swiperSlideSize, c += 1, f > a && (u = !0));
      for (let p = d - 1; p >= 0; p -= 1)
        r[p] && !u && (f += r[p].swiperSlideSize, c += 1, f > a && (u = !0));
    } else if (t === "current")
      for (let f = d + 1; f < r.length; f += 1)
        (i ? l[f] + o[f] - l[d] < a : l[f] - l[d] < a) && (c += 1);
    else
      for (let f = d - 1; f >= 0; f -= 1)
        l[d] - l[f] < a && (c += 1);
    return c;
  }
  update() {
    const t = this;
    if (!t || t.destroyed)
      return;
    const {
      snapGrid: i,
      params: s
    } = t;
    s.breakpoints && t.setBreakpoint(), [...t.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
      l.complete && se(t, l);
    }), t.updateSize(), t.updateSlides(), t.updateProgress(), t.updateSlidesClasses();
    function n() {
      const l = t.rtlTranslate ? t.translate * -1 : t.translate, o = Math.min(Math.max(l, t.maxTranslate()), t.minTranslate());
      t.setTranslate(o), t.updateActiveIndex(), t.updateSlidesClasses();
    }
    let r;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      n(), s.autoHeight && t.updateAutoHeight();
    else {
      if ((s.slidesPerView === "auto" || s.slidesPerView > 1) && t.isEnd && !s.centeredSlides) {
        const l = t.virtual && s.virtual.enabled ? t.virtual.slides : t.slides;
        r = t.slideTo(l.length - 1, 0, !1, !0);
      } else
        r = t.slideTo(t.activeIndex, 0, !1, !0);
      r || n();
    }
    s.watchOverflow && i !== t.snapGrid && t.checkOverflow(), t.emit("update");
  }
  changeDirection(t, i) {
    i === void 0 && (i = !0);
    const s = this, n = s.params.direction;
    return t || (t = n === "horizontal" ? "vertical" : "horizontal"), t === n || t !== "horizontal" && t !== "vertical" || (s.el.classList.remove(`${s.params.containerModifierClass}${n}`), s.el.classList.add(`${s.params.containerModifierClass}${t}`), s.emitContainerClasses(), s.params.direction = t, s.slides.forEach((r) => {
      t === "vertical" ? r.style.width = "" : r.style.height = "";
    }), s.emit("changeDirection"), i && s.update()), s;
  }
  changeLanguageDirection(t) {
    const i = this;
    i.rtl && t === "rtl" || !i.rtl && t === "ltr" || (i.rtl = t === "rtl", i.rtlTranslate = i.params.direction === "horizontal" && i.rtl, i.rtl ? (i.el.classList.add(`${i.params.containerModifierClass}rtl`), i.el.dir = "rtl") : (i.el.classList.remove(`${i.params.containerModifierClass}rtl`), i.el.dir = "ltr"), i.update());
  }
  mount(t) {
    const i = this;
    if (i.mounted)
      return !0;
    let s = t || i.params.el;
    if (typeof s == "string" && (s = document.querySelector(s)), !s)
      return !1;
    s.swiper = i, s.parentNode && s.parentNode.host && s.parentNode.host.nodeName === "SWIPER-CONTAINER" && (i.isElement = !0);
    const n = () => `.${(i.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let l = (() => s && s.shadowRoot && s.shadowRoot.querySelector ? s.shadowRoot.querySelector(n()) : D(s, n())[0])();
    return !l && i.params.createElements && (l = oe("div", i.params.wrapperClass), s.append(l), D(s, `.${i.params.slideClass}`).forEach((o) => {
      l.append(o);
    })), Object.assign(i, {
      el: s,
      wrapperEl: l,
      slidesEl: i.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : l,
      hostEl: i.isElement ? s.parentNode.host : s,
      mounted: !0,
      // RTL
      rtl: s.dir.toLowerCase() === "rtl" || F(s, "direction") === "rtl",
      rtlTranslate: i.params.direction === "horizontal" && (s.dir.toLowerCase() === "rtl" || F(s, "direction") === "rtl"),
      wrongRTL: F(l, "display") === "-webkit-box"
    }), !0;
  }
  init(t) {
    const i = this;
    if (i.initialized || i.mount(t) === !1)
      return i;
    i.emit("beforeInit"), i.params.breakpoints && i.setBreakpoint(), i.addClasses(), i.updateSize(), i.updateSlides(), i.params.watchOverflow && i.checkOverflow(), i.params.grabCursor && i.enabled && i.setGrabCursor(), i.params.loop && i.virtual && i.params.virtual.enabled ? i.slideTo(i.params.initialSlide + i.virtual.slidesBefore, 0, i.params.runCallbacksOnInit, !1, !0) : i.slideTo(i.params.initialSlide, 0, i.params.runCallbacksOnInit, !1, !0), i.params.loop && i.loopCreate(), i.attachEvents();
    const n = [...i.el.querySelectorAll('[loading="lazy"]')];
    return i.isElement && n.push(...i.hostEl.querySelectorAll('[loading="lazy"]')), n.forEach((r) => {
      r.complete ? se(i, r) : r.addEventListener("load", (l) => {
        se(i, l.target);
      });
    }), Le(i), i.initialized = !0, Le(i), i.emit("init"), i.emit("afterInit"), i;
  }
  destroy(t, i) {
    t === void 0 && (t = !0), i === void 0 && (i = !0);
    const s = this, {
      params: n,
      el: r,
      wrapperEl: l,
      slides: o
    } = s;
    return typeof s.params > "u" || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), n.loop && s.loopDestroy(), i && (s.removeClasses(), r.removeAttribute("style"), l.removeAttribute("style"), o && o.length && o.forEach((a) => {
      a.classList.remove(n.slideVisibleClass, n.slideFullyVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass), a.removeAttribute("style"), a.removeAttribute("data-swiper-slide-index");
    })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((a) => {
      s.off(a);
    }), t !== !1 && (s.el.swiper = null, ss(s)), s.destroyed = !0), null;
  }
  static extendDefaults(t) {
    z(Se, t);
  }
  static get extendedDefaults() {
    return Se;
  }
  static get defaults() {
    return ot;
  }
  static installModule(t) {
    G.prototype.__modules__ || (G.prototype.__modules__ = []);
    const i = G.prototype.__modules__;
    typeof t == "function" && i.indexOf(t) < 0 && i.push(t);
  }
  static use(t) {
    return Array.isArray(t) ? (t.forEach((i) => G.installModule(i)), G) : (G.installModule(t), G);
  }
}
Object.keys(we).forEach((e) => {
  Object.keys(we[e]).forEach((t) => {
    G.prototype[t] = we[e][t];
  });
});
G.use([ms, gs]);
function yn(e, t, i, s) {
  return e.params.createElements && Object.keys(s).forEach((n) => {
    if (!i[n] && i.auto === !0) {
      let r = D(e.el, `.${s[n]}`)[0];
      r || (r = oe("div", s[n]), r.className = s[n], e.el.append(r)), i[n] = r, t[n] = r;
    }
  }), i;
}
function xn(e) {
  let {
    swiper: t,
    extendParams: i,
    on: s,
    emit: n
  } = e;
  i({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  }), t.navigation = {
    nextEl: null,
    prevEl: null
  };
  const r = (h) => (Array.isArray(h) ? h : [h]).filter((w) => !!w);
  function l(h) {
    let w;
    return h && typeof h == "string" && t.isElement && (w = t.el.querySelector(h), w) ? w : (h && (typeof h == "string" && (w = [...document.querySelectorAll(h)]), t.params.uniqueNavElements && typeof h == "string" && w.length > 1 && t.el.querySelectorAll(h).length === 1 && (w = t.el.querySelector(h))), h && !w ? h : w);
  }
  function o(h, w) {
    const g = t.params.navigation;
    h = r(h), h.forEach((T) => {
      T && (T.classList[w ? "add" : "remove"](...g.disabledClass.split(" ")), T.tagName === "BUTTON" && (T.disabled = w), t.params.watchOverflow && t.enabled && T.classList[t.isLocked ? "add" : "remove"](g.lockClass));
    });
  }
  function a() {
    const {
      nextEl: h,
      prevEl: w
    } = t.navigation;
    if (t.params.loop) {
      o(w, !1), o(h, !1);
      return;
    }
    o(w, t.isBeginning && !t.params.rewind), o(h, t.isEnd && !t.params.rewind);
  }
  function d(h) {
    h.preventDefault(), !(t.isBeginning && !t.params.loop && !t.params.rewind) && (t.slidePrev(), n("navigationPrev"));
  }
  function c(h) {
    h.preventDefault(), !(t.isEnd && !t.params.loop && !t.params.rewind) && (t.slideNext(), n("navigationNext"));
  }
  function f() {
    const h = t.params.navigation;
    if (t.params.navigation = yn(t, t.originalParams.navigation, t.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }), !(h.nextEl || h.prevEl))
      return;
    let w = l(h.nextEl), g = l(h.prevEl);
    Object.assign(t.navigation, {
      nextEl: w,
      prevEl: g
    }), w = r(w), g = r(g);
    const T = (v, b) => {
      v && v.addEventListener("click", b === "next" ? c : d), !t.enabled && v && v.classList.add(...h.lockClass.split(" "));
    };
    w.forEach((v) => T(v, "next")), g.forEach((v) => T(v, "prev"));
  }
  function u() {
    let {
      nextEl: h,
      prevEl: w
    } = t.navigation;
    h = r(h), w = r(w);
    const g = (T, v) => {
      T.removeEventListener("click", v === "next" ? c : d), T.classList.remove(...t.params.navigation.disabledClass.split(" "));
    };
    h.forEach((T) => g(T, "next")), w.forEach((T) => g(T, "prev"));
  }
  s("init", () => {
    t.params.navigation.enabled === !1 ? m() : (f(), a());
  }), s("toEdge fromEdge lock unlock", () => {
    a();
  }), s("destroy", () => {
    u();
  }), s("enable disable", () => {
    let {
      nextEl: h,
      prevEl: w
    } = t.navigation;
    if (h = r(h), w = r(w), t.enabled) {
      a();
      return;
    }
    [...h, ...w].filter((g) => !!g).forEach((g) => g.classList.add(t.params.navigation.lockClass));
  }), s("click", (h, w) => {
    let {
      nextEl: g,
      prevEl: T
    } = t.navigation;
    g = r(g), T = r(T);
    const v = w.target;
    if (t.params.navigation.hideOnClick && !T.includes(v) && !g.includes(v)) {
      if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === v || t.pagination.el.contains(v)))
        return;
      let b;
      g.length ? b = g[0].classList.contains(t.params.navigation.hiddenClass) : T.length && (b = T[0].classList.contains(t.params.navigation.hiddenClass)), n(b === !0 ? "navigationShow" : "navigationHide"), [...g, ...T].filter((P) => !!P).forEach((P) => P.classList.toggle(t.params.navigation.hiddenClass));
    }
  });
  const p = () => {
    t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")), f(), a();
  }, m = () => {
    t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")), u();
  };
  Object.assign(t.navigation, {
    enable: p,
    disable: m,
    update: a,
    init: f,
    destroy: u
  });
}
function En(e) {
  return {
    slider: null,
    sliderContainer: null,
    sliderLength: 0,
    sliderIndex: 0,
    initSlider(t, i = !1, s = !1) {
      const n = t.querySelector(".swiper"), r = t.querySelector(".swiper-button-prev"), l = t.querySelector(".swiper-button-next"), o = {
        modules: [xn],
        navigation: {
          nextEl: l,
          prevEl: r
        },
        spaceBetween: 24,
        slidesPerView: "auto",
        breakpoints: {
          1024: {
            slidesPerView: e.slidesPerPage ? e.slidesPerPage : 4,
            spaceBetween: 32
          }
        }
      };
      this.slider = new G(n, o), i && window.innerWidth >= 1024 && this.positionArrows(t), s && window.innerWidth > 640 && setTimeout(() => {
        this.setHeight(t);
      }, 1e3), window.addEventListener("resize", () => {
        i && window.innerWidth >= 1024 && this.positionArrows(t), s && window.innerWidth > 640 ? this.setHeight(t) : this.resetHeight(t);
      });
    },
    positionArrows(t) {
      const i = t.querySelectorAll(".swiper-button");
      let n = t.querySelector(".img-container").offsetHeight;
      i.forEach((r) => {
        r.style.top = `${n / 2}px`;
      });
    },
    setHeight(t) {
      const i = t.querySelectorAll(".slide-title");
      let s = 0;
      i.forEach((n) => {
        n.style.height = "auto", n.offsetHeight > s && (s = n.offsetHeight);
      }), i.forEach((n) => {
        n.style.height = `${s}px`;
      });
    },
    resetHeight(t) {
      t.querySelectorAll(".slide-title").forEach((s) => {
        s.style.height = "auto";
      });
    }
  };
}
kt({
  $delimiters: ["[[", "]]"],
  Menu: Qi,
  VersionSelection: es,
  Slider: En
}).mount();
