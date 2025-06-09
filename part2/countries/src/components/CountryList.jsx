const CountryList = ({ showCountries, setSelectedCountry, setShowDetails }) => {
    const handleShow = (country) => {
        setSelectedCountry(country);
        setShowDetails(true);
    };

    return (
        <div>
            {showCountries.map((country) => (
                <div key={country.name.common}>
                    <p>{country.name.common} <button onClick={() => handleShow(country)}>show</button></p>
                </div>
            ))}
        </div>
    );
};

export default CountryList;