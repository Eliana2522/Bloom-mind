const API = '/api';

/* ══════════════════════════════════════════
   RESÚMENES DE LIBROS
══════════════════════════════════════════ */
const resumenes = {
  "Cien anos de soledad": {
    resumen: `Cien años de soledad es la obra maestra del escritor colombiano Gabriel García Márquez, publicada en 1967. Narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo, un lugar fundado en medio de la selva por José Arcadio Buendía.

A través de una narrativa llena de magia y realismo, García Márquez explora temas como el amor, la soledad, el poder, la guerra y el inevitable destino de los hombres. Los personajes se repiten en nombres y destinos, creando un ciclo que parece no tener fin.

La novela es considerada una de las más importantes de la literatura universal y fue la obra que llevó a García Márquez a ganar el Premio Nobel de Literatura en 1982.`,
    paginas: "471 páginas", año: "1967"
  },
  "El Principito": {
    resumen: `El Principito es un cuento filosófico escrito por Antoine de Saint-Exupéry en 1943. Aunque parece un libro para niños, sus reflexiones profundas sobre la vida, el amor y la amistad lo han convertido en una de las obras más leídas de la historia.

La historia sigue a un piloto que queda varado en el desierto del Sahara, donde conoce a un pequeño príncipe venido de un asteroide lejano. A través de sus viajes por diferentes planetas, el principito aprende lecciones sobre la vida que los adultos suelen olvidar.

"Lo esencial es invisible a los ojos" resume su esencia: una obra que invita a ver el mundo con la inocencia y la curiosidad de un niño.`,
    paginas: "96 páginas", año: "1943"
  },
  "Harry Potter": {
    resumen: `Harry Potter es la famosa saga de fantasía escrita por la autora británica J.K. Rowling. La historia comienza cuando Harry, un niño huérfano que vive con sus tíos, descubre en su undécimo cumpleaños que es un mago y que está admitido en Hogwarts, la escuela de magia y hechicería más famosa del mundo mágico.

A lo largo de siete libros, Harry y sus amigos Hermione Granger y Ron Weasley enfrentan peligros cada vez mayores, incluyendo el regreso del oscuro mago Lord Voldemort. La saga explora temas como la amistad, el valor, el sacrificio y la lucha entre el bien y el mal.

La serie se convirtió en un fenómeno cultural mundial, vendiendo más de 500 millones de copias.`,
    paginas: "4,100 páginas (saga)", año: "1997"
  },
  "1984": {
    resumen: `1984 es una novela distópica escrita por George Orwell y publicada en 1949. Ambientada en un futuro totalitario, la historia sigue a Winston Smith, un hombre que vive en Oceanía, un Estado controlado por el Partido y su líder El Gran Hermano.

Winston trabaja en el Ministerio de la Verdad, donde su trabajo es reescribir la historia para que siempre coincida con la versión oficial del Partido. En secreto, Winston comienza a cuestionar el sistema y se enamora de Julia.

La novela es una advertencia sobre los peligros del totalitarismo y la manipulación de la verdad. Términos como "Gran Hermano" y "Newspeak" nacidos en este libro se usan hoy en día para describir situaciones de vigilancia.`,
    paginas: "328 páginas", año: "1949"
  },
  "Don Quijote": {
    resumen: `Don Quijote de la Mancha es la novela más importante de la literatura española y una de las más influyentes de la historia universal, escrita por Miguel de Cervantes y publicada en dos partes en 1605 y 1615. Es considerada la primera novela moderna.

La historia narra las aventuras de Alonso Quijano, un hidalgo manchego que, enloquecido por la lectura de libros de caballerías, decide convertirse en caballero andante. Acompañado de su fiel escudero Sancho Panza, emprende una serie de aventuras imaginarias, como su famosa batalla contra los molinos de viento.

La obra es una reflexión profunda sobre la realidad y la ilusión, el idealismo y el pragmatismo.`,
    paginas: "863 páginas", año: "1605"
  },
  "El Hobbit": {
    resumen: `El Hobbit es una novela de fantasía y aventura escrita por J.R.R. Tolkien y publicada en 1937. Es el precursor de la famosa trilogía El Señor de los Anillos y presenta por primera vez la Tierra Media.

La historia sigue a Bilbo Bolsón, un hobbit tranquilo que es arrastrado por el mago Gandalf y un grupo de trece enanos en una aventura épica para recuperar el tesoro del reino enano de Erebor, custodiado por el terrible dragón Smaug. Durante el viaje, Bilbo encuentra un misterioso anillo mágico.

El Hobbit es una aventura llena de trolls, elfos, goblins y dragones que captura la imaginación desde la primera página.`,
    paginas: "310 páginas", año: "1937"
  },
  "Sapiens": {
    resumen: `Sapiens: De animales a dioses es un libro de historia escrito por el historiador israelí Yuval Noah Harari y publicado en 2011. En él, Harari hace un recorrido fascinante por la historia de la humanidad desde los primeros humanos hasta la era moderna.

El libro explica cómo el Homo sapiens pasó de ser un animal más en la sabana africana a convertirse en el dueño del planeta. Harari argumenta que lo que nos diferenció de otras especies fue nuestra capacidad para creer en ficciones compartidas como las religiones, las naciones y el dinero.

Sapiens es un libro que cambia la forma en que vemos el mundo y nuestra propia especie.`,
    paginas: "443 páginas", año: "2011"
  },
  "Dracula": {
    resumen: `Drácula es la novela de terror más famosa de la historia, escrita por el autor irlandés Bram Stoker y publicada en 1897. La historia está narrada a través de diarios, cartas y recortes de periódico de diferentes personajes.

La trama comienza cuando el joven abogado Jonathan Harker viaja a Transilvania para ayudar al Conde Drácula con la compra de una propiedad en Inglaterra. Pronto descubre que su anfitrión es un vampiro que lo tiene prisionero. Cuando Drácula llega a Inglaterra, comienza a atacar a la prometida de Jonathan.

La novela creó el mito moderno del vampiro tal como lo conocemos hoy y sigue siendo aterradora más de un siglo después.`,
    paginas: "418 páginas", año: "1897"
  },
  "El alquimista": {
    resumen: `El Alquimista es una novela filosófica del escritor brasileño Paulo Coelho, publicada en 1988. Es uno de los libros más vendidos de la historia con más de 65 millones de copias, y su mensaje sobre seguir los sueños ha inspirado a millones de personas.

La historia sigue a Santiago, un joven pastor andaluz que sueña repetidamente con un tesoro escondido en las pirámides de Egipto. Motivado por un misterioso rey, decide emprender un largo viaje hacia el norte de África.

Durante el camino Santiago aprende que el verdadero tesoro es el conocimiento adquirido en el viaje y la capacidad de escuchar su corazón.`,
    paginas: "208 páginas", año: "1988"
  },
  "Frankenstein": {
    resumen: `Frankenstein o el moderno Prometeo es una novela de terror y ciencia ficción escrita por Mary Shelley y publicada en 1818, cuando la autora tenía apenas 18 años. Es considerada una de las primeras novelas de ciencia ficción de la historia.

La historia narra la vida de Victor Frankenstein, un científico obsesionado con el secreto de la vida que logra crear un ser viviente a partir de partes de cadáveres. Al ver la monstruosidad de su creación, Victor huye aterrorizado. La criatura, rechazada por todos, busca venganza.

Frankenstein plantea preguntas sobre la responsabilidad científica y los límites de la ciencia que siguen siendo relevantes hoy.`,
    paginas: "280 páginas", año: "1818"
  },
  "Cosmos": {
    resumen: `Cosmos es una obra de divulgación científica escrita por el astrónomo Carl Sagan, publicada en 1980 como complemento a la famosa serie de televisión del mismo nombre. Es uno de los libros de ciencia más vendidos en la historia.

En sus páginas, Sagan lleva al lector en un viaje por el universo, explicando de manera accesible y poética temas como el origen del cosmos, la evolución de las estrellas y la posibilidad de vida extraterrestre.

La famosa frase de Sagan "Somos polvo de estrellas" resume la idea central del libro: que los átomos que forman nuestros cuerpos fueron creados en el interior de estrellas.`,
    paginas: "365 páginas", año: "1980"
  },
  "La Odisea": {
    resumen: `La Odisea es uno de los poemas épicos más antiguos e importantes de la literatura occidental, atribuido al poeta griego Homero y escrito alrededor del siglo VIII a.C.

Narra el largo viaje de regreso a casa del héroe griego Odiseo tras la caída de Troya. El viaje que debería durar semanas se convierte en diez años de aventuras. Odiseo enfrenta criaturas mitológicas como el Cíclope Polifemo, las Sirenas y Escila. Mientras tanto, su fiel esposa Penélope espera en Ítaca.

La Odisea es una reflexión sobre la perseverancia, la astucia, la lealtad y el anhelo del hogar.`,
    paginas: "541 páginas", año: "800 a.C."
  },
  "Orgullo y prejuicio": {
    resumen: `Orgullo y Prejuicio es la novela más famosa de la escritora inglesa Jane Austen, publicada en 1813. Es una de las obras más leídas de la literatura romántica.

La historia sigue a Elizabeth Bennet, la segunda de cinco hermanas de una familia de clase media en la Inglaterra rural del siglo XIX. Su relación con el altivo Mr. Darcy comienza con mutuo rechazo pero evoluciona hacia el amor verdadero.

La novela es una crítica ingeniosa a las convenciones sociales de la época, especialmente al matrimonio por conveniencia, reivindicando el amor basado en el respeto mutuo.`,
    paginas: "432 páginas", año: "1813"
  },
  "El senor de los anillos": {
    resumen: `El Señor de los Anillos es la épica trilogía de fantasía escrita por J.R.R. Tolkien, publicada entre 1954 y 1955. Es considerada la obra fundacional del género de la fantasía moderna.

La historia comienza cuando el hobbit Frodo Bolsón hereda de su tío el Anillo Único, forjado por el Señor Oscuro Sauron para dominar a todos los pueblos de la Tierra Media. Frodo debe destruirlo en el Monte del Destino, acompañado por la Comunidad del Anillo.

Tolkien creó para esta obra un mundo completo con sus propias lenguas, historia, geografía y mitología.`,
    paginas: "1,178 páginas", año: "1954"
  },
  "Crimen y castigo": {
    resumen: `Crimen y Castigo es una de las novelas más importantes de la literatura universal, escrita por Fiódor Dostoievski y publicada en 1866. Es considerada una obra maestra de la literatura psicológica.

La historia sigue a Raskolnikov, un joven estudiante que, convencido de su superioridad intelectual, decide asesinar a una anciana usurera. Sin embargo, después del crimen no puede escapar del tormento psicológico que lo consume.

Dostoievski explora la culpa, la redención y el libre albedrío con una profundidad que anticipa muchas ideas de la psicología moderna.`,
    paginas: "671 páginas", año: "1866"
  },
  "Breve historia del tiempo": {
    resumen: `Breve Historia del Tiempo es un libro de divulgación científica escrito por el físico teórico Stephen Hawking y publicado en 1988. Permaneció en la lista de bestsellers del Sunday Times durante 237 semanas consecutivas.

En el libro, Hawking explica de manera accesible conceptos como el Big Bang, los agujeros negros, la naturaleza del tiempo y el espacio, y la búsqueda de una teoría unificada del universo, todo sin usar prácticamente ninguna ecuación matemática.

Este libro cambió la manera en que millones de personas ven el cosmos y convirtió a Hawking en el divulgador científico más famoso del mundo.`,
    paginas: "212 páginas", año: "1988"
  }
};

