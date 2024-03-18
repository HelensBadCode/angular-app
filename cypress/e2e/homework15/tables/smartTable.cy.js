import SmartTablePage from "./SmartTablePage";

describe("Smart table", ()=>{
  const firstName = "Olena";
  const lastName = "Turcheniuk";
  const username = "akame";
  const email = "lena111@@gmail.com";
  const age = '27';
  const id = '678';
  const raw = 3;

  const test = new SmartTablePage();

  beforeEach(() => {
    test._visit();
  });

  it('should positive test', () => {
    test.titleText.should("contain.text", "Smart Table");
    test.addNewRecord();
    test.fillForm(id, firstName, lastName, username, email, age);
    test.saveRecord();
  });

  it('should negative test', () => {
    test.addNewRecord();
    test.fillForm(id, firstName, lastName, username, email, age);
    test.cancelAddingRecord();
  });

  it('should edit test', () => {
    test.editRecord(raw);
    test.fillForm(id, firstName, lastName, username, email, age);
    test.saveRecord();
    test.deleteRecord();
  });
});
