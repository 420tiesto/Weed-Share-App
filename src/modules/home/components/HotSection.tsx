import React from 'react';
import { Link } from 'react-router-dom';
import { EXPLORE } from '../../../app/routes/Routes';
import ProjectCard from '../../explore/components/ProjectCard';

type Props = {};

const PLACEHOLDER_DATA = {
    id: '0x63-0x09',
    stats: { totalAmountOfCollects: 0, totalAmountOfComments: 0, totalAmountOfMirrors: 0 },
    metadata: {
        attributes: [
            {
                displayType: 'string',
                traitType: 'Artist Name',
                value: 'Post Malone',
                __typename: 'MetadataAttributeOutput',
            },
            {},
            {
                displayType: 'string',
                traitType: 'Record Label',
                value: 'Circles',
                __typename: 'MetadataAttributeOutput',
            },
            {},
            {},
            {},
            {
                displayType: 'string',
                traitType: 'Album Cover',
                value: 'https://prnts.mypinata.cloud/ipfs/QmWPJVko45pKSTXV3YoF88AL3dFBjaqRM6rwBgVRKax5Hq',
                __typename: 'MetadataAttributeOutput',
            },
        ],
    },
};

const HotSection = (props: Props) => {
    return (
        <div className="p-12 flex flex-col bg-dark-gray">
            <h2 className="text-2xl font-semibold mb-4">Hot in our collection</h2>
            <div className='flex justify-between'>
                <ProjectCard projectData={PLACEHOLDER_DATA} />
                <ProjectCard projectData={PLACEHOLDER_DATA} />

                <ProjectCard projectData={PLACEHOLDER_DATA} />
                <ProjectCard projectData={PLACEHOLDER_DATA} />
            </div>
            <div className="flex justify-end pr-8">
                <Link to={EXPLORE}>
                    <a className="text-primary mt-2 text-right">View More</a>
                </Link>
            </div>
        </div>
    );
};

export default HotSection;
