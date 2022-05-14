import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { NavlinkType } from './Navbar';

const Navlink = ({ href, name }: NavlinkType) => {
  let resolved = useResolvedPath(href);
  let match = useMatch({ path: resolved.pathname, end: true });
    return (
        <Link to={href}>
            <div
                className={clsx(
                    {
                        'bg-primary/90 text-black ': match,
                        'hover:bg-white/10 ':!match
                      },
                    'px-3 py-1 rounded-lg font-medium duration-200 ease-out transition-colors  '
                )}>
                {name}
            </div>
        </Link>
    );
};

export default Navlink;
