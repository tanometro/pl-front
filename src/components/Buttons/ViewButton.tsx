import React from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GeneralButtonProps } from '@/types/ButtonsTypes';

const ViewButton = (props: GeneralButtonProps) => {
  const {onClickFunction} = props;
  return (
    <div>
      <button className="btn btn-sm btn-circle btn-outline hover:bg-slate-400"
      onClick={onClickFunction}>
        <MdOutlineRemoveRedEye size={18}/>
      </button>
    </div>
  )
}

export default ViewButton;