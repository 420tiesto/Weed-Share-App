import { FormEvent, useState, SyntheticEvent, ChangeEvent, MouseEventHandler, MouseEvent } from 'react';

export interface ICreateProfileProps {}

const CreateProfile = (props: ICreateProfileProps) => {
    const [handle, setHandle] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHandle(event.target.value);
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {};

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input onChange={handleChange} type="text" value={handle} />
            <button onClick={handleClick}>Create Profile</button>
        </div>
    );
};

export default CreateProfile;
