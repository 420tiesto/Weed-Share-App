import React from 'react';
import { AlertModalType } from '../enums/alertModal';
import AppModal from './ModalView';

// import { AppButton } from '../../forms/components';

export interface AlertModalProps {
    message: string;
    type: AlertModalType;
    title: string;
    show: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
    message,
    type,
    title,
    show,
    onSuccess,
    onClose,
}) => (
    <AppModal show={show} onClose={onClose} title={title}>
        <>
            {type.valueOf() === 1 ? (
                <div className="l-modal__content">
                    <p>{message}</p>
                    <div>
                        <button
                            // primary
                            type="button"
                            // text="Ok"
                            // link
                            onClick={() => onSuccess()}
                        />
                    </div>
                </div>
            ) : (
                <div className="l-modal__content">
                    <p>{message}</p>
                    <div className="row">
                        <div className="col-md-6">
                            <button
                                // primary
                                type="button"
                                // text="Delete"
                                // link
                                onClick={() => onSuccess()}
                            />
                        </div>
                        <div className="col-md-6">
                            <button
                                // secondary
                                type="button"
                                // text="Cancel"
                                // link
                                onClick={() => onClose()}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    </AppModal>
);

export default AlertModal;
