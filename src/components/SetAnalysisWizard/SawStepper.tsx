import React from 'react';
import {Stepper, Title} from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../common/hooks';
import {
  selectCurrentWizardStep, selectHighlightedSetModifier,
  selectWizardValue,
  setCurrentWizardStep
} from '../../features/wizard/wizardSlice';
import Step3 from "./Step3";
import Step2 from "./Step2";
import Step1 from "./Step1";
import Expression from "./Expression";

interface Props {
}

const SawStepper: React.FC<Props> = (props) => {

  const currentStep = useAppSelector(selectCurrentWizardStep);
  const highlightedSetModifier = useAppSelector(selectHighlightedSetModifier);
  const wizardValue = useAppSelector(selectWizardValue);

  const dispatch = useAppDispatch();

  const handleStep = (stepIndex: number) => {
    dispatch(setCurrentWizardStep(stepIndex));
  }

  const goToResult = () => {
    dispatch(setCurrentWizardStep(2));
  }

  return (
    <>
      <Stepper active={currentStep} onStepClick={handleStep} iconPosition='right'>
        <Stepper.Step label='Define the Set' description='Start with an expression'>
          <Step1 />
          <Title order={4}>Preview</Title>
          <Expression expression={wizardValue.Expression} highlightedText={highlightedSetModifier} onClick={goToResult}></Expression>
        </Stepper.Step>
        <Stepper.Step label='Modify the Set' description='Add one ore mor modifier(s)'>
          <Step2 />
          <Title order={4}>Preview</Title>
          <Expression expression={wizardValue.Expression} highlightedText={highlightedSetModifier} onClick={goToResult}></Expression>
        </Stepper.Step>
        <Stepper.Step label='Get the Output' description='Retrieve the output'>
          <Step3 expressionWithComments={wizardValue.ExpressionWithComments ?? ''} />
        </Stepper.Step>
      </Stepper>
    </>
  )
}
export default SawStepper;
