$(function() {
    const countryNameInputSelector = "#country-name-input";
    const regionInputSelector = "#region-filter";
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    var resultData;
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
        var region = $(regionInputSelector).val();
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
        
        let domContainer = $('#main-content-box')[0];
        ReactDOM.render(<CountriesList data={result}/>, domContainer);
    };

    /*-------------------INPUT FILTRING---------------------*/
    $(countryNameInputSelector + ", " + regionInputSelector).change(displayResult);

    var inputtingCheckTimeout = null;
    $(countryNameInputSelector).on("paste keyup", function () {
        window.clearTimeout(inputtingCheckTimeout);
        inputtingCheckTimeout = window.setTimeout(displayResult, 650);
    });

    function populateCountrySelector() {
        regions.forEach(region => {
            $(regionInputSelector).append($('<option>', {
                value: region,
                text: region
            }));
        });
    }
});
