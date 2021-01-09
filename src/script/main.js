const { NonceProvider } = require("react-select");
var mainContentContainer;

$(function() {
    mainContentContainer = $('#main-content-box')[0];
    renderPage();

    $(".back-btn").on("click", function () {
        window.history.back();
    });

    $(window).on("popstate", renderPage);

    $("#main-title").on("click", function() {
        if (window.history.state === null) return;
        window.history.pushState(null, "Where in the world?", location.pathname);
        renderList();
    });

    function renderPage() {
        if (window.history.state === null) {
            renderList();
        }
        else if (window.history.state.type == "country-detail") {
            renderDetail(window.history.state.countryName);
        }
    }

    /*--------------DARK MODE SWITCH HANDLING----------------*/

    $("#dark-mode-switch").on("click", function() {
        $("body").toggleClass("dark-mode");
    });
});

function formatPopulation(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

/*-------------------RENDERING FUNCTIONS--------------------*/

function renderDetail(countryName) {
    ReactDOM.render(<CountryDetail key={countryName} name={countryName}/>, mainContentContainer);
}

function goToDetail(countryName) {
    history.pushState({type: "country-detail", "countryName": countryName}, countryName, "?" + countryName);
    renderDetail(countryName);
}

function renderList() {
    ReactDOM.render(<CountriesList key="list"/>, mainContentContainer);
}