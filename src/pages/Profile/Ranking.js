import React from 'react'
import { ErrorMessage, Field, Formik } from 'formik'
import * as Yup from 'yup'
import Nouislider from 'nouislider-react'
import 'nouislider/distribute/nouislider.css'

const RankingSchema = Yup.object().shape({
  period: Yup.string().required('Please choose Ranking Period Start Index'),
  test_period: Yup.number().typeError('The test period must be a number').required('Please enter Testing Period'),
  //toxicity_level: Yup.string().required('Please choose Toxicity level')
});

const Ranking = (props) => {
  //console.log(jQuery('.update-billing-box').html());
  return (
    <div className="update-billing-box">
      <Formik
            initialValues={{
                  period: 'annually',
                  test_period: '',
                  toxicity_level_from: -2,
                  toxicity_level_to: 2,
              }}
            validationSchema={RankingSchema}
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
                  <label htmlFor="test_period" className="col-form-label">Ranking Behavior Testing Period (Days)</label>
                  <input className="form-control" type="text" name="test_period" id="test_period" onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.test_period} />
                  <ErrorMessage name="test_period">
                    {errorMessage => <div className="invalid-field">{errorMessage}</div>}
                  </ErrorMessage>
              </div>
              <div className="form-group mb-3">
                <label className="col-form-label">Ranking Period Start Index</label>
                  <div className="custom-control custom-radio">
                    <Field className="custom-control-input" type="radio" name="period" value="added" id="added" />
                    <label className="custom-control-label" htmlFor="added">When the backlink is added</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <Field className="custom-control-input" type="radio" name="period" value="indexed" id="indexed" />
                    <label className="custom-control-label" htmlFor="indexed">When the backlink is indexed (highly recommended)</label>
                  </div>
              </div>
              <div className="form-group">
                  <label htmlFor="example-range">Toxicity level customization (% range)</label>
                  <Nouislider range={{ min: -100, max: 100 }} start={[20, 80]} step={1} connect
                    onSlide={ (render, handle, value, un, percent)=> {
                      setFieldValue('toxicity_level_from',value[0])
                      setFieldValue('toxicity_level_to',value[1])//percent[0].toFixed(2)
                    } }
                    pips={{
                        mode: 'values',
                        values: [-100, -50, 0, 50, 100],
                        density: 4,
                    }}
                    clickablePips
                    tooltips={true}
                  />
              </div>
              <div className="form-group mb-0">
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}> Save </button>
              </div>
            </form>
          )}
        </Formik>
    </div>
  );
};
export default Ranking;