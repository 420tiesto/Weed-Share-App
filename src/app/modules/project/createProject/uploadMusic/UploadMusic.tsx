import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Container from '../../../../components/common-ui/container/Container';
import { SelectOption } from '../../../../components/common-ui/AutocompleteSelect/Autocomplete';
import Upload from '../../../../components/common-ui/upload';
import Navbar from '../../../../components/header/navbar/Navbar';
import { copyright } from '../../../../constants';
import AutocompleteFormInput from './AutcompleteFormInput';
import { LightBulbIcon } from '@heroicons/react/solid';
type Props = {};

export interface AlbumDetails {
    artistName: string;
    releaseDate: Date;
    recordLabel: string;
    language: SelectOption;
    primaryGenre: SelectOption;
    secondaryGenre?: string;
    // albumCover
}

const LANGUAGES: SelectOption[] = [
    { name: 'English', id: 1, value: 'EN' },
    { name: 'Hindi', id: 2, value: 'HINDI' },
];

const GENRES: SelectOption[] = [
    { name: 'Pop', id: 1, value: 'Pop' },
    { name: 'EDM', id: 2, value: 'EDM' },
    { name: 'Classic', id: 3, value: 'Classic' },
    { name: 'Metal', id: 4, value: 'Metal' },
];

const UploadMusic = (props: Props) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AlbumDetails>({mode:'onBlur'});

    const onSubmit: SubmitHandler<AlbumDetails> = (data: AlbumDetails) => {
        console.log(data);
        console.log(errors);
    };

    return (
        <>
            <Navbar />
            <Container>
                <h1 className="text-2xl text-center mb-2 font-bold ">Upload Music</h1>
                <h2 className="text-xl mb-2 font-bold pl-8">Album details</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="lg:grid lg:grid-cols-2   justify-center divide-gray-600">
                    <div className="space-y-8 lg:p-8">
                        <div className="grid grid-cols-5 items-center">
                            <label className="col-span-2" htmlFor="artistName">
                                Artist / Band Name
                            </label>
                            <div className="relative col-span-3 items-center flex gap-2">
                                <input
                                    className="primary-input  w-full"
                                    placeholder="Enter artist / band name"
                                    type="text"
                                    {...register('artistName', {
                                        minLength: { value: 2, message: 'Too short' },
                                        maxLength: { value: 15, message: 'Too long' },
                                        required: {
                                            value: true,
                                            message: 'This field is required',
                                        },
                                    })}
                                />
                                <span className="relative group">
                                    <LightBulbIcon className="h-6 w-6 cursor-pointer text-yellow-500 " />
                                    <div className="text-xs bg-gray-900 text-gray-300 p-4 rounded-xl max-w-xs group-hover:block absolute top-8 z-10 w-80 hidden">
                                        <p>
                                            Important: Only list yourname, stage name, or band name.
                                            Do not include anyone else's name (without their
                                            permission), label name, "Presents...", etc.
                                        </p>
                                        <br />
                                        <p>
                                            Don't Use Emojis Here : Streaming services do not allow
                                            them and it could mess up your release.
                                        </p>
                                    </div>
                                </span>
                                <p className="text-red-500 text-sm absolute left-4 -bottom-6">
                                    {errors.artistName?.message}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 items-center">
                            <label className="col-span-2" htmlFor="releaseDate">
                                Release Date
                            </label>
                            <div className="relative col-span-3">
                                <input
                                    className="primary-input w-full"
                                    placeholder="Select release date"
                                    type="date"
                                    {...register('releaseDate', { required: true })}
                                />
                                <p className="text-red-500 text-sm absolute left-4 -bottom-6">
                                    {errors.releaseDate?.message}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 items-center">
                            <label className="col-span-2" htmlFor="releaseDate">
                                Record Label
                            </label>
                            <div className="relative col-span-3">
                                <input
                                    className="primary-input w-full"
                                    placeholder="Enter record label"
                                    type="text"
                                    {...register('recordLabel', {
                                        minLength: { value: 2, message: 'Too short' },
                                        maxLength: { value: 15, message: 'Too long' },
                                        required: {
                                            value: true,
                                            message: 'This field is required',
                                        },
                                    })}
                                />
                                <p className="text-red-500 text-sm absolute left-4 -bottom-6">
                                    {errors.recordLabel?.message}
                                </p>
                            </div>
                        </div>

                        <AutocompleteFormInput
                            label="Select Input"
                            options={LANGUAGES}
                            control={control}
                            name="language"
                            defaultValue={LANGUAGES[0]}
                        />

                        <AutocompleteFormInput
                            label="Select Primary Genre"
                            options={GENRES}
                            control={control}
                            name="primaryGenre"
                            defaultValue={GENRES[0]}
                        />

                        <div className="grid grid-cols-5 items-center">
                            <label className="col-span-2 relative" htmlFor="secondaryGenre">
                                Secondary Genre
                                <br />
                                <span className="text-xs absolute">Optional</span>
                            </label>
                            <div className="relative col-span-3">
                                <input
                                    className="primary-input col-span-3"
                                    placeholder="Enter secondary genre"
                                    type="text"
                                    {...register('secondaryGenre', {
                                        minLength: { value: 2, message: 'Too short' },
                                        maxLength: { value: 15, message: 'Too long' },
                                        required: {
                                            value: true,
                                            message: 'This field is required',
                                        },
                                    })}
                                />
                                <p className="text-red-500 text-sm absolute left-4 -bottom-6">
                                    {errors.secondaryGenre?.message}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center flex-col lg:justify-center">
                        <Upload
                            helpText=".jpg , .png or .gif extensions"
                            displayText="Album Cover"
                            uploadHelper={() => console.log('upload')}
                        />
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <button type="submit" className="green-btn max-w-fit px-10 ">
                            Next{' '}
                        </button>
                    </div>
                    <p className="mx-auto bottom-4 col-span-2">{copyright}</p>
                </form>
            </Container>
        </>
    );
};

export default UploadMusic;
