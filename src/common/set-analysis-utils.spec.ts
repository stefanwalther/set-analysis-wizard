import {qualifyElement} from "./set-analysis-utils";


describe('set-analysis-utils', () => {
  describe('qualifyElement', () => {
    it('should qualify an element', () => {
      expect(qualifyElement("Sales")).toBe("'Sales'");
    });
    it('should handle whitespace', () => {
      expect(qualifyElement(" Sales ")).toBe("'Sales'");
    });
    it('should handle delimited strings', () => {
      expect(qualifyElement("Sales,Profit")).toBe("'Sales','Profit'");
    })
  })
})
