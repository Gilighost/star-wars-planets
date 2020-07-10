import React, { Component } from "react";
import PropTypes from "prop-types";
import { SWApi } from "../../clients";
import LoadingSpinner from "../loadingSpinner";
import PlanetTable from "./planetTable.js";
import styles from "./listItem.module.css";

class ListItem extends Component {
  state = {
    isToggled: false,
    planets: null,
  };

  componentDidUpdate(_, prevState) {
    if (this.state.planets == null && prevState.isToggled === false) {
      Promise.all(
        this.props.movie.planetUrls.map((planetUrl) =>
          SWApi.getPlanet(planetUrl)
        )
      ).then((planets) => {
        this.setState({ planets });
      });
    }
  }

  handleClick = () => {
    this.setState(({ isToggled }) => ({
      isToggled: !isToggled,
    }));
  };

  render() {
    const { movie } = this.props;
    const { isToggled, planets } = this.state;
    return (
      <div className={styles.listItem}>
        <div className={styles.title} onClick={this.handleClick}>
          {isToggled ? "-" : "+"}&nbsp;
          {movie.title}
        </div>
        {isToggled && (
          <div className={styles.planetInfo}>
            {planets ? (
              <PlanetTable planets={planets} />
            ) : (
              <LoadingSpinner isSmall />
            )}
          </div>
        )}
      </div>
    );
  }
}

ListItem.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    planetUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ListItem;
