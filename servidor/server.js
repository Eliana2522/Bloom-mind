const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const { Sequelize, DataTypes, Op } = require('sequelize');

const app           = express();
const PORT          = process.env.PORT || 3000;
const MORA_POR_DIA  = 20;
const DIAS_PRESTAMO = 7;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

/* ══════════════════════════════════════════
   BASE DE DATOS
   Credenciales configurables por variables de entorno
   (ver .env.example). Los valores por defecto mantienen
   la configuración local existente.
══════════════════════════════════════════ */
const sequelize = new Sequelize(
    process.env.DB_NAME     || 'bloom_mind',
    process.env.DB_USER     || 'postgres',
    process.env.DB_PASSWORD || 'eliana25',
    {
        host:    process.env.DB_HOST || 'localhost',
        port:    process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false
    }
);

const Usuario = sequelize.define('Usuario', {
    id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario:    { type: DataTypes.STRING,  allowNull: false, unique: true },
    contrasena: { type: DataTypes.STRING,  allowNull: false },
    rol:        { type: DataTypes.STRING,  allowNull: false, defaultValue: 'admin' }
}, { timestamps: false });

const Libro = sequelize.define('Libro', {
    codigo:    { type: DataTypes.STRING, primaryKey: true },
    nombre:    { type: DataTypes.STRING, allowNull: false },
    autor:     { type: DataTypes.STRING, allowNull: false },
    categoria: { type: DataTypes.STRING, allowNull: false },
    cantidad:  { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

const Socio = sequelize.define('Socio', {
    id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre:   { type: DataTypes.STRING,  allowNull: false },
    cedula:   { type: DataTypes.STRING,  allowNull: false, unique: true },
    telefono: { type: DataTypes.STRING,  allowNull: true }
}, { timestamps: false });

const Prestamo = sequelize.define('Prestamo', {
    id:              { type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true },
    socioId:         { type: DataTypes.INTEGER,  allowNull: false },
    libroCodigo:     { type: DataTypes.STRING,   allowNull: false },
    fechaPrestamo:   { type: DataTypes.DATEONLY, allowNull: false },
    fechaLimite:     { type: DataTypes.DATEONLY, allowNull: false },
    fechaDevolucion: { type: DataTypes.DATEONLY, defaultValue: null },
    moraPagada:      { type: DataTypes.BOOLEAN,  defaultValue: false }
}, { timestamps: false });

Prestamo.belongsTo(Socio, { foreignKey: 'socioId',     as: 'socio' });
Prestamo.belongsTo(Libro,  { foreignKey: 'libroCodigo', as: 'libro', targetKey: 'codigo' });

const categoriasPermitidas = [
    "Terror","Accion","Romance","Aventura","Infantil","Comedia",
    "Novela","Clasico","Fantasia","Historia","Ciencia Ficcion"
];

/* ══════════════════════════════════════════
   INICIALIZACIÓN
══════════════════════════════════════════ */
async function inicializarBaseDatos() {
    try {
        await sequelize.sync();

        if (!await Usuario.findOne({ where: { usuario: 'admin' } })) {
            await Usuario.create({ usuario: 'admin', contrasena: 'bloomadmin1', rol: 'admin' });
            console.log('-> Usuario admin creado!');
        }

        if ((await Libro.count()) === 0) {
            await Libro.bulkCreate([
                { codigo:'001', nombre:'Drácula',                              autor:'Bram Stoker',                    categoria:'Terror',          cantidad:'5' },
                { codigo:'002', nombre:'El Hobbit',                            autor:'J.R.R. Tolkien',                 categoria:'Aventura',        cantidad:'3' },
                { codigo:'003', nombre:'El Principito',                        autor:'Antoine de Saint-Exupéry',       categoria:'Infantil',        cantidad:'10'},
                { codigo:'004', nombre:'Don Quijote de la Mancha',             autor:'Miguel de Cervantes Saavedra',   categoria:'Clasico',         cantidad:'2' },
                { codigo:'005', nombre:'Cien años de soledad',                 autor:'Gabriel García Márquez',         categoria:'Novela',          cantidad:'5' },
                { codigo:'006', nombre:'Harry Potter y la piedra filosofal',   autor:'J.K. Rowling',                   categoria:'Fantasia',        cantidad:'6' },
                { codigo:'007', nombre:'1984',                                 autor:'George Orwell',                  categoria:'Ciencia Ficcion', cantidad:'4' },
                { codigo:'008', nombre:'Sapiens: De animales a dioses',        autor:'Yuval Noah Harari',              categoria:'Historia',        cantidad:'4' },
                { codigo:'009', nombre:'El alquimista',                        autor:'Paulo Coelho',                   categoria:'Novela',          cantidad:'7' },
                { codigo:'010', nombre:'Frankenstein',                         autor:'Mary Shelley',                   categoria:'Terror',          cantidad:'3' },
                { codigo:'011', nombre:'Cosmos',                               autor:'Carl Sagan',                     categoria:'Ciencia Ficcion', cantidad:'4' },
                { codigo:'012', nombre:'La Odisea',                            autor:'Homero',                         categoria:'Clasico',         cantidad:'3' },
                { codigo:'013', nombre:'Orgullo y prejuicio',                  autor:'Jane Austen',                    categoria:'Romance',         cantidad:'5' },
                { codigo:'014', nombre:'El señor de los anillos',              autor:'J.R.R. Tolkien',                 categoria:'Fantasia',        cantidad:'4' },
                { codigo:'015', nombre:'Crimen y castigo',                     autor:'Fiódor Dostoievski',             categoria:'Clasico',         cantidad:'3' },
                { codigo:'016', nombre:'Breve historia del tiempo',            autor:'Stephen Hawking',                categoria:'Ciencia Ficcion', cantidad:'3' },
            ]);
            console.log('-> Libros precargados con exito!');
        } else {
            console.log('-> Base de datos conectada con exito!');
        }
    } catch (err) {
        console.error('Error al inicializar:', err);
    }
}
inicializarBaseDatos();

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function calcularDiasAtraso(p) {
    const limite = new Date(p.fechaLimite + 'T00:00:00');
    const ref    = p.fechaDevolucion
        ? new Date(p.fechaDevolucion + 'T00:00:00')
        : new Date();
    return Math.max(0, Math.floor((ref - limite) / 86400000));
}

function enriquecerPrestamo(p) {
    const json       = p.toJSON ? p.toJSON() : p;
    const hoy        = new Date().toISOString().split('T')[0];
    const diasAtraso = calcularDiasAtraso(json);
    const estado     = json.fechaDevolucion
        ? 'devuelto'
        : (json.fechaLimite < hoy ? 'vencido' : 'activo');
    return {
        ...json,
        nombreSocio: json.socio?.nombre  || '—',
        cedulaSocio: json.socio?.cedula  || '—',
        nombreLibro: json.libro?.nombre  || '—',
        diasAtraso,
        mora:  diasAtraso * MORA_POR_DIA,
        estado
    };
}

/* ══════════════════════════════════════════
   PÁGINAS
══════════════════════════════════════════ */
const PUB = path.join(__dirname, '../public');
app.get('/',                (_, res) => res.sendFile(path.join(PUB, 'index.html')));
app.get('/gestion',         (_, res) => res.sendFile(path.join(PUB, 'gestion.html')));
app.get('/biblioteca',      (_, res) => res.sendFile(path.join(PUB, 'biblioteca.html')));
app.get('/admin-prestamos', (_, res) => res.sendFile(path.join(PUB, 'admin-prestamos.html')));
app.get('/admin-devoluciones', (_, res) => res.sendFile(path.join(PUB, 'admin-devoluciones.html')));
app.get('/admin-moras',     (_, res) => res.sendFile(path.join(PUB, 'admin-moras.html')));
app.get('/admin-socios',    (_, res) => res.sendFile(path.join(PUB, 'admin-socios.html')));

/* ══════════════════════════════════════════
   API — AUTH
══════════════════════════════════════════ */
app.post('/api/login', async (req, res) => {
    const { usuario, contrasena } = req.body;
    try {
        const user = await Usuario.findOne({ where: { usuario, contrasena } });
        if (user) {
            res.json({ exito: true, rol: user.rol, id: user.id, usuario: user.usuario, mensaje: 'Acceso concedido!' });
        } else {
            res.status(401).json({ exito: false, mensaje: 'Usuario o contraseña incorrectos.' });
        }
    } catch (e) { res.status(500).json({ exito: false, mensaje: 'Error en el servidor.' }); }
});

/* ══════════════════════════════════════════
   API — LIBROS
══════════════════════════════════════════ */
app.get('/api/categorias', (_, res) => res.json(categoriasPermitidas));

app.get('/api/libros', async (req, res) => {
    try {
        const libros = await Libro.findAll();
        const result = await Promise.all(libros.map(async l => {
            const prestados = await Prestamo.count({ where: { libroCodigo: l.codigo, fechaDevolucion: null } });
            return { ...l.toJSON(), disponible: Math.max(0, parseInt(l.cantidad, 10) - prestados) };
        }));
        res.json(result);
    } catch (e) { res.status(500).json({ mensaje: 'Error al obtener libros.' }); }
});

app.post('/api/libros', async (req, res) => {
    const { codigo, nombre, autor, categoria, cantidad } = req.body;
    if (!codigo || !nombre || !autor || !categoria || !cantidad)
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    if (!categoriasPermitidas.includes(categoria))
        return res.status(400).json({ mensaje: 'Categoría no válida.' });
    try {
        const existe = await Libro.findByPk(codigo);
        if (existe) {
            await existe.update({ nombre, autor, categoria, cantidad });
            res.json({ mensaje: 'Libro modificado con éxito.' });
        } else {
            await Libro.create({ codigo, nombre, autor, categoria, cantidad });
            res.json({ mensaje: 'Libro guardado con éxito.' });
        }
    } catch (e) { res.status(500).json({ mensaje: 'Error al procesar el libro.' }); }
});

app.delete('/api/libros/:codigo', async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.params.codigo);
        if (!libro) return res.status(404).json({ mensaje: 'El código no existe.' });
        await libro.destroy();
        res.json({ mensaje: 'Libro eliminado correctamente.' });
    } catch (e) { res.status(500).json({ mensaje: 'Error al eliminar.' }); }
});

