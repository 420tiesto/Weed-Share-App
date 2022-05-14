import { HeartIcon } from '@heroicons/react/outline';
import React from 'react';
import { Card } from '../../../../../components/common-ui/atoms/Card';

interface Props {
  imgSrc:string,
  likeCount:string,
  title:string,
  username:string
};

const ProjectCard:React.FC<Props> = ({imgSrc,likeCount=0,title,username}) => {
    return (
            <Card variant="elevated" color='dark' rounded="2xl" className="max-w-[280px] cursor-pointer hover:scale-105 ease-out duration-200 transition-transform">
                <div className="h-[200px]">
                    <img src={imgSrc} alt="" className="h-full object-cover object-center" />
                </div>
                <div className="p-4 shadow-bottom">
                    <p className="text-slate-500 text-sm font-medium">{username}</p>
                    <p className="font-semibold">{title}</p>
                </div>
                <button className="flex w-full items-center gap-2 justify-end p-4">
                    <HeartIcon className="h-6 w-6" />
                    {likeCount}
                </button>
            </Card>
    
    );
};

export default ProjectCard;
