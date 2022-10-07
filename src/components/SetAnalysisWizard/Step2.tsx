import React from 'react';
import {Button, ScrollArea, Table, ActionIcon} from "@mantine/core";
import {IconAlphabetLatin, IconCirclePlus, IconPencil, IconTrash} from "@tabler/icons";
import {
  deleteModifier,
  resetModifiers,
  selectSetModifiers,
  setModifierModalVisibility
} from "../../features/wizard/wizardSlice";
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {ISetModifier} from "../../common/interfaces";
import {setFormState} from "../../features/set-modifier-form/setModifierFormSlice";
import SetModifierTable from "./SetModifierTable";

interface Props {}
const Step2: React.FC<Props> = (props) => {

  const dispatch = useAppDispatch();
  const setModifiers = useAppSelector(selectSetModifiers);

  const handleClickAdd = (): void => {
    // We assume that the formState of the SetModifier modal is clean ...
    dispatch(setModifierModalVisibility(true));
  }
  const handleClickDeleteAll = () => {
    dispatch(resetModifiers())
  };

  return (
    <div>
      <br/><br/>

      <div>
      <Button leftIcon={<IconTrash />} variant="filled" color="red" onClick={handleClickDeleteAll}>Delete all modifiers</Button>
      <Button leftIcon={<IconCirclePlus />} onClick={handleClickAdd}>
        Add modifier
      </Button>
        <br/>
      </div>

      <SetModifierTable modifiers={setModifiers} />

    </div>
  );
}

export default Step2;

