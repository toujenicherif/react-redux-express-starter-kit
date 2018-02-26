import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import StatelessComponent from './Components/StatelessComponent';
import pageActions from "../../actions/page/pageActions";
import PropTypes from 'prop-types';

class ControllerView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.pageActions.initPage();
    }


    render() {
        return (
            <StatelessComponent message={this.props.page.message} />
        );
    }
}

ControllerView.propTypes = {};
ControllerView.defaultProps = {};

function mapStateToProps(state) {
    return {
        page: state.page
    };
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ControllerView));