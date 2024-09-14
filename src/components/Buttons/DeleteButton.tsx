import React from 'react';
import { RxCross1 } from "react-icons/rx";
import { GeneralButtonProps } from '@/types/ButtonsTypes';

const DeleteButton = (props: GeneralButtonProps) => {
  const {onClickFunction} = props;
  return (
    <div>
      <button className="btn btn-sm btn-circle btn-outline text-red-500 border-red-500"
      onClick={onClickFunction}>
        <RxCross1 size={18}/>
      </button>
    </div>
  )
}

export default DeleteButton;