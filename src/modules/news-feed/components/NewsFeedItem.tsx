import React from 'react';
import { Card, CardBody, CardHeader } from '../../../app/components/common-ui/atoms/Card';

type Props = {};

const NewsFeedItem = (props: Props) => {
    return (
        <Card variant="elevated" color="dark" className="rounded-[30px]">
            <div>
                <h6>Card Title</h6>
            </div>
        </Card>
    );
};

export default NewsFeedItem;
