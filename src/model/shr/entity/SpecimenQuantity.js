import { setPropertiesFromJSON } from '../../json-helper';

/**
 * Generated class for shr.entity.SpecimenQuantity.
 */
class SpecimenQuantity {

  /**
   * Get the value (aliases quantity).
   * @returns {Quantity} The shr.core.Quantity
   */
  get value() {
    return this._quantity;
  }

  /**
   * Set the value (aliases quantity).
   * This field/value is required.
   * @param {Quantity} value - The shr.core.Quantity
   */
  set value(value) {
    this._quantity = value;
  }

  /**
   * Set the value (aliases quantity) and return 'this' for chaining.
   * This field/value is required.
   * @param {Quantity} value - The shr.core.Quantity
   * @returns {SpecimenQuantity} this.
   */
  withValue(value) {
    this.value = value; return this;
  }

  /**
   * Get the Quantity.
   * @returns {Quantity} The shr.core.Quantity
   */
  get quantity() {
    return this._quantity;
  }

  /**
   * Set the Quantity.
   * This field/value is required.
   * @param {Quantity} quantity - The shr.core.Quantity
   */
  set quantity(quantity) {
    this._quantity = quantity;
  }

  /**
   * Set the Quantity and return 'this' for chaining.
   * This field/value is required.
   * @param {Quantity} quantity - The shr.core.Quantity
   * @returns {SpecimenQuantity} this.
   */
  withQuantity(quantity) {
    this.quantity = quantity; return this;
  }

  /**
   * Deserializes JSON data to an instance of the SpecimenQuantity class.
   * The JSON must be valid against the SpecimenQuantity JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {SpecimenQuantity} An instance of SpecimenQuantity populated with the JSON data
   */
  static fromJSON(json={}) {
    const inst = new SpecimenQuantity();
    setPropertiesFromJSON(inst, json);
    return inst;
  }
  /**
   * Serializes an instance of the SpecimenQuantity class to a JSON object.
   * The JSON is expected to be valid against the SpecimenQuantity JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/entity/SpecimenQuantity' } };
    if (this.value != null) {
      inst['Value'] = typeof this.value.toJSON === 'function' ? this.value.toJSON() : this.value;
    }
    return inst;
  }
}
export default SpecimenQuantity;
