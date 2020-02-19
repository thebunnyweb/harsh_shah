import React, { Fragment } from 'react';
import classNames from 'classnames';

class AddCharacterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            formdata: {},
            isValid: false
        };
    }

    submitForm = (e) => {
        e.preventDefault();
    }

    updateChangeState = (e) => {
        this.setState({
            ...this.state,
            formdata: {
                ...this.state.formdata,
                [e.target.name]: e.target.value
            }
        })
    };

    render() {
        const {isValid} = this.state;
        return (
            <Fragment>
                <form onSubmit={this.submitForm}>
                    <div className="form-group required">
                        <label htmlFor="name">Name</label>
                        <input type="name" className="form-control" name="name" onChange={(e)=>this.updateChangeState(e)} />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="species">Species</label>
                        <select name="species" className="form-control" name="species" onChange={this.updateChangeState}>
                            <option value="" default>Select Species</option>
                        </select>
                    </div>
                    <div className="form-group required">
                    <label htmlFor="gender">Gender</label>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="gender" value="male" />Male
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="gender" value="female"/>Female
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="gender" value="n/a"/>n/a
                        </label>
                    </div>
                    </div>
                    <div className="form-group required">
                        <label htmlFor="homeworld">Homeworld</label>
                        <input type="homeworld" className="form-control" name="homeworld" onChange={this.updateChangeState} />
                    </div>
                    <button type="submit" className={classNames('btn btn-primary', {
                        disabled: !isValid
                    })} disabled={!isValid ? "disabled" : false}>Submit</button>
                </form>
            </Fragment>
        )
    }
}

export default AddCharacterContainer; 