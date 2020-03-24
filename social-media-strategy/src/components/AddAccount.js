import React from "react";
import { withRouter } from 'react-router-dom';

const AddAccount = (props) => (
    <div
        role="button"
        className="modal-wrapper"
        onClick={() => props.history.goBack()}>
            <div
                role="button"
                className="modal"
                onClick={e => e.stopPropagation()}>

            <p>Content to add account</p>

        </div>
    </div>
)

export default withRouter(AddAccount);