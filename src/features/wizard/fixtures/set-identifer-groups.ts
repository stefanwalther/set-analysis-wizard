import {ISetIdentifierGroup} from "../interfaces/ISetIdentiferGroup";

export const SetIdentifierGroups: ISetIdentifierGroup[] = [{
  "label": "Standard Sets",
  "items": [{"key": "$", "label": "the current selection"}, {"key": "1", "label": "all values"}, {
    "key": "1-$",
    "label": "everything that the current selection excludes"
  }]
}, {
  "label": "Set Based on Previous/Next Selections",
  "items": [{"key": "$1", "label": "the previous selection"}, {
    "key": "$_1",
    "label": "the next selection"
  }, {"key": "$_2", "label": "the 2nd next selection"}, {"key": "$_3", "label": "the 3rd next selection"}, {
    "key": "$2",
    "label": "the 2nd previous selection"
  }, {"key": "$3", "label": "the 3rd previous selection"}]
}, {
  "label": "Bookmark Based Sets",
  "items": [{"key": "bookmark", "label": "the bookmark with a given Id"}, {
    "key": "$+bookmark",
    "label": "the current selection and the bookmark with the given Id"
  }, {
    "key": "$-bookmark",
    "label": "the current selection except those records belonging to the bookmark with a given Id"
  }, {"key": "$*bookmark", "label": "the intersection between the current selection and the bookmark with a given Id"}]
}]
