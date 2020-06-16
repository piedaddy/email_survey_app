import React, {Component} from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import {reduxForm} from 'redux-form';


class SurveyNew extends Component {
  constructor(props) {
    super(props); 
    this.state = {showFormReview:false};
    this.renderContent = this.renderContent.bind(this);
  }

  // state = {showReview:false};

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview onBack={() => this.setState({showFormReview:false})} />
    } 
    return <SurveyForm onSurveySubmit={() => this.setState({showFormReview:true})} />
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }

};

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew); ///this will dump the vlaues inside the form if user naviagates away from survey new