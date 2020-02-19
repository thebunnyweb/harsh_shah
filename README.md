# Sonalake front-end developer recruitment task

The provided app is built using [create-react-app](https://github.com/facebook/create-react-app). See its documentation for more details. Your job is to implement a set of tasks listed in the Tasks section. Feel free to use all included libraries.

Useful npm scripts:
```bash
npm start # run the app using webpack-dev-server
npm run api # start the json-server
npm test:unit # run the unit tests
npm test:e2e # run the E2E tests
```

## General rules
* write clean, reusable, testable code, avoid (extract) side effects
* make sure it works on the latest versions of chrome and firefox
* make sure your code doesn't have any linting errors and warnings
* avoid including 3rd party libraries other than those included in the project
* both unit and e2e tests are welcome

## Tasks

### Refactoring
Refactor the existing code to extract single-purpose, reusable components. Connect ui to the api served by json-server ([http://localhost:3000/characters](http://localhost:3000/characters)). You can start the api by running `npm run api` command. Documentation for json-server can be found on its [github page](https://github.com/typicode/json-server).

### Pagination
As a user I want to be able to change currenly visible page of results by using pagination buttons.

* Pagination should be done [server-side](https://github.com/typicode/json-server#paginate).
* Results should be displayed in pages of 10.
* Clicking on a page button should change currently visible page to the one selected.
* Previous and Next buttons are present and working. Previous button should be disabled when the first page is selected. Next button should be disabled when the last page is selected.

### Searching
As a user I want to filter results by using the search box above the data grid.

* Searching should use the [full-text search api endpoint](https://github.com/typicode/json-server#full-text-search).
* When there are no results matching the current query a "No Results Found" message is shown.
* Search requests to API are debounced by 200 ms.
* A regular list of items is shown when the search query input is empty.

### New entity form
As a user I want to be able to add new characters by using a new form.

* A new Add Character route should be added.
* Clicking on Add Character button on the List View should navigate to the new route.
* Form should consist of the following form fields:
  * Name - text input, required
  * Species - select input, required, options from [/species](http://localhost:3000/species) api
  * Gender - radio input, required
    * value: male, label: Male
    * value: female, label: Female
    * value: n/a, label: n/a
  * Homeworld - text input, optional
* Required form fields should be marked by a blue * next to their label.
* Relevant error messages should be displayed for form controls with validation errors:
  * required - This field is required.
* Invalid form fields should be styled using `.is-invalid` [bootstrap css class](https://getbootstrap.com/docs/4.1/components/forms/#server-side). A field should be styled as invalid only if it is invald and form field has been touched or user has tried to submit an invalid form. Similiar logic should be applied to the visibility of error messages - an error message should be displayed only if a form field is styled as invalid.
* Add Character form submit button should only be disabled when the request creating a new item is in progress.
* If a user tries to submit the form but the form is invalid, the top-most invalid form field should get focused.
* Submitting a valid form should send a POST request to ([http://localhost:3000/characters](http://localhost:3000/characters)).
* Successfully creating a new item should navigate the user to the main list view.

## Bonus Tasks (implement only if you want to)
* Add working Delete button for each item.
* Add working Edit button for each item.
* Add sorting by clicking on the data grid row headers.
