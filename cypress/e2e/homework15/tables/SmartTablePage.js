export default class SmartTablePage{
  _url = "pages/tables/smart-table";
  _containerSelector = "nb-card-body";
  _visit() {
    cy.visit(this._url);
  }

  get container() {
    return cy.get(this._containerSelector);
  }

  get titleText() {
    return cy.get('nb-card-header').first();
  }

  get addRecordButton() {
    return this.container.find('.ng2-smart-action.ng2-smart-action-add-add');
  }

  addNewRecord() {
    this.addRecordButton.click();
  }

  fillForm(id, firstName, lastName, username, email, age) {
    this.container.find('.ng-valid[ng-reflect-name="id"]').clear().type(id);
    this.container.find('.ng-valid[ng-reflect-name="firstName"]').clear().type(firstName);
    this.container.find('.ng-valid[ng-reflect-name="lastName"]').clear().type(lastName);
    this.container.find('.ng-valid[ng-reflect-name="username"]').clear().type(username);
    this.container.find('.ng-valid[ng-reflect-name="email"]').clear().type(email);
    this.container.find('.ng-valid[ng-reflect-name="age"]').clear().type(age);
  }

  saveRecord() {
    this.container.find('.nb-checkmark').should("be.visible").click();
  }

  cancelAddingRecord() {
    this.container.find('.nb-close').should("be.visible").click();
  }

  editRecord(raw) {
    this.container.find('.nb-edit').eq(raw).click();
  }

  deleteRecord() {
    this.container.find('.nb-trash').first().should("be.visible");
  }
}
