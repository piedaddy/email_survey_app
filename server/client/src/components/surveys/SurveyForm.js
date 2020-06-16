import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
//this allows redux form to talk to redux store , kinda like connect function
// field shows any type of html element that collects input
import SurveyField from "./SurveyField";
import {Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields'

class SurveyForm extends Component {

  renderFields() {
    return _.map(formFields, field => {
      return (<Field key={field.name} label={field.label} name={field.name} component={SurveyField} type="text" />  )
    })
        /* <Field type="text" name="title" label="Survey Title" component={SurveyField} />
        <Field type="text" name="subject" label="Subject Line" component={SurveyField} />
        <Field type="text" name="body" label="Email Body" component={SurveyField} />
        <Field type="text" name="emails" label="Recipient List" component={SurveyField} /> */
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          {/* <Field type="text" name="surveyTitle" component="input"/> */}

          <button type="submit" className="teal btn-flat right white-text">next <i className="material-icons right">done</i></button>
          <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
        </form>
      </div>
    );
  }
}


function validate(values) {
  const errors = {};
  // if (!values.title) {
  //   errors.title = 'YOu must provide title'; //will pass this error to where there is an input with the same name //ex: this will be rendered in title 
  // }
  // if (!values.subject) {
  //   errors.subject = 'YOu must provide title'; //will pass this error to where there is an input with the same name //ex: this will be rendered in title 
  // }
  // if (!values.body) {
  //   errors.body = 'YOu must provide title'; //will pass this error to where there is an input with the same name //ex: this will be rendered in title 
  // }
  // if (!values.emails) {
  //   errors.emails = 'YOu must provide title'; //will pass this error to where there is an input with the same name //ex: this will be rendered in title 
  // }
  errors.recipients = validateEmails(values.recipients || "")

  _.each(formFields, ({name}) => {
    if(!values[name]) {
      errors[name] = "Don't leave me blank!"
    }
  });
  return errors;
}


//form will take the value of the field, and store it into the store with the key of whatever is in NAME

//          takes one argument as form
export default reduxForm({ validate: validate, form: "surveyForm", destroyOnUnmount: false})(SurveyForm);
