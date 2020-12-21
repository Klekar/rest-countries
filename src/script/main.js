$(function() {
    /*--------------DARK MODE SWITCH HANDLING---------------- */

    $("#dark-mode-switch").on("click", function() {
        $("body").toggleClass("dark-mode");
    });

    /*------------------LIST DATA LOADING---------------------*/

    $.ajax({
        url: "https://restcountries.eu/rest/v2/all",
        type: "GET",
        success: populateList,
        error: function (error) {
            console.log(error);
        }
    });

    function populateList(result) {
        let domContainer = $('#main-content-box')[0];
        ReactDOM.render(<CountriesList data={result}/>, domContainer);
    };
});
