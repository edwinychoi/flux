import { setPropertiesFromJSON } from '../../json-helper';

import ContraceptiveAction from './ContraceptiveAction';

/**
 * Generated class for shr.sex.ContraceptiveMethodRequested.
 * @extends ContraceptiveAction
 */
class ContraceptiveMethodRequested extends ContraceptiveAction {

  /**
   * Get the entry information.
   * @returns {Entry} The shr.base.Entry
   */
  get entryInfo() {
    return this._entryInfo;
  }

  /**
   * Set the entry information.
   * @param {Entry} entryInfo - The shr.base.Entry
   */
  set entryInfo(entryInfo) {
    this._entryInfo = entryInfo;
  }

  /**
   * Set the entry information and return 'this' for chaining.
   * @param {Entry} entryInfo - The shr.base.Entry
   * @returns {ContraceptiveMethodRequested} this.
   */
  withEntryInfo(entryInfo) {
    this.entryInfo = entryInfo; return this;
  }

  /**
   * Get the RequestedContext.
   * @returns {RequestedContext} The shr.action.RequestedContext
   */
  get actionContext() {
    return this._actionContext;
  }

  /**
   * Set the RequestedContext.
   * This field/value is required.
   * @param {RequestedContext} actionContext - The shr.action.RequestedContext
   */
  set actionContext(actionContext) {
    this._actionContext = actionContext;
  }

  /**
   * Set the RequestedContext and return 'this' for chaining.
   * This field/value is required.
   * @param {RequestedContext} actionContext - The shr.action.RequestedContext
   * @returns {ContraceptiveMethodRequested} this.
   */
  withActionContext(actionContext) {
    this.actionContext = actionContext; return this;
  }

  /**
   * Deserializes JSON data to an instance of the ContraceptiveMethodRequested class.
   * The JSON must be valid against the ContraceptiveMethodRequested JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {ContraceptiveMethodRequested} An instance of ContraceptiveMethodRequested populated with the JSON data
   */
  static fromJSON(json={}) {
    const inst = new ContraceptiveMethodRequested();
    setPropertiesFromJSON(inst, json);
    return inst;
  }
  /**
   * Serializes an instance of the ContraceptiveMethodRequested class to a JSON object.
   * The JSON is expected to be valid against the ContraceptiveMethodRequested JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = this._entryInfo.toJSON();
    inst['EntryType'] = { 'Value' : 'http://standardhealthrecord.org/spec/shr/sex/ContraceptiveMethodRequested' };
    if (this.value != null) {
      inst['Value'] = typeof this.value.toJSON === 'function' ? this.value.toJSON() : this.value;
    }
    if (this.relatedEncounter != null) {
      inst['RelatedEncounter'] = typeof this.relatedEncounter.toJSON === 'function' ? this.relatedEncounter.toJSON() : this.relatedEncounter;
    }
    if (this.author != null) {
      inst['Author'] = typeof this.author.toJSON === 'function' ? this.author.toJSON() : this.author;
    }
    if (this.informant != null) {
      inst['Informant'] = typeof this.informant.toJSON === 'function' ? this.informant.toJSON() : this.informant;
    }
    if (this.type != null) {
      inst['Type'] = typeof this.type.toJSON === 'function' ? this.type.toJSON() : this.type;
    }
    if (this.category != null) {
      inst['Category'] = this.category.map(f => f.toJSON());
    }
    if (this.actionContext != null) {
      inst['ActionContext'] = typeof this.actionContext.toJSON === 'function' ? this.actionContext.toJSON() : this.actionContext;
    }
    if (this.medicationOrCode != null) {
      inst['MedicationOrCode'] = typeof this.medicationOrCode.toJSON === 'function' ? this.medicationOrCode.toJSON() : this.medicationOrCode;
    }
    if (this.dosage != null) {
      inst['Dosage'] = typeof this.dosage.toJSON === 'function' ? this.dosage.toJSON() : this.dosage;
    }
    return inst;
  }
}
export default ContraceptiveMethodRequested;
