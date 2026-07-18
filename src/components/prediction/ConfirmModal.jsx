import React from "react";

const ConfirmModal=({

open,
score,
balance,
entryFee,
onCancel,
onConfirm,

})=>{

if(!open) return null;

return(

<div className="prediction-modal-overlay">

<div className="prediction-modal">

<h2>Confirm Prediction</h2>

<p>

Spain <strong>{score}</strong> Argentina

</p>

<div className="prediction-info">

<div>

<span>Entry Fee</span>

<strong>{entryFee} ETB</strong>

</div>

<div>

<span>Balance</span>

<strong>{balance.toFixed(2)} ETB</strong>

</div>

</div>

<div className="prediction-actions">

<button
className="cancel-btn"
onClick={onCancel}
>

Cancel

</button>

<button
className="confirm-btn"
onClick={onConfirm}
>

Confirm

</button>

</div>

</div>

</div>

);

};

export default ConfirmModal;