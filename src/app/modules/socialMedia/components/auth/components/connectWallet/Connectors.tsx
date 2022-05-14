import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { init } from '../../../../../../services/ethers-service';
import { useAppDispatch } from '../../../../../../state/configure-store';
import { getProfiles } from '../../../profile/services/get-profiles';
import { login } from '../../services/lens-login';

interface Props {
    connectWallet: () => void;
}

const Connectors: React.FC<Props> = (props: Props) => {
    const { connectWallet } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleMetamaskConnect = () => {
        connectWallet();
    };

    const checkProfileInLens = (account: string) => {
        getProfiles({
            ownedBy: [account],
            limit: 10,
        }).then((profile) => {
            console.log(profile.data);
            if (profile.data.profiles.items.length > 0) {
                dispatch(login());
                // navigate('/profile');
            } else {
                // show notification that no profile in lens
                navigate('/signup');
            }
        });
    };

    return (
        <>
            <div className="sunken-element cursor-pointer overflow-y-hidden rounded-2xl w-full">
                <div onClick={handleMetamaskConnect} className="sunken-element]   py-4 px-6 w-full">
                    <div className="flex justify-between gap-4 items-center ">
                        <img src="metamask.png" alt="metamask" className="h-6" />
                        <p className="font-medium flex-1 ">Metamask</p>
                        <p className="green-btn max-w-fit px-4 text-xs">Popular</p>
                    </div>
                </div>
                <div className="sunken-element cursor-pointer py-4 px-6 w-full">
                    <div className="flex justify-between gap-4 items-center ">
                        <img src="coinbase.png" alt="coinbase" className="h-6" />
                        <p className="font-medium flex-1 ">Coinbase Wallet</p>
                        {/* <p className="green-btn max-w-fit px-4 text-xs">Popular</p> */}
                    </div>
                </div>
                <div className="sunken-element cursor-pointer py-4 px-6 w-full">
                    <div className="flex justify-between gap-4 items-center ">
                        <img src="walletconnect.png" alt="walletconnect" className="h-6" />
                        <p className="font-medium flex-1 ">Wallet Connect</p>
                        {/* <p className="green-btn max-w-fit px-4 text-xs">Popular</p> */}
                    </div>
                </div>
                <div className="sunken-element cursor-pointer py-4 px-6 w-full">
                    <div className="flex justify-between gap-4 items-center ">
                        <img src="phantom.png" alt="phantom" className="h-6" />
                        <p className="font-medium flex-1 ">Phantom</p>
                        <p className="white-btn max-w-fit px-4 text-xs">Solana</p>
                    </div>
                </div>
                <div className="sunken-element cursor-pointer py-4 px-6 w-full">
                    <div className="flex justify-between gap-4 items-center ">
                        <img src="glow.png" alt="glow" className="h-6" />
                        <p className="font-medium flex-1 ">Glow</p>
                        <p className="white-btn max-w-fit px-4 text-xs">Solana</p>
                    </div>
                </div>
            </div>
            <button className="text-primary flex justify-center p-4">Show more options</button>
        </>
    );
};

export default Connectors;
