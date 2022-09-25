import {Text} from '@mantine/core';
import React from 'react';

interface Props {}
const SetModifierForm: React.FC<Props> = (props) => {
  return (
    <div>
      <Text>
        In the form below you can select an action and defined the required parameters for the selected action.<br/>
        After clicking on "Save" the action will be added to the Set Analysis expression.
      </Text>
      <h2>What would you like to do?</h2>


      <h2>Field</h2>

      <h2>Condition</h2>

      <h2>Preview</h2>
    </div>
  );
}
export default SetModifierForm;
