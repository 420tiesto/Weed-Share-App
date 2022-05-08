import { useState, forwardRef, useImperativeHandle } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon } from '@heroicons/react/outline';
import Track from './Track';
import { type TrackDetails } from '../../types';

type Props = {};

const AddTrack = forwardRef(({}: Props, ref: any) => {
    // Will be type of Track
    const [tracks, setTracks] = useState<any>([{}]);
    const addNewTrack = () => {
        if (!tracks[tracks.length - 1].ipfsHash) {
            alert('Please fill all details of the first track');
            return;
        }
        setTracks([
            ...tracks,
            {
                id: uuidv4(),
            },
        ]);
    };

    useImperativeHandle(ref, () => ({
        onSubmit({ onSuccess }: any) {
            onSuccess(tracks);
        },
    }));

    const updateTrack = (index: number, value: TrackDetails, ipfsHash: string) => {
        const newTracks = [...tracks];
        newTracks[index] = { ...newTracks[index], ...value, ipfsHash };
        setTracks(newTracks);
    };

    const removeTrack = (index: number) => {
        const newTracks = [...tracks];
        if (newTracks.length === 1) {
            return;
        }
        newTracks.splice(index, 1);
        setTracks(newTracks);
    };

    return (
        <>
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
                {tracks.map((track: any, index: number) => (
                    <Track
                        key={track.id}
                        index={index}
                        updateTrack={updateTrack}
                        removeTrack={removeTrack}
                    />
                ))}
            </div>
        </>
    );
});

export default AddTrack;
