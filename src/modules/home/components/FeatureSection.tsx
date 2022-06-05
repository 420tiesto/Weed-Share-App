import React from 'react';
import { Tab } from '@headlessui/react';
import FeatureItem from './FeatureItem';
type Props = {};

const FeatureSection = (props: Props) => {
    return (
        <div className="p-8 px-16 mt-16">
            <Tab.Group>
                {/* Tabs */}
                <Tab.List className={'flex items-center justify-center'}>
                    <div className="rounded-full  justify-between bg-dark-gray flex gap-4 p-1 elevated-item">
                        <Tab
                            className={({ selected }: { selected: boolean }) =>
                                (selected ? 'text-black bg-primary ' : 'text-white') +
                                ' w-28 text-center  p-1 focus:outline-none font-medium rounded-full '
                            }>
                            Artists
                        </Tab>
                        <Tab
                            className={({ selected }: { selected: boolean }) =>
                                (selected ? 'text-black bg-primary ' : ' text-white') +
                                ' w-28 text-center  p-1 focus:outline-none font-medium rounded-full'
                            }>
                            Fans
                        </Tab>
                    </div>
                </Tab.List>
                <Tab.Panels className="mt-10">
                    <Tab.Panel className="">
                        <h1 className="text-3xl text-center font-bold mb-10">
                            Create and Sell your Music
                        </h1>
                        <div className="flex justify-around px-16 gap-20 text-center">
                            <FeatureItem
                                title="Setup your wallet"
                                description="Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support."
                                imgSrc="/set-up-wallet.png"
                            />
                            <FeatureItem
                                title="Create your project"
                                description="Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee."
                                imgSrc="/create-your-project.png"
                            />
                            <FeatureItem
                                title="List them for fans to join"
                                description="Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content."
                                imgSrc="/list-projects.png"
                            />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <h1 className="text-3xl text-center font-bold mb-10">
                            Invest in your favorite artist
                        </h1>
                        <div className="flex justify-around px-16 gap-20 text-center">
                            <FeatureItem
                                title="Artist creates project"
                                description="Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support."
                                imgSrc="/artist-create-project.png"
                            />
                            <FeatureItem
                                title="You join the project"
                                description="Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee."
                                imgSrc="/join-project.png"
                            />
                            <FeatureItem
                                title="A win win for everyone "
                                description="Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content."
                                imgSrc="/win-win.png"
                            />
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default FeatureSection;
