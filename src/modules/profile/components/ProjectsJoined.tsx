import { ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/components/common-ui/atoms/Button';
import { EXPLORE } from '../../../app/routes/Routes';
import CardItem from './CardItem';

interface Props {
    collectedPublications: any[];
}

const PLACEHOLDER_IMAGE_SRC =
    'https://images.unsplash.com/photo-1651694451626-cceed8ee5f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80';

const ProjectsJoined: React.FC<Props> = (props: Props) => {
    const { collectedPublications } = props;
    return (
        <>
            {collectedPublications && collectedPublications.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow  gap-8 p-4">
                    {collectedPublications.map(
                        (pub: any): JSX.Element => (
                            <CardItem
                                key={pub.id}
                                text={pub?.metadata?.name || ''}
                                likeCount={pub?.stats?.totalAmountOfCollects || 0}
                                subText={pub?.metadata?.attributes[0]?.value}
                                imgSrc={pub?.metadata?.attributes[6]?.value}
                            />
                        )
                    )}
                </div>
            ) : (
                <div className="flex items-center text-[28px] py-20 text-white/80 justify-center flex-col gap-4">
                    No projects joined
                    <Link to={EXPLORE}>
                        <Button className="flex items-center gap-3">
                            Go to Explore <ChevronRightIcon className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            )}
        </>
    );
};
export default ProjectsJoined;
