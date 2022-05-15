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
        <div onClick={onCardClick}>
            <Card
                variant="elevated"
                color="dark"
                rounded="2xl"
                className="max-w-[280px] cursor-pointer hover:scale-105 ease-out duration-200 transition-transform">
                <div className="h-[200px]">
                    <img src={albumCover} alt="" className="h-full object-cover object-center" />
                </div>
                <div className="p-4 shadow-bottom">
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
