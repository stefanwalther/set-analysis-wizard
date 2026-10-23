const jsdom = require('jsdom');
const {JSDOM} = jsdom;


const getSetIdentifiers = (xml: string) => {

  // Load and remove whitespaces
  const cleanedXml = xml.replace(">[\\s\r\n]*<", "><");
  const dom = JSDOM.fragment(cleanedXml);

  let aggregationTypes: any[] = [];

  const optionGroupList = dom.querySelectorAll('div > optgroup');
  optionGroupList.forEach((optionGroup: any) => {
    const label = optionGroup.getAttribute('label');
    const newGroup : { label: string, items: any[] } = {
      label,
      items: []
    };
    optionGroup.querySelectorAll('option').forEach((option: any) => {
      const label = option.textContent;
      const key = option.getAttribute('value') || label;
      newGroup.items.push({
        key,
        label
      });
    });
    aggregationTypes.push(newGroup);
  })
  console.log(JSON.stringify(aggregationTypes));
}

(async () => {

  const setIdentifierGroups = `
      <optgroup label="Standard Sets">
          <option value="$" text="the current selection">the current selection</option>
          <option value="1" text="all values">all values</option>
          <option value="1-$" text="everything that the current selection excludes">everything that the current selection excludes</option>
      </optgroup>
      <optgroup label="Set Based on Previous/Next Selections">
          <option value="$1" text="the previous selection">the previous selection</option>
          <option value="$_1" text="the next selection">the next selection</option>
          <option disabled="disabled"></option>
          <option value="$_2" text="the 2nd next selection">the 2nd next selection</option>
          <option value="$_3" text="the 3rd next selection">the 3rd next selection</option>
          <option value="$2" text="the 2nd previous selection">the 2nd previous selection</option>
          <option value="$3" text="the 3rd previous selection">the 3rd previous selection</option>
      </optgroup>
      <optgroup label="Bookmark Based Sets">
          <option value="bookmark" text="the bookmark with the Id '{0}'">the bookmark with a given Id</option>
          <option value="$+bookmark" text="the current selection and the bookmark with the Id '{0}'">the current selection and the bookmark with the given Id</option>
          <option value="$-bookmark" text="the current selection except those records belonging to the bookmark with the Id '{0}'">the current selection except those records belonging to the bookmark with a given Id</option>
          <option value="$*bookmark" text="the intersection between the current selection and the bookmark with the Id '{0}'">the intersection between the current selection and the bookmark with a given Id</option>
      </optgroup>
`;

  let xmlAggregationOptions = `<div>${setIdentifierGroups}</div>`;

  console.log(getSetIdentifiers(xmlAggregationOptions));

})();
