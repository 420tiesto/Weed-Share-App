import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from '@heroicons/react/outline';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { type TrackDetails } from '../../types';
import styles from './styles';
import { uploadWeb3Json } from '../../../../utils/upload-json';
import { pinImageToIPFS } from '../../../../utils/upload-file';
import UploadMusic from '../../../../app/components/common-ui/upload-music';
import Button from '../../../../app/components/common-ui/atoms/Button';
import { Input } from '../../../../app/components/common-ui/atoms/Input';
import { promiseToast, errorToast, successToast } from '../../../../app/components/common-ui/toasts/CustomToast';
import { Card, CardBody } from '../../../../app/components/common-ui/atoms/Card';

type Props = {
    index: number;
    track: TrackDetails;
    updateTrack: (value: TrackDetails, ipfsHash: string) => void;
    removeTrack: (track: TrackDetails) => void;
};

const Track = ({ index, track, removeTrack, updateTrack }: Props) => {
    const [loader, setLoader] = useState({
        uploadMusicFile: false,
        uploadTrack: false,
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        setError,
        setValue,
        control,
    } = useForm<TrackDetails>({
        mode: 'onBlur',
        defaultValues: {
            ...track,
        },
    });

    // TODO: Add proper typescript definition event for e
    const onDelete = (e: any) => {
        e.stopPropagation();
        const result = confirm('Are you sure you want to delete this track?');
        if (result) {
            removeTrack(track);
        }
    };

    const onSubmit: SubmitHandler<TrackDetails> = async (data: TrackDetails) => {
        promiseToast('Saving track...', 'Add track');
        try {
            setLoader((oldValue) => ({ ...oldValue, uploadTrack: true }));
            const contentUri = await uploadWeb3Json(data.songTitle, JSON.stringify(data));
            updateTrack(data, contentUri);
            setLoader((oldValue) => ({ ...oldValue, uploadTrack: false }));
            successToast('Track saved successfully!', 'Add track');
        } catch (e) {
            errorToast('Error saving track. Please try again', 'Add track');
        }
    };

    const uploadTrackFile = async (files: any) => {
        const songTitle = getValues('songTitle');
        if (!songTitle) {
            setError(
                'songTitle',
                { type: 'focus', message: 'This field is required!' },
                { shouldFocus: true }
            );
            return;
        }
        setLoader((oldValue) => ({ ...oldValue, uploadMusicFile: true }));
        const file = files[0];
        const pinataMetadata = {
            name: songTitle,
        };
        const { type } = file;
        const ipfsData = await pinImageToIPFS(file, JSON.stringify(pinataMetadata));
        const { IpfsHash: ipfsHash } = ipfsData;
        setValue('audioFile', ipfsHash);
        setValue('audioFileType', type);
        setLoader((oldValue) => ({ ...oldValue, uploadMusicFile: false }));
    };

    return (
        <Card variant='elevated' color='dark' className='rounded-[30px]'>
        <Disclosure defaultOpen={index == 0 ? true : false}>
            {({ open }: { open: any }) => (
                <>
                    <Disclosure.Button className={styles.disclosure}>
                        <p className={styles.disclosureText}> Track {index + 1} </p>
                        <div className="hover:bg-slate-600" onClick={onDelete}>
                            <TrashIcon className={styles.trashIcon} />
                        </div>
                        {open && <ChevronUpIcon className={styles.chevronIcon} />}
                        {!open && <ChevronDownIcon className={styles.chevronIcon} />}
                    </Disclosure.Button>
                    <Disclosure.Panel>
                        <CardBody padding={8}>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                            {/* Song Title */}

                            {/* Add Featured Artist  */}

                           
                            <Button loading={loader.uploadTrack} type="submit" variant="secondary">
                                Save Track
                            </Button>
                        </form>
                        </CardBody>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
                </Card>
    );
};
export default Track;
