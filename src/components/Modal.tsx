import { h, FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import '../styles/modal.scss';

interface ModalProps {
    title?: string;
    content?: string;
    onOk?: () => void;
    onCancel?: () => void;
    autoShow?: boolean;
}

const Modal: FunctionComponent<ModalProps> = ({
    title = 'Уведомление',
    content = 'Содержимое уведомления',
    onOk,
    onCancel,
    autoShow = true
}) => {
    // Автоматически показываем модальное окно при монтировании
    useEffect(() => {
        const modal = document.querySelector('.modal-container');
        if (modal && autoShow) {
            modal.classList.add('visible');
        }
    }, [autoShow]);

    const handleOk = () => {
        if (onOk) onOk();
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="modal-body">
                    <p>{content}</p>
                </div>
                <div className="modal-footer">
                    <button 
                        className="modal-button modal-button--cancel" 
                        onClick={handleCancel}
                    >
                        CANCEL
                    </button>
                    <button 
                        className="modal-button modal-button--ok" 
                        onClick={handleOk}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal; 