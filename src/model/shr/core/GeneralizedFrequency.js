import { setPropertiesFromJSON } from '../../json-helper';

/**
 * Generated class for shr.core.GeneralizedFrequency.
 */
class GeneralizedFrequency {

  /**
   * Get the choice value; one of: shr.core.Frequency, shr.core.SemiquantFrequency, shr.core.QualitativeFrequency.
   * @returns {(Frequency|SemiquantFrequency|QualitativeFrequency)} The choice value; one of: shr.core.Frequency, shr.core.SemiquantFrequency, shr.core.QualitativeFrequency
   */
  get value() {
    return this._value;
  }

  /**
   * Set the choice value; one of: shr.core.Frequency, shr.core.SemiquantFrequency, shr.core.QualitativeFrequency.
   * This field/value is required.
   * @param {(Frequency|SemiquantFrequency|QualitativeFrequency)} value - The choice value; one of: shr.core.Frequency, shr.core.SemiquantFrequency, shr.core.QualitativeFrequency
   */
  set value(value) {
    this._value = value;
  }

  /**
   * Set the choice value; one of: shr.core.Frequency, shr.core.SemiquantFrequency, shr.core.QualitativeFrequency and return 'this' for chaining.
   * This field/value is required.
   * @param {(Frequency|SemiquantFrequency|QualitativeFrequency)} value - The choice value; one of: shr.core.Frequency, shr.core.SemiquantFrequency, shr.core.QualitativeFrequency
   * @returns {GeneralizedFrequency} this.
   */
  withValue(value) {
    this.value = value; return this;
  }

  /**
   * Deserializes JSON data to an instance of the GeneralizedFrequency class.
   * The JSON must be valid against the GeneralizedFrequency JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {GeneralizedFrequency} An instance of GeneralizedFrequency populated with the JSON data
   */
  static fromJSON(json={}) {
    const inst = new GeneralizedFrequency();
    setPropertiesFromJSON(inst, json);
    return inst;
  }
  /**
   * Serializes an instance of the GeneralizedFrequency class to a JSON object.
   * The JSON is expected to be valid against the GeneralizedFrequency JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/core/GeneralizedFrequency' } };
    if (this.value != null) {
      inst['Value'] = typeof this.value.toJSON === 'function' ? this.value.toJSON() : this.value;
    }
    return inst;
  }
}
export default GeneralizedFrequency;
