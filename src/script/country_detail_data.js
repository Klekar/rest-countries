class CountryDetailData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        }
    }

    componentDidMount() {
        fetch(apiUrl + "name/" + this.props.name + "?" +
                new URLSearchParams({
                    "fullText": true,
                    "fields": "name,population,region,subregion,capital,flag,currencies"
                            + ",languages,borders,nativeName,topLevelDomain"
                }))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result[0]
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

    render() {
        const {error, isLoaded, data } = this.state;
        let borders = null;
        if (data.borders?.length) {
                        borders = <div className="data-borders">
                            <dt className="label">Border Countries</dt>
                            <dd><BorderList borders={data.borders.join(";")}/></dd>
                        </div>
        }
        if (error) {
            return <div className="substitute-content">Error: {error.message}</div>
        }
        else if (!isLoaded) {
            return <div className="substitute-content">Loading...</div>
        }
        else {
            return (
                <div className="detail-data">
                    <CountryFlag data={this.state.data}/>
                    <div id="detail-data-list">
                        <h2>{this.state.data.name}</h2>
                        <dl>
                            <div className="data-1">
                                <dt className="label">Native Name</dt><dd>{this.state.data.nativeName}</dd>
                                <dt className="label">Population</dt><dd>{formatPopulation(this.state.data.population)}</dd>
                                <dt className="label">Region</dt><dd>{this.state.data.region}</dd>
                                <dt className="label">Sub Region</dt><dd>{this.state.data.subregion}</dd>
                                <dt className="label">Capital</dt><dd>{this.state.data.capital}</dd>
                            </div>
                            <div className="data-2">
                                <dt className="label">Top Level Domain</dt><dd>{this.state.data.topLevelDomain}</dd>
                                <dt className="label">Currencies</dt><dd>{this.state.data.currencies.map(c => c.name).join(", ")}</dd>
                                <dt className="label">Languages</dt><dd>{this.state.data.languages.map(l => l.name).join(", ")}</dd>
                            </div>
                            {borders}
                        </dl>
                    </div>
                </div>
            );
        }
    }
}