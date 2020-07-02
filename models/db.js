const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/fashion';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to: ' + url);
});

mongoose.connection.on('err', () => {
    console.log('Mongoose default connection err: ' + url);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected throw app termination');
        process.exit(0);
    });
});