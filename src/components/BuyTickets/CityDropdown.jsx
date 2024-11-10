import React, { useState } from "react";

// Sample list of city names
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];

const CustomDropdown = ({pop}) => {
  const [isOpen, setIsOpen] = useState(false); // To track dropdown open/close state
  const [selectedCity, setSelectedCity] = useState(""); // To track selected city

  // Function to toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Function to handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city); // Set the selected city
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      {/* Dropdown button */}
      <div
        onClick={toggleDropdown}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          backgroundColor: "#f9f9f9"
        }}
      >
        {selectedCity || "Select a city"}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            maxHeight: "150px",
            overflowY: "auto",
            zIndex: 1,
          }}
        >
          {cities.map((city) => (
            <div
              key={city}
              onClick={() => {handleCitySelect(city),pop}}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: selectedCity === city ? "#eee" : "#fff",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = selectedCity === city ? "#eee" : "#fff")}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
