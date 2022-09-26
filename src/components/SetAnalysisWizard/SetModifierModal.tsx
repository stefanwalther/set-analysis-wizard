import React from 'react';
import {Modal, Button} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {selectIsModifierModalOpen, setModifierModalVisibility} from "../../features/wizard/wizardSlice";
import SetModifierForm from "./SetModifierForm";


interface Props {

}

const SetModifierModal: React.FC<Props> = (props) => {

  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(selectIsModifierModalOpen);

  const handleClose = () => {
    // Todo - decide whether to close the form or not (if eg. dirty)
    dispatch(setModifierModalVisibility(false));
  }

  return (
    <Modal
      opened={isModalOpen}
      onClose={() => handleClose()}
      title={'Set Modifier'}
      size='xl'
      styles={(theme) => ({
        header: {
          fontWeight: 'bold',
          fontSize: '1.3rem'
        }
      })}
    >
      <SetModifierForm/>
    </Modal>
  );
}

export default SetModifierModal;
