import initModal from './vanilla-modal';
import './style.scss';

if (typeof window !== 'undefined') {
    ((global) => {
        global.initCookieModal = initModal;
    })(window);
}

export default initModal;