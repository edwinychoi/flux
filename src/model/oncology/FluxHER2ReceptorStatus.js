import Entry from '../shr/base/Entry';
import EntryType from '../shr/base/EntryType';
import FluxObservation from '../finding/FluxObservation';
import HER2ReceptorStatus from '../shr/oncology/HER2ReceptorStatus';
import lookup from '../../lib/receptor_lookup.jsx';

class FluxHER2ReceptorStatus extends FluxObservation {
    constructor(json) {
        super();
        this._entry = this._observation = HER2ReceptorStatus.fromJSON(json);
        if (!this._observation.entryInfo) {
            let entry = new Entry();
            entry.entryType = new EntryType();
            entry.entryType.uri = 'http://standardhealthrecord.org/spec/shr/oncology/HER2ReceptorStatus';
            this._observation.entryInfo = entry;
        }
    }
    
    /**
     * Getter for shr.oncology.ReceptorType
     */
    get status() {
        if (!this._observation.value) return null;
        return this._observation.value.coding[0].displayText.value;
    }

    /**
     * Setter for shr.oncology.ReceptorType
     */
    set status(statusVal) {
        this._observation.value = lookup.getReceptorCodeableConcept(statusVal);
    }

    toJSON() {
        return this._observation.toJSON();
    }
}

export default FluxHER2ReceptorStatus;