/* ══════════════════════════════════════════
   ESTILOS POR CATEGORÍA (sin emojis)
══════════════════════════════════════════ */
const estilos = {
  "Terror":          { grad: "linear-gradient(150deg, #450a0a 0%, #7f1d1d 100%)", badge: { bg: "#1c0707", txt: "#fca5a5" } },
  "Accion":          { grad: "linear-gradient(150deg, #0c1445 0%, #1e3a8a 100%)", badge: { bg: "#0c1445", txt: "#93c5fd" } },
  "Romance":         { grad: "linear-gradient(150deg, #4c0519 0%, #9f1239 100%)", badge: { bg: "#4c0519", txt: "#fda4af" } },
  "Aventura":        { grad: "linear-gradient(150deg, #052e16 0%, #166534 100%)", badge: { bg: "#052e16", txt: "#86efac" } },
  "Infantil":        { grad: "linear-gradient(150deg, #431407 0%, #c2410c 100%)", badge: { bg: "#431407", txt: "#fdba74" } },
  "Comedia":         { grad: "linear-gradient(150deg, #082f49 0%, #0369a1 100%)", badge: { bg: "#082f49", txt: "#7dd3fc" } },
  "Novela":          { grad: "linear-gradient(150deg, #2e1065 0%, #6d28d9 100%)", badge: { bg: "#2e1065", txt: "#c4b5fd" } },
  "Clasico":         { grad: "linear-gradient(150deg, #292524 0%, #78716c 100%)", badge: { bg: "#292524", txt: "#e7e5e4" } },
  "Fantasia":        { grad: "linear-gradient(150deg, #1e1b4b 0%, #4c1d95 100%)", badge: { bg: "#1e1b4b", txt: "#a5b4fc" } },
  "Historia":        { grad: "linear-gradient(150deg, #1c1917 0%, #57534e 100%)", badge: { bg: "#1c1917", txt: "#d6d3d1" } },
  "Ciencia Ficcion": { grad: "linear-gradient(150deg, #0f172a 0%, #1d4ed8 100%)", badge: { bg: "#0f172a", txt: "#bfdbfe" } },
};
const estiloDefault = { grad: "linear-gradient(150deg, #1e1b4b 0%, #4c1d95 100%)", badge: { bg: "#1e1b4b", txt: "#a5b4fc" } };

