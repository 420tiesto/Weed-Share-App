import React, { useCallback, useEffect } from 'react';
import {
    SortCriteria,
    useGetExplorePublications,
} from '../../explore/services/explore-publication';
import FeatureSection from '../components/FeatureSection';
import HeroSection from '../components/HeroSection';
import HomepageFooter from '../components/HomepageFooter';
import HotSection from '../components/HotSection';
import TopProfiles from '../components/TopProfiles';

type Props = {};

const Home: React.FC<Props> = (props: Props) => {
    const getTopCollectedPosts = () => {
        // get top collected and pass to hotsection
    };
    return (
        <div>
            <HeroSection />
            <HotSection />
            {/* <TopProfiles/> */}
            <FeatureSection />
            <HomepageFooter />
        </div>
    );
};

export default Home;
