class CountryCard extends React.Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <ul className="country-card-data">
                <li><h3>{this.props.data.name}</h3></li>
                <li>{this.props.data.population}</li>
                <li>{this.props.data.region}</li>
                <li>{this.props.data.capital}</li>
            </ul>
        );
    }
}