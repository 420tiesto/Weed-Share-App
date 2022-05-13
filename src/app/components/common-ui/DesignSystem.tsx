import { ArrowDownIcon } from '@heroicons/react/outline';
import React from 'react';
import Button from './atoms/Button';

type Props = {};

const DesignSystem = (props: Props) => {
    return (
        <div className="grid grid-cols-3 gap-8 p-4">
            <div className="space-y-2 flex flex-col justify-between">
                <p>Button Sizes</p>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">lARGE</Button>
            </div>
            <div className="space-y-2 flex flex-col justify-between">
                <p>Dev Note : Wrap in div to get min Width</p>
                <div>
                    <Button size="sm">Small</Button>
                </div>
                <div>
                    <Button size="md">Medium</Button>
                </div>
                <div>
                    <Button size="lg">lARGE</Button>
                </div>
            </div>
            <div className="space-y-2 flex flex-col">
                <p>Button Variants</p>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="danger">Danger</Button>
            </div>
            <div className="space-y-2 flex flex-col">
                <p>Outlined buttons</p>
                <Button variant="primary" outline>Primary</Button>
                <Button variant="secondary" outline>Secondary</Button>
                <Button variant="warning" outline>Warning</Button>
                <Button variant="danger" outline>Danger</Button>
            </div>
            <div className="space-y-2 flex flex-col">
                <p>Loading buttons</p>
                <div>
                <Button variant="primary" loading>Primary</Button>
                </div>
                <div>
                <Button variant="secondary" loading outline>Secondary</Button>
                </div>
                <div>
                <Button variant="warning" loading size='sm'>small loading</Button>
                </div>
                <div>
                <Button variant="danger" size='lg' loading>Large Loading</Button>
                </div>
            </div>
            
        </div>
    );
};

export default DesignSystem;
