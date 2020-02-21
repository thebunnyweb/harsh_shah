import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';

// const updateRef = (state) => {
//   let ref = Object.keys(state)[0];
//   if(ref){
//     referenceMap[ref].current.focus();
//   }
// }

const CharacterFormComponent = ({ state, submitForm, handleChange }) => {
  const nameInputRef = useRef();
  const speciesInputRef = useRef();
  const genderInputRef = useRef();
  const homeworldInputRef = useRef();

  const referenceMap = {
    name: nameInputRef,
    species: speciesInputRef,
    gender: genderInputRef,
    homeworld: homeworldInputRef
  };

  useEffect(() => {
    if (state.triggerRefFocus) {
      referenceMap[state.triggerRefFocus].current.focus();
    }
  }, [referenceMap, state.triggerRefFocus]);

  return (
    <form onSubmit={e => submitForm(e)}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="name"
          className={classNames('form-control', {
            'is-invalid': state.formErrors.name
          })}
          ref={nameInputRef}
          name="name"
          onChange={e => handleChange(e)}
        />
        <div className="invalid-feedback">
          {state.formErrors && state.formErrors.name && (
            <p>{state.formErrors.name}</p>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="species">Species</label>
        <select
          name="species"
          ref={speciesInputRef}
          className={classNames('form-control', {
            'is-invalid': state.formErrors.species
          })}
          onChange={e => handleChange(e)}
        >
          <option value="" default>
            Select One Species
          </option>
          {state.speciesData &&
            state.speciesData.map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
        </select>
        <div className="invalid-feedback">
          {state.formErrors && state.formErrors.species && (
            <p>{state.formErrors.species}</p>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="radio"
              ref={genderInputRef}
              className="form-check-input"
              name="gender"
              value="male"
              onChange={e => handleChange(e)}
            />
            Male
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="gender"
              value="female"
              onChange={e => handleChange(e)}
            />
            Female
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="gender"
              value="n/a"
              onChange={e => handleChange(e)}
            />
            n/a
          </label>
        </div>
        {state.formErrors && state.formErrors.gender && (
          <div className="text-danger">
            <small>{state.formErrors.gender}</small>
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="homeworld">Homeworld</label>
        <input
          type="homeworld"
          ref={homeworldInputRef}
          className={classNames('form-control', {
            'is-invalid': state.formErrors.homeworld
          })}
          name="homeworld"
          onChange={e => handleChange(e)}
        />
        <div className="invalid-feedback">
          {state.formErrors && state.formErrors.homeworld && (
            <p>{state.formErrors.homeworld}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disable={!state.postdataProcess ? '' : 'disabled'}
        className={classNames('btn btn-primary')}
      >
        Submit
      </button>
    </form>
  );
};

export default CharacterFormComponent;
