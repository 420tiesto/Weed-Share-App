import { Menu } from '@headlessui/react';
import MenuButton from './MenuButton';
import MenuItems from './MenuItems';
import { ArrowLeftIcon, CogIcon, LogoutIcon, UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SwitchUserIcon from '../../../icons/SwitchUserIcon';
import MenuAccountItem from './MenuAccountItem';
import { useAppDispatch } from '../../../../state/configure-store';
import { useSelector } from 'react-redux';
import { getUserHandle, getUserProfile } from '../../../../modules/auth/state/auth.reducer';
import { setUserAuthenticated } from '../../../../modules/auth/state/auth.action';
import { removeStorageValue } from '../../../../utils/local-storage/local-storage';
import {
    LENS_TOKENS,
    PRNTS_PRIVATE_KEY,
    PRNTS_PUBLIC_KEY,
    PRNTS_USER_HANDLE,
} from '../../../../utils/local-storage/keys';

type MenuState = 'default' | 'accounts';

interface Props {}

const UserMenu: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [menuState, setMenuState] = useState<MenuState>('default');

    const profileDetails = useSelector(getUserProfile);
    const userHandle = useSelector(getUserHandle);

    useEffect(() => {}, [profileDetails, userHandle]);

    const handleLogout = () => {
        // clear local storage
        // dispatch saying auth false
        // switch to normal user mode
        console.log('logout');
        removeStorageValue(PRNTS_PUBLIC_KEY);
        removeStorageValue(PRNTS_PRIVATE_KEY);
        removeStorageValue(PRNTS_USER_HANDLE);
        removeStorageValue(LENS_TOKENS);
        dispatch(setUserAuthenticated(false));
    };

    const styles = {
        menuContainer: `relative inline-block text-left`,
        menuItem: `hover:text-primary inline-flex items-center gap-2 px-4 py-2 w-full`,
    };
    return (
        <Menu as="div" className={styles.menuContainer}>
            <MenuButton
                name={profileDetails.name}
                handle={profileDetails.handle}
                imageURI={
                    Object.keys(profileDetails).length !== 0 && profileDetails?.picture?.original?.url
                        ? profileDetails?.picture?.original?.url
                        : "https://prnts.mypinata.cloud/ipfs/QmUDKC6zKTfDh25yNceRXRodi3R8MZZ5fKJFgVkkKwTGHt"
                }
            />
            {/* If menu is in default state */}
            <MenuItems>
                {menuState === 'default' && (
                    <>
                        {/* Profile */}
                        <Menu.Item as="div">
                            <Link
                                to={`/profile/${profileDetails.handle}`}
                                className={styles.menuItem}>
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
                            <Link to="/profile/settings" className={styles.menuItem}>
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
                <Menu.Item as="button" className={styles.menuItem} onClick={handleLogout}>
                    <LogoutIcon className="h-5 w-5" /> Log out
                </Menu.Item>
            </MenuItems>
        </Menu>
    );
};

export default UserMenu;
