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
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>Song Title</label>
                                <div className="relative">
                                    <Input
                                        {...register('songTitle', {
                                            minLength: { value: 3, message: 'Too short' },
                                            maxLength: { value: 50, message: 'Too long' },
                                            required: {
                                                value: true,
                                                message: 'This field is required!',
                                            },
                                        })}
                                        type="text"
                                        placeholder="Enter song title"
                                
                                    />
                                    <p className={styles.errorText}>{errors.songTitle?.message}</p>
                                </div>
                            </div>
                            {/* Add Featured Artist  */}
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>
                                    Add featured artist to song title?
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('hasFeaturedArtist', {
                                            required: {
                                                value: true,
                                                message: 'Please select one ',
                                            },
                                        })}
                                        type="radio"
                                        value="no"
                                        className={styles.radioInput}
                                    />
                                    <label className="pl-4">
                                        No, don't show any other artists in song title
                                    </label>
                                    <br />
                                    <input
                                        {...register('hasFeaturedArtist', {
                                            required: {
                                                value: true,
                                                message: 'Please select one ',
                                            },
                                        })}
                                        type="radio"
                                        value="yes"
                                        className={styles.radioInput}
                                    />
                                    <label className="pl-4">
                                        Yes, add featured artist to track title(please specify...)
                                    </label>
                                    <p className={styles.errorText}>
                                        {errors.hasFeaturedArtist?.message}
                                    </p>
                                </div>
                            </div>
                            {/* Audio File */}
                            <div className={styles.inputContainer}>
                                <label className="max-w-[180px] flex-grow">Audio File</label>
                                <div className="flex justify-between items-center flex-grow">
                                    <Controller
                                        name="audioFile"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => {
                                            const { value } = field;
                                            const uploaded = !!value;
                                            return (
                                                <UploadMusic
                                                    showLoader={loader.uploadMusicFile}
                                                    uploadHelper={uploadTrackFile}
                                                    displayText={
                                                        uploaded ? 'Uploaded' : 'Upload audio file'
                                                    }
                                                    helpText={
                                                        !uploaded
                                                            ? 'WAV, MP3, M4A, FLAC, AIFF, WMA'
                                                            : ''
                                                    }
                                                    uploaded={uploaded}
                                                />
                                            );
                                        }}
                                    />
                                    <p className="text-primary">Already got an isrc code ?</p>
                                </div>
                            </div>
                            {/* Song writer */}
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>Song Writer</label>
                                <div className="relative">
                                    <input
                                        {...register('songType', {
                                            required: {
                                                value: true,
                                                message: 'Please select one ',
                                            },
                                        })}
                                        type="radio"
                                        value="orginal"
                                        className={styles.radioInput}
                                    />
                                    <label className="pl-4">
                                        I wrote this song, or manage the songwriter (it's an
                                        original tune)
                                    </label>
                                    <br />
                                    <input
                                        {...register('songType', {
                                            required: {
                                                value: true,
                                                message: 'Please select one ',
                                            },
                                        })}
                                        type="radio"
                                        value="cover"
                                        className={styles.radioInput}
                                    />
                                    <p className={styles.errorText}>{errors.songType?.message}</p>
                                    <label className="pl-4">
                                        Another artist wrote it (it's a cover song)
                                    </label>
                                </div>
                            </div>
                            {/* Song writers(s)  real names*/}
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>Song writer(s) real name</label>
                                <div className="space-y-4 relative flex-grow">
                                    <div className="flex gap-4">
                                        <div className="relative">
                                            <Input
                                                {...register('songWriterFirstName', {
                                                    minLength: { value: 3, message: 'Too short' },
                                                    maxLength: { value: 15, message: 'Too long' },
                                                    required: {
                                                        value: true,
                                                        message: 'This field is required!',
                                                    },
                                                })}
                                                type="text"
                                                placeholder="First name"
                                            />
                                            <p className={styles.errorText}>
                                                {errors.songWriterFirstName?.message}
                                            </p>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                {...register('songWriterLastName', {
                                                    minLength: { value: 3, message: 'Too short' },
                                                    maxLength: { value: 15, message: 'Too long' },
                                                    required: {
                                                        value: true,
                                                        message: 'This field is required!',
                                                    },
                                                })}
                                                type="text"
                                                placeholder="Last Name"
                                        
                                            />
                                            <p className={styles.errorText}>
                                                {errors.songWriterLastName?.message}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Additional Songwriters */}
                                    {/* <div className="flex gap-4">
                            <input
                                id="songwriter-first-name"
                                name="songwriter-first-name"
                                type="text"
                                placeholder="First Name"
                                className="primary-input max-w-md"
                            />
                            <input
                                id="songwriter-last-name"
                                name="songwriter-last-name"
                                type="text"
                                placeholder="Last Name"
                                className="primary-input max-w-md"
                            />
                        </div> */}
                                    <button className="absolute right-0 bottom-1  text-primary">
                                        Add another songwriter +
                                    </button>
                                </div>
                            </div>
                            {/* Explicit Lyrics */}
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>Explicit Lyrics</label>
                                <div className="relative flex-grow">
                                    <input
                                        {...register('hasExplicitLyrics')}
                                        type="radio"
                                        value="no"
                                        className={styles.radioInput}
                                    />
                                    <label className="pl-4">No</label>
                                    <br />
                                    <input
                                        {...register('hasExplicitLyrics', {
                                            required: {
                                                value: true,
                                                message: 'Please select one',
                                            },
                                        })}
                                        type="radio"
                                        value="yes"
                                        className={styles.radioInput}
                                    />
                                    <label className="pl-4">Yes</label>
                                    <p className={styles.errorText}>
                                        {errors.hasExplicitLyrics?.message}
                                    </p>
                                </div>
                            </div>
                            {/* Is this a radio edit */}
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>Is this a "radio edit" ?</label>
                                <div className="relative flex-grow">
                                    <input
                                        type="radio"
                                        {...register('isRadioEdit', {
                                            required: { value: true, message: ' required' },
                                        })}
                                        value="no"
                                        className={styles.radioInput}
                                    />
                                    <label className="pl-4">
                                        No - This song is clean, and always has been
                                    </label>
                                    <br />
                                    <input
                                        type="radio"
                                        {...register('isRadioEdit', {
                                            required: { value: true, message: ' required' },
                                        })}
                                        value="yes"
                                        className={styles.radioInput}
                                    />
                                    <label className="pl-4">
                                        Yes - There is an explicit version of this song, but this is
                                        the clean (or censored) version of it
                                    </label>
                                    <p className={styles.errorText}>
                                        {errors.isRadioEdit?.message}
                                    </p>
                                </div>
                            </div>
                            {/* Instrumental */}
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>Instrumental ?</label>
                                <div className="relative flex-grow">
                                    <input
                                        type="radio"
                                        {...register('isInstrumental', {
                                            required: {
                                                value: true,
                                                message: 'Please select one ',
                                            },
                                        })}
                                        value="no"
                                        className={styles.radioInput}
                                    />
                                    <label className="pl-4">No</label>

                                    <br />
                                    <input
                                        type="radio"
                                        {...register('isInstrumental', {
                                            required: {
                                                value: true,
                                                message: 'Please select one ',
                                            },
                                        })}
                                        value="yes"
                                        className={styles.radioInput}
                                    />
                                    <label className="pl-4">Yes</label>
                                    <p className={styles.errorText}>
                                        {errors.isInstrumental?.message}
                                    </p>
                                </div>
                            </div>
                            {/* Preview Clip start Time */}
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>
                                    Preview clip start time ? <br />
                                    <span className="text-xs text-gray-300">
                                        TikTok, Apple Music, iTunes
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="radio"
                                        {...register('specifyPreview', {
                                            required: {
                                                value: true,
                                                message: 'Please select one ',
                                            },
                                        })}
                                        value="no"
                                        className={styles.radioInput}
                                    />
                                    <label className="pl-4">Let streaming services decide</label>
                                    <br />
                                    <input
                                        type="radio"
                                        {...register('specifyPreview', {
                                            required: {
                                                value: true,
                                                message: 'Please select one ',
                                            },
                                        })}
                                        value="yes"
                                        className={styles.radioInput}
                                    />
                                    <label className="pl-4">
                                        Let me specify when the good part starts
                                    </label>
                                    <p className={styles.errorText}>
                                        {errors.specifyPreview?.message}
                                    </p>
                                </div>
                            </div>
                            {/* Track Price  in Amazon & iTunes*/}
                            <div className={styles.inputContainer}>
                                <label htmlFor="trackPrice" className={styles.label}>
                                    Track Price <br />
                                    <span className="text-xs text-gray-300">
                                        in Amazon and iTunes
                                    </span>
                                </label>
                                <div className="relative">
                                    <Input
                                        {...register('trackPrice', {
                                            min: {
                                                value: 0.1,
                                                message: 'Price cannot be lower than 0.1',
                                            },
                                            required: { value: true, message: ' required' },
                                        })}
                                        type="number"
                                        placeholder="Enter Track Price"

                                    />
                                    <p className={styles.errorText}>{errors.trackPrice?.message}</p>
                                </div>
                            </div>
                            {/* Track Price in Matic */}
                            {/* TODO: [PMA-48] Allow users to choose which token they want payment in */}
                           
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