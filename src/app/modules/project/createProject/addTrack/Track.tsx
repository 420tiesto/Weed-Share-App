import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon, UploadIcon } from '@heroicons/react/outline';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
    index: number;
};

interface TrackDetails {
    songTitle: string;
    hasFeaturedArtist: boolean;
    isRadioEdit: boolean;
    // audioFile: File
    songType: 'original' | 'cover';
    songWriterFirstName: string;
    songWriterLastName: string;
    hasExplicitLyrics: boolean;
    isInstrumental: boolean;
    specifyPreview: boolean;
    trackPrice: number;
    maticTrackPrice: number;
}

const Track = ({ index }: Props) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<TrackDetails>({ mode: 'onBlur' });

    const onSubmit: SubmitHandler<TrackDetails> = (data: TrackDetails) => {
        console.log(data);
    };

    const styles = {
        disclosure: `elevated-element py-3 flex gap-4  px-6 rounded-full w-full`,
        disclosureText: `flex-grow text-left`,
        trashIcon: `h-5 w-5 text-red-500`,
        chevronIcon: `text-primary h-5 w-5`,
        formContainer: `divide-y divide-gray-600`,
        inputContainer: `flex flex-wrap md:gap-12 items-center px-4 py-8`,
        label: `max-w-[180px] flex-grow`,
        textInput: `primary-input max-w-md`,
        errorText: `text-red-500 text-sm absolute  -bottom-6`,
        radioInput: `h-5 w-5 relative top-1`,
    };

    return (
        <Disclosure defaultOpen={index == 0 ? true : false}>
            {({ open }) => (
                <>
                    <Disclosure.Button className={styles.disclosure}>
                        <p className={styles.disclosureText}> Track {index + 1} </p>
                        <TrashIcon className={styles.trashIcon} />
                        {open && <ChevronUpIcon className={styles.chevronIcon} />}
                        {!open && <ChevronDownIcon className={styles.chevronIcon} />}
                    </Disclosure.Button>
                    <Disclosure.Panel>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                            {/* Song Title */}
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>Song Title</label>
                                <div className="relative">
                                    <input
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
                                        className={styles.textInput}
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
                                    <div className="border-dashed border-2 border-gray-400 p-4 flex flex-col items-center justify-center rounded-2xl">
                                        <UploadIcon className="h-10 w-10" />
                                        <p className=" font-medium">Upload audio file</p>
                                        <span className="text-xs text-gray-400">
                                            WAV, MP3, M4A, FLAC, AIFF, WMA
                                        </span>
                                    </div>
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
                                            <input
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
                                                className={styles.textInput}
                                            />
                                            <p className={styles.errorText}>
                                                {errors.songWriterFirstName?.message}
                                            </p>
                                        </div>
                                        <div className="relative">
                                            <input
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
                                                className={styles.textInput}
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
                                <div className='relative flex-grow'>
                                    <input
                                        type="radio"
                                        {...register('isRadioEdit', {
                                            required: { value: true, message: ' required' },
                                        })}
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
                                <label htmlFor="song-title" className={styles.label}>
                                    Track Price <br />
                                    <span className="text-xs text-gray-300">
                                        in Amazon and iTunes
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('trackPrice', {
                                            min: {
                                                value: 0.1,
                                                message: 'Price cannot be lower than 0.1',
                                            },
                                            required: { value: true, message: ' required' },
                                        })}
                                        type="number"
                                        placeholder="Enter Track Price"
                                        className="primary-input max-w-md"
                                    />
                                    <p className={styles.errorText}>{errors.trackPrice?.message}</p>
                                </div>
                            </div>
                            {/* Track Price in Matic */}
                            <div className={styles.inputContainer}>
                                <label htmlFor="song-title" className={styles.label}>
                                    Track Price <br />
                                    <span className="text-xs text-gray-300"> in Matic</span>
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('maticTrackPrice', {
                                            min: {
                                                value: 0.1,
                                                message: 'Price cannot be lower than 0.1',
                                            },
                                            required: { value: true, message: ' required' },
                                        })}
                                        type="number"
                                        step={0.1}
                                        placeholder="Enter Track Price (in Matic)"
                                        className="primary-input max-w-md"
                                    />
                                    <p className={styles.errorText}>
                                        {errors.maticTrackPrice?.message}
                                    </p>
                                </div>
                            </div>
                            <button type="submit" className="white-btn px-10 max-w-fit">
                                {' '}
                                Save Track{' '}
                            </button>
                        </form>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};
export default Track;
