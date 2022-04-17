import React from 'react';
import CheckIcon from '../../../../../../icons/CheckIcon';

type Props = {
    step: 1 | 2 | 3 | 4;
};

const Stepper = ({ step }: Props) => {
    const styles = {
        step: `relative bg-gray-900 border-2 border-gray-600 h-7 w-7 rounded-full`,
        stepCompleted: `relative bg-primary p-1 rounded-full`,
        track: `w-20 md:w-28 h-1 bg-gray-500`,
        trackCompleted: `w-20 md:w-28 h-1 bg-primary`,
        stepCurrent: `relative bg-gray-900 h-7 w-7 rounded-full border-2 border-primary`,
        label: ` whitespace-nowrap text-xs md:text-sm text-gray-400 `,
    };
    return (
        <div>
            <div className="flex items-center ">
                <div className={step > 1  ? styles.stepCompleted : styles.stepCurrent}>
                    {step > 1 &&  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>}
                </div>
                <div className={ step > 1 ? styles.trackCompleted : styles.track}></div>
                <div className={step > 2 ? styles.stepCompleted : step == 2 ? styles.stepCurrent : styles.step}>
                {step > 2 &&  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>}
                </div>
                <div className={step > 2 ? styles.trackCompleted : styles.track}></div>
                <div className={step > 3 ? styles.stepCompleted : step == 3 ? styles.stepCurrent : styles.step}>
                {step > 3 &&  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>}
                </div>
                <div className={step > 3 ? styles.trackCompleted : styles.track}></div>
                <div className={step > 4 ? styles.stepCompleted : step == 4 ? styles.stepCurrent : styles.step}>
                {step > 4 &&  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>}
                </div>
            </div>

            <div className="relative -left-2 flex justify-between items-center  md:w-[460px]">
                <p className={styles.label}>Signup</p>
                <p className={styles.label}>Connect with Wallet</p>
                <p className={styles.label + " relative -left-2 md:-left-5"}>Upload NFT</p>
                <p className={styles.label + " relative left-3 md:left-1"}>Profile</p>
            </div>
        </div>
    );
};

export default Stepper;
