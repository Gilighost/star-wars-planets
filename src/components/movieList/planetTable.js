import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./planetTable.module.css";

const headers = {
  name: "Name",
  terrain: "Terrain",
  climate: "Climate",
  gravity: "Gravity",
  surface_water: "Surface Water",
  population: "Population",
  diameter: "Diameter",
  orbital_period: "Orbital Period",
  rotation_period: "Rotation Period",
};

const formatPopulation = (n) => {
  if (isNaN(n) || n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return `${+(n / 1e3).toFixed(1)}K`;
  if (n >= 1e6 && n < 1e9) return `${+(n / 1e6).toFixed(1)}M`;
  if (n >= 1e9 && n < 1e12) return `${+(n / 1e9).toFixed(1)}B`;
  if (n >= 1e12) return `${+(n / 1e12).toFixed(1)}T`;
};

function compare({ key, isDescending }) {
  return (a, b) => {
    let firstValue = a[key];
    let secondValue = b[key];

    if (["name", "terrain", "climate"].includes(key)) {
      firstValue = firstValue.toUpperCase();
      secondValue = secondValue.toUpperCase();
    } else {
      const firstNumberValue = parseFloat(firstValue);
      const secondNumberValue = parseFloat(secondValue);

      firstValue = isNaN(firstNumberValue)
        ? Number.MAX_SAFE_INTEGER
        : firstNumberValue;
      secondValue = isNaN(secondNumberValue)
        ? Number.MAX_SAFE_INTEGER
        : secondNumberValue;
    }

    if (firstValue > secondValue) {
      return isDescending ? -1 : 1;
    } else if (firstValue < secondValue) {
      return isDescending ? 1 : -1;
    }

    return 0;
  };
}

function PlanetTable({ planets }) {
  const [orderBy, setOrderBy] = useState({
    key: Object.keys(headers)[0],
    isDescending: false,
  });

  const setOrderByKey = (key) => {
    setOrderBy({
      key,
      isDescending: key === orderBy.key ? !orderBy.isDescending : false,
    });
  };

  return (
    <table className={styles.planetTable}>
      <tbody>
        <tr>
          {Object.entries(headers).map(([key, value]) => (
            <th
              key={key}
              onClick={() => {
                setOrderByKey(key);
              }}
            >
              {value}
            </th>
          ))}
        </tr>
        {planets.sort(compare(orderBy)).map((p, i) => (
          <tr key={i}>
            <td>{p.name}</td>
            <td>{p.terrain}</td>
            <td>{p.climate}</td>
            <td>{p.gravity.replace("standard", "std.")}</td>
            <td className={styles.number}>
              {p.surface_water}
              {!isNaN(parseInt(p.surface_water)) && "%"}
            </td>
            <td className={styles.number}>{formatPopulation(p.population)}</td>
            <td className={styles.number}>{p.diameter}</td>
            <td className={styles.number}>{p.orbital_period}</td>
            <td className={styles.number}>{p.rotation_period}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

PlanetTable.propTypes = {
  planets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      terrain: PropTypes.string.isRequired,
      surface_water: PropTypes.string.isRequired,
      population: PropTypes.string.isRequired,
      gravity: PropTypes.string.isRequired,
      diameter: PropTypes.string.isRequired,
      orbital_period: PropTypes.string.isRequired,
      rotation_period: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PlanetTable;
