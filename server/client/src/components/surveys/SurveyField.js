import React from 'react';

// class SurveyField extends Component {
//   render
// }

function SurveyField({input, label, meta: {error, touched}}) { //pullls off input property with callbacks
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{marginBottom: '5px'}}/>
      <div className = "red-text" style={{marginBottom: '20px'}}>
      {touched && error}
      </div>
    </div>
  )
};

export default SurveyField;