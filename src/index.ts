import initModal from './vanilla-modal';
import './styles/modal.scss';

if (typeof window !== 'undefined') {
    ((global) => {
        global.initCookieModal = initModal;
    })(window);
}

export default initModal;