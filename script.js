/* ===== Datos de la página: edita aquí ===== */
var DATOS = {
  nombre: "Mi vida, Jemy Banely 💗",           // nombre completo: Jemy Banely González Mendoza
  apodo: "cariño",
  desde: "2025-10-10T15:00:00",           // 10 de octubre de 2025, 3:00 pm
  firma: "Juan",
  cancion: { titulo: "Dime", artista: "Kevin Kaarl", src: "dime.mp3" },
  historia: [
    { fecha: "Octubre 2025", titulo: "El día que empezó todo", texto: "Todavía recuerdo lo nervioso que estaba y lo fácil que fue hablar contigo." },
    { fecha: "Octubre 2025", titulo: "Nuestra primera salida", texto: "Quería que el rato no se acabara. Desde ahí supe que quería más días como ese, ademas de poder ir a la iglesia con usted siendo mi novia." },
    { fecha: "Diciembre 2025", titulo: "Nuestra primera Navidad", texto: "Un día sencillo apesar de no estra juntos,que se volvió de mis favoritos." },
    { fecha: "Febrero 2026", titulo: "Nuestro primer 14 de febrero", texto: "Sin planes enormes, solo tú y yo." },
    { fecha: "Hoy", titulo: "Un año", texto: "Y todavía me emociona verte llegar." }
  ],
  razones: [
    "Porque contigo hasta lo cotidiano se siente especial.",
    "Porque me haces reír cuando menos lo espero.",
    "Porque me escuchas aunque me ponga intenso.",
    "Porque tu risa arregla cualquier día pesado.",
    "Porque contigo puedo ser yo sin esforzarme.",
    "Porque me motivas a ser mejor sin pedírmelo.",
    "Porque cuidas de mí en los detalles pequeños.",
    "Porque cualquier plan contigo es buen plan."
  ],
  fotos: [   // fotos que van en la carpeta fotos/
    { src: "foto1.jpg", pie: "Nuestro beso" },
    { src: "foto2.jpg", pie: "Abrazados, juntos" },
    { src: "foto3.jpg", pie: "Tu mirada" },
    { src: "foto4.jpg", pie: "Mi favorita" }
  ],
  carta: [
    "Aunque no pueda estar junto a ti en este día especial, quiero que sepas que estoy contigo en cada recuerdo y en cada canción.",
    "Hace un año no sabía lo mucho que iba a cambiar todo. Llegaste y le diste otro color a mis días.",
    "Gracias por tu paciencia, por tus abrazos y por quedarte incluso en los días difíciles. Aprendí contigo que querer a alguien también es cuidar lo pequeño.",
    "Quiero seguir celebrando contigo muchos aniversarios más. Gracias por este primer año."
  ]
};

