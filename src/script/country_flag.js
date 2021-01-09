class CountryFlag extends React.Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <img src={this.props.data.flag} alt={this.props.data.name + " flag"} />
        );
    }
}