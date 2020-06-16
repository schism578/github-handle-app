const searchURL = 'https://api.github.com/users/:username/repos';

const acceptHeader = "application/vnd.github.nebula-preview+json";

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
  
  function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.value.length; i++) {
      $('#results-list').append(
        `<li><h3><a href="${responseJson.value[i].url}">${responseJson.value[i].name}</a></h3>
        </li>`
      )};
    $('#results').removeClass('hidden');
  };
  
  function getUser(query) {
    const params = {
      q: query,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
  
    console.log(url);
  
    const options = {
        headers: new Headers({
          "accept": acceptHeader
        })
    };
  
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
  
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      getUser(searchTerm);
    });
  }
  
  $(watchForm);