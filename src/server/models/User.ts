import * as mongoose from 'mongoose';


const userSchema: mongoose.Schema = new mongoose.Schema({
    email: String,
    password: String
});

mongoose.model('User', userSchema);