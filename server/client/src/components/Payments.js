import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
//amount for stripe checkout is in USD, specifically cents
//token excpects to receive a callback function that will be called and will return a token representing the charge
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 credits"
        amount={500}
        token={(token) => this.props.handleToken(token)} 
        // action creator that we now have access to bc we we connected this component with the action creator and sent it as props
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">add credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
