import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import React from 'react';

type Props = {};

const AllowanceSettings = (props: Props) => {
    const cardStyle = {
        container: `flex flex-wrap justify-between items-center elevated-element p-4 rounded-xl`,
        title: `font-bold flex items-center gap-2`,
        subtitle: `text-slate-400"`,
        icon: ``,
        allowBtn: `btn bg-green-500 hover:bg-green-400`,
        revokeBtn: `btn bg-amber-500 hover:bg-amber-400`,
    };
    return (
        <div className="w-full space-y-8">
            <h2 className="text-2xl font-medium">Allowance Settings</h2>
            <div className="sunken-element space-y-8 p-8 rounded-2xl">
                <h6 className="font-bold text-xl">Allow / Revoke modules</h6>
                <p className="font-semibold">
                    In order to use collect feature you need to allow the module you can allow and
                    revoke the module anytime.
                </p>
                <div className={cardStyle.container}>
                    <div>
                        <div className={cardStyle.title}>Limited Fee Collect</div>
                        <p className={cardStyle.subtitle}>
                            0xAF1cB165fC9e95769292f6af8b106395f346bb77
                        </p>
                    </div>
                    <div>
                        <button className={cardStyle.revokeBtn}>
                            <MinusIcon className="h-4 w-4" /> Revoke
                        </button>
                    </div>
                </div>
                <div className={cardStyle.container}>
                    <div>
                        <div className={cardStyle.title}>Fee Collect</div>
                        <p className={cardStyle.subtitle}>
                            0xAF1cB165fC9e95769292f6af8b106395f346bb77
                        </p>
                    </div>
                    <div>
                        <button className={cardStyle.revokeBtn}>
                            <MinusIcon className="h-4 w-4" /> Revoke
                        </button>
                    </div>
                </div>
                <div className={cardStyle.container}>
                    <div>
                        <div className={cardStyle.title}>Limited Time Fee Collect</div>
                        <p className={cardStyle.subtitle}>
                            0xAF1cB165fC9e95769292f6af8b106395f346bb77
                        </p>
                    </div>
                    <div>
                        <button className={cardStyle.revokeBtn}>
                            <MinusIcon className="h-4 w-4" /> Revoke
                        </button>
                    </div>
                </div>
                <div className={cardStyle.container}>
                    <div>
                        <div className={cardStyle.title}>Timed Fee Collect</div>
                        <p className={cardStyle.subtitle}>
                            0xAF1cB165fC9e95769292f6af8b106395f346bb77
                        </p>
                    </div>
                    <div>
                        <button className={cardStyle.allowBtn}>
                            <PlusIcon className="h-4 w-4" /> Allow
                        </button>
                    </div>
                </div>
                <div className={cardStyle.container}>
                    <div>
                        <div className={cardStyle.title}>Fee Collect</div>
                        <p className={cardStyle.subtitle}>
                            0xAF1cB165fC9e95769292f6af8b106395f346bb77
                        </p>
                    </div>
                    <div>
                        <button className={cardStyle.allowBtn}>
                            <PlusIcon className="h-4 w-4" /> Allow
                        </button>
                    </div>
                </div>
                <div className={cardStyle.container}>
                    <div>
                        <div className={cardStyle.title}>Revert Collect</div>
                        <p className={cardStyle.subtitle}>
                            0xAF1cB165fC9e95769292f6af8b106395f346bb77
                        </p>
                    </div>
                    <div>
                        <button className={cardStyle.allowBtn}>
                            <PlusIcon className="h-4 w-4" /> Allow
                        </button>
                    </div>
                </div>
                <div className={cardStyle.container}>
                    <div>
                        <div className={cardStyle.title}>Fee Follow</div>
                        <p className={cardStyle.subtitle}>
                            0xAF1cB165fC9e95769292f6af8b106395f346bb77
                        </p>
                    </div>
                    <div>
                        <button className={cardStyle.allowBtn}>
                            <PlusIcon className="h-4 w-4" /> Allow
                        </button>
                    </div>
                </div>
                <div className={cardStyle.container}>
                    <div>
                        <div className={cardStyle.title}>Follower only reference</div>
                        <p className={cardStyle.subtitle}>
                            0xAF1cB165fC9e95769292f6af8b106395f346bb77
                        </p>
                    </div>
                    <div>
                        <button className={cardStyle.allowBtn}>
                            <PlusIcon className="h-4 w-4" /> Allow
                        </button>
                    </div>
                </div>  
            </div>
            
        </div>
    );
};

export default AllowanceSettings;
