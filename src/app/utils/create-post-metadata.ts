/*
    (c) 2022 b.trax
    This code is licensed under GPLv3 license (see LICENSE for details)
*/

import { v4 as uuid } from 'uuid';
import { appId } from '../constants';

export const createPostMetadata = ({
    media,
    albumCover,
    albumName,
    albumCoverType,
    attributes,
}: {
    media: object[];
    albumName: string;
    albumCover: string;
    albumCoverType: string;
    // TODO: Add proper attributes type here
    attributes: any;
}) => {
    const metadata = {
        version: '1.0.0',
        metadata_id: uuid(),
        description: '',
        media,
        name: albumName,
        attributes,
        content: null,
        external_url: null,
        image: albumCover,
        imageMimeType: albumCoverType,
        appId: appId,
    };

    return metadata;
};
