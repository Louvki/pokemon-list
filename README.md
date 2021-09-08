# pokemon-list
A simple SPA that consumes the https://pokeapi.co/ API and displays all the pokemons in a paginated list. State of the selected page, sort and the inputed search query are preserved between navigations using a mixture of Vuex and URL Queries.

Possible optimizations: 
    - PERF: Lazyloading of images.
    - PERF: Saving of results inside of Veux so there would be no need to refetch data in the details page.
    - UX:   A spinner placeholder while the cards or the details of the card are loading.
    - UX:   First and Last buttons in Pagination.
    - UX:   Displaying a range of pages for selection in Pagination.
    - UX:   The search should search through all of the results rather than the results per page.
    - UX:   Error handling for when the API fails to retrieve data.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
