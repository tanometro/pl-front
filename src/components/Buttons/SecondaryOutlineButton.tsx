import React from 'react';
import { SecondaryOutlineProps } from '../../types/ButtonsTypes';

const SecondaryOutlineButton = (props: SecondaryOutlineProps) => {
    const {title, onClick} = props;
  return (
    <button
        type="button"
        className="inline-block rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
        data-twe-ripple-init
        onClick={onClick}>
        {title}
    </button>
  )
}

export default SecondaryOutlineButton;