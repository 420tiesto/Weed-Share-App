import { DocumentAddIcon, GlobeAltIcon, PencilAltIcon } from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
// import ReactDOM from 'react-dom';
// import  Editor  from 'draft-js-plugins-editor';
// import 'draft-js/dist/Draft.css';
import { Editor, EditorState, RichUtils } from 'draft-js';
// import createHashtagPlugin from 'draft-js/lib/creat';
// import createLinkifyPlugin from 'draft-js-linkify-plugin';

import Button from '../../../app/components/common-ui/atoms/Button';
import Modal, { ModalHeader } from '../../../app/components/common-ui/atoms/Modal';
import { TextArea } from '../../../app/components/common-ui/atoms/TextArea';
import GifIcon from '../../../app/icons/GifIcon';
import ImageIcon from '../../../app/icons/ImageIcon';
import LinkPreviewComponent from './LinkPreviewComponent';
import { Link } from 'react-router-dom';

interface Props {
    isOpen: boolean;
    profileImg: string;
    closeModal: () => void;
    onSuccess: (data: any) => void;
}

interface State {
    textValue: EditorState;
    linkMetadata: any;
}

const CreatePostModal: React.FC<Props> = (props: Props) => {
    const { isOpen, profileImg, closeModal, onSuccess } = props;

    const [state, setState] = useSetState<State>({
        textValue: EditorState.createEmpty(),
        linkMetadata: {},
    });

    const { textValue, linkMetadata } = state;

    useEffect(() => {
        console.log(linkMetadata, 'prpfilede');
    }, [linkMetadata]);

    const handleChange = (editorState: any) => {
        console.log(editorState);
        setState({ textValue: editorState });
    };

    const urlify = (text: string) => {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.match(urlRegex);
    };

    const urlifyAndDisplayTitle = async (data: any) => {
        // debugger;
        const text = data.target.value;
        const url = urlify(text);
        // const title = "<a style='color: rgb(29, 155, 240);' href = '" + url + "'>" + url + '<a>';
        // const newText = text.replace(url);
        // document.getElementById('url')!.innerHTML = newText;
        // document.getElementById('links')!.innerHTML = title;
        if (url) {
            const data = await fetch(
                `https://favorited-link-preview.herokuapp.com/api/link-preview?url=${encodeURIComponent(
                    url![0]
                )}`
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.result.siteData);
                    setState({ linkMetadata: data.result.siteData });
                });
            // console.log(data.json());
        }
    };

    return (
        <>
            <Modal closeModal={closeModal} isOpen={isOpen}>
                <div className="w-[680px] ">
                    <ModalHeader className="font-medium mb-4 flex items-center gap-2">
                        {' '}
                        <PencilAltIcon className="h-6 w-6 text-primary" /> New Post
                    </ModalHeader>
                    <div className="flex  gap-4">
                        <div className="h-12 w-12 bg-gray rounded-full overflow-hidden">
                            <img src={profileImg} alt="pfp" />
                        </div>
                        <div className="max-w-2xl flex-1">
                            <TextArea
                                id="url"
                                placeholder="What's happening ?"
                                onChange={(data) => urlifyAndDisplayTitle(data)}
                                // onBlur={(data) => urlifyAndDisplayTitle(data)}
                            />
                            <div className="mt-4">
                                {/* {state?.linkMetadata?.success &&  <LinkPreviewComponent metadata={state.linkMetadata} />} */}
                                {/* {linkMetadata !== {} ? ( */}
                                <LinkPreviewComponent metadata={linkMetadata} />
                                {/* ) : ( */}
                                {/* '' */}
                                {/* )} */}
                            </div>
                            {/* <Editor
                            editorState={textValue}
                            onChange={(editorState) => handleChange(editorState)}
                        /> */}
                            <div className="flex mt-4 justify-between">
                                <div className="flex items-center gap-4">
                                    <button>
                                        <ImageIcon />
                                    </button>
                                    <button>
                                        <GifIcon />
                                    </button>
                                    <button>
                                        <DocumentAddIcon className="text-primary  h-5 w-5" />
                                    </button>
                                    <button>
                                        <GlobeAltIcon className="text-primary h-5 w-5" />
                                    </button>
                                </div>
                                <Button onClick={() => onSuccess(textValue)}>Post</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CreatePostModal;
