//import * as store from '../../../store/mysql.js';
import * as store from '../../../store/remote-mysql.js';
import controller from './controller.js';

const crtl = controller(store);

export default crtl;