import React, { Fragment, Suspense } from 'react';
import { getCharacters, getCharactersSearch } from '../../api/api';
import Config from '../../appconfig';
import { ListView, Alert } from '../../components';
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
      currentPage: 0
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

  componentDidMount() {
    this.mapApiData(1);
  }

  render() {
    const {
      characterData,
      errors,
      totalPages,
      currentPage,
      loading
    } = this.state;
    return (
      <Fragment>
        <ListView searchApiRequest={param => this.searchApiRequest(param)} />
        {!errors && characterData && characterData.length > 0 ? (
          <Suspense fallback={<div>Loading Characters</div>}>
            <TableRendererLazy
              data={characterData}
              currentPage={currentPage}
              totalPages={totalPages}
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
