import { useState } from "react";
import "./App.css";
import icon from "./assets/images/icon-arrow.svg";

function App() {
  const [visibleValid, setVisibleValid] = useState(false);
  const [dateResult, setDateResult] = useState({
    day: "--",
    month: "--",
    year: "--",
  });

  const [dateInput, setDateInput] = useState({
    day: "DD",
    month: "MM",
    year: "YYYY",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setDateInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let ageYears = currentYear - dateInput.year;
    let ageMonths = currentMonth - dateInput.month;
    let ageDays = currentDay - dateInput.day;

    if (ageDays < 0) {
      ageMonths--;
      const daysInPreviousMonth = daysInMonth(currentMonth - 1, currentYear);
      ageDays += daysInPreviousMonth;
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    if (
      dateInput.day < 1 ||
      dateInput.day > 31 ||
      dateInput.month < 1 ||
      dateInput.month > 12 ||
      dateInput.year > currentYear ||
      isNaN(dateInput.day) ||
      isNaN(dateInput.month) ||
      isNaN(dateInput.year)
    ) {
      setVisibleValid(true);
    } else {
      setVisibleValid(false);
      setDateResult({
        day: ageDays,
        month: ageMonths,
        year: ageYears,
      });
    }
  };
  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className={`form-part ${visibleValid ? "error" : ""}`}>
            <label className={`${visibleValid ? "error" : ""}`} htmlFor="day">
              DAY
            </label>
            <input
              type="text"
              name="day"
              id="day"
              value={dateInput.day}
              onChange={handleChange}
            ></input>
            {visibleValid && <h4>Must be a valid day</h4>}
          </div>
          <div className={`form-part ${visibleValid ? "error" : ""}`}>
            <label className={`${visibleValid ? "error" : ""}`} htmlFor="day">
              MONTH
            </label>
            <input
              type="text"
              name="month"
              id="month"
              value={dateInput.month}
              onChange={handleChange}
            ></input>
            {visibleValid && <h4>Must be a valid month</h4>}
          </div>
          <div className={`form-part ${visibleValid ? "error" : ""}`}>
            <label className={`${visibleValid ? "error" : ""}`} htmlFor="day">
              YEAR
            </label>
            <input
              type="text"
              name="year"
              id="year"
              value={dateInput.year}
              onChange={handleChange}
            ></input>
            {visibleValid && <h4>Must be in the past</h4>}
          </div>
        </div>
        <div className="submit-section">
          <span className="line"></span>
          <button className="btn-submit" type="submit">
            <img src={icon} alt="Icon" className="btn-icon" />
          </button>
        </div>
      </form>
      <div className="all-results">
        <div className="results">
          <h3 className="purple-number">{dateResult.year}</h3>
          <h3 className="results-time">years</h3>
        </div>
        <div className="results">
          <h3 className="purple-number">{dateResult.month}</h3>
          <h3 className="results-time">months</h3>
        </div>
        <div className="results">
          <h3 className="purple-number">{dateResult.day}</h3>
          <h3 className="results-time">days</h3>
        </div>
      </div>
    </main>
  );
}

export default App;
