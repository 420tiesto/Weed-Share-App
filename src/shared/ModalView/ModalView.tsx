import * as React from 'react';
// import { Modal } from 'react-bootstrap';

export interface AppModalProps {
    onClose: () => void;
    show: boolean;
    title: string;
    size?: 'sm' | 'lg' | 'xl';
}

const AppModal: React.FC<AppModalProps> = (props) => {
    const { title, show, onClose, children, size } = props;
    return (
        <>
            {/* <Modal
                show={show}
                size={size}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                className="l-modal">
                <Modal.Header closeButton className="l-modal__header">
                    <Modal.Title className="l-modal__title">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal> */}
        </>
    );
};

AppModal.defaultProps = {};

export default AppModal;
