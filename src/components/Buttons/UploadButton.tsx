import React from 'react';
import { GrDocumentUpload } from "react-icons/gr";
import { GeneralButtonProps } from '@/types/ButtonsTypes';

const UploadButton = (props: GeneralButtonProps) => {
  const {onClickFunction} = props;
  return (
    <div>
      <button className="btn btn-sm btn-circle btn-outline text-black border-black tooltip-top"
      onClick={onClickFunction}>
        <GrDocumentUpload size={18}
        title='Enviar Contrato'/>
      </button>
    </div>
  )
}

export default UploadButton