/* ══════════════════════════════════════════
   API — SOCIOS
══════════════════════════════════════════ */
app.get('/api/socios', async (req, res) => {
    try {
        const socios = await Socio.findAll({ order: [['nombre', 'ASC']] });
        const result = await Promise.all(socios.map(async s => {
            const prestamosActivos = await Prestamo.count({ where: { socioId: s.id, fechaDevolucion: null } });
            const rows = await Prestamo.findAll({ where: { socioId: s.id } });
            const moraTotal = rows.reduce((acc, p) => {
                return acc + (p.moraPagada ? 0 : calcularDiasAtraso(p) * MORA_POR_DIA);
            }, 0);
            return { ...s.toJSON(), prestamosActivos, moraTotal };
        }));
        res.json(result);
    } catch (e) { res.status(500).json({ mensaje: 'Error al obtener socios.' }); }
});

app.get('/api/socios/buscar', async (req, res) => {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);
    try {
        const socios = await Socio.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.iLike]: `%${q}%` } },
                    { cedula: { [Op.iLike]: `%${q}%` } }
                ]
            },
            limit: 8,
            order: [['nombre', 'ASC']]
        });
        res.json(socios);
    } catch (e) { res.status(500).json({ mensaje: 'Error al buscar.' }); }
});

function validarDocumento(doc) {
    if (/^\d+$/.test(doc)) return /^\d{11}$/.test(doc);
    return /^[A-Za-z0-9]{6,20}$/.test(doc);
}

