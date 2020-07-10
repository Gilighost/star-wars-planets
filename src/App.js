import React, { Component } from "react";
import { SWApi } from "./clients";
import LoadingSpinner from "./components/loadingSpinner";
import MovieList from "./components/movieList";
import styles from "./App.module.css";

export class App extends Component {
  state = {
    movies: null,
  };

  componentDidMount() {
    SWApi.getFilms().then(({ results }) => {
      this.setState({
        movies: [
          ...results.map((movie) => ({
            title: movie.title,
            planetUrls: movie.planets,
          })),
          {
            title: "The Fellowship of the Planetary Ring",
            planetUrls: [
              "http://swapi.dev/api/planets/7/",
              "http://swapi.dev/api/planets/26/",
              "http://swapi.dev/api/planets/33/",
              "http://swapi.dev/api/planets/44/",
              "http://swapi.dev/api/planets/55/",
            ],
          },
        ],
      });
    });
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>Star Wars Planets</header>
        {movies ? <MovieList movies={movies} /> : <LoadingSpinner />}
      </div>
    );
  }
}

export default App;
