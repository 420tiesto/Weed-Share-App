import React from 'react';
import Navbar from '../../../../components/header/navbar/Navbar';
import Avatar from '../components/Avatar';
import { LightBulbIcon } from '@heroicons/react/solid';
import TwitterIcon from '../../../../icons/TwitterIcon';

type Props = {};

const ProfileSettings = (props: Props) => {
    return (
        <>
            <div className=" mx-auto flex flex-col gap-8 items-center justify-center max-w-screen-xl min-h-screen sunken-element">
                <h1 className="text-4xl font-bold">Profile Settings</h1>
                <div className="flex gap-4">
                    <div className="p-8 col-span-5">
                        <div className="flex items-center gap-8">
                            {/* Profile Image */}
                            <div className="flex flex-col gap-4 items-center justify-center">
                                <p className="flex gap-2 text-lg items-center">
                                    Profile Image
                                    <span>
                                        <LightBulbIcon className="text-yellow-500 h-5 w-5" />
                                    </span>
                                </p>
                                <div className="h-32 w-32 rounded-full overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" />
                                </div>
                            </div>
                            {/* Profile Banner */}
                            <div className="flex flex-col gap-4 items-center justify-center">
                                <p className="flex gap-2 text-lg items-center">
                                    Profile Banner
                                    <span>
                                        <LightBulbIcon className="text-yellow-500 h-5 w-5" />
                                    </span>
                                </p>
                                <div className="h-32 w-56 rounded-xl overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" />
                                </div>
                            </div>
                        </div>
                        <form className="space-y-4 mt-4">
                            <div className="flex flex-col gap-3">
                                <label htmlFor="username" className="pl-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter username"
                                    className="primary-input max-w-sm"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="bio" className="pl-2">
                                    Bio
                                </label>
                                <textarea
                                    rows={4}
                                    id="bio"
                                    placeholder="Tell the world hyoutr story"
                                    className="primary-input max-w-sm rounded-2xl"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="email" className="pl-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter username"
                                    className="primary-input max-w-sm"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex ">
                        <div className="w-[2px] h-[70%] bg-gray-300 my-auto"></div>
                    </div>
                    <div className="p-8">
                        <h6 className="text-lg font-medium">Social Connections</h6>
                        <p className=" text-gray-500">
                            Help collectors verify your account by connecting Twitter
                        </p>
                        <div className="flex mt-6 items-center justify-between">
                            <svg
                                width={70}
                                height={70}
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m33.952 28.448.073 1.212-1.224-.149c-4.456-.568-8.348-2.496-11.653-5.734l-1.616-1.606-.416 1.186c-.881 2.645-.319 5.438 1.518 7.316.979 1.038.759 1.186-.93.568-.588-.197-1.102-.346-1.151-.271-.172.172.416 2.422.881 3.311.637 1.236 1.934 2.447 3.354 3.164l1.2.569-1.42.024c-1.371 0-1.42.025-1.273.544.49 1.606 2.423 3.312 4.578 4.053l1.518.52-1.322.79a13.783 13.783 0 0 1-6.561 1.83c-1.102.024-2.008.123-2.008.197 0 .247 2.987 1.631 4.725 2.175 5.215 1.607 11.408.915 16.06-1.829 3.305-1.953 6.61-5.833 8.153-9.59.832-2.002 1.664-5.66 1.664-7.415 0-1.136.074-1.285 1.445-2.644.808-.791 1.567-1.656 1.713-1.903.245-.47.22-.47-1.028-.05-2.08.742-2.375.643-1.346-.47.759-.79 1.664-2.224 1.664-2.644 0-.074-.367.05-.783.272-.44.247-1.42.618-2.154.84l-1.322.42-1.2-.815c-.661-.445-1.591-.94-2.081-1.088-1.249-.346-3.158-.296-4.284.1-3.06 1.111-4.995 3.979-4.774 7.117Z"
                                    fill="#8A939B"
                                />
                            </svg>
                            <p className="flex-1 pl-1">Twitter</p>
                            <button className="green-btn max-w-fit px-6">Connect</button>
                        </div>
                        <div className="flex mt-6 items-center justify-between">
                            <svg
                                width={43}
                                height={20}
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="m-4">
                                <g clipPath="url(#a)" fill="#8A939B">
                                    <path d="M30.182 20h-7.536c-.724 0-.911-.194-.911-.955 0-5.813 0-11.626-.014-17.426 0-.484.134-.76.59-.94 5.699-2.34 12.309 1.716 13.02 8.013.053.457.214.374.509.277 2.99-.983 6.127.761 6.959 3.862.831 3.086-.952 6.228-3.982 7.017a5.27 5.27 0 0 1-1.395.166C35.01 20 32.595 20 30.182 20ZM18.155 9.98V3.35c0-.194-.014-.374.08-.554a.543.543 0 0 1 .523-.332c.241.013.429.138.496.373.054.194.067.402.067.61.08 3.584.188 7.155.201 10.74.014 1.688-.134 3.39-.2 5.08-.014.4-.148.747-.604.733-.443-.014-.55-.374-.563-.775-.108-2.685-.322-5.37 0-9.246ZM15.66 10.934c.189 2.284.068 5.163-.147 8.042a8.183 8.183 0 0 1-.053.567c-.054.277-.242.43-.496.415-.255-.013-.43-.18-.456-.47-.04-.623-.054-1.246-.107-1.869-.282-2.823-.081-5.66-.027-8.498.026-1.48.08-2.976.12-4.457.014-.346.08-.65.47-.664.415-.014.522.304.522.664.054 1.91.108 3.793.175 6.27ZM11.893 9.882c.04 2.118.201 3.834.107 5.55-.08 1.33-.187 2.658-.281 3.987-.014.29-.094.54-.402.553-.349.014-.416-.263-.443-.567-.362-3.557-.268-7.114-.12-10.671.053-1.315.093-2.63.133-3.945.014-.305.04-.595.403-.595.389-.014.429.29.442.609.04 1.827.107 3.654.161 5.08ZM7.12 11.682c.067-1.592.12-2.796.174-4.014.013-.166.013-.346.027-.512.027-.208.107-.388.335-.388.255 0 .335.18.349.415.053 1.01.12 2.035.174 3.045.067 1.135.107 2.284.188 3.419.107 1.453-.148 2.893-.215 4.346-.027.498-.094.997-.12 1.495-.014.249-.081.47-.363.47-.268-.013-.335-.249-.348-.484-.188-2.727-.51-5.44-.201-7.792ZM3.432 14.713c.121-1.633.255-3.253.376-4.872.013-.18.027-.415.281-.415.255 0 .255.221.282.415.134 1.44.295 2.893.375 4.332.094 1.605-.241 3.197-.335 4.803a8.121 8.121 0 0 1-.053.567c-.014.18-.108.305-.282.29-.16 0-.228-.124-.241-.276-.04-.443-.08-.9-.121-1.342l-.282-3.502ZM1.26 14.713C1.1 16.028.925 17.329.764 18.63c-.013.124-.04.263-.174.277-.174.013-.215-.139-.228-.291-.201-2.062-.603-4.11-.188-6.187.108-.554.121-1.135.188-1.702.013-.139.027-.305.201-.319.188-.014.201.152.215.29.16 1.357.322 2.686.482 4.015Z" />
                                </g>
                                <defs>
                                    <clipPath id="a">
                                        <path fill="#fff" d="M0 0h43v20H0z" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className="flex-1">Soundcloud</p>
                            <button className="green-btn max-w-fit px-6">Connect</button>
                        </div>
                        <div className="mt-6 space-y-4">
                            <p className="font-medium">Links</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Your instagram handle"
                                    className="primary-input max-w-sm"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Link to spotify account url"
                                    className="primary-input max-w-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <p className="font-medium">Wallet address</p>
                            <input
                                type="text"
                                value={'0xAF1cB165fC9e95769292f6af8b106395f346bb77'}
                                className="primary-input max-w-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSettings;
