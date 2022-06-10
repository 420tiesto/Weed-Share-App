import { PlusIcon } from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/components/common-ui/atoms/Button';
import { CREATE_PROJECT } from '../../../app/routes/Routes';
import CardItem from './CardItem';

interface Props {
    ownedPublications: any[];
}

const BudsCreated: React.FC<Props> = (props: Props) => {
    const { ownedPublications } = props;

    return (
        <>
            {ownedPublications && ownedPublications.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow gap-8 p-4">
                    {ownedPublications.map(
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
                    Nothing to show here
                    <Link to={CREATE_PROJECT}>
                        <Button icon={<PlusIcon className="h-5 w-5" />}>Create Bud</Button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default BudsCreated;
