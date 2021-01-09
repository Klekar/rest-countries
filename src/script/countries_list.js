class CountriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            countries: []
        }
        this.allCountries = [];
    }
    
    countryCardClicked(countryName, e) {
        goToDetail(countryName);
    }

    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/all?" +
                new URLSearchParams({
                    "fields": "name;population;region;capital;flag"
                }))
            .then(res => res.json())
            .then(
                (result) => {
                    this.allCountries = result;
                    this.setState({
                        isLoaded: true,
                        countries: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleRegionSelectChange(e) {
        this.searchRegion = e?.value;
        this.filterData();
    }

    handleNameInputChange(e) {
        window.clearTimeout(this.inputtingCheckTimeout);
        this.inputtingCheckTimeout = window.setTimeout(this.filterData.bind(this), 650);
    }

    filterData() {
        var result = this.allCountries;
        if (this.searchRegion)
        {
            let cl = this;
            result = $.grep(result, function (n) {
                return n.region === cl.searchRegion;
            });
        }
        var nameString = $("#country-name-input").val();
        if (nameString)
        {
            result = $.grep(result, function (n) {
                return ~n.name.toLowerCase().indexOf(nameString.toLowerCase());
            })
        }
        this.setState({
            countries: result
        })
    }
  
    render() {
        const {error, isLoaded, countries } = this.state;
        if (error) {
            return <div className="substitute-content">Error: {error.message}</div>
        }
        else if (!isLoaded) {
            return <div className="substitute-content">Loading...</div>
        }
        else {
            const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
            var regionsOptions = [];
            regions.forEach(region => {
                regionsOptions.push({value: region, label: region});
            });
            var r = countries.map(country => {
                return (
                    <li key={country.name} 
                        className="country-card content-element clickable"
                        onClick={(e) => this.countryCardClicked(country.name, e)}>
                        <a /*href={"#" + country.name}*/>
                            <CountryFlag data={country}/>
                            <CountryCardData data={country}/>
                        </a>
                    </li>)
            })
            return (
                <div key="list">
                    <div className="filter-container">
                        <input id="country-name-input"
                               className="content-element"
                               type="text"
                               onChange={this.handleNameInputChange.bind(this)}
                               placeholder="Search for a country..." />
                        <div id="region-select-holder" className="content-element">
                            <Select options={regionsOptions}
                                    isClearable={true}
                                    isSearchable={false}
                                    name="region-select"
                                    className="region-select-container"
                                    classNamePrefix="region-select"
                                    placeholder="Filter by Region"
                                    onChange={this.handleRegionSelectChange.bind(this)}
                                    />
                        </div>
                    </div>
                    <ul id="countries-list">
                        {r}
                    </ul>
                </div>
            )
        }
    }
}