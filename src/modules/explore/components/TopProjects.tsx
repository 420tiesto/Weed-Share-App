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
            <div className="items-center justify-center  w-full">
                <Loader />
            </div>
        );
    }
    return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  ">
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
