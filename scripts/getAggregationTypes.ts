const jsdom = require('jsdom');
const {JSDOM} = jsdom;


const getAggregationTypes = (xml: string) => {

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

  const aggregationOptions = `
<optgroup label="Basis Aggregation Functions">
                            <option>Sum</option>
                            <option>Min</option>
                            <option>Max</option>
                            <option>Only</option>
                            <option>Mode</option>
                            <option>FirstSortedValue</option>
                        </optgroup>
                        <optgroup label="String Aggregation Functions">
                            <option>MinString</option>
                            <option>MaxString</option>
                            <option>Concat</option>
                        </optgroup>
                        <optgroup label="Counter Aggregation Functions">
                            <option>Count</option>
                            <option>NumericCount</option>
                            <option>TextCount</option>
                            <option>NullCount</option>
                            <option>MissingCount</option>
                        </optgroup>
                        <optgroup label="Statistical Aggregation Functions">
                            <option>Avg</option>
                            <option>stdev</option>
                            <option>median</option>
                            <option>fractile</option>
                            <option>skew</option>
                            <option>kurtosis</option>
                            <option>correl</option>
                            <option>sterr</option>
                            <option>steyx</option>
                            <option>linest_m</option>
                            <option>linest_b</option>
                            <option>linest_r2</option>
                            <option>linest_sem</option>
                            <option>linest_seb</option>
                            <option>linest_sey</option>
                            <option>linest_df</option>
                            <option>linest_f</option>
                            <option>linest_ssreg</option>
                            <option>linest_ssresid</option>
                        </optgroup>
                        <optgroup label="Financial Aggregation Functions">
                            <option>irr</option>
                            <option>xirr</option>
                            <option>npv</option>
                            <option>xnpv</option>
                        </optgroup>
                        <optgroup label="Statistical Test Functions">
                            <option>chi2test_p</option>
                            <option>chi2test_df</option>
                            <option>chi2test_chi2</option>
                            <option>TTest_t</option>
                            <option>TTest_df</option>
                            <option>TTest_sig</option>
                            <option>TTest_dif</option>
                            <option>TTest_sterr</option>
                            <option>TTest_conf</option>
                            <option>TTest_lower</option>
                            <option>TTest_upper</option>
                            <option>TTestw_t</option>
                            <option>TTestw_df</option>
                            <option>TTestw_sig</option>
                            <option>TTestw_dif</option>
                            <option>TTestw_sterr</option>
                            <option>TTestw_conf</option>
                            <option>TTestw_lower</option>
                            <option>TTestw_upper</option>
                            <option>TTest1_t</option>
                            <option>TTest1_df</option>
                            <option>TTest1_sig</option>
                            <option>TTest1_dif</option>
                            <option>TTest1_sterr</option>
                            <option>TTest1_conf</option>
                            <option>TTest1_lower</option>
                            <option>TTest1_upper</option>
                            <option>TTest1w_t</option>
                            <option>TTest1w_df</option>
                            <option>TTest1w_sig</option>
                            <option>TTest1w_dif</option>
                            <option>TTest1w_sterr</option>
                            <option>TTest1w_conf</option>
                            <option>TTest1w_lower</option>
                            <option>TTest1w_upper</option>
                            <option>ZTest_z</option>
                            <option>ZTest_sig</option>
                            <option>ZTest_dif</option>
                            <option>ZTest_sterr</option>
                            <option>ZTest_conf</option>
                            <option>ZTestw_z</option>
                            <option>ZTestw_sig</option>
                            <option>ZTestw_dif</option>
                            <option>ZTestw_sterr</option>
                            <option>ZTestw_conf</option>
                        </optgroup>
`;

  let xmlAggregationOptions = `<div>${aggregationOptions}</div>`;

  console.log(getAggregationTypes(xmlAggregationOptions));

})();
