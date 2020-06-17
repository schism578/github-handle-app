function getAPI(userInput) {
const searchURL = `https://api.github.com/users/${userInput}/repos`;
fetch(searchURL)
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
      displayResults();
  }

  function displayResults(responseJson) {
    $('#results-list').empty();
    $('#results-list').append
    for (let i = 0; i < responseJson.length; i++) {
      $('#results-list').append(
        `
        <li><a href="${responseJson[i].html_url}" target="_blank"><h3>${responseJson[i].name}</h3></a></li>
        <p>${responseJson[i].description}</p>
        <br>
        `
      )};
    $('#results').removeClass('hidden');
  };
  
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const userInput = $('#js-gitHandle').val();
      $('.userInput').text(`GitHub Repositories for ${userInput}`)
      getAPI(userInput);
    });
  }
  
  $(watchForm);