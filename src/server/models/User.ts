import * as mongoose from 'mongoose';

interface UserInterface{
    email: string,
    password: string
}
const userSchema: mongoose.Schema<UserInterface> = new mongoose.Schema({
    email: String,
    password: String
});

mongoose.model('User', userSchema);