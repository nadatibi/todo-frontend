import React from 'react';

function Item(props) {
    return <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="custom-control custom-checkbox" onClick={() => { props.onUpdate(props.id) }}>
            <input type="checkbox" className="custom-control-input" checked={props.status} />
            <label className="custom-control-label">
                {!props.status ? props.description : <strike>{props.description}</strike>}
            </label>
        </div>

        <button type="button" className="btn btn-light" onClick={() => { props.onDelete(props.id) }}>
            <i className='fad fa-trash-alt'></i>
        </button>
    </li>
}

export default Item;
