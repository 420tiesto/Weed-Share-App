import { Switch } from '@headlessui/react';

type Props = {
    enabled: boolean;
    onChange: any;
};

export default function Toggle({ enabled, onChange }: Props) {
    return (
        <Switch
            checked={enabled}
            onChange={onChange}
            className={`${enabled ? 'bg-primary ' : 'bg-slate-700'}
          relative inline-flex flex-shrink-0 h-6 w-12 border2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 p-1`}>
            <span className="sr-only">Use Toggle</span>
            <span
                aria-hidden="true"
                className={`${
                    enabled ? 'translate-x-6 bg-violet-100' : 'translate-x-0 bg-slate-400'
                }
            pointer-events-none inline-block h-4 w-4  rounded-full bg-white shadow-xl transform ring-0 transition ease-in-out duration-200`}
            />
        </Switch>
    );
}
