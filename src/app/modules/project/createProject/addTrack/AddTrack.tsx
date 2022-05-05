import { PlusIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Container from '../../../../components/common-ui/container/Container';
import Navbar from '../../../../components/header/navbar/Navbar';
import { copyright } from '../../../../constants';
import Track from './Track';

type Props = {};

const AddTrack = (props: Props) => {
    // Will be type of Track
    const [tracks, setTracks] = useState<any>([{}]);
    const addNewTrack = () => {
        setTracks([...tracks, {}]);
    };


    return (
        <>
            <Navbar />
            <Container>
                <h1 className="text-2xl text-center mb-4 font-bold ">Upload Music</h1>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl  font-semibold">Tracks</h2>
                    <button
                        onClick={addNewTrack}
                        className="green-btn flex items-center gap-2 max-w-fit px-6">
                        Add Another Track <PlusIcon className="h-5 w-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    {tracks.map((_: any, index: number) => (
                        <Track index={index} key={index} />
                    ))}
                </div>
                <div className="flex justify-between">
                    <button className="green-btn max-w-fit px-10 mt-8">Previous </button>
                    <button className="green-btn max-w-fit px-10 mt-8">Next </button>
                </div>
            </Container>
        </>
    );
};

export default AddTrack;
