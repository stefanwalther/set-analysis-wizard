import {ActionEnum} from "../../features/set-modifier-form/enums/ActionEnum";
import { v4 as uuidv4 } from 'uuid';

export interface ISetModifier {
  uid: string;                    // This is the unique identifier of the set modifier
  Action: ActionEnum;             // Action
  Field: string;                  // Field
  OtherField: string;             // Other field (indirect SA)
  FieldOperator: string;          // FieldOperator
  ValuesOrExpression_1: string;   // ValuesOrExpression Nr1
  ValuesOrExpression_2: string;   // ValuesOrExpression Nr2
  SelectionOperator: string;      // SelectionOperator
  IndirectField: string;          // Indirect Field for Indirect Set Selections
  TechnicalModifier: string;      // The expression for the set modifier
  Explanation?: string;           // The calculated explanation of the Set Modifier
}

export function setModifierInitialValues(): ISetModifier {
   return {
     uid: uuidv4(),
     Action: ActionEnum.undefined,
     Field: '',
     OtherField: '',
     FieldOperator: '',
     ValuesOrExpression_1: '',
     ValuesOrExpression_2: '',
     SelectionOperator: '',
     IndirectField: '',
     TechnicalModifier: '',
   }
}
