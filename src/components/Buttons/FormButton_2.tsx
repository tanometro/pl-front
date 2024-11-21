import React from 'react';

function FormButton_2({ isDisabled }: { isDisabled: boolean }) {
  return (
    <div className="mt-2">
      <input
        type="submit"
        value="Enviar"
        className={`btn btn-accent ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isDisabled}
      />
    </div>
  );
}

export default FormButton_2;