import { TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import Button from '../../../app/components/common-ui/atoms/Button';
import { Card, CardBody } from '../../../app/components/common-ui/atoms/Card';
import ProfileInfo from './ProfileInfo';

type Props = {};

const DangerSettings = (props: Props) => {
    return (
        <Card variant="elevated" className="rounded-[30px]">
            <CardBody padding={8} className="px-8 space-y-4">
                {/* Profile Info */}
                <ProfileInfo
                    imgSrc="https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80"
                    name="Memories of Moon"
                    username="memoriesOfmoon"
                />
                <p className="font-semibold text-red-500">This will deactivate your account</p>
                <p>
                    In order to use collect feature you need to allow the module you use, you can
                    allow and revoke the module anytime.
                </p>
                <div>
                    <p className="font-bold">What else should you know</p>
                    <div className="divide-y text-sm divide-[#505050] text-[#9B9B9B]">
                        <p className="py-4">
                            You cannot restore your Lenster account if it was accidentally or
                            wrongfully deleted.
                        </p>
                        <p className="py-4">
                            Some account information may still be available in seach engines, such
                            as Google or Bing.
                        </p>
                        <p className='py-4'>Your @handle will be released immediately after deleting the account.</p>
                    </div>
                </div>
                <div>
                    <Button variant="danger">Delete your account</Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default DangerSettings;
