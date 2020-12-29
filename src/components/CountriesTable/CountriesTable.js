import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";
import Link from 'next/link';

const orderBy = (countries, direction, value) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1);
  } else if (direction === 'desc') {
    return [...countries].sort((a, b) => b[value] > a[value] ? 1 : -1);
  }

  return countries;
};

const SortArrow = ({ direction, col, value }) => {
  if (!direction || col != value) {
    return <></>;
  } else if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, direction, value);

  const switchDirection = (reset = false) => {
    if(!direction || reset) {
      setDirection('desc');
    } else if(direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection(null);
    }
  }

  const setValueAndDirection = (newValue) => {
    if(newValue != value) {
      switchDirection(true);
    } else {
      switchDirection();
    }
    setValue(newValue);
  }

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button 
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>

          <SortArrow direction={direction} col={"name"} value={value}/>

        </button>

        <button 
          className={styles.heading_population} 
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>

          <SortArrow direction={direction} col={"population"} value={value}/>
        </button>

        <button 
          className={styles.heading_area} 
          onClick={() => setValueAndDirection("area")}
        >
          <div>Area (km<sup style={{fontSize: "0.5rem"}}>2</sup>)</div>

          <SortArrow direction={direction} col={"area"} value={value}/>
        </button>

        <button 
          className={styles.heading_gini} 
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>

          <SortArrow direction={direction} col={"gini"} value={value}/>
        </button>
      </div>

      {orderedCountries.map(country => (
        <Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code}>
          <div className={styles.row}>
          <div className={styles.flag}>
            <img src={country.flag} alt={country.name}></img>
          </div>
            <div className={styles.name}>{country.name}</div>

            <div className={styles.population}>{country.population}</div>

            <div className={styles.area}>{country.area || 0}</div>

            <div className={styles.gini}>{country.gini || 0} %</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;