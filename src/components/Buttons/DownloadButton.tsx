import React from 'react';
import { GrDocumentDownload } from "react-icons/gr";
import { GeneralButtonProps } from '@/types/ButtonsTypes';

const DownloadButton = (props: GeneralButtonProps) => {
  const {onClickFunction} = props;
  return (
    <div>
      <button className="btn btn-sm btn-circle btn-outline text-black border-black tooltip-top mx-2"
      onClick={onClickFunction}>
        <GrDocumentDownload size={18}
        title='Descargar Contrato Firmado'/>
      </button>
    </div>
  )
}

export default DownloadButton