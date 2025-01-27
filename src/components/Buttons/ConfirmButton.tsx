import React from "react";
import { GiConfirmed } from "react-icons/gi";
import { GeneralButtonProps } from "@/types/ButtonsTypes";

const ConfirmButton = (props: GeneralButtonProps) => {
  const { onClickFunction } = props;
  return (
    <div>
      <button
        className="btn btn-sm btn-circle btn-outline hover:bg-slate-400 mx-2 tooltip-top mr-4 text-green-600"
        onClick={onClickFunction}
        title="Confirmar"
      >
        <GiConfirmed size={18} />
      </button>
    </div>
  );
};

export default ConfirmButton;
