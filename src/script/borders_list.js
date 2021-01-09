class BorderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/alpha?fields=name&codes=" + this.props.borders)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
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
    
    countryClicked(countryName, e) {
        goToDetail(countryName);
    }

    render() {
        const {error, isLoaded, items } = this.state;
        if (error) {
            return <div className="substitute-content">Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div className="substitute-content">Loading...</div>
        }
        else {
            return (
                <ul>
                    {items.map(country => (
                        <li key={country.name}>
                            <button className="clickable content-element"
                                    onClick={(e) => this.countryClicked(country.name, e)}>{country.name}</button>
                        </li>
                    ))}
                </ul>
            )
        }
    }
}