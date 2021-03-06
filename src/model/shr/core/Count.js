import { setPropertiesFromJSON } from '../../json-helper';

/**
 * Generated class for shr.core.Count.
 */
class Count {

  /**
   * Get the value (aliases unsignedInt).
   * @returns {unsignedInt} The unsignedInt
   */
  get value() {
    return this._unsignedInt;
  }

  /**
   * Set the value (aliases unsignedInt).
   * This field/value is required.
   * @param {unsignedInt} value - The unsignedInt
   */
  set value(value) {
    this._unsignedInt = value;
  }

  /**
   * Set the value (aliases unsignedInt) and return 'this' for chaining.
   * This field/value is required.
   * @param {unsignedInt} value - The unsignedInt
   * @returns {Count} this.
   */
  withValue(value) {
    this.value = value; return this;
  }

  /**
   * Get the unsignedInt.
   * @returns {unsignedInt} The unsignedInt
   */
  get unsignedInt() {
    return this._unsignedInt;
  }

  /**
   * Set the unsignedInt.
   * This field/value is required.
   * @param {unsignedInt} unsignedInt - The unsignedInt
   */
  set unsignedInt(unsignedInt) {
    this._unsignedInt = unsignedInt;
  }

  /**
   * Set the unsignedInt and return 'this' for chaining.
   * This field/value is required.
   * @param {unsignedInt} unsignedInt - The unsignedInt
   * @returns {Count} this.
   */
  withUnsignedInt(unsignedInt) {
    this.unsignedInt = unsignedInt; return this;
  }

  /**
   * Deserializes JSON data to an instance of the Count class.
   * The JSON must be valid against the Count JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {Count} An instance of Count populated with the JSON data
   */
  static fromJSON(json={}) {
    const inst = new Count();
    setPropertiesFromJSON(inst, json);
    return inst;
  }
  /**
   * Serializes an instance of the Count class to a JSON object.
   * The JSON is expected to be valid against the Count JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/core/Count' } };
    if (this.value != null) {
      inst['Value'] = this.value;
    }
    return inst;
  }
}
export default Count;
