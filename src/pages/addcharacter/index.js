import React, { Fragment, Suspense } from 'react';
import {
  getSpeices,
  addCharacter,
  getCharacterById,
  patchCharacter
} from '../../api/api';
import { Alert } from '../../components';
import Validation from '../../utils/validation';
import { sortkeys } from '../../utils/sortkeys';

const CharacterFormLazy = React.lazy(() =>
  import('../../components/characterform')
);

class AddCharacterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: {},
      formData: {},
      isValidForm: false,
      validationRules: [
        {
          input: 'name',
          condition: ['required']
        },
        {
          input: 'species',
          condition: ['required']
        },
        {
          input: 'gender',
          condition: ['required']
        },
        {
          input: 'homeworld',
          condition: ['required']
        }
      ],
      fieldOrder: ['name', 'species', 'gender', 'homeworld'],
      speciesData: [],
      speciesDataError: null,
      postdataError: null,
      postdataProcess: false,
      postSuccess: false,
      triggerRefFocus: null,
      getCharacterByIdError: null
    };
  }

  validateCondition = (condition, key, formData) => {
    switch (condition) {
      case 'required':
        if (formData[key] === '' || !formData[key]) {
          return 'fail';
        } else if (formData[key].length > 0) {
          return 'pass';
        }
        return 'pass';
      default:
        return 'pass';
    }
  };

  validateForm = (key = null, returnError = false) => {
    const { validationRules } = this.state;
    let errors = { ...this.state.formErrors };
    if (key) {
      let validationConditions = validationRules.filter(
        item => item.input === key
      );
      if (validationConditions.length > 0) {
        validationConditions[0]['condition'].forEach(item => {
          let flag = this.validateCondition(item, key, this.state.formData);
          if (flag === 'fail') {
            errors[key] =
              Validation.errorMessages[key]['required'] || 'Field Error';
          } else if (flag === 'pass') {
            errors = Object.keys(errors).reduce((object, keyval) => {
              if (keyval !== key) {
                object[keyval] = errors[keyval];
              }
              return object;
            }, {});
          }
        });
      }
      if (!returnError) {
        this.setState({
          ...this.state,
          triggerRefFocus: null,
          formErrors: {
            ...sortkeys(errors, this.state.fieldOrder)
          }
        });
      } else {
        return errors;
      }
    }
  };

  formSubmitValidation = e => {
    e.preventDefault();
    const { validationRules } = this.state;
    let errors = {};
    validationRules.forEach(item => {
      let errorsStatus = { ...this.validateForm(item.input, true) };
      errors = { ...errors, ...errorsStatus };
    });

    if (Object.keys(errors).length > 0) {
      let sortedErrors = sortkeys(errors, this.state.fieldOrder);
      this.setState({
        ...this.state,
        isValidForm: false,
        triggerRefFocus: Object.keys(sortedErrors)[0],
        formErrors: {
          ...sortkeys(errors, this.state.fieldOrder)
        }
      });
    } else if (Object.keys(errors).length === 0) {
      this.setState(
        {
          ...this.state,
          isValidForm: true
        },
        () => {
          if (this.props.pageevent === 'add') {
            addCharacter(this.state.formData)
              .then(() => {
                this.setState({
                  ...this.state,
                  triggerRefFocus: null,
                  postdataProcess: true,
                  postSuccess: true
                });
                setTimeout(() => {
                  this.props.history.push('/');
                }, 300);
              })
              .catch(e => {
                this.setState({
                  ...this.state,
                  triggerRefFocus: null,
                  postdataError: e
                });
              });
          } else if (this.props.pageevent === 'patch') {
            patchCharacter(this.props.match.params.id, this.state.formData)
              .then(() => {
                this.setState({
                  ...this.state,
                  triggerRefFocus: null,
                  postdataProcess: true,
                  postSuccess: true
                });
                setTimeout(() => {
                  this.props.history.push('/');
                }, 300);
              })
              .catch(e => {
                this.setState({
                  ...this.state,
                  triggerRefFocus: null,
                  postdataError: e
                });
              });
          }
        }
      );
    }
  };

  handleChangeState = e => {
    let key = e.target.name;
    this.setState(
      {
        ...this.state,
        formData: {
          ...this.state.formData,
          [e.target.name]: e.target.value
        }
      },
      () => {
        this.validateForm(key);
      }
    );
  };

  componentDidMount() {
    getSpeices()
      .then(data => {
        this.setState({
          ...this.state,
          speciesData: data,
          speciesDataError: null
        });
      })
      .catch(e => {
        this.setState({
          ...this.state,
          speciesData: [],
          speciesDataError: e
        });
      });
    if (this.props.pageevent === 'patch') {
      let id = this.props.match.params.id;
      if (id) {
        getCharacterById(this.props.match.params.id)
          .then(data => {
            if (data === 404) {
              this.setState({
                ...this.state,
                formData: {},
                getCharacterByIdError: {
                  message: 'Invalid Record is not found'
                }
              });
            } else {
              this.setState(
                {
                  ...this.state,
                  formData: {
                    name: data.name,
                    species: data.species,
                    gender: data.gender,
                    homeworld: data.homeworld
                  }
                });
            }
          })
          .catch(e => {
            this.setState({
              ...this.state,
              formData: {},
              getCharacterByIdError: e
            });
          });
      }
    }
  }

  render() {
    const {
      speciesDataError,
      postdataError,
      postSuccess,
      getCharacterByIdError
    } = this.state;
    return (
      <Fragment>
        {this.props.title && <h1>{this.props.title}</h1>}
        {postdataError && <Alert data={postdataError} flag="error" />}
        {postSuccess && (
          <Alert
            data={{ message: 'Character Added Successfully' }}
            flag="success"
          />
        )}
        {speciesDataError ? (
          <Alert data={speciesDataError} flag="error" />
        ) : getCharacterByIdError ? (
          <Alert data={getCharacterByIdError} flag="error" />
        ) : (
          <Suspense fallback={<div>Loading Form...</div>}>
            <CharacterFormLazy
              state={this.state}
              submitForm={this.formSubmitValidation}
              handleChange={this.handleChangeState}
              event={this.props.pageevent || ''}
            />
          </Suspense>
        )}
      </Fragment>
    );
  }
}

export default AddCharacterContainer;
