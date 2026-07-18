import React from "react";
import "../../styles/prediction/modal.css";

const SuccessModal=({

open,
score,
onClose,

})=>{

if(!open) return null;

return(

<div className="prediction-modal-overlay">

<div className="prediction-modal success">

<h1>🎉</h1>

<h2>Prediction Submitted</h2>

<p>

Spain {score} Argentina

</p>

<p>

Good Luck!

</p>

<button
className="confirm-btn"
onClick={onClose}
>

OK

</button>

</div>

</div>

);

};

export default SuccessModal;