/* ══════════════════════════════════════════
   ESTADO
══════════════════════════════════════════ */
let libros    = [];
let catActiva = "Todos";
let busqueda  = "";

/* ══════════════════════════════════════════
   CARGAR LIBROS DESDE EL SERVIDOR
══════════════════════════════════════════ */
async function cargarLibros() {
  try {
    const datos = await fetch(`${API}/libros`).then(r => r.json());

    libros = datos.map(l => {
      const estilo = estilos[l.categoria] || estiloDefault;
      const info   = resumenes[l.nombre] || null;
      return {
        titulo:     l.nombre,
        autor:      l.autor,
        cat:        l.categoria,
        grad:       estilo.grad,
        badge:      estilo.badge,
        resumen:    info ? info.resumen : "Resumen no disponible.",
        paginas:    info ? info.paginas : "",
        año:        info ? info.año     : "",
        cantidad:   parseInt(l.cantidad, 10),
        disponible: l.disponible ?? parseInt(l.cantidad, 10)
      };
    });

    renderCats();
    renderGrid();
  } catch (error) {
    document.getElementById("grid").innerHTML = `
      <div class="empty">
        <p style="margin-top:12px">No se pudo conectar con el servidor.<br>Asegúrate de que está corriendo en <strong>localhost:3000</strong></p>
      </div>`;
  }
}

