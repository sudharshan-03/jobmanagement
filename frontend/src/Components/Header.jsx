import React, { useState } from "react";
import "../styles/header.css";
import Navbar from "./Navbar";
import searchIcon from "../assets/search.svg";
import locationIcon from "../assets/location.svg";
import jobtypeIcon from "../assets/jobtype.svg";
import Slider from "@mui/material/Slider";

function Header({ toggle, onFilterChange }) {
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "",
    salary: [50000, 80000],
  });

  const handleSliderChange = (event, newValue) => {
    // Convert monthly salary to yearly for the backend
    const yearlySalary = [newValue[0] * 12, newValue[1] * 12];
    const updated = { ...filters, salary: newValue };
    setFilters(updated);
    onFilterChange({ ...filters, salary: yearlySalary });
  };

  const handleChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
    onFilterChange({
      ...updated,
      salary: [filters.salary[0] * 12, filters.salary[1] * 12],
    });
  };

  return (
    <header>
      <Navbar toggle={toggle} />
      <div className="filterContainer">
        <div className="inputs">
          <img src={searchIcon} alt="search icon" />
          <input
            type="text"
            name="title"
            placeholder="Search By Job Title, Role"
            value={filters.title}
            onChange={handleChange}
          />
        </div>
        <div className="inputs">
          <img src={locationIcon} alt="location icon" />
          <input
            type="text"
            name="location"
            placeholder="Preferred Location"
            id="secondInput"
            value={filters.location}
            onChange={handleChange}
          />
        </div>
        <div className="inputs third">
          <img src={jobtypeIcon} alt="job type icon" className="jobType" />
          <select
            name="jobType"
            className="custom-select"
            value={filters.jobType}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Job type
            </option>
            <option value="">Full Time</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="salaryContainer">
          <div className="salaryHead">
            <p>Salary Per Month</p>
            <p>
              ₹{Math.round(filters.salary[0] / 1000)}k - ₹
              {Math.round(filters.salary[1] / 1000)}k
            </p>
          </div>
          <Slider
            value={filters.salary}
            onChange={handleSliderChange}
            min={50000}
            max={100000}
            step={5000}
            sx={{
              color: "#000", // affects thumb, track
              height: 2,
              paddingLeft: "10px",
              position: "relative",
              left: "15px",
              "& .MuiSlider-track": {
                backgroundColor: "#000",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#ddd",
              },
              "& .MuiSlider-thumb": {
                boxShadow: "none",
                backgroundColor: "#fff",
                border: "5px solid black",
                width: "15px",
                height: "15px",
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#000",
              },
              "& .MuiSlider-thumb:hover": {
                boxShadow: "none",
              },
              "& .MuiSlider-thumb:focus": {
                boxShadow: "none",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
