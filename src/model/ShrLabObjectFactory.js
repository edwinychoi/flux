import Test from './shr/lab/Test';
import Lang from 'lodash';

export default class ShrLabObjectFactory {
    static createInstance(elementName, entry) {
        const _elementsToClassNames = { 
                                "Test": Test
                              };

        let constructorName = _elementsToClassNames[elementName];
        if (Lang.isUndefined(constructorName)) throw new Error("Unsupported class in factory '" + this.name + "': '" + elementName + "'");
        return new constructorName(entry);
    }
    
}