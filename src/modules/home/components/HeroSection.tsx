import { HeartIcon, UserGroupIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/solid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../app/components/common-ui/atoms/Button';
import { CREATE_PROJECT, EXPLORE } from '../../../app/routes/Routes';

type Props = {};

const HeroSection = (props: Props) => {
    const navigate = useNavigate();

    const IMG_URL =
        'https://ca-times.brightspotcdn.com/dims4/default/f730f53/2147483647/strip/true/crop/2776x1689+0+0/resize/840x511!/format/webp/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ff5%2F9a%2F1016e5a9459aa1817820d58999c8%2Fla-me-illegal-pot-farms-invade-california-desert01.JPEG';
    return (
        <div className="h-[530px] relative overflow-y-hidden  flex gap-40 items-center justify-center hero-bg">
            <img
                src={IMG_URL}
                className="absolute w-full object-cover z-[-1] brightness-50 blur-md"
            />
            <div className="space-y-8">
                <h1 className="text-4xl font-semibold lg:text-6xl">
                    Post Your Stash! 
                     <br />
                    Become the Plug!
                </h1>
                <p className="text-white/80 lg:text-3xl text-2xl">
                    Become the local kingpin <br /> develop your trap.
                </p>

                <div className="space-x-4">
                    <Button onClick={() => navigate(EXPLORE)}>Find Buds</Button>
                    <Button outline className="text-white" onClick={() => navigate(CREATE_PROJECT)}>
                        Post Buds
                    </Button>
                </div>
                <a href="#" className="text-primary flex items-center gap-2">
                    <PlayIcon className="h-8 w-8" />
                    Learn more about WeedShare
                </a>
            </div>
            <div>
                <div className="rounded-[30px] shadow-2xl bg-dark-black ring-1 ring-white  overflow-hidden max-w-[420px] min-w-[320px] w-full">
                    <img src={IMG_URL} alt="hero-pic" className="h-[320px]" />
                    <div className="flex items-center justify-between py-4 px-8">
                        <div>
                            <p className="text-white/30 text-sm">$600/lb</p>
                            <p>Bubba Kush</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <UserGroupIcon className="h-6 w-6" />
                            2k
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
