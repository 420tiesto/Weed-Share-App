import { PlusCircleIcon, PlusIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/components/common-ui/atoms/Button';
import { Card, CardBody } from '../../../app/components/common-ui/atoms/Card';
import Stack from '../../../app/components/common-ui/atoms/Stack';

type Props = {};

const CreateBudCard = (props: Props) => {
    return (
      <Link className='max-w-[360px] w-full' to='/upload-bud'>
       <div className='outlined text-2xl flex-col h-[180px] font-bold   elevated-element flex items-center gap-4 justify-center  rounded-2xl text-white/50   duration-200 ease-out'>
        <PlusIcon className='h-14 w-14'/>
        Add Bud
       </div>
      </Link>
    );
};

export default CreateBudCard;
