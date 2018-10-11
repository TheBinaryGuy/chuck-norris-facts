import React from 'react';

export default (props) => {
    return props.categorisedFact === undefined ? null : 
    (
        <div className="fact">
            <h3>{props.categorisedFact.category[0]} Fact</h3>
            <div>{props.categorisedFact.value}</div>
        </div>
    );
}