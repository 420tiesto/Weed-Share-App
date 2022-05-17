import { SelectOption } from '../../../app/components/common-ui/atoms/SelectInput';

export interface AlbumDetails {
    artistName: string;
    releaseDate: Date;
    recordLabel: string;
    language: SelectOption;
    primaryGenre: SelectOption;
    secondaryGenre?: string;
    albumCover: string;
    albumCoverType: string;
}
