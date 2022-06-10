import { useDropzone } from 'react-dropzone';
import { UploadIcon, CheckIcon } from '@heroicons/react/outline';
import Loader from '../loader';
interface UploadProps {
    uploadHelper: (evt: any) => void;
    showLoader?: boolean;
    displayText: string;
    accepts?: string;
    helpText?: string;
    uploaded?: boolean;
}

const Upload: React.FC<UploadProps> = ({
    uploadHelper,
    displayText,
    showLoader = false,
    uploaded = false,
    // TODO: Add proper accepts for the files here
    accepts = 'audio/*',
    helpText,
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: uploadHelper,
        noDrag: false,
        accept: accepts,
    });

    return (
        <>
            <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-400 p-4 flex flex-col items-center justify-center rounded-2xl">
                {showLoader ? (
                    <Loader />
                ) : uploaded ? (
                    <CheckIcon className="h-10 w-10" />
                ) : (
                    <UploadIcon className="h-10 w-10" />
                )}
                <p className=" font-medium">{displayText}</p>
                <span className="text-xs text-gray-400">{helpText}</span>
                <input {...getInputProps()} />
            </div>
        </>
    );
};

export default Upload;
