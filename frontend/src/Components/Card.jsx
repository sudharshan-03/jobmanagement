import React from "react";
import "../styles/card.css";
import logo from "../assets/amazon.png";
import year from "../assets/year.svg";
import build from "../assets/build.svg";
import salary from "../assets/salary.svg";

function Card({ job }) {
  const { image, position, salaryRangeTo, description,createdAt } = job;

  function getTimeAgo(createdTime) {
    const createdDate = new Date(createdTime);
    const now = new Date();

    const diffMs = now - createdDate; // difference in milliseconds
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}D Ago`;
    if (diffHours > 0)
      return `${diffHours}h Ago`;
    if (diffMin > 0) return `${diffMin}M Ago`;
    return `Just now`;
  }

  return (
    <>
      <div className="cardContainer">
        <div className="imageContent">
          <div className="imgContainer">
            <img
              src={`https://jobmanagement-v40a.onrender.com/logos/${job.image
                .split("/")
                .pop()}`}
              alt="logo"
            />
          </div>
          <div className="time">{getTimeAgo(job.createdAt)}</div>
        </div>
        <h2 className="heading">{position}</h2>
        <div className="details">
          <div className="detail">
            <img src={year} />
            <p>1-3 yr Exp</p>
          </div>
          <div className="detail">
            <img src={build} />
            <p>Onsite</p>
          </div>
          <div className="detail">
            <img src={salary} />
            <p>12LPA</p>
          </div>
        </div>

        <ul className="description">
          {description.split(". ").map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>

        <button className="apply">Apply Now</button>
      </div>
    </>
  );
}

export default Card;
