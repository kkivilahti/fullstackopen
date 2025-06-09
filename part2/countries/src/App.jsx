import { useEffect, useState } from "react";
import countryApi from './services/countries';
import CountryDetails from "./components/CountryDetails";
import CountryList from "./components/CountryList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    countryApi.getAll().then(data => {
      setCountries(data);
    });
  }, []);

  const showCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (value) => {
    setSearch(value);

    // close country details when searching
    setShowDetails(false);
    setSelectedCountry(null);
  };

  return (
    <div>
      find countries <input name="search" value={search} onChange={(e) => handleSearch(e.target.value)} />

      {/* show selected country's details */}
      {showDetails ? (
        <div>
          <CountryDetails country={selectedCountry} />
          <button onClick={() => setShowDetails(false)}>close</button>
        </div>
      ) : (
        <div>
          {/* show search results */}
          {search && (
            <div>
              {showCountries.length === 0 && <p>No countries found</p>}
              {showCountries.length === 1 && <CountryDetails country={showCountries[0]} />}
              {showCountries.length > 1 && showCountries.length <= 10 &&
                <CountryList showCountries={showCountries} setSelectedCountry={setSelectedCountry} setShowDetails={setShowDetails} />
              }
              {showCountries.length > 10 && <p>Too many matches, specify the search</p>}
            </div>
          )}
        </div>
      )}
      
    </div>
  );
};

export default App;