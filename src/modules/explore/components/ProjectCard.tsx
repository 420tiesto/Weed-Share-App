import { HeartIcon } from '@heroicons/react/outline';
import React from 'react';
import { Card } from '../../../app/components/common-ui/atoms/Card';
import { PLACEHOLDER_IMAGE } from '../../../app/constants';
import { useNavigate } from 'react-router-dom';

interface Props {
    projectData: any;
}

const ProjectCard: React.FC<Props> = ({ projectData }) => {
    const navigate = useNavigate();
    const { metadata, id, stats } = projectData;
    const albumCover = metadata.attributes[6].value || PLACEHOLDER_IMAGE;
    const username = metadata.attributes[0].value;
    const title = metadata.attributes[2].value;
    const onCardClick = () => navigate(`/project/${id}`);
    return (
        <div className="inline-block w-72 m-8" onClick={onCardClick}>
            <Card
                variant="elevated"
                color="dark"
                className="max-w-[290px] border border-slate-300   rounded-[30px] cursor-pointer overflow-hidden hover:scale-105 ease-out duration-200 transition-transform">
                <div className="h-[185px]">
                    <img src={albumCover} alt="" className="h-full w-full object-cover object-center" />
                </div>
                <div className="px-6 py-2 shadow-bottom border-b border-slate-700">
                    <p className="text-slate-500 text-sm font-medium">{username}</p>
                    <p className="font-semibold">{title}</p>
                </div>
                <button className="flex w-full items-center gap-2 justify-end p-4">
                    <HeartIcon className="h-6 w-6" />
                    {stats.totalAmountOfCollects}
                </button>
            </Card>
        </div>
    );
};

export default ProjectCard;