/* ===== Código ===== */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  var $ = function (id) { return document.getElementById(id); };
  var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function icono(id) {
    var s = document.createElementNS(NS, "svg");
    s.setAttribute("aria-hidden", "true");
    var u = document.createElementNS(NS, "use");
    u.setAttribute("href", "#" + id);
    u.setAttribute("width", "100%");
    u.setAttribute("height", "100%");
    s.appendChild(u);
    return s;
  }

  $("para").textContent = "Para ti " + DATOS.nombre;

  /* ---- Contador ---- */
  var inicio = new Date(DATOS.desde);
  var cont = $("counter");
  var etiquetas = ["Años", "Meses", "Días", "Horas", "Min", "Seg"];
  var celdas = etiquetas.map(function (t) {
    var d = el("div"); var b = el("b", null, "0"); var s = el("span", null, t);
    d.appendChild(b); d.appendChild(s); cont.appendChild(d);
    return b;
  });
  function diferencia(a, b) {
    var y = b.getFullYear() - a.getFullYear();
    var m = b.getMonth() - a.getMonth();
    var d = b.getDate() - a.getDate();
    var h = b.getHours() - a.getHours();
    var mi = b.getMinutes() - a.getMinutes();
    var s = b.getSeconds() - a.getSeconds();
    if (s < 0) { s += 60; mi--; }
    if (mi < 0) { mi += 60; h--; }
    if (h < 0) { h += 24; d--; }
    if (d < 0) { d += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); m--; }
    if (m < 0) { m += 12; y--; }
    return [y, m, d, h, mi, s];
  }
  function tick() {
    var ahora = new Date();
    var futuro = inicio > ahora;
    var v = futuro ? diferencia(ahora, inicio) : diferencia(inicio, ahora);
    v.forEach(function (n, i) { celdas[i].textContent = String(n); });
  }
  tick();
  setInterval(tick, 1000);

  /* ---- Decoración: enredaderas con flores y corazones ---- */
  function enredadera(cont) {
    var s = document.createElementNS(NS, "svg");
    s.setAttribute("class", "tallo");
    s.setAttribute("viewBox", "0 0 100 100");
    s.setAttribute("preserveAspectRatio", "none");
    var p = document.createElementNS(NS, "path");
    p.setAttribute("d", "M50 0 C 25 18, 75 30, 50 50 S 25 82, 50 100");
    s.appendChild(p);
    cont.appendChild(s);

    [[44, 24, -40], [56, 44, 35], [42, 64, -35], [56, 84, 40], [48, 8, 30], [52, 36, -20], [46, 74, 25]].forEach(function (h) {
      var l = el("span", "hoja");
      l.style.setProperty("--x", h[0]); l.style.setProperty("--y", h[1]); l.style.setProperty("--r", h[2] + "deg");
      cont.appendChild(l);
    });
    [[62, 14, 56, "a"], [34, 32, 44, "b"], [64, 52, 62, "c"], [36, 70, 48, "a"], [60, 90, 54, "b"]].forEach(function (f, i) {
      var w = el("span", "it c-" + f[3]);
      w.style.setProperty("--x", f[0]); w.style.setProperty("--y", f[1]); w.style.setProperty("--s", f[2]);
      var ic = icono("flor"); ic.style.animationDelay = (-i * 1.1) + "s";
      w.appendChild(ic); cont.appendChild(w);
    });
    [[28, 22, 18], [74, 42, 16], [26, 60, 20], [74, 80, 16], [70, 6, 14]].forEach(function (c, i) {
      var w = el("span", "it heart");
      w.style.setProperty("--x", c[0]); w.style.setProperty("--y", c[1]); w.style.setProperty("--s", c[2]);
      var ic = icono("corazon"); ic.style.animationDelay = (-i * 0.9) + "s";
      w.appendChild(ic); cont.appendChild(w);
    });
  }
  enredadera($("vine-izq"));
  enredadera($("vine-der"));

  /* Corazones y pétalos que suben despacio por detrás */
  var fl = $("floaters");
  for (var i = 0; i < 18; i++) {
    var esPetalo = i % 4 === 3;
    var t = 12 + Math.random() * 18;
    var w = el("span", "fl" + (esPetalo ? " p" : ""));
    var tam = esPetalo ? 14 + Math.random() * 12 : 12 + Math.random() * 20;
    w.style.width = tam + "px"; w.style.height = tam + "px";
    w.style.left = (4 + Math.random() * 92) + "%";
    w.style.animationDuration = t + "s";
    w.style.animationDelay = (-Math.random() * t) + "s";
    var ic = icono(esPetalo ? "flor" : "corazon");
    ic.style.animationDuration = (3 + Math.random() * 3) + "s";
    w.appendChild(ic);
    fl.appendChild(w);
  }

  /* ---- Música: una sola canción ---- */
  var Reproductor = (function () {
    var barra = $("ahora"), btn = $("ahora-btn"), suena = false;
    /* La canción se descarga desde que abre la página, así empieza al instante al abrir el sobre */
    var audio = new Audio();
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.7;
    audio.addEventListener("error", function () { fallo(); });
    audio.src = DATOS.cancion.src;
    audio.load();
    $("ahora-n").textContent = DATOS.cancion.titulo + " · " + DATOS.cancion.artista;

    function pintar() {
      barra.classList.toggle("pausada", !suena);
      $("ahora-l").textContent = suena ? " " : "En pausa";
      btn.setAttribute("aria-label", suena ? "Pausar música" : "Reproducir música");
      btn.querySelector("use").setAttribute("href", suena ? "#pausa" : "#play");
    }
    function fallo() { suena = false; pintar(); $("ahora-l").textContent = "No se pudo reproducir"; }
    function reproducir() {
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(fallo);
      suena = true; pintar();
    }
    btn.addEventListener("click", function () {
      if (suena) { audio.pause(); suena = false; pintar(); } else { reproducir(); }
    });
    return { iniciar: function () { barra.hidden = false; reproducir(); return true; } };
  })();

  /* ---- La carta ---- */
  var carta = $("carta");
  function construirCarta() {
    carta.appendChild(el("p", "hi", "Hola, " + DATOS.apodo + ":"));
    DATOS.carta.forEach(function (p) { carta.appendChild(el("p", null, p)); });

    carta.appendChild(el("h3", null, "Nuestras fotos"));
    var strip = el("div", "strip");
    DATOS.fotos.forEach(function (f, i) {
      var fig = el("figure", "frame");
      var ph = el("div", "ph");
      if (f.src) { ph.className = "ph foto"; var img = el("img"); img.src = f.src; img.alt = f.pie; ph.appendChild(img); }
      else { ph.textContent = "Tu foto " + (i + 1); }
      fig.appendChild(ph);
      fig.appendChild(el("figcaption", null, f.pie));
      strip.appendChild(fig);
    });
    carta.appendChild(strip);

    carta.appendChild(el("h3", null, "Nuestra historia"));
    var tl = el("ol", "timeline");
    DATOS.historia.forEach(function (h) {
      var li = el("li");
      li.appendChild(el("time", null, h.fecha));
      li.appendChild(el("h4", null, h.titulo));
      li.appendChild(el("p", null, h.texto));
      tl.appendChild(li);
    });
    carta.appendChild(tl);

    carta.appendChild(el("h3", null, "Por qué te quiero"));
    var r = el("div", "reason");
    var rn = el("span", "n"); var rt = el("blockquote"); rt.setAttribute("aria-live", "polite");
    var otra = el("button", "btn", "Otra razón"); otra.type = "button";
    r.appendChild(rn); r.appendChild(rt); r.appendChild(otra);
    carta.appendChild(r);

    var total = DATOS.razones.length, cola = [], mostradas = 0;
    function nuevaCola() {
      cola = DATOS.razones.map(function (_, i) { return i; });
      for (var i = cola.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = cola[i]; cola[i] = cola[j]; cola[j] = t;
      }
    }
    function otraRazon() {
      if (!cola.length) { nuevaCola(); mostradas = 0; }
      var idx = cola.pop(); mostradas++;
      rt.textContent = DATOS.razones[idx];
      rn.textContent = "Razón " + mostradas + " de " + total;
    }
    otra.addEventListener("click", otraRazon);
    nuevaCola(); otraRazon();

    carta.appendChild(el("p", "sign", DATOS.firma));
    carta.appendChild(el("p", "ps", "Con todo mi cariño."));
  }
  construirCarta();

  function estallido(cx, cy) {
    if (reducir) return;
    for (var i = 0; i < 24; i++) {
      var b = el("span", "burst");
      var ang = (Math.PI * 2 * i) / 24 + Math.random() * 0.3;
      var dist = 90 + Math.random() * 170;
      b.style.left = cx + "px"; b.style.top = cy + "px";
      b.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      b.style.setProperty("--dy", (Math.sin(ang) * dist - 40) + "px");
      b.style.setProperty("--sc", String(0.8 + Math.random() * 1.2));
      b.style.setProperty("--rot", (Math.random() * 60 - 30) + "deg");
      if (i % 3 === 0) b.style.color = "var(--petal-b)";
      b.appendChild(icono(i % 4 === 3 ? "flor" : "corazon"));
      document.body.appendChild(b);
      (function (n) { setTimeout(function () { n.remove(); }, 1900); })(b);
    }
  }

  var sobre = $("sobre");
  sobre.addEventListener("click", function abrir() {
    sobre.removeEventListener("click", abrir);
    sobre.classList.add("open");
    sobre.setAttribute("aria-expanded", "true");
    var r = sobre.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var suena = Reproductor.iniciar();
    var espera1 = reducir ? 0 : 1000, espera2 = reducir ? 0 : 450;
    setTimeout(function () {
      $("envwrap").classList.add("gone");
      setTimeout(function () {
        $("envwrap").hidden = true;
        carta.hidden = false;
        carta.classList.add("unfold");
        carta.focus({ preventScroll: true });
        carta.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "start" });
        estallido(cx, cy);
      }, espera2);
    }, espera1);
  });

  $("pie").textContent = "Hecho para ti, con cariño.";
})();