/* ══════════════════════════════════════════
   MODAL DE DETALLE
══════════════════════════════════════════ */
function abrirDetalle(index) {
  const l = libros[index];

  document.getElementById("modal-color").style.background    = l.grad;
  document.getElementById("modal-cover-titulo").textContent  = l.titulo;
  document.getElementById("modal-cover-autor").textContent   = l.autor;
  document.getElementById("modal-titulo").textContent        = l.titulo;
  document.getElementById("modal-autor").textContent         = l.autor;
  document.getElementById("modal-cat").textContent           = l.cat;
  document.getElementById("modal-cat").style.background      = l.badge.bg;
  document.getElementById("modal-cat").style.color           = l.badge.txt;
  document.getElementById("modal-paginas").textContent       = l.paginas || "";
  document.getElementById("modal-año").textContent           = l.año     || "";

  const disponEl = document.getElementById("modal-dispon");
  if (disponEl) {
    if (l.disponible > 0) {
      disponEl.textContent         = `${l.disponible} / ${l.cantidad} disponibles`;
      disponEl.style.background    = "#d1fae5";
      disponEl.style.color         = "#065f46";
    } else {
      disponEl.textContent         = "Sin ejemplares disponibles";
      disponEl.style.background    = "#fee2e2";
      disponEl.style.color         = "#991b1b";
    }
  }

  const parrafos = l.resumen.split("\n\n").filter(p => p.trim());
  document.getElementById("modal-resumen").innerHTML =
    parrafos.map(p => `<p>${p.trim()}</p>`).join("");

  document.getElementById("modal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
  document.body.style.overflow = "";
}

/* ══════════════════════════════════════════
   CATEGORÍAS
══════════════════════════════════════════ */
function renderCats() {
  const cats = ["Todos", ...new Set(libros.map(l => l.cat))];
  document.getElementById("cats").innerHTML = cats.map(c =>
    `<button class="cat ${c === catActiva ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join("");

  document.getElementById("cats").addEventListener("click", e => {
    const btn = e.target.closest(".cat");
    if (btn) selCat(btn.dataset.cat);
  });
}

function selCat(c) {
  catActiva = c;
  renderCats();
  renderGrid();
  document.getElementById("cat-label").textContent = c === "Todos" ? "Todos los géneros" : c;
}

/* ══════════════════════════════════════════
   BÚSQUEDA
══════════════════════════════════════════ */
function filtrar() {
  busqueda = document.getElementById("searchInput").value.toLowerCase().trim();
  renderGrid();
}

document.getElementById("searchInput").addEventListener("input", () => {
  busqueda = document.getElementById("searchInput").value.toLowerCase().trim();
  renderGrid();
});

document.getElementById("searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter") filtrar();
});

/* ══════════════════════════════════════════
   RENDER TARJETAS
══════════════════════════════════════════ */
function escaparHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderGrid() {
  const filtrados = libros.filter(l => {
    const matchCat = catActiva === "Todos" || l.cat === catActiva;
    const matchQ   = !busqueda ||
      l.titulo.toLowerCase().includes(busqueda) ||
      l.autor.toLowerCase().includes(busqueda)  ||
      l.cat.toLowerCase().includes(busqueda);
    return matchCat && matchQ;
  });

  document.getElementById("count").textContent = filtrados.length;
  const grid = document.getElementById("grid");

  if (!filtrados.length) {
    const termino = escaparHtml(busqueda || catActiva);
    grid.innerHTML = `
      <div class="empty">
        <p>No se encontraron libros para "<strong>${termino}</strong>"</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtrados.map(l => {
    const idx = libros.indexOf(l);
    return `
    <article class="card" onclick="abrirDetalle(${idx})">
      <div class="cover" style="background:${l.grad}">
        <div class="cover-spine"></div>
        <div class="cover-inner">
          <div class="cover-titulo">${escaparHtml(l.titulo)}</div>
          <div class="cover-autor">${escaparHtml(l.autor)}</div>
        </div>
      </div>
      <div class="card-body">
        <p class="card-title">${escaparHtml(l.titulo)}</p>
        <p class="card-author">${escaparHtml(l.autor)}</p>
        <span class="badge" style="background:${l.badge.bg};color:${l.badge.txt}">${escaparHtml(l.cat)}</span>
      </div>
    </article>`;
  }).join("");
}
