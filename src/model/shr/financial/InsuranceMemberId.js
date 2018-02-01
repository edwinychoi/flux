import { setPropertiesFromJSON } from '../../json-helper';

/**
 * Generated class for shr.financial.InsuranceMemberId.
 */
class InsuranceMemberId {

  /**
   * Get the value (aliases string).
   * @returns {string} The string
   */
  get value() {
    return this._string;
  }

  /**
   * Set the value (aliases string).
   * @param {string} value - The string
   */
  set value(value) {
    this._string = value;
  }

  /**
   * Get the string.
   * @returns {string} The string
   */
  get string() {
    return this._string;
  }

  /**
   * Set the string.
   * @param {string} string - The string
   */
  set string(string) {
    this._string = string;
  }

  /**
   * Deserializes JSON data to an instance of the InsuranceMemberId class.
   * The JSON must be valid against the InsuranceMemberId JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {InsuranceMemberId} An instance of InsuranceMemberId populated with the JSON data
   */
  static fromJSON(json={}) {
    const inst = new InsuranceMemberId();
    setPropertiesFromJSON(inst, json);
    return inst;
  }
}
export default InsuranceMemberId;