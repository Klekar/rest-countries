$(function() {
    console.log("script started");
    $.ajax({
        url: "https://restcountries.eu/rest/v2/all",
        type: "GET",
        success: populateList,
        error: function (error) {
            console.log(error);
        }
    });

    function populateList(result) {
        let domContainer = $('main')[0];
        ReactDOM.render(<CountriesList data={result}/>, domContainer);
    };
});
