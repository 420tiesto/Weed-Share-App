import { v4 as uuid } from 'uuid';
import { appId } from '../app/constants';

export const createProfileMetadata = ({
    name,
    bio,
    cover_picture,
    attributes,
}: {
    name: string;
    bio: string;
    cover_picture: string;
    // TODO: Add proper attributes type here
    attributes: any;
}) => {
    const metadata = {
        version: '1.0.0',
        metadata_id: uuid(),
        description: '',
        name: name,
        bio: bio,
        cover_picture: cover_picture,
        attributes: attributes,
    };

    return metadata;
};
