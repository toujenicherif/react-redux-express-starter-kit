import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Index from '../Index/ControllerView';
import NotFound from '../NotFound/NotFound';



class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div className="body ">
                    <Switch>
                        <Route exact path="/" component={Index}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
