import {SetAnalysisEngine} from "./setAnalysisEngine";

describe('setAnalysisEngine', () => {
  const sae = new SetAnalysisEngine();

  it('just do some basic stuff', () => {
    sae.Init({
      SetIdentifier: "$",
      AggregationType: "Sum",
      FieldExpression: "Sales",
      PersonalComment: "Calculate the sum of \"Sales\" (based on the current selection).",
      SetModifiers: []
    });
    sae.Calculate();
    expect(sae.Expression).toBe("Sum({$}Sales)");
  });

  describe('should be able to load settings', () => {

  });

  describe('should be able to export settings', () => {

  });

  describe('test expressions', () => {

  });

});
