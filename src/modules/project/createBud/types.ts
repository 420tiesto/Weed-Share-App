import { SelectOption } from '../../../app/components/common-ui/atoms/SelectInput';

export interface MusicDetails {
    artistName: string;
    releaseDate: Date;
    recordLabel: string;
    language: SelectOption;
    primaryGenre: SelectOption;
    secondaryGenre?: string;
    budCover: string;
    budCoverType: string;
}
