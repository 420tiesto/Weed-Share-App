import { forwardRef, useImperativeHandle } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon } from '@heroicons/react/outline';
import Track from './Track';
import { addTrackDetails, updateTrackDetails, deleteTrackDetails } from '../../state/actions';
import { useSelector } from 'react-redux';
import { getTracks } from '../../state/selectors';
import { useAppDispatch } from '../../../../state/configure-store';

import { type TrackDetails } from '../../types';

type Props = {};

const AddTrack = forwardRef(({}: Props, ref: any) => {
    const tracks = useSelector(getTracks);
    const dispatch = useAppDispatch();

    const addNewTrack = () => {
        if (!tracks[tracks.length - 1]?.ipfsHash) {
            alert('Please fill all details of the track');
            return;
        }
        dispatch(
            addTrackDetails({
                id: uuidv4(),
                songTitle: '',
                hasFeaturedArtist: false,
                isRadioEdit: false,
                audioFile: '',
                audioFileType: '',
                songType: 'original',
                songWriterFirstName: '',
                songWriterLastName: '',
                hasExplicitLyrics: false,
                isInstrumental: false,
                specifyPreview: false,
                trackPrice: 0,
                maticTrackPrice: 0,
                ipfsHash: '',
            })
        );
    };

    useImperativeHandle(ref, () => ({
        onSubmit({ onSuccess }: any) {
            onSuccess(tracks);
        },
    }));

    const updateTrack = (value: TrackDetails, ipfsHash: string) => {
        dispatch(updateTrackDetails({ ...value, ipfsHash }));
    };

    const removeTrack = (track: TrackDetails) => {
        dispatch(deleteTrackDetails(track));
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
                {tracks.map((track: TrackDetails, index: number) => (
                    <Track
                        index={index}
                        key={track.id}
                        track={track}
                        updateTrack={updateTrack}
                        removeTrack={removeTrack}
                    />
                ))}
            </div>
        </>
    );
});

export default AddTrack;
