import { getNamespaceAndName } from '../json-helper';
import FluxAdverseEvent from './FluxAdverseEvent';
import ShrAdverseObjectFactory from '../shr/adverse/ShrAdverseObjectFactory';
import FluxToxicReaction from './FluxToxicReaction';

export default class FluxAdverseObjectFactory {
    static createInstance(json, type) {
        const { namespace, elementName } = getNamespaceAndName(json, type);
        if (namespace !== 'shr.adverse') {
            throw new Error(`Unsupported type in ShrAdverseObjectFactory: ${type}`);
        }
        // returns Flux wrapper class if found, otherwise use ShrAdverseObjectFactory
        switch (elementName) {
            case 'AdverseEvent': return new FluxAdverseEvent(json);
            case 'ToxicReaction': return new FluxToxicReaction(json);
            default: return ShrAdverseObjectFactory.createInstance(json, type);
        }
    }
}