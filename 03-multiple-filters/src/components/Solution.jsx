import React, { useState } from "react";
import { items } from "./items";
import { filters } from "./filters";
import "./style.css";

const Solution = () => {
  const [activeFilters, setFilters] = useState([]);

  const handleFilters = (filter) => {
    if (activeFilters.includes(filter)) {
      setFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setFilters([...activeFilters, filter]);
    }
  };

  const itemsList =
    activeFilters.length > 0
      ? items.filter((item) => activeFilters.includes(item.category))
      : items;

  return (
    <div className="container">
      <h1>MoonshotX Filters</h1>
      <div className="buttons-container">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilters(filter)}
            className={activeFilters.includes(filter) ? "active" : ""}
            data-testid={`${filter}-button`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="items-container">
        {itemsList.map((product) => (
          <div className="item" key={product.name} data-testid={product.name}>
            <p>{product.name}</p>
            <p className="category">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solution;
