import React, { useEffect } from 'react';
import CardItem from './CardItem';
import CreateProjectCard from './CreateProjectCard';

interface Props {
    ownedPublications: any[];
}

const PLACEHOLDER_IMAGE_SRC =
    'https://images.unsplash.com/photo-1651694451626-cceed8ee5f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80';

const ProjectsCreated: React.FC<Props> = (props: Props) => {
    const { ownedPublications } = props;

    return (
        <>
            {ownedPublications && ownedPublications.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow  gap-8 p-4">
                    {ownedPublications.map(
                        (pub: any): JSX.Element => (
                            <CardItem
                                text="Cold Inner fire"
                                likeCount={34}
                                subText="coldInnerFire"
                                imgSrc={PLACEHOLDER_IMAGE_SRC}
                            />
                        )
                    )}
                </div>
            ) : (
                <div className='flex items-center text-[28px] py-20 text-white/80 justify-center'>
                     Nothing to show here
                </div>
            )}
        </>
    );
};
export default ProjectsCreated;
