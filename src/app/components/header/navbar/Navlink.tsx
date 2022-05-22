import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { NavlinkType } from './Navbar';


type NavlinkProps = {
    href: string;   
    children:React.ReactNode
};

type AuthNavlinkProps = {
    authState: boolean;
    href: string;   
    children:React.ReactNode
};

const Navlink = ({ href, children }: NavlinkProps) => {
    let resolved = useResolvedPath(href);
    let match = useMatch({ path: resolved.pathname, end: true });
    return (
        <Link to={href}>
            <div
                className={clsx(
                    {
                        'bg-primary/90 text-black ': match,
                        'hover:bg-white/10 ': !match,
                    },
                    'px-3 py-1 rounded-lg font-medium duration-200 ease-out transition-colors  '
                )}>
                {children}
            </div>
        </Link>
    );
};

export default Navlink;

export const AuthenticatedNavlink = ({ authState=false, href, children }: AuthNavlinkProps) => {
    if (authState) {
        return <Navlink href={href}>{children}</Navlink>;
    } else {
        return (
            <Link to={'/login'}>
                <div className="px-3 hover:bg-white/10 py-1 rounded-lg font-medium duration-200 ease-out transition-colors ">
                    {children}
                </div>
            </Link>
        );
    }
};
