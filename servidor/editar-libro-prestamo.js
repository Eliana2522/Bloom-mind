const { Sequelize, DataTypes } = require('sequelize');

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

const Libro = sequelize.define('Libro', {
    codigo:    { type: DataTypes.STRING, primaryKey: true },
    nombre:    { type: DataTypes.STRING },
    autor:     { type: DataTypes.STRING },
    categoria: { type: DataTypes.STRING },
    cantidad:  { type: DataTypes.STRING }
}, { timestamps: false });

const Prestamo = sequelize.define('Prestamo', {
    id:              { type: DataTypes.INTEGER,  primaryKey: true },
    socioId:         { type: DataTypes.INTEGER },
    libroCodigo:     { type: DataTypes.STRING },
    fechaPrestamo:   { type: DataTypes.DATEONLY },
    fechaLimite:     { type: DataTypes.DATEONLY },
    fechaDevolucion: { type: DataTypes.DATEONLY },
    moraPagada:      { type: DataTypes.BOOLEAN }
}, { timestamps: false });

const NUEVO_LIBRO_CODIGO = '002'; // El Hobbit
const PRESTAMO_ID = 5;

async function main() {
    await sequelize.authenticate();

    const libro = await Libro.findByPk(NUEVO_LIBRO_CODIGO);
    if (!libro) throw new Error(`No existe un libro con codigo ${NUEVO_LIBRO_CODIGO}`);

    const p = await Prestamo.findByPk(PRESTAMO_ID);
    if (!p) throw new Error(`No existe el prestamo con id ${PRESTAMO_ID}`);

    await p.update({ libroCodigo: NUEVO_LIBRO_CODIGO });
    console.log(`Prestamo ${PRESTAMO_ID} actualizado -> libro ahora es "${libro.nombre}" (codigo ${libro.codigo})`);
    process.exit(0);
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
