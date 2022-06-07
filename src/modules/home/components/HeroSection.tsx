import { HeartIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/solid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../app/components/common-ui/atoms/Button';
import { CREATE_PROJECT, EXPLORE } from '../../../app/routes/Routes';

type Props = {};

const HeroSection = (props: Props) => {
    const navigate = useNavigate();

    const IMG_URL =
        'https://images.unsplash.com/photo-1599931601414-696a3ddbd889?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
    return (
        <div className="h-[530px] relative overflow-y-hidden  flex gap-40 items-center justify-center hero-bg">
            <img
                src={IMG_URL}
                className="absolute w-full object-cover z-[-1] brightness-50 blur-md"
            />
            <div className="space-y-8">
                <h1 className="text-4xl font-semibold lg:text-6xl">
                    Connect, collaborate, and <br />
                    monetize your music
                </h1>
                <p className="text-white/80 lg:text-3xl text-2xl">
                    supplying the tools to take artist <br /> development into your own hands.
                </p>

                <div className="space-x-4">
                    <Button onClick={() => navigate(EXPLORE)}>Explore</Button>
                    <Button outline className="text-white" onClick={() => navigate(CREATE_PROJECT)}>
                        Create
                    </Button>
                </div>
                <a href="#" className="text-primary flex items-center gap-2">
                    <PlayIcon className="h-8 w-8" />
                    Learn more about PRNTS
                </a>
            </div>
            <div>
                <div className="rounded-[30px] shadow-2xl bg-dark-gray ring-1 ring-white  overflow-hidden max-w-[420px] min-w-[320px] w-full">
                    <img src={IMG_URL} alt="hero-pic" className="h-[320px]" />
                    <div className="flex items-center justify-between py-4 px-8">
                        <div>
                            <p className="text-white/30 text-sm">420Tiesto</p>
                            <p>Let me love you</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <HeartIcon className="h-6 w-6" />
                            2k
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
