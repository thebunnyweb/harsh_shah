import React, { Fragment, Suspense } from 'react';
import {
  getCharacters,
  getCharactersSearch,
  deleteCharacter
} from '../../api/api';
import Config from '../../appconfig';
import { ListView, Alert, Modal } from '../../components';
import { debounce } from 'lodash';

const TableRendererLazy = React.lazy(() =>
  import('../../components/tablerender')
);

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterData: [],
      loading: true,
      errors: null,
      totalPages: 0,
      currentPage: 1
    };
  }

  setErrorState = e => {
    this.setState({
      ...this.state,
      loading: false,
      errors: e,
      characterData: [],
      totalPages: 0,
      currentPage: 0,
      modalAction: false,
      deleteId: null
    });
  };

  mapApiData = param => {
    let totalElems = 0;
    getCharacters(param)
      .then(response => {
        totalElems = response.headers.get('X-Total-Count') || 0;
        return response.json();
      })
      .then(data => {
        this.setState({
          ...this.state,
          loading: false,
          errors: null,
          currentPage: param,
          characterData: data,
          totalPages: Math.ceil(totalElems / Config.MAX_REQUEST_SIZE)
        });
      })
      .catch(e => {
        this.setErrorState(e);
      });
  };

  handlePageChanges = pageChanged => {
    this.mapApiData(pageChanged);
  };

  searchApiRequest = debounce(param => {
    if (param === '') {
      this.mapApiData(1);
    } else {
      let totalElems = 0;
      getCharactersSearch(param)
        .then(response => {
          totalElems = response.headers.get('X-Total-Count') || 0;
          return response.json();
        })
        .then(data => {
          this.setState({
            ...this.state,
            loading: false,
            errors: null,
            currentPage: 1,
            characterData: data,
            totalPages: Math.ceil(totalElems / Config.MAX_REQUEST_SIZE)
          });
        })
        .catch(e => {
          this.setErrorState(e);
        });
    }
  }, 1000);

  deleteRecordFromServer = id => {
    this.setState({
      ...this.state,
      modalAction: true,
      deleteId: id
    });
  };

  deleteActionTrigger = val => {
    if (val) {
      deleteCharacter(this.state.deleteId)
        .then(() => {
          this.setState({
            ...this.state,
            deleteRecordSuccess: 'Record has been deleted'
          });
          this.mapApiData(1);
        })
        .catch(e => {
          this.state({
            ...this.state,
            deleteRecordError: e
          });
        });
    }
    this.setState({
      ...this.state,
      modalAction: false,
      deleteId: null
    });
  };

  sort = sortkey => {
    let sortedData = this.state.characterData.sort((a, b) =>
      a[sortkey] > b[sortkey] ? 1 : -1
    );
    this.setState({
      ...this.state,
      characterData: sortedData
    });
  };

  componentDidMount() {
    this.mapApiData(1);
  }

  render() {
    const {
      characterData,
      errors,
      totalPages,
      currentPage,
      loading,
      modalAction,
      deleteRecordError
    } = this.state;
    return (
      <Fragment>
        {modalAction && (
          <Modal
            action={val => this.deleteActionTrigger(val)}
            message={'Are you sure you want to delete this record ?'}
          />
        )}
        {deleteRecordError && (
          <Alert data={this.state.deleteRecordError} flag="error" />
        )}
        <ListView searchApiRequest={param => this.searchApiRequest(param)} />
        {!errors && characterData && characterData.length > 0 ? (
          <Suspense fallback={<div>Loading Characters</div>}>
            <TableRendererLazy
              sortTable={this.sort}
              data={characterData}
              currentPage={currentPage}
              totalPages={totalPages}
              deleteRecord={data => this.deleteRecordFromServer(data)}
              handlePageChange={param => this.handlePageChanges(param)}
            />
          </Suspense>
        ) : (
          !loading && (
            <Alert data={{ message: `No Results Found` }} flag="warning" />
          )
        )}
        {errors && <Alert data={errors} flag="error" />}
      </Fragment>
    );
  }
}
export default Root;
