import React from 'react';
import {Stepper} from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../common/hooks';
import {selectCurrentWizardStep, setCurrentWizardStep} from '../../features/wizard/wizardSlice';
import Step3 from "./Step3";
import Step2 from "./Step2";
import Step1 from "./Step1";

interface Props {
}

const SAWStepper: React.FC<Props> = (props) => {

  const currentStep = useAppSelector(selectCurrentWizardStep);
  const dispatch = useAppDispatch();

  const handleStep = (stepIndex: number) => {

    console.log('stepIndex', stepIndex);
    console.log('currentStep', currentStep);

    console.log('change it');
    dispatch(setCurrentWizardStep(stepIndex));

    console.log('stepIndex', stepIndex);
    console.log('currentStep', currentStep);

  }

  return (
    <>
      <Stepper active={currentStep} onStepClick={handleStep} iconPosition='right'>
        <Stepper.Step label='Define the Set' description='Start with an expression'>
          <Step1 />
        </Stepper.Step>
        <Stepper.Step label='Modify the Set' description='Add one ore mor modifier(s)'>
          <Step2 />
        </Stepper.Step>
        <Stepper.Step label='Get the Output' description='Retrieve the output'>
          <Step3 />
        </Stepper.Step>
      </Stepper>
    </>
  )
}
export default SAWStepper;
