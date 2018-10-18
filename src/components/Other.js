import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import * as Routes from '../routes';

const mapStateToProps = state => {
  const c = state && state.counter && state.counter.counter ? state.counter.counter : 'undefined';
  return {
    counter: c,
  }
}

class Other extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localCount: 0,
    }
  }

  increase = () => {
    this.setState((state, props) => {
      return { localCount: state.localCount + 1 };
    });
  }

  render() {
    const { counter, children } = this.props;

    return (
      <div>
        <p>Other</p>
        <p>count: {counter}</p>
        <p>
          local count: {this.state.localCount}
          <button onClick={this.increase}>increase</button>
        </p>
        <p>Child here:</p>
        <Switch>
          <Route exact path="/otherchild" component={Routes.OtherChild} />
        </Switch>
        <footer>
          <Link to="/otherchild">OtherChild</Link>
        </footer>

      </div>
    );
  }
}

export default connect(mapStateToProps)(Other);