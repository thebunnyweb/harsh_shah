import React from 'react';

const ModalComponent = ({type, message, action}) => (
    <div id="modal">
        <div className="header">
            <h4>Alert</h4>
        </div>
        <div className="body">
<p>{message}</p>
        </div>
        <div className="footer">
            <div className="btn-group">
            <button className="btn btn-default" onClick={()=>action(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>action(true)}>Yes</button>
            </div>
        </div>
    </div>   
)

export default ModalComponent;