app.post('/api/socios', async (req, res) => {
    const { nombre, cedula, telefono } = req.body;
    if (!nombre || !cedula)
        return res.status(400).json({ exito: false, mensaje: 'Nombre y cédula son obligatorios.' });
    if (!validarDocumento(cedula.trim()))
        return res.status(400).json({ exito: false, mensaje: 'Cédula debe tener 11 dígitos, o pasaporte alfanumérico de 6 a 20 caracteres.' });
    try {
        if (await Socio.findOne({ where: { cedula } }))
            return res.status(400).json({ exito: false, mensaje: 'Ya existe un socio con esa cédula.' });
        const s = await Socio.create({ nombre, cedula, telefono: telefono || null });
        res.json({ exito: true, mensaje: `Socio "${nombre}" registrado con éxito.`, socio: s });
    } catch (e) { res.status(500).json({ exito: false, mensaje: 'Error al registrar el socio.' }); }
});

app.put('/api/socios/:id', async (req, res) => {
    const { nombre, cedula, telefono } = req.body;
    if (!nombre || !cedula)
        return res.status(400).json({ exito: false, mensaje: 'Nombre y cédula son obligatorios.' });
    if (!validarDocumento(cedula.trim()))
        return res.status(400).json({ exito: false, mensaje: 'Cédula debe tener 11 dígitos, o pasaporte alfanumérico de 6 a 20 caracteres.' });
    try {
        const socio = await Socio.findByPk(req.params.id);
        if (!socio) return res.status(404).json({ exito: false, mensaje: 'Socio no encontrado.' });
        const duplicado = await Socio.findOne({ where: { cedula } });
        if (duplicado && duplicado.id !== socio.id)
            return res.status(400).json({ exito: false, mensaje: 'Esa cédula ya está registrada.' });
        await socio.update({ nombre, cedula, telefono: telefono || null });
        res.json({ exito: true, mensaje: 'Socio actualizado con éxito.' });
    } catch (e) { res.status(500).json({ exito: false, mensaje: 'Error al actualizar.' }); }
});

