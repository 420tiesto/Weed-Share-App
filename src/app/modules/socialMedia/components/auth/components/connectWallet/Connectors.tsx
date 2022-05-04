import { init } from '../../../../../../services/ethers-service';

type Props = {};

const Connectors = (props: Props) => {
    const handleMetamaskConnect = () => {
        init();
    };

    return (<>
        <div className="sunken-element--dark cursor-pointer overflow-y-hidden rounded-2xl w-full">
            <div onClick={handleMetamaskConnect} className="sunken-element--dark   py-4 px-6 w-full">
                <div className="flex justify-between gap-4 items-center ">
                    <img src="metamask.png" alt="metamask" className="h-6" />
                    <p className="font-medium flex-1 ">Metamask</p>
                    <p className="green-btn max-w-fit px-4 text-xs">Popular</p>
                </div>
            </div>
            <div className="sunken-element--dark cursor-pointer py-4 px-6 w-full">
                <div className="flex justify-between gap-4 items-center ">
                    <img src="coinbase.png" alt="coinbase" className="h-6" />
                    <p className="font-medium flex-1 ">Coinbase Wallet</p>
                    {/* <p className="green-btn max-w-fit px-4 text-xs">Popular</p> */}
                </div>
            </div>
            <div className="sunken-element--dark cursor-pointer py-4 px-6 w-full">
                <div className="flex justify-between gap-4 items-center ">
                    <img src="walletconnect.png" alt="walletconnect" className="h-6" />
                    <p className="font-medium flex-1 ">Wallet Connect</p>
                    {/* <p className="green-btn max-w-fit px-4 text-xs">Popular</p> */}
                </div>
            </div>
            <div className="sunken-element--dark cursor-pointer py-4 px-6 w-full">
                <div className="flex justify-between gap-4 items-center ">
                    <img src="phantom.png" alt="phantom" className="h-6" />
                    <p className="font-medium flex-1 ">Phantom</p>
                    <p className="white-btn max-w-fit px-4 text-xs">Solana</p>
                </div>
            </div>
            <div className="sunken-element--dark cursor-pointer py-4 px-6 w-full">
                <div className="flex justify-between gap-4 items-center ">
                    <img src="glow.png" alt="glow" className="h-6" />
                    <p className="font-medium flex-1 ">Glow</p>
                    <p className="white-btn max-w-fit px-4 text-xs">Solana</p>
                </div>
            </div>
        </div>
      <button className='text-primary flex justify-center p-4'>
        Show more options
      </button>
    </>
    );
};

export default Connectors;
