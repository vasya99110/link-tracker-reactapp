import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
class SettingForm extends React.Component {
  render() {
    const settingSchema = Yup.object().shape({
      behavior_test_percent: Yup.number('Must be number').required('Field is required').positive('Must be number').integer('Must be number'),
      behavior_test_day: Yup.number('Must be number').required('Behavior test day required').positive('Must be number').integer('Must be number')
    });
    return (
        <Formik
            initialValues={{ behavior_test_percent: '', behavior_test_day : '' }}
            validationSchema ={settingSchema}
            onSubmit={(values, {setSubmitting}) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
            render={({isSubmitting}) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="settingBehaviorPercent">Behavior percent test</label>
                    <Field component="input" className={"form-control"} type="text" name="behavior_test_percent" id="settingBehaviorPercent" placeholder="Behavior percent test" />
                    <ErrorMessage name="behavior_test_percent" component="span" className="text-danger"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="settingBehaviorDayTest">Behavior test days</label>
                    <Field className={"form-control"} component="input" type="text" name="behavior_test_day" id="settingBehaviorDayTest" placeholder="Behavior test days" />
                    <ErrorMessage name="behavior_test_day" component="span" className="text-danger"/>
                  </div>
                  <button type="submit" className={"btn btn-primary"} disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
            )}
        />
    )
  }
}
export default SettingForm;