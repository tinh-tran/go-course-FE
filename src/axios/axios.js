import axios from 'axios';
import {AdminApi} from '../config.js';
 
export default axios.create({
    baseURL: AdminApi + '/api/'
});