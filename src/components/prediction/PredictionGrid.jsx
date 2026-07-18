import React from "react";
import "../../styles/prediction/predictionGrid.css";

const scores=[
"1:0",
"2:0",
"2:1",
"3:0",
"3:1",
"3:2",
"0:0",
"1:1",
"2:2",
];

const PredictionGrid=({onSelect})=>{

return(

<div className="prediction-section">

<h2>Select Prediction</h2>

<div className="prediction-grid">

{scores.map(score=>(

<button
key={score}
className="prediction-btn"
onClick={()=>onSelect(score)}
>

{score}

</button>

))}

</div>

</div>

);

};

export default PredictionGrid;