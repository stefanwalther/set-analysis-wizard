import React from 'react';
import SawStepper from "./SawStepper";
import SetModifierModal from "./SetModifierModal";

interface Props {
}

const SetAnalysisWizard: React.FC<Props> = (props) => {
  return (
    <div>
      <SawStepper></SawStepper>
      <SetModifierModal />
    </div>
  )
}
export default SetAnalysisWizard;
