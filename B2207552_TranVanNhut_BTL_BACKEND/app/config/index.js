const config = {
    app: {
        port: process.env.port || 3000,
    },

    db: {
        uri: process.env.MONGODB_URI || "mongodb+srv://admin:admin@backend2.z1zizaf.mongodb.net/?retryWrites=true&w=majority&appName=BACKEND2"
    }
};

module.exports = config;