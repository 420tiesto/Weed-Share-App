import React from 'react';
import CardItem from './CardItem';

interface Props {
    ownedPublications: any[];
}

const PLACEHOLDER_IMAGE_SRC =
    'https://images.unsplash.com/photo-1651694451626-cceed8ee5f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80';

const ProjectsCreated: React.FC<Props> = (props: Props) => {
    const { ownedPublications } = props;
    // console.log(ownedPublications);
    return (
        <>
            {ownedPublications && ownedPublications.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow  gap-8 p-4">
                    <CardItem
                        text="Cold Inner fire"
                        likeCount={34}
                        subText="coldInnerFire"
                        imgSrc={PLACEHOLDER_IMAGE_SRC}
                    />
                    <CardItem
                        text="Cold Inner fire"
                        likeCount={34}
                        subText="coldInnerFire"
                        imgSrc={PLACEHOLDER_IMAGE_SRC}
                    />
                    <CardItem
                        text="Cold Inner fire"
                        likeCount={34}
                        subText="coldInnerFire"
                        imgSrc={PLACEHOLDER_IMAGE_SRC}
                    />
                    <CardItem
                        text="Cold Inner fire"
                        likeCount={34}
                        subText="coldInnerFire"
                        imgSrc={PLACEHOLDER_IMAGE_SRC}
                    />
                    <CardItem
                        text="Cold Inner fire"
                        likeCount={34}
                        subText="coldInnerFire"
                        imgSrc={PLACEHOLDER_IMAGE_SRC}
                    />
                    <CardItem
                        text="Cold Inner fire"
                        likeCount={34}
                        subText="coldInnerFire"
                        imgSrc={PLACEHOLDER_IMAGE_SRC}
                    />
                    <CardItem
                        text="Cold Inner fire"
                        likeCount={34}
                        subText="coldInnerFire"
                        imgSrc={PLACEHOLDER_IMAGE_SRC}
                    />
                </div>
            ) : (
                <div>No Projects Created</div>
            )}
        </>
    );
};
export default ProjectsCreated;
