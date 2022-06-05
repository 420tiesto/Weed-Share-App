import { v4 as uuid } from 'uuid';
import { appId } from '../app/constants';
import { type MetadataMedia } from '../types';

export const createPostMetadata = ({
    media = [],
    albumCover,
    albumName,
    albumCoverType,
    attributes,
    content = null,
    description = '',
}: {
    media?: MetadataMedia[];
    albumName: string;
    albumCover: string;
    albumCoverType: string;
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
        name: albumName,
        attributes,
        content,
        external_url: null,
        image: albumCover,
        imageMimeType: albumCoverType,
        appId: appId,
    };

    return metadata;
};
