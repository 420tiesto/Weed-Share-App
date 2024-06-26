import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import UploadIcon from '../../../icons/UploadIcon';
import Loader from '../loader';

interface UploadProps {
    uploadHelper: (evt: any) => void;
    showLoader?: boolean;
    displayText: string;
    accepts?: string;
    imageLink?: string;
    helpText?: string;
}

const Upload: React.FC<UploadProps> = ({
    uploadHelper,
    displayText,
    showLoader = false,
    accepts = 'image/*',
    imageLink = '',
    helpText,
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: uploadHelper,
        noDrag: false,
        accept: accepts,
    });
    return (
        <>
            <div className="pt-4">
                <div
                    {...getRootProps()}
                    className={clsx(
                        { 'p-16': !imageLink },
                        { 'w-64 h-64': !!imageLink },
                        'bg-black-700 mb-4 rounded-xl flex items-center justify-center border-2 border-dashed border-black-400'
                    )}>
                    <input {...getInputProps()} />
                    {showLoader ? (
                        <Loader />
                    ) : imageLink ? (
                        <img className="w-fit" src={imageLink} alt="User Profile Image" />
                    ) : (
                        <UploadIcon />
                    )}
                </div>
                {displayText}
                <p className="text-xs">{helpText}</p>
            </div>
        </>
    );
};

export default Upload;
