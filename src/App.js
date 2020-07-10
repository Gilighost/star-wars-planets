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
        movies: results.map((movie) => ({
          title: movie.title,
          planetUrls: movie.planets,
        })),
      });
    });
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="App">
        <header className={styles.appHeader}>Star Wars Planets</header>
        {movies ? <MovieList movies={movies} /> : <LoadingSpinner />}
      </div>
    );
  }
}

export default App;
