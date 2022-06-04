import React from 'react';
import { Card, CardBody, CardHeader } from '../../../app/components/common-ui/atoms/Card';
import NewsCategoryTag, { NewsTypes } from './NewsCategoryTag';

type Props = {
    username?: string;
    pfpSrc?: string;
    type: NewsTypes;
    title: string;
    children?: React.ReactNode;
};

const NewsFeedItem: React.FC<Props> = ({ type, pfpSrc, username, title, children }) => {
    return (
        <Card variant="elevated" color="dark" className="px-8 py-4 flex flex-col gap-4 relative rounded-[30px]">
            <NewsCategoryTag type={type} />
            <div className="flex items-center gap-4 ">
                <div className="h-12 w-12 bg-gray rounded-full">
                    <img src={pfpSrc} alt={username} />
                </div>
                <div>
                    <h6 className="font-medium text-lg">{title}</h6>
                </div>
            </div>

          {children && <div className='px-16 mb-4'>
            {children}
            </div>}
        </Card>
    );
};

export default NewsFeedItem;
