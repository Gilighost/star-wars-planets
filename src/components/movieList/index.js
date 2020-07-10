import React from "react";
import PropTypes from "prop-types";
import ListItem from "./listItem.js";
import styles from "./index.module.css";

const MovieList = ({ movies }) => (
  <div className={styles.listContainer}>
    {movies.map((movie, i) => (
      <ListItem key={i} movie={movie} />
    ))}
  </div>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      planetUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default MovieList;
