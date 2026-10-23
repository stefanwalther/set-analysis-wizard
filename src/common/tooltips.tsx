export const ttValueFieldExpression = (
  <div>
    <div className='title'>Field name, expression or bookmark id</div>
    <p>
      Enter either a field name, a bookmark or a simple expression here.
    </p>
    <p>
      <b>Examples:</b>
      <ul>
        <li>Field: <code>Sales</code></li>
        <li>Simple Expression: <code>Sales*FlagBudget</code></li>
      </ul>
    </p>
    <p>
      <i>Use expressions carefully! Have a look at the QlikView/Qlik Sense reference manual for further information.</i>
    </p>
    <hr/>
    <p>
      <b>Note:</b><br/>If the field name contains spaces just enter the field name as it is, the necessary brackets ( [
      and ] ) will be added automatically.
    </p>
  </div>
);

export const ttSetIdentifier = (
  <div>
    Set the aggregation function to be used as a starting point for your set.
  </div>
);

export const ttPersonalNotes = (
  <div>
    <p>
      You can add some personal notes, which should help you to remember what you have built ... think of them as your
      personal documentation.
    </p>
    <p>
      Note: These notes will be included in the export, so adding them here makes it easier to document expressions used
      in your app.
    </p>
  </div>
);

export const ttSmAction = (
  <div>
    <b>Select one of the predefined actions:</b><br/><br/>Depending on the selected action you'll be able to set the
    desired parameters.
  </div>
);

export const ttSmField = (
  <div>
    <div className='title'>
      Target field name (or expression)
    </div>
    <div className='description'>
      Enter the desired field name or an expression.
    </div>
    <hr/>
    <p>
      <b>Note:</b><br/>
      If the field name contains spaces, also just enter the field name as it is, the brackets ( [ and ] ) will be added
      automatically!
    </p>
  </div>
);

export const ttSmFieldOperation = (
  <div>
    Select how the set should be changed based on the values in the target field.
  </div>
);

export const ttSmOtherField = (
  <div>
    Condition based on field ...
  </div>
);

export const ttSmSelectionOperator = (
  <div>
    Select one of the <b>predefined operators.</b><br/><br/>Depending on the selected operator you'll have to define
    additional parameters like:<br/><br/>Operator 'equal to' =&gt; define the value<br/>Operator 'between value1 and
    value2' =&gt; define value1 and value2
  </div>
);

export const ttSmValue1 = (
  <div>
    <b>Expression</b><br/>Enter your expression here as you would define it in QlikView (e.g. max(Year)).<br/><br/>You do not need to add the $(=) for an ad-hoc expression, this will be added automatically.<br/><br/><b>Examples</b><br/><ul><li>max(Year)</li><li>max(Year)-1</li></ul>
  </div>
);

export const ttSmValue2 = (
  <div>
    <b>Enter value(s):</b><br />Enter one or more values here.<br /><b>Multiple values</b> are just seperated by a comma (,).<br /><br />Do not distinguish between numeric and string values, this will be done automatically by the wizard.<br /><br /><b>Examples:</b><br/><ul><li>2008</li><li>2008,2009</li><li>Southern,Western,Eastern</li></ul>
  </div>
);

export const ttSmIndirectField = (
  <div>
    Indirect Selection for Field.
  </div>
);
