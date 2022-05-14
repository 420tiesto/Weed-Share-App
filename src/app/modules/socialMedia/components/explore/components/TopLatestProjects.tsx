import React from 'react';
import ProjectCard from './ProjectCard';

type Props = {};

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1648737119247-e93f56878edf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"

const TopLatestProjects = (props: Props) => {
    return <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center'>
      <ProjectCard imgSrc={PLACEHOLDER_IMAGE} title="Cold inner voice" username='coldInnerVoice' likeCount='52'/>
      <ProjectCard imgSrc={PLACEHOLDER_IMAGE} title="Cold inner voice" username='coldInnerVoice' likeCount='52'/>
      <ProjectCard imgSrc={PLACEHOLDER_IMAGE} title="Cold inner voice" username='coldInnerVoice' likeCount='52'/>
      <ProjectCard imgSrc={PLACEHOLDER_IMAGE} title="Cold inner voice" username='coldInnerVoice' likeCount='52'/>
      <ProjectCard imgSrc={PLACEHOLDER_IMAGE} title="Cold inner voice" username='coldInnerVoice' likeCount='52'/>
      <ProjectCard imgSrc={PLACEHOLDER_IMAGE} title="Cold inner voice" username='coldInnerVoice' likeCount='52'/>
      <ProjectCard imgSrc={PLACEHOLDER_IMAGE} title="Cold inner voice" username='coldInnerVoice' likeCount='52'/>
      <ProjectCard imgSrc={PLACEHOLDER_IMAGE} title="Cold inner voice" username='coldInnerVoice' likeCount='52'/>
      <ProjectCard imgSrc={PLACEHOLDER_IMAGE} title="Cold inner voice" username='coldInnerVoice' likeCount='52'/>
      <ProjectCard imgSrc={PLACEHOLDER_IMAGE} title="Cold inner voice" username='coldInnerVoice' likeCount='52'/>
    </div>;
};

export default TopLatestProjects;
