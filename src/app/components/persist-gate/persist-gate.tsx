import { useEffect, useState } from 'react';

interface Props {
    persistor: any;
    loading: any;
}

const PersistGate: React.FC<Props> = ({ children, persistor, loading }) => {
    const [bootstrapped, setBootstrapped] = useState(false);

    useEffect(() => {
        let unsubscribe: any = () => {};
        const handlePersistorState = () => {
            let { bootstrapped } = persistor.getState();
            if (bootstrapped) {
                setBootstrapped(true);
            }
            unsubscribe();
        };
        handlePersistorState();
        unsubscribe = persistor.subscribe(handlePersistorState);
        return unsubscribe;
    }, []);

    if (bootstrapped) {
        return <>{children}</>;
    }
    return <>{loading}</>;
};

export default PersistGate;
