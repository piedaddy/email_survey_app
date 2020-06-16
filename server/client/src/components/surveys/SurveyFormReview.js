import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions/index";

function SurveyFormReview({ onBack, formValues, submitSurvey, history }) {
  const fields = formFields.map((field) => {
    return (
      <div>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        <div>{fields}</div>
      </div>
      <button className="yellow darken-3 white-text btn-flat" onClick={onBack}>
        Back
      </button>
      <button
        className="green btn-flat white-text right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey <i className="material-icons right">email</i>
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
