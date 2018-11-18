const GITHUB_URL = "https://api.github.com/";

const API_KEY = `c085c9981358c552d72d6db7e574cdf9e187acf8`
console.log(API_KEY);


function getGithubList(userHandle) { 
  // -setup query
  const params = {
    type: "owner",
    sort: "updated",
    direction: "desc",
  };
  // -put url together (FormatQueryParams)
  const queryString = formatQueryParams(params);
  const url = `${GITHUB_URL}users/${userHandle}/repos?${queryString}`;
  // -add API key to header
  const options = {
    headers: new Headers({
      "X-GitHub-OTP": API_KEY})
  };
  // -FETCH
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

//you don't need encodeURIComponent
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('.js-results-list').empty();

  for (let i in responseJson) {
    $('.js-results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      <p>By ${responseJson[i].owner.login}</p>
      <p>Description: ${responseJson[i].description}</p>
      <p>Language: ${responseJson[i].language}</p>
      </li>`
    );
  }

  $('.js-results').removeClass('hidden');
}


function watchForm() {
  $('.js-form').submit(event => {
    event.preventDefault();
    const userHandle = $('.js-user-handle').val();
 
    //empties search bar
    $('.js-user-handle').val('');
   
    getGithubList(userHandle);
  });
}

$(watchForm);