import React from 'react'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import './Profile.css'

const ProfileSchema = Yup.object().shape({
  firstname: Yup.string().required('Please enter your first name'),
  lastname: Yup.string().required('Please enter your last name'),
  username: Yup.string().min(3, 'User name must be at least 3 characters').required('Please enter your user name'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter your email'),
  address1: Yup.string().required('Please enter your address 1'),
  password: Yup.string()
      .min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword:  Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

const ProfileEdit = (props) => {
  return (
    <div className="profileedit-box row">
      <div className="col-sm-4">
        <div className="card">
          <div className="card-body">
            <div className="avatar">
              <center className=""> <img src={props.profile.avatar} className="rounded-circle img-thumbnail" style={{height: '100px'}} alt="Avatar" />
                <h5 className="m-t-10">{props.profile.firstname} {props.profile.lastname}</h5>
              </center>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-8">
        <Formik
            initialValues={{
                  firstname: props.profile.firstname,
                  lastname: props.profile.lastname,
                  username: props.profile.username,
                  phone: props.profile.phone,
                  email: props.profile.email,
                  password: props.profile.password,
                  confirmPassword: props.profile.password,
                  avatar: props.profile.avatar,
                  address1: props.profile.address1,
                  address2: props.profile.address2,
                  city: props.profile.city,
                  state: props.profile.state,
                  country: props.profile.country,
                  zipcode: props.profile.zipcode
              }}
            validationSchema={ProfileSchema}
            /*validate={values => {
              let errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}*/
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="firstname" className="col-form-label">First name</label>
                    <input className="form-control" type="text" name="firstname" id="firstname" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname} />
                    <ErrorMessage name="firstname">
                      {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                    </ErrorMessage>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="lastname" className="col-form-label">Last name</label>
                    <input className="form-control" type="text" name="lastname" id="lastname" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname} />
                    <ErrorMessage name="lastname">
                      {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                    </ErrorMessage>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="emailaddress">Email address</label>
                    <input className="form-control" type="email" name="email" id="emailaddress" onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email} />
                  <ErrorMessage name="email">
                    {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                  </ErrorMessage>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4" className="col-form-label">User name</label>
                    <input className="form-control" type="text" name="username" id="username" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username} />
                    <ErrorMessage name="username">
                      {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                    </ErrorMessage>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="password">Password</label>
                  <input className="form-control" type="password" name="password" required="" id="password"
                    onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  />
                  <ErrorMessage name="password">
                    {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                  </ErrorMessage>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input className="form-control" type="password" name="confirmPassword" required="" id="confirmPassword"
                    onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  />
                  <ErrorMessage name="confirmPassword">
                    {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                  </ErrorMessage>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4" className="col-form-label">Address 1</label>
                    <input className="form-control" type="text" name="address1" id="address1" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address1} />
                    <ErrorMessage name="address1">
                      {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                    </ErrorMessage>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4" className="col-form-label">Address 2</label>
                    <input className="form-control" type="text" name="address2" id="address2" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address2} />
                    <ErrorMessage name="address2">
                      {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                    </ErrorMessage>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4" className="col-form-label">City</label>
                    <input className="form-control" type="text" name="city" id="city" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city} />
                    <ErrorMessage name="city">
                      {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                    </ErrorMessage>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4" className="col-form-label">State</label>
                    <input className="form-control" type="text" name="state" id="state" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state} />
                    <ErrorMessage name="state">
                      {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                    </ErrorMessage>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4" className="col-form-label">Country</label>
                    <input className="form-control" type="text" name="country" id="country" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country} />
                    <ErrorMessage name="country">
                      {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                    </ErrorMessage>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4" className="col-form-label">Zipcode</label>
                    <input className="form-control" type="text" name="zipcode" id="zipcode" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zipcode} />
                    <ErrorMessage name="zipcode">
                      {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                    </ErrorMessage>
                </div>
              </div>
              <div className="form-group mb-0">
                <button className="btn btn-primary mr-2 blue-gradient" type="submit" disabled={isSubmitting}> Update Profile </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default ProfileEdit;