class CountriesList extends React.Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        {var r = this.props.data.map(country => {
            
            //ReactDOM.render(<CountryCard data={result[0]}/>);
            return (<li key={country.name} className="country-card"><CountryCard data={country}/></li>)
        })}
        return (
            <ul id="countries-list">
                {r}
            </ul>
        )
    }
}