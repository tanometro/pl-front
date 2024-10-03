import React from 'react';
import { RxPerson } from "react-icons/rx";
import { GeneralButtonProps } from '@/types/ButtonsTypes';

const AssignButton = (props: GeneralButtonProps) => {
  const {onClickFunction} = props;
  return (
    <div>
      <button className="btn btn-sm btn-circle btn-outline text-lime-500 border-lime-500"
      onClick={onClickFunction}>
        <RxPerson size={18}/>
      </button>
    </div>
  )
}

export default AssignButton