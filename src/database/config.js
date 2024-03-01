import { config } from 'dotenv';

config();

export default{
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: 'root',
    password: process.env.PASSWORD
}