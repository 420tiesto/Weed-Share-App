import { useState, forwardRef, useImperativeHandle } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon } from '@heroicons/react/outline';
import Track from './Track';
import { useSelector } from 'react-redux';
import { getTracks } from '../../state/selectors';
import { useAppDispatch } from '../../../../state/configure-store';

import { type TrackDetails } from '../../types';
import { addTrackDetails, deleteTrackDetails, updateTrackDetails } from '../../state/actions';
import Button from '../../../../app/components/common-ui/atoms/Button';

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
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl  font-semibold">Tracks</h2>
                <Button onClick={addNewTrack} icon={<PlusIcon className="h-5 w-5" />}>
                    Add Another Track
                </Button>
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
