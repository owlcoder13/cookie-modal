import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { WidgetProps } from '../types';
import Modal from './Modal';
import '../styles/widget.scss';

const Widget: FunctionComponent<WidgetProps> = ({ options }) => {
    const [shareCount, setShareCount] = useState(0);
    
    const {
        content = 'Этот контент можно поделиться',
        title = 'Поделиться контентом',
        onAction,
        modal
    } = options;
    
    const handleShare = () => {
        setShareCount(prev => prev + 1);
        
        if (onAction) {
            onAction('share', { content, shareCount: shareCount + 1 });
        }
    };

    const handleModalOk = () => {
        if (modal?.onOk) {
            modal.onOk();
        }
        
        if (onAction) {
            onAction('modal-ok', {});
        }
    };

    const handleModalCancel = () => {
        if (modal?.onCancel) {
            modal.onCancel();
        }
        
        if (onAction) {
            onAction('modal-cancel', {});
        }
    };

    return (
        <div className="preact-share-widget">
            <div className="preact-share-widget__header">
                {title}
            </div>
            <div className="preact-share-widget__content">
                {content}
            </div>
            <div className="preact-share-widget__footer">
                <button 
                    className="preact-share-widget__button"
                    onClick={handleShare}
                >
                    Поделиться
                </button>
                {shareCount > 0 && (
                    <div className="preact-share-widget__counter">
                        Поделились: {shareCount}
                    </div>
                )}
            </div>
            
            {modal && (
                <Modal
                    title={modal.title}
                    content={modal.content}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                    autoShow={modal.show !== false}
                />
            )}
        </div>
    );
};

export default Widget; 