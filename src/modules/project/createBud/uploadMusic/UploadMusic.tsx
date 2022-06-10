import React, { useState, useImperativeHandle, useRef, forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AutocompleteFormInput from './AutcompleteFormInput';
import { LightBulbIcon } from '@heroicons/react/solid';
import { type MusicDetails } from '../../types';
import { storeMusicDetails } from '../../state/actions';
import { useSelector } from 'react-redux';
import { getMusicDetails } from '../../state/selectors';
import { useAppDispatch } from '../../../../state/configure-store';
import { pinImageToIPFS } from '../../../../utils/upload-file';
import Upload from '../../../../app/components/common-ui/upload-image/UploadImage';
import getIPFSImageLink from '../../../../utils/get-ipfs-url-link';
import { SelectOption } from '../../../../app/components/common-ui/atoms/SelectInput';
import { Input } from '../../../../app/components/common-ui/atoms/Input';
import { Card, CardBody } from '../../../../app/components/common-ui/atoms/Card';

type Props = {};

const LANGUAGES: SelectOption[] = [
    { name: 'USPS', id: 1, value: 'BLUE' },
    { name: 'UPS', id: 2, value: 'BROWN' },
    { name: 'FEDEX', id: 2, value: 'FED' },
    { name: 'LOCAL', id: 2, value: 'LOC' },
];

const AMOUNTS: SelectOption[] = [
    { name: '8th', id: 1, value: '8th' },
    { name: 'Quarter', id: 2, value: 'Quarter' },
    { name: 'Ounce', id: 3, value: 'Ounce' },
    { name: 'Pound', id: 4, value: 'Pound' },
];

const UploadMusic = forwardRef(({}: Props, ref: any) => {
    const [loader, setLoader] = useState(false);
    const budDetails = useSelector(getMusicDetails);

    const dispatch = useAppDispatch();
    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<MusicDetails>({
        mode: 'onBlur',
        defaultValues: {
            ...budDetails,
        },
    });

    const onSubmit: SubmitHandler<MusicDetails> = async (data: MusicDetails) => {
        console.log(data);
        dispatch(storeMusicDetails(data));
    };

    const uploadMusicCover = async (files: any) => {
        setLoader(true);
        const file = files[0];
        const { type } = file;
        const ipfsData = await pinImageToIPFS(file);
        const { IpfsHash: ipfsHash } = ipfsData;
        setValue('budCover', ipfsHash);
        setValue('budCoverType', type);
        setLoader(false);
    };

    useImperativeHandle(ref, () => ({
        onSubmit({ onSuccess }: { onSuccess: any }) {
            handleSubmit(onSuccess)();
        },
    }));

    return (
        <Card variant="elevated" className="rounded-[30px]">
        <CardBody padding={8}>
            <h2 className="text-xl mb-4 font-medium  ">Bud Details</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid lg:grid-cols-5  md:divide-x-2 divide-white/50 justify-center divide-black-600">
                <div className="space-y-8 col-span-3 pl-4 pr-32">
                    <div className="grid grid-cols-5 items-center">
                        <label className="col-span-2" htmlFor="artistName">
                            Brand Name
                        </label>
                        <div className="relative col-span-3 items-center flex gap-2">
                            <Input
                                placeholder="Enter brand name"
                                type="text"
                                {...register('artistName', {
                                    minLength: { value: 2, message: 'Too short' },
                                    maxLength: { value: 25, message: 'Too long' },
                                    required: {
                                        value: true,
                                        message: 'This field is required',
                                    },
                                })}
                            />
                            <span className="relative group">
                                <LightBulbIcon className="h-6 w-6 cursor-pointer text-yellow-500 " />
                                <div className="text-xs border-white border bg-black text-black-300 p-4 rounded-xl max-w-xs group-hover:block absolute top-8 z-10 w-80 hidden">
                                    <p>
                                        Important: Only list yourname, stage name, or brand name. Do
                                        not include anyone else's name (without their permission),
                                        label name, "Presents...", etc.
                                    </p>
                                    <br />
                                    <p>
                                        Don't Use Emojis Here : Streaming services do not allow them
                                        and it could mess up your release.
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
                            Delivery Date
                        </label>
                        <div className="relative col-span-3">
                            <Input
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
                        <label className="col-span-2" htmlFor="recordLabel">
                            Strain Name
                        </label>
                        <div className="relative col-span-3">
                            <Input
                                placeholder="Enter strain name"
                                type="text"
                                {...register('recordLabel', {
                                    minLength: { value: 2, message: 'Too short' },
                                    maxLength: { value: 25, message: 'Too long' },
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
                        label="Select Delivery Method"
                        options={LANGUAGES}
                        control={control}
                        name="language"
                        placeholder="Delivery Method"
                        defaultValue={LANGUAGES[0]}
                    />

                    <AutocompleteFormInput
                        label="Select Amount"
                        options={AMOUNTS}
                        control={control}
                        placeholder="Select Amount"
                        name="primaryGenre"
                        defaultValue={AMOUNTS[0]}
                    />

                    <div className="grid grid-cols-5 items-center">
                        <label className="col-span-2 relative" htmlFor="secondaryGenre">
                            Stealth Details
                            <br />
                            <span className="text-xs absolute">Optional</span>
                        </label>
                        <div className="relative col-span-3">
                            <Input
                                placeholder="Stealth Details"
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
                    <div className="grid grid-cols-5 items-center">
                        <label className="col-span-2 relative" htmlFor="secondaryGenre">
                            Bud Price
                            <br />
                        </label>
                        <div className="relative col-span-3">
                            <Input
                                {...register('budPrice')}
                                type="number"
                                min={0}
                                placeholder="Enter Bud Price (in Matic)"
                            />
                            <p className="text-red-500 text-sm absolute left-4 -bottom-6">
                                {errors.budPrice?.message}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center col-span-2 flex-col lg:justify-center">
                    <Controller
                        name="budCover"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => {
                            const { value } = field;
                            return (
                                <Upload
                                    showLoader={loader}
                                    helpText=".jpg , .png or .gif extensions"
                                    displayText="Bud Cover"
                                    uploadHelper={uploadMusicCover}
                                    imageLink={value ? getIPFSImageLink(value) : ''}
                                />
                            );
                        }}
                    />
                </div>
            </form>
            </CardBody>
        </Card> 
    );
});

export default UploadMusic;
