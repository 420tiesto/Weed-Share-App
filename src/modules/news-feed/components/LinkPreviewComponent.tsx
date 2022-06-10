import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../app/components/common-ui/atoms/Card';

type Props = {
    metadata: any;
};

const LinkPreviewComponent: React.FC<Props> = ({ metadata }) => {
    const { siteData } = metadata;

    useEffect(() => {
        console.log(metadata, 'qwqeqepq');
    }, [metadata]);
    // const metadata = {
    //     image: 'https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg',
    //     title: 'This is title ',
    //     siteName: 'SoundCloud',
    //     description: 'This is description',
    //     url:'xyz.com'
    //   };

    return (
        <>
            {Object.keys(metadata).length !== 0 ? (
                <Card variant="elevated" rounded="2xl" className="overflow-hidden">
                    <a href={metadata.url} target="_blank">
                        <div className="flex gap-4 items-center">
                            <div className="max-w-[140px] h-[140px] flex-1 bg-black overflow-hidden">
                                <img
                                    src={metadata?.image}
                                    className="object-center object-cover h-full w-full"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-white/30">{metadata?.siteName}</p>
                                <p className="font-bold mb-1">{metadata?.title}</p>
                                <p className="text-white/30 mb-4 max-w">{metadata?.description}</p>
                            </div>
                        </div>
                    </a>
                </Card>
            ) : (
                ''
            )}
        </>
    );
};

export default LinkPreviewComponent;
