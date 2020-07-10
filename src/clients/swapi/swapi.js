var rootURL = "https://swapi.dev/api/";

function request(url) {
  return fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function pluralRequestGenerator(path) {
  return function (queryObject) {
    if (queryObject) {
      let searchParams = new URLSearchParams();
      for (let key of Object.keys(queryObject)) {
        let value = queryObject[key];
        searchParams.append(key, value);
      }
      return request(rootURL + path + "/?" + searchParams.toString());
    }

    return request(rootURL + path + "/");
  };
}

module.exports = {
  getFilms: pluralRequestGenerator("films"),
  getPlanet: (url) => request(url),
};
