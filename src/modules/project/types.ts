import { SelectOption } from '../../app/components/common-ui/atoms/SelectInput';
import { type MimeType } from '../../types';

export interface MusicDetails {
    artistName: string;
    releaseDate: Date;
    recordLabel: string;
    language: SelectOption;
    primaryGenre: SelectOption;
    secondaryGenre: string;
    budCover: string;
    budCoverType: string;
    budPrice?: number;
}

export interface TrackDetails {
    songTitle: string;
    hasFeaturedArtist: boolean;
    isRadioEdit: boolean;
    audioFile: string;
    audioFileType: MimeType;
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
