class CountryDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    backBtnClicked() {
        window.history.back();
    }

    render() {
        return (
            <div id="country-detail">
                <div id="detail-controls">
                    <button onClick={this.backBtnClicked} className="back-btn content-element clickable">
                        <span className="just-arrow">←</span> Back
                    </button>
                </div>
                <CountryDetailData key={this.props.name} name={this.props.name} />
            </div>
        );
    }
}