app.delete('/api/socios/:id', async (req, res) => {
    try {
        const socio = await Socio.findByPk(req.params.id);
        if (!socio) return res.status(404).json({ mensaje: 'Socio no encontrado.' });
        const activos = await Prestamo.count({ where: { socioId: socio.id, fechaDevolucion: null } });
        if (activos > 0)
            return res.status(400).json({ mensaje: 'El socio tiene préstamos activos. Registra la devolución primero.' });
        await socio.destroy();
        res.json({ mensaje: 'Socio eliminado.' });
    } catch (e) { res.status(500).json({ mensaje: 'Error al eliminar el socio.' }); }
});

/* ══════════════════════════════════════════
   API — PRÉSTAMOS
══════════════════════════════════════════ */
app.get('/api/prestamos', async (req, res) => {
    try {
        const rows = await Prestamo.findAll({
            include: [
                { model: Socio, as: 'socio', attributes: ['nombre', 'cedula'] },
                { model: Libro, as: 'libro', attributes: ['nombre'] }
            ],
            order: [['id', 'DESC']]
        });
        res.json(rows.map(enriquecerPrestamo));
    } catch (e) { res.status(500).json({ mensaje: 'Error al obtener préstamos.' }); }
});

app.get('/api/prestamos/socio/:socioId', async (req, res) => {
    try {
        const rows = await Prestamo.findAll({
            where:   { socioId: req.params.socioId },
            include: [{ model: Libro, as: 'libro', attributes: ['nombre'] }],
            order:   [['id', 'DESC']]
        });
        res.json(rows.map(enriquecerPrestamo));
    } catch (e) { res.status(500).json({ mensaje: 'Error al obtener préstamos.' }); }
});

app.post('/api/prestamos', async (req, res) => {
    const { socioId, libroCodigo } = req.body;
    if (!socioId || !libroCodigo)
        return res.status(400).json({ mensaje: 'Faltan datos.' });
    try {
        const socio = await Socio.findByPk(socioId);
        if (!socio) return res.status(404).json({ mensaje: 'Socio no encontrado.' });

        const libro = await Libro.findByPk(libroCodigo);
        if (!libro) return res.status(404).json({ mensaje: 'Libro no encontrado.' });

        const prestados = await Prestamo.count({ where: { libroCodigo, fechaDevolucion: null } });
        if (prestados >= parseInt(libro.cantidad, 10))
            return res.status(400).json({ mensaje: 'No hay ejemplares disponibles.' });

        if (await Prestamo.findOne({ where: { socioId, libroCodigo, fechaDevolucion: null } }))
            return res.status(400).json({ mensaje: 'Este socio ya tiene ese libro en préstamo.' });

        const hoy    = new Date();
        const limite = new Date(hoy);
        limite.setDate(limite.getDate() + DIAS_PRESTAMO);

        const p = await Prestamo.create({
            socioId, libroCodigo,
            fechaPrestamo: hoy.toISOString().split('T')[0],
            fechaLimite:   limite.toISOString().split('T')[0]
        });
        res.json({ mensaje: 'Préstamo registrado con éxito.', fechaPrestamo: p.fechaPrestamo, fechaLimite: p.fechaLimite });
    } catch (e) { res.status(500).json({ mensaje: 'Error al registrar el préstamo.' }); }
});

app.put('/api/prestamos/:id/devolver', async (req, res) => {
    try {
        const p = await Prestamo.findByPk(req.params.id);
        if (!p) return res.status(404).json({ mensaje: 'Préstamo no encontrado.' });
        if (p.fechaDevolucion) return res.status(400).json({ mensaje: 'Este libro ya fue devuelto.' });
        const hoy        = new Date().toISOString().split('T')[0];
        const diasAtraso = calcularDiasAtraso({ ...p.toJSON(), fechaDevolucion: hoy });
        await p.update({ fechaDevolucion: hoy });
        res.json({ mensaje: 'Devolución registrada.', diasAtraso, mora: diasAtraso * MORA_POR_DIA });
    } catch (e) { res.status(500).json({ mensaje: 'Error al registrar la devolución.' }); }
});

app.put('/api/prestamos/:id/pagar-mora', async (req, res) => {
    try {
        const p = await Prestamo.findByPk(req.params.id);
        if (!p) return res.status(404).json({ mensaje: 'Préstamo no encontrado.' });
        await p.update({ moraPagada: true });
        res.json({ mensaje: 'Mora marcada como pagada.' });
    } catch (e) { res.status(500).json({ mensaje: 'Error al actualizar la mora.' }); }
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
