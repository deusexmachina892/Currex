import configDev from './dev';
import configProd from './prod';

export default (process.env.NODE_ENV==='production'?configProd: configDev);