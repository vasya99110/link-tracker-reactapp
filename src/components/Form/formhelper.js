import { useField } from 'formik'
import React from 'react'

export const FormTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta, helpers] = useField(props)
  return (
    <div className='form-group mb-3'>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input className="text-input form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-warning">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const FormTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className='form-group mb-3'>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <textarea className="text-input form-control" {...field} {...props}></textarea>
      {meta.touched && meta.error ? (
        <div className="error text-warning">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const FormSelect = ({label, ...props}) =>{
  const [field, meta] = useField(props);
  return (
    <div className='form-group mb-3'>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <select className='form-control' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-warning">{meta.error}</div>
      ) : null}
    </div>
  );
}

export const FormCheckbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.

  let fieldType = props.type === null ? 'checkbox': 'radio'
  const [field, meta] = useField({ ...props, type: fieldType });
  return (
    <>
      <label className="checkbox">
        <input type={fieldType} {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error text-warning">{meta.error}</div>
      ) : null}
    </>
  );
};