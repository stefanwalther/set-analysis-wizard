import React from 'react';
import SAWStepper from "./SAWStepper";

interface Props {
}

const SetAnalysisWizard: React.FC<Props> = (props) => {
  return (
    <div>
      <SAWStepper></SAWStepper>
    </div>
  )
}
export default SetAnalysisWizard;
