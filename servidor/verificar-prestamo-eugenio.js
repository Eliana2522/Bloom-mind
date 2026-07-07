const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('bloom_mind', 'postgres', 'eliana25', {
    host:    'localhost',
    port:    5432,
    dialect: 'postgres',
    logging: false
});

const Socio = sequelize.define('Socio', {
    id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre:   { type: DataTypes.STRING },
    cedula:   { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING }
}, { timestamps: false });

const Prestamo = sequelize.define('Prestamo', {
    id:              { type: DataTypes.INTEGER, primaryKey: true },
    socioId:         { type: DataTypes.INTEGER },
    libroCodigo:     { type: DataTypes.STRING },
    fechaPrestamo:   { type: DataTypes.DATEONLY },
    fechaLimite:     { type: DataTypes.DATEONLY },
    fechaDevolucion: { type: DataTypes.DATEONLY },
    moraPagada:      { type: DataTypes.BOOLEAN }
}, { timestamps: false });

async function main() {
    await sequelize.authenticate();
    const socios = await Socio.findAll({ where: { nombre: { [Op.iLike]: '%eugenio%' } } });
    if (!socios.length) {
        console.log('No hay ningun socio llamado Eugenio.');
        process.exit(0);
    }
    for (const s of socios) {
        console.log('Socio:', s.id, s.nombre, s.cedula);
        const prestamos = await Prestamo.findAll({ where: { socioId: s.id }, raw: true });
        console.log(JSON.stringify(prestamos, null, 2));
    }
    process.exit(0);
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
