import { ArrowDownIcon, SearchIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Button from './atoms/Button';
import { Card, CardBody, CardHeader } from './atoms/Card';
import { Input } from './atoms/Input';
import SelectInput, { SelectOption } from './atoms/SelectInput';
import Stack from './atoms/Stack';

type Props = {};

const DesignSystem = (props: Props) => {
    const list:SelectOption[] = [
        {name:"Adarsh",value:"adarsh",id:1},
        {name:"Harrish",value:"harrish",id:1},
        {name:"Airesh",value:"airesh",id:1},
        {name:"Tiesto",value:"tiesto",id:1},
    ]
    const [selected,setSelected] = useState<SelectOption>(list[0]);
    return (
        <div className="grid grid-cols-3 gap-8 p-4">
            <Card variant="elevated" rounded="2xl">
                <CardHeader>Button Sizes</CardHeader>
                <CardBody>
                    <SelectInput options={list} value={selected} setValue={setSelected} /> 
                    {/* <Stack>
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">lARGE</Button>
                    </Stack> */}
                </CardBody>
            </Card>

            <Card variant="sunken" color="dark" rounded="2xl">
                <CardHeader>Dev Note</CardHeader>
                <CardBody>
                    <Stack>
                        <p className="mb-4"> Wrap in div to get min width</p>
                        <div>
                            <Button size="sm">Small</Button>
                        </div>
                        <div>
                            <Button size="md">Medium</Button>
                        </div>
                        <div>
                            <Button size="lg">lARGE</Button>
                        </div>
                    </Stack>
                </CardBody>
            </Card>
            <Card variant="elevated" rounded="2xl">
                <CardHeader>Button Variants</CardHeader>
                <CardBody>
                    <Stack>
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="warning">Warning</Button>
                        <Button variant="danger">Danger</Button>
                    </Stack>
                </CardBody>
            </Card>
            <Card variant="elevated" rounded="2xl">
                <CardHeader>Outlined buttons</CardHeader>
                <CardBody>
                    <Stack>
                        <Button variant="primary" outline>
                            Primary
                        </Button>
                        <Button variant="secondary" outline>
                            Secondary
                        </Button>
                        <Button variant="warning" outline>
                            Warning
                        </Button>
                        <Button variant="danger" outline>
                            Danger
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
            <Card variant="elevated" rounded="2xl">
                <CardHeader>Outlined buttons</CardHeader>
                <CardBody>
                    <Stack>
                        <div>
                            <Button variant="primary" loading>
                                Primary
                            </Button>
                        </div>
                        <div>
                            <Button variant="secondary" loading outline>
                                Secondary
                            </Button>
                        </div>
                        <div>
                            <Button variant="warning" loading size="sm">
                                small loading
                            </Button>
                        </div>
                        <div>
                            <Button variant="danger" size="lg" loading>
                                Large Loading
                            </Button>
                        </div>
                    </Stack>
                </CardBody>
            </Card>
            <h1 className='col-span-3'>Cards</h1>
            <Card variant="sunken">
                <CardHeader>Sunken Card </CardHeader>
                <CardBody>Card Body</CardBody>
            </Card>
            <Card variant="sunken"  color="dark">
                <CardHeader>Sunken Card Dark </CardHeader>
                <CardBody>Elevated</CardBody>
            </Card>
            <Card variant="elevated">
                <CardHeader>Elevated Card </CardHeader>
                <CardBody>Card Body</CardBody>
            </Card>
            <Card variant="elevated" color="dark">
                <CardHeader>Elevated card dark </CardHeader>
                <CardBody>Card Body</CardBody>
            </Card>
        </div>
    );
};

export default DesignSystem;
