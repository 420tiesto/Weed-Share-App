import { v4 as uuid } from 'uuid';
import { appId } from '../app/constants';
import { type MetadataMedia } from '../types';

export const createPostMetadata = ({
    media = [],
    budCover,
    budName,
    budCoverType,
    attributes,
    content = null,
    description = '',
}: {
    media?: MetadataMedia[];
    budName: string;
    budCover: string;
    budCoverType: string;
    content?: string | null;
    description?: string;
    // TODO: Add proper attributes type here
    attributes: any;
}) => {
    const metadata = {
        version: '1.0.0',
        metadata_id: uuid(),
        description,
        media,
        name: budName,
        attributes,
        content,
        external_url: null,
        image: budCover,
        imageMimeType: budCoverType,
        appId: appId,
    };

    return metadata;
};
