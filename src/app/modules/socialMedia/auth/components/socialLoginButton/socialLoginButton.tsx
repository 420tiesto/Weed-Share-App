interface ButtonProps {
    triggerLogin?: () => void;
    children: any;
}

// Replace style with tailwind css styles
const style = {
    background: '#eee',
    border: '1px solid black',
    borderRadius: '3px',
    display: 'inline-block',
    margin: '5px',
    padding: '10px 20px',
    color: '#222',
};

const Button: React.FC<ButtonProps> = ({ children, triggerLogin, ...props }) => {
    return (
        <>
            <div onClick={triggerLogin} style={style} {...props}>
                {children}
            </div>
        </>
    );
};

export default Button;
