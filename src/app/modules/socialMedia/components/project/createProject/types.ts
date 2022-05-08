import { SelectOption } from '../../../../../components/common-ui/AutocompleteSelect/Autocomplete';

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
