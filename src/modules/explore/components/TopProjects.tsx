import ProjectCard from './ProjectCard';
import { type SortCriteria, useGetExplorePublications } from '../services/explore-publication';
import Loader from '../../../app/components/common-ui/loader';

type Props = {
    sortCriteria: SortCriteria;
};

const TopProjects = ({ sortCriteria }: Props) => {
    const { data = {}, isLoading } = useGetExplorePublications(sortCriteria);
    const { data: { explorePublications: { items = [] } = {} } = {} } = data as any;
    if (isLoading) {
        return (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
                <Loader />
            </div>
        );
    }
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {items.map((item: any) => (
                <ProjectCard
                    key={item.id}
                    projectData={item}
                />
            ))}
        </div>
    );
};

export default TopProjects;
