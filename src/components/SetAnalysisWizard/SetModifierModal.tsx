import React from 'react';
import {Modal} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {selectIsModifierModalOpen, setModifierModalVisibility} from "../../features/wizard/wizardSlice";

import SetModifierForm from "./SetModifierForm";
import {selectSetModifier} from "../../features/set-modifier-form/setModifierFormSlice";


interface Props {

}

const SetModifierModal: React.FC<Props> = (props) => {

  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(selectIsModifierModalOpen);
  const setModifierState = useAppSelector(selectSetModifier);

  const handleClose = () => {
    // Todo - decide whether to close the form or not (if eg. dirty)
    dispatch(setModifierModalVisibility(false));

  }

  return (
    <Modal
      opened={isModalOpen}
      onClose={() => handleClose()}
      title={'Add/Change Set Modifier'}
      size='1000px'
      styles={(theme) => ({
        header: {
          fontWeight: 'bold',
          fontSize: '1.3rem'
        }
      })}
    >
      <SetModifierForm state={setModifierState}/>
    </Modal>
  );
}

export default SetModifierModal;
