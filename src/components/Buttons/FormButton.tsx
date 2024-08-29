import React from 'react';
import { FormButtonProps } from '@/types/ButtonsTypes';

const FormButton = (props: FormButtonProps) => {
    const {title} = props;

  return (
    <button
        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        type="submit"
        data-twe-ripple-init
        data-twe-ripple-color="light"
        style={{ background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)' }}>
        {title}
    </button>
  )
}

export default FormButton;