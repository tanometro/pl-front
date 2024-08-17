import React from 'react';
import { TetriaryButtonProps } from '@/types/Buttons';

const TetriaryButton = (props: TetriaryButtonProps) => {
    const {title} = props;
  return (
    <button
        type="button"
        className="inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 motion-reduce:transition-none dark:text-secondary-600 dark:hover:text-secondary-500 dark:focus:text-secondary-500 dark:active:text-secondary-500">
        {title}
    </button>
  )
}

export default TetriaryButton;