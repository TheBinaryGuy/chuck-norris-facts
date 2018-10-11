import React from 'react';

export default (props) => {
    return (
        <div className="categories">
            {props.categories.map((v, i) => <button onClick={props.categoryClick} key={i}>{v}</button>)}
        </div>
    );
}