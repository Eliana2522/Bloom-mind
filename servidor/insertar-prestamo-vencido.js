const { Sequelize, DataTypes, Op } = require('sequelize');

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

const Socio = sequelize.define('Socio', {
    id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre:   { type: DataTypes.STRING,  allowNull: false },
    cedula:   { type: DataTypes.STRING,  allowNull: false, unique: true },
    telefono: { type: DataTypes.STRING,  allowNull: true }
}, { timestamps: false });

const Libro = sequelize.define('Libro', {
    codigo:    { type: DataTypes.STRING, primaryKey: true },
    nombre:    { type: DataTypes.STRING, allowNull: false },
    autor:     { type: DataTypes.STRING, allowNull: false },
    categoria: { type: DataTypes.STRING, allowNull: false },
    cantidad:  { type: DataTypes.STRING, allowNull: false }
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

async function main() {
    await sequelize.authenticate();

    let socio = await Socio.findOne({ where: { nombre: { [Op.iLike]: '%eugenio%' } } });
    if (!socio) {
        const cedula = 'EUG' + Date.now().toString().slice(-8);
        socio = await Socio.create({ nombre: 'Eugenio', cedula, telefono: null });
        console.log('Socio "Eugenio" no existia, fue creado con id', socio.id, 'y cedula', cedula);
    } else {
        console.log('Socio "Eugenio" encontrado con id', socio.id);
    }

    const libro = await Libro.findOne({ order: [['codigo', 'ASC']] });
    if (!libro) throw new Error('No hay libros en la base de datos para asociar al prestamo.');

    const hoy = new Date();
    const fechaPrestamo = new Date(hoy);
    fechaPrestamo.setDate(fechaPrestamo.getDate() - 14);
    const fechaLimite = new Date(hoy);
    fechaLimite.setDate(fechaLimite.getDate() - 3);

    const p = await Prestamo.create({
        socioId:         socio.id,
        libroCodigo:     libro.codigo,
        fechaPrestamo:   fechaPrestamo.toISOString().split('T')[0],
        fechaLimite:     fechaLimite.toISOString().split('T')[0],
        fechaDevolucion: null
    });

    console.log('Prestamo vencido insertado -> id:', p.id, '| socio:', socio.nombre, '| libro:', libro.nombre, '| fechaLimite:', p.fechaLimite);
    process.exit(0);
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
