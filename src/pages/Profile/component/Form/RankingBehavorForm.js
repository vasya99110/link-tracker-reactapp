import React from 'react'
import IonRangeSlider from 'react-ion-slider'
import { useUser } from '../../../../context/user-context'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
  FormCheckbox,
  FormTextInput,
} from '../../../../components/Form/formhelper'
import { createGlobalStyle } from 'styled-components'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import { handleAction } from '../../../../utils/api-client'
import {
  getRankingBehaviorSetting,
  updateRankingBehavior,
} from '../../../../utils/user-client'
import DataComponent from '../../../../components/DataComponent'

const GlobalStyles = createGlobalStyle`
.mark {
            display: block;
            position: absolute;
            top: 50px;
            width: 55px;
            text-align: center;
            transform: rotate(-45deg);
            padding: 1px 3px;
            border-radius: 3px;
            color: #fff;
            margin-left: -10px;
        }

        .toxic-mark{
            background-color: #F4725C;
        }

        .healthy-mark{
            background-color: #69CE72;
        }
        
        .irs--flat .irs-line {
          background: linear-gradient(90deg, #F4725C 50%, #69CE72 50%);
        }
        
        .toxic-range-slider .irs-bar {
          background-color: #98a6ad !important;
        }
`

function FormContent ({
  updateFormCount, userId, rankingPeriod = 10, rankingPeriodStart = 'index',
  toxicFrom = -2,
  toxicTo = 2,
}) {
  const wrapperStyle = { width: 'auto', margin: 10 }
  const [toxicRangeTo, setToxicRangeTo] = React.useState(toxicFrom)
  const [toxicRangeFrom, setToxicRangeFrom] = React.useState(toxicTo)

  return <>
    <GlobalStyles/>
    <Formik
      initialValues={{
        'rankingPeriod': rankingPeriod,
        'rankingPeriodStart': rankingPeriodStart,
        'userId': userId,
      }}
      validationSchema={Yup.object({
        rankingPeriod: Yup.string().required('Period required'),
        rankingPeriodStart: Yup.string().required('Index start required'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const submitValues = values
        submitValues.toxicRangeFrom = toxicRangeFrom
        submitValues.toxicRangeTo = toxicRangeTo

        return await handleAction({
          actionFn: updateRankingBehavior,
          successFn: () => {
            updateFormCount()
            setSubmitting(false)
          }, data: submitValues,
        })
      }}
    >
      {({ isSubmitting }) => <Form>
        <input type='hidden' name='userId'/>
        <h5 className="mb-2 header-title">
          <i className="mdi mdi-chevron-right mr-1"></i> Behavior Ranking
          Setting
        </h5>

        <FormTextInput label='Analysis Time' name='rankingPeriod' type='text'/>

        <div className='form-group'>
          <label>When The Analysis Should Start</label>
          <div className="form-check">
            <FormCheckbox name='rankingPeriodStart' type='radio' value='start'>When
              the backlink is added</FormCheckbox>
          </div>
          <div className="form-check">
            <FormCheckbox name='rankingPeriodStart' type='radio' value='index'>When
              the backlink is indexed (highly recommended)</FormCheckbox>
          </div>
        </div>

        <div className='form-group' style={{ 'marginBottom': '5rem' }}>
          <label>Toxicity Level</label>
          <div style={wrapperStyle}>
            <IonRangeSlider type='double'
                            min={-100} max={100}
                            extra_classes='toxic-range-slider'
                            from={parseInt(toxicRangeTo)}
                            to={parseInt(toxicRangeFrom)}
                            postfix='%'
                            step={1}
                            onStart={(data) => {
                              let slider = data.slider
                              let html = '<span class="mark toxic-mark" style="left:1%">Toxic</span><span class="mark healthy-mark" style="left:96%">Healthy</span>'
                              slider.append(html)
                            }}
                            onChange={(data) => {
                              setToxicRangeFrom(data.from)
                              setToxicRangeTo(data.to)
                            }}/>
          </div>
        </div>

        <button type='submit' className="btn btn-primary"> {isSubmitting ?
          <ButtonSpinner/> : ''} Update
        </button>
      </Form>}
    </Formik>
  </>
}

function RankingBehaviorForm () {
  const user = useUser(), userId = user.id
  const [updateCount, setUpdateCount] = React.useState(0)

  const updateFormCount = () => setUpdateCount((prevCount) => prevCount + 1)

  return <DataComponent fetchFn={getRankingBehaviorSetting}
                        args={{ userId: userId }}
                        render={(data) => <FormContent userId={userId}
                                                       rankingPeriod={data.data.data.rankingPeriod}
                                                       rankingPeriodStart={data.data.data.rankingPeriodStart}
                                                       toxicFrom={data.data.data.toxicRange.toxic_range_from}
                                                       toxicTo={data.data.data.toxicRange.toxic_range_to}
                                                       updateForm={updateFormCount}
                        />}
  />
}

export default RankingBehaviorForm