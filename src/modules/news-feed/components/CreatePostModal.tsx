import { DocumentAddIcon, GlobeAltIcon, PencilAltIcon } from '@heroicons/react/outline';
import React from 'react';
import Button from '../../../app/components/common-ui/atoms/Button';
import Modal, { ModalHeader } from '../../../app/components/common-ui/atoms/Modal';
import { TextArea } from '../../../app/components/common-ui/atoms/TextArea';
import GifIcon from '../../../app/icons/GifIcon';
import ImageIcon from '../../../app/icons/ImageIcon';

type Props = {
    isOpen: boolean;
    closeModal: () => void;
    pfpSrc?: string;
};

const CreatePostModal = ({ isOpen, closeModal, pfpSrc }: Props) => {
    return (
        <Modal closeModal={closeModal} isOpen={isOpen}>
            <div className="w-[680px] ">
                <ModalHeader className="font-medium mb-4 flex items-center gap-2">
                    {' '}
                    <PencilAltIcon className="h-6 w-6 text-primary" /> New Post
                </ModalHeader>
                <div className="flex  gap-4">
                    <div className="h-12 w-12 bg-gray rounded-full overflow-hidden">
                        <img src={pfpSrc} alt="pfp" />
                    </div>
                    <div className="max-w-2xl flex-1">
                        <TextArea placeholder="What's happening ?" />
                        <div className="flex mt-4 justify-between">
                            <div className="flex items-center gap-4">
                                <button>
                                    <ImageIcon />
                                </button>
                                <button>
                                    <GifIcon />
                                </button>
                                <button>
                                  <DocumentAddIcon className='text-primary  h-5 w-5'/>
                                </button>
                                <button>
                                  <GlobeAltIcon className='text-primary h-5 w-5'/>
                                </button>
                            </div>
                            <Button>Post</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CreatePostModal;
