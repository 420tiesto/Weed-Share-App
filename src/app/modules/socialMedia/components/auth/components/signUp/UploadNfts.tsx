import CheckIcon from '../../../../../../icons/CheckIcon';
import UploadIcon from '../../../../../../icons/UploadIcon';

type Props = {};

const UploadNfts = (props: Props) => {
    return (
        <div className="min-h-screen w-screen p-4 flex flex-col gap-4 items-center justify-center">
            {/* <Stepper/>     */}
            <div className="relative sunken-element--dark gap-8 w-full max-w-screen-md flex-col flex items-center justify-center overflow-hidden bg-gray-900 px-16 py-8 rounded-2xl">
                <div>
                    <h1 className="text-2xl mb-2 md:text-4xl font-semibold text-center">
                        Upload your images
                    </h1>
                    <p className="text-center">PNG,JPG,GIF Files are allowed</p>
                </div>
                <div className="flex justify-around  w-full flex-wrap">
                    <div className='pt-4'>
                        <div className="bg-gray-700 mb-4 p-16 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-400">
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
            <p className="mt-8  bottom-8">© 2022 Prnts</p>
        </div>
    );
};

export default UploadNfts;
