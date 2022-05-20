import React from 'react';

type Props = {};

const AirdropDetails = ({}: Props) => {
    return (
        <div className='py-4 px-6'>
            <p className="mb-2 text-slate-400">Air drop ends in May 18,2022 at 3.25pm GMT +5.30 </p>
            <div className='flex gap-8'>
                <div>
                    <div className="text-2xl font-bold">01</div>
                    <div className="text-slate-400 text-sm">Days</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">22</div>
                    <div className="text-slate-400 text-sm">Hours</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">46</div>
                    <div className="text-slate-400 text-sm">Minutes</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">17</div>
                    <div className="text-slate-400 text-sm">Seconds</div>
                </div>
            </div>
        </div>
    );
};

export default AirdropDetails;
