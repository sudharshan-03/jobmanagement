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
    jobType: "all", // Default all
    salary: [50000, 80000],
  });

  const handleSliderChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, salary: newValue }));
    onFilterChange({
      ...filters,
      salary: [newValue[0], newValue[1]],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    onFilterChange(updated);
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
            <option value="all">Job type</option>
            <option value="Fulltime">Full Time</option>
            <option value="Parttime">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
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
              color: "#000",
              height: 2,
              paddingLeft: "10px",
              position: "relative",
              left: "15px",
              "& .MuiSlider-track": { backgroundColor: "#000" },
              "& .MuiSlider-rail": { backgroundColor: "#ddd" },
              "& .MuiSlider-thumb": {
                boxShadow: "none",
                backgroundColor: "#fff",
                border: "5px solid black",
                width: "15px",
                height: "15px",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
