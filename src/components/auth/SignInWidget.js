import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

class SignInWidget extends Component {
    componentDidMount() {
      const el = ReactDOM.findDOMNode(this);
      this.widget = new OktaSignIn({
        baseUrl: this.props.baseUrl,
        // logo: 'logo.png' 
      });
      this.widget.renderEl({ 
        el,
        features: { registration:true }
      }, this.props.onSuccess);
    }
  
    componentWillUnmount() {
      this.widget.remove();
    }
  
    render() {
      return <div id='okta-widget' />;
    }
  }
  
  export default SignInWidget;