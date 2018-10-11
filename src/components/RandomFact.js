import React from 'react';

export default (props) => {
    return props.fact === undefined ? null : 
    (
        <div className="fact">
            <h3>Random Fact</h3>
            <div>{props.fact.value}</div>
        </div>
    );
}