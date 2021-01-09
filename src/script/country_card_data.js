class CountryCardData extends React.Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <ul className="country-card-data">
                <li><h3>{this.props.data.name}</h3></li>
                <li><span className='label'>Population</span>{formatPopulation(this.props.data.population)}</li>
                <li><span className='label'>Region</span>{this.props.data.region}</li>
                <li><span className='label'>Capital</span>{this.props.data.capital}</li>
            </ul>
        );
    }
}