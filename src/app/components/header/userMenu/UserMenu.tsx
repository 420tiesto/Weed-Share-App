import { Menu } from '@headlessui/react';
import MenuButton from './MenuButton';
import MenuItems from './MenuItems';
import { ArrowLeftIcon, CogIcon, LogoutIcon, UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SwitchUserIcon from '../../../icons/SwitchUserIcon';
import MenuAccountItem from './MenuAccountItem';

type MenuState = 'default' | 'accounts';

const UserMenu = () => {
    const [menuState, setMenuState] = useState<MenuState>('default');

    const styles = {
        menuContainer: `relative inline-block text-left`,
        menuItem: `hover:text-primary inline-flex items-center gap-2 px-4 py-2 w-full`,
    };
    return (
        <Menu as="div" className={styles.menuContainer}>
            <MenuButton />
            {/* If menu is in default state */}
            <MenuItems>
                {menuState === 'default' && (
                    <>
                        {/* Profile */}
                        <Menu.Item as="div">
                            <Link to="/profile" className={styles.menuItem}>
                                <UserCircleIcon className="h-5 w-5" />
                                Profile
                            </Link>
                        </Menu.Item>
                        {/* Switch Accounts */}
                        <button
                            onClick={() => setMenuState('accounts')}
                            className={styles.menuItem}>
                            <SwitchUserIcon />
                            Switch account
                        </button>
                        <Menu.Item as="div">
                            <Link to="/profile-settings" className={styles.menuItem}>
                                <CogIcon className="h-5 w-5" />
                                Settings
                            </Link>
                        </Menu.Item>
                    </>
                )}
                {menuState === 'accounts' && (
                    <>
                        {/* Go back to default */}
                        <button onClick={() => setMenuState('default')} className={styles.menuItem}>
                            <ArrowLeftIcon className="h-5 w-5" />
                            Accounts
                        </button>
                        <div className="flex flex-col">
                            <MenuAccountItem
                                imgSrc="https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80"
                                onClick={() => console.log('account changed')}
                                username="Memories of moon"
                                isCurrent
                            />
                            <MenuAccountItem
                                imgSrc="https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80"
                                onClick={() => console.log('account changed')}
                                username="Harrish"
                            />
                            <MenuAccountItem
                                imgSrc="https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80"
                                onClick={() => console.log('account changed')}
                                username="Tiesto"
                            />
                        </div>
                    </>
                )}
                {/* Logout */}
                <Menu.Item as="button" className={styles.menuItem}>
                    <LogoutIcon className="h-5 w-5" /> Log out
                </Menu.Item>
            </MenuItems>
        </Menu>
    );
};

export default UserMenu;
