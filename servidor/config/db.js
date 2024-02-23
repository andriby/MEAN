const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/meanproductos', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Conectada');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
        process.exit(1); // Terminar la aplicación
    }
}

module.exports = conectarDB;
