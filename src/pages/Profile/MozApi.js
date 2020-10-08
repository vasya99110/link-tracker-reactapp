import React from 'react'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'

const MozApiSchema = Yup.object().shape({
  access_id: Yup.string().required('Please enter Access ID'),
  secret_key: Yup.string().required('Please enter Secret key')
});

const MozApi = (props) => {
  const setting = {
                  access_id: 'somethingfromdatabase1',
                  secret_key: 'somethingfromdatabase2',
              }
  return (
    <div className="update-billing-box">
      <Formik
            initialValues={setting}
            validationSchema={MozApiSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="access_id" className="col-form-label">Access ID</label>
                  <input className="form-control" type="text" name="access_id" id="access_id" onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.access_id} />
                  <ErrorMessage name="access_id">
                    {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                  </ErrorMessage>
              </div>
              <div className="form-group">
                  <label htmlFor="secret_key" className="col-form-label">Secret Key</label>
                  <input className="form-control" type="text" name="secret_key" id="secret_key" onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.secret_key} />
                  <ErrorMessage name="secret_key">
                    {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                  </ErrorMessage>
              </div>
              <div className="form-group mb-0">
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}> Update </button>
              </div>
            </form>
          )}
        </Formik>
    </div>
  );
};
export default MozApi;