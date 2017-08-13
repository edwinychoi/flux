import InserterShortcut from './InserterShortcut';
import ProgressionCreator from './ProgressionCreator';
import ToxicityCreator from './ToxicityCreator';
import StagingCreator from './StagingCreator';

export default class ConditionInserter extends InserterShortcut {
	getValidChildShortcuts() {
		return [ ProgressionCreator, ToxicityCreator, StagingCreator];
	}
	getLabel() {
		return this.getValue();
	}
	
	isContext() {
		return true;
	}
	
	determineValue(contextManager) {
		return contextManager.getPatient().getConditions();
	}
	
	static getTrigger() {
		return "@condition"
	}
    getShortcutType() { 
        return "condition";
    }
}