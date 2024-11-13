import React from 'react';
import { GiTakeMyMoney } from "react-icons/gi";
import { GeneralButtonProps } from '@/types/ButtonsTypes';

const EditButton = (props: GeneralButtonProps) => {
  const {onClickFunction} = props;
  return (
    <div>
      <button className="btn btn-sm btn-circle btn-outline text-lime-500 border-lime-500 tooltip-top"
      onClick={onClickFunction}>
        <GiTakeMyMoney size={18}
        title='Presupuestar'/>
      </button>
    </div>
  )
}

export default EditButton