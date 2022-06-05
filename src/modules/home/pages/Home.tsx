import React, { useEffect } from 'react';
import FeatureSection from '../components/FeatureSection';
import HeroSection from '../components/HeroSection';
import HomepageFooter from '../components/HomepageFooter';
import HotSection from '../components/HotSection';
import TopProfiles from '../components/TopProfiles';

type Props = {};

const Home: React.FC<Props> = (props: Props) => {
    return (
        <div>
            <HeroSection/>
            <HotSection />
            <TopProfiles/>
            <FeatureSection/>
            <HomepageFooter/>
        </div>
    )
};

export default Home;
