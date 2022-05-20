import { SelectOption } from '../../app/components/common-ui/atoms/SelectInput';

export interface AlbumDetails {
    artistName: string;
    releaseDate: Date;
    recordLabel: string;
    language: SelectOption;
    primaryGenre: SelectOption;
    secondaryGenre: string;
    albumCover: string;
    albumCoverType: string;
    albumPrice?: number;
}

export interface TrackDetails {
    songTitle: string;
    hasFeaturedArtist: boolean;
    isRadioEdit: boolean;
    audioFile: string;
    audioFileType: string;
    songType: 'original' | 'cover';
    songWriterFirstName: string;
    songWriterLastName: string;
    hasExplicitLyrics: boolean;
    isInstrumental: boolean;
    specifyPreview: boolean;
    trackPrice: number;
    maticTrackPrice: number;
    ipfsHash?: string;
    id: string;
}
