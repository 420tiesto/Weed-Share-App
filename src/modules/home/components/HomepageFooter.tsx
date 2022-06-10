import React from 'react';
import { Link } from 'react-router-dom';
import Stack from '../../../app/components/common-ui/atoms/Stack';

type Props = {};

type FooterLink = {
    name: string;
    href: string;
};

const HELP_LINK:FooterLink[] = [
  {name:'Help Center',href:'#'},
  {name:'Support',href:'#'},
]
const SOCIAL_LINKS: FooterLink[] = [
    { name: 'Blog', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Discord', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'TikTok', href: '#' },
    { name: 'YouTube', href: '#' },
];

const OTHER_LINKS:FooterLink[] = [
    { name: 'Jobs', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Associated Risks', href: '#' },
    
];

const HomepageFooter = (props: Props) => {
    return (
        <div className="bg-dark-black grid grid-cols-4 p-8 px-12 relative top-16">
            <div>
                <Link to="/">
                    <a>
                        <img src="/prnts-logo.svg" alt="prnts" className="h-10 pr-24" />
                    </a>
                </Link>
            </div>
            <Stack>
                {HELP_LINK.map((item) => (
                  <a href={item.href}>{item.name}</a>
                ))}
            </Stack>
            <Stack>
            {SOCIAL_LINKS.map((item) => (
                  <a href={item.href}>{item.name}</a>
                ))}
            </Stack>
            <Stack>
            {OTHER_LINKS.map((item) => (
                  <a href={item.href}>{item.name}</a>
                ))}
            </Stack>
        </div>
    );
};

export default HomepageFooter;
