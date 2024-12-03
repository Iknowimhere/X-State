import React, { useEffect } from 'react';

export const States = () => {
  let [country, setCountry] = React.useState([]);
  let [selectedCountry, setSelectedCountry] = React.useState('');
  let [state, setState] = React.useState([]);
  let [selectedState, setSelectedState] = React.useState('');
  let [city, setCity] = React.useState([]);
  let [selectedCity, setSelectedCity] = React.useState('');

  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((res) => res.json())
      .then((data) => {
        setCountry(data);
      })
      .catch((err) => {
        console.log('Error fetching data:', err);
      });
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setState(data);
      })
      .catch((err) => {
        console.log('Error fetching data:', err);
      });
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState || !selectedCountry) return;
    fetch(
      ` https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
    )
      .then((res) => res.json())
      .then((data) => {
        setCity(data);
      })
      .catch((err) => {
        console.log('Error fetching data:', err);
      });
  }, [selectedState]);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value=''>Select Country</option>
          {country.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          value={selectedState}
          disabled={!selectedCountry}
          onChange={(e) => setSelectedState((prev) => (prev = e.target.value))}
        >
          <option value=''>Select State</option>
          {state.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>

        <select
          value={selectedCity}
          disabled={!selectedState}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value=''>Select City</option>
          {city.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>

      {selectedCity && (
        <h2 style={{ marginTop: '2rem' }}>
          You selected ${selectedCity} , {selectedState} , {selectedCountry}
        </h2>
      )}
    </div>
  );
};
