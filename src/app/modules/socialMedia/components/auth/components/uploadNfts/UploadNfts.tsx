import { ChangeEvent, DragEventHandler } from 'react';
import { currentYear } from '../../../../../../constants';
import UploadIcon from '../../../../../../icons/UploadIcon';
import Stepper from '../signUp/Stepper';
import Loader from '../../../../../../components/common-ui/loader';

const UploadNfts = () => {

    const uploadHelper = (event: any) => {
        const files = event?.target?.files;
        if (files) {
            for (let i = 0; i < files?.length; i++) {
                const file = files[i];
                console.log(file);
                // uploadFile(file);
            }
        }
    };

    return (
        <div className="min-h-screen p-4 flex flex-col gap-4 items-center justify-center">
            <Stepper step={3}/>
            <div className="relative sunken-element--dark gap-8 w-full max-w-screen-md flex-col flex items-center justify-center overflow-hidden bg-gray-900 px-16 py-8 rounded-2xl">
                <div>
                    <h1 className="text-2xl mb-2 md:text-4xl font-semibold text-center">
                        Upload your images
                    </h1>
                    <p className="text-center">PNG,JPG,GIF Files are allowed</p>
                </div>
                <div onDrop={uploadHelper} className="flex justify-around w-full flex-wrap">
                    <div className='pt-4'>
                        <div className="bg-gray-700 mb-4 p-16 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-400">
                            {/* <Loader /> */}
                            <UploadIcon />
                        </div>
                        Upload Profile NFT Image
                    </div>
                    {/* Divider */}
                    <div className='hidden md:flex w-[2px] bg-gray-500'></div>
                    <div className='pt-4'>
                        <div className="bg-gray-700 mb-4 p-16 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-400">
                            <UploadIcon />
                        </div>
                        Upload Profile NFT Image
                    </div>
                </div>
            <button className='green-btn max-w-xs'>Next</button>
            </div>
            <p className="mt-8  bottom-8">© {currentYear} Prnts</p>
        </div>
    );
};

export default UploadNfts;
