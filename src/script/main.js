const { NonceProvider } = require("react-select");

$(function() {
    const countryNameInputSelector = "#country-name-input";
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    var resultData;
    var region;
    /*--------------DARK MODE SWITCH HANDLING---------------- */

    $("#dark-mode-switch").on("click", function() {
        $("body").toggleClass("dark-mode");
    });

    /*------------------LIST DATA LOADING---------------------*/

    $.ajax({
        url: "https://restcountries.eu/rest/v2/all",
        type: "GET",
        success: resultSuccess,
        error: function (error) {
            console.log(error);
        }
    });

    function resultSuccess(result) {
        resultData = result;
        displayResult();
        populateCountrySelector();
    }

    function displayResult() {
        var result = resultData;
        var nameString = $(countryNameInputSelector).val();
        if (region) 
        {
            result = $.grep(result, function (n) {
                return n.region === region;
            })
        }
        if (nameString)
        {
            result = $.grep(result, function (n) {
                return ~n.name.toLowerCase().indexOf(nameString.toLowerCase());
            })
        }
        
        var domContainer = $('#main-content-box')[0];
        ReactDOM.render(<CountriesList data={result}/>, domContainer);
    };

    /*-------------------INPUT FILTRING---------------------*/

    var inputtingCheckTimeout = null;
    $(countryNameInputSelector).on("paste keyup", function () {
        window.clearTimeout(inputtingCheckTimeout);
        inputtingCheckTimeout = window.setTimeout(displayResult, 650);
    });

    function populateCountrySelector() {
        var regionsOptions = [];
        regions.forEach(region => {
            regionsOptions.push({value: region, label: region});
        });

        var domContainer = $('#region-select-holder')[0];
        ReactDOM.render(<Select options={regionsOptions}
                                isClearable={true}
                                isSearchable={false}
                                name="region-select"
                                className="region-select-container"
                                classNamePrefix="region-select"
                                placeholder="Filter by Region"
                                onChange={handleSelectChange}
                                />,
                        domContainer);

        function handleSelectChange(selectedOption) {
            region = selectedOption?.value;
            displayResult();
        }
    }
});
