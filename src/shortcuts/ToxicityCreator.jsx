import React from 'react';
import CreatorShortcut from './CreatorShortcut';
import ToxicityAdverseEventCreator from './ToxicityAdverseEventCreator';
import ToxicityGradeCreator from './ToxicityGradeCreator';
import ToxicityAttributionCreator from './ToxicityAttributionCreator';
import ToxicityForm from '../forms/ToxicityForm';
import Patient from '../patient/Patient';
import Lang from 'lodash'

class ToxicityCreator extends CreatorShortcut {
    constructor(onUpdate, toxicity) {
        super();
        if (Lang.isUndefined(toxicity)) {
            this.toxicity = Patient.createNewToxicity();
            this.isToxicityNew = true;
        } else {
            this.toxicity = toxicity;
            this.isToxicityNew = false;
        }
		this.setValueObject(this.toxicity);
        this.onUpdate = onUpdate;
		this.setAttributeValue = this.setAttributeValue.bind(this);
    }
	
    initialize(contextManager, trigger) {
        super.initialize(contextManager, trigger);
        this.parentContext = contextManager.getActiveContextOfType("@condition");
    }

    getShortcutType() { 
        return "#toxicity";
    }
    /* 
     * Get grade string for given toxicity
     */
    getGradeString = (curToxicity) => { 
        if (Lang.isNull(curToxicity.adverseEventGrade.coding)) return "";
        let gradeString = `${curToxicity.adverseEventGrade.coding.displayText}`;
        // If nothing is selected yet, this is the default placeholder
        if (Lang.isEmpty(curToxicity.adverseEventGrade.coding.displayText)) {
            gradeString = 'Grade ?'
        }
        return gradeString;
    }

    /* 
     * Get adverse event string string for given toxicity
     */
    getAdverseEventString = (curToxicity) => { 
        if (Lang.isNull(curToxicity.value.coding)) return "";
        let adverseEventString = `${curToxicity.value.coding.displayText}`;
        // If nothing is selected, this is the default placeholder
        if (Lang.isEmpty(curToxicity.value.coding.displayText)){
            adverseEventString = '?';
        }
        return adverseEventString;
    }
    
    /*
     * Get attribution string for given toxicity
     */
    getAttributionString = (curToxicity) => {
        if(Lang.isNull(curToxicity.attribution.coding)) return "";
        let attributionString = `${curToxicity.attribution.coding.displayText}`;
        // If nothing is selected, this is the default placeholder
        if (Lang.isEmpty(curToxicity.attribution.coding.displayText)){
            attributionString = '?';
        }
        return attributionString;
    }

    /* 
     * Get string representation for a given toxicity
     */ 
    getToxAsString = (curToxicity) => { 
        const gradeString = this.getGradeString(curToxicity);
        const adverseEventString = this.getAdverseEventString(curToxicity);
        const attributionString = this.getAttributionString(curToxicity);
        // If all of the options contain a '?', nothing has been selected yet so no Toxicity information
        if (gradeString.indexOf('?') > -1 && adverseEventString.indexOf('?') > -1 && attributionString.indexOf('?') > -1) {
            return "";
        }
        // TODO: Check that is will be okay to have #? in places where before it was just ? (Ex. No Adverse event selected yet)
        return `#${gradeString} #${adverseEventString} due to #${attributionString}`;
    }

    /* 
     * Get string representation for all toxicities, wrapped in toxicity tag
     */ 
    getAsString = () => { 
        const curToxicityString = this.getToxAsString(this.toxicity);
        if (Lang.isEmpty(curToxicityString)) { 
            // No Toxicity information -- in this case we just want a hash
            return `#toxicity`;
        } else { 
            return "#toxicity of " + curToxicityString;
        }
    }

    getForm() {
        return (
            <ToxicityForm
                updateValue={this.setAttributeValue}
                toxicity={this.toxicity}
            />
        );      
    }

	setAttributeValue(name, value, publishChanges) {
		if (name === "adverseEvent") {
			Patient.updateAdverseEventForToxicReaction(this.toxicity, value);
		} else if (name === "grade") {
			Patient.updateGradeForToxicReaction(this.toxicity, value);
        } else if (name === "attribution") {
            Patient.updateAttributionForToxicReaction(this.toxicity, value);
		} else {
			console.error("Error: Unexpected value selected for toxicity: " + name);
			return;
		}
        if (this.isContext()) this.updateContextStatus();
		this.onUpdate(this);
		if (publishChanges) {
			this.notifyValueChangeHandlers(name);
		}
	}
	getAttributeValue(name) {
		if (name === "adverseEvent") {
			return this.toxicity.value.coding.displayText;
		} else if (name === "grade") {
            return this.toxicity.adverseEventGrade.coding.displayText;
        } else if (name === "attribution") {
            return this.toxicity.attribution.coding.displayText;
		} else {
			console.error("Error: Unexpected value selected in toxicity dropdown: " + name);
			return null;
		}
	}
	
	updatePatient(patient, contextManager) {
		if (this.toxicity.value.coding.displayText.length === 0) return; // not complete value
		//let condition = this.parentContext.getValueObject();
		if (this.isToxicityNew) {
            //this.toxicity.focalCondition = Patient.createEntryReferenceTo(condition);
            patient.addEntryToPatientWithPatientFocalSubject(this.toxicity);
			this.isToxicityNew = false;
		}
	}

	validateInCurrentContext(contextManager) {
		let errors = [];
		if (!contextManager.isContextOfTypeWithValueOfTypeActive("@condition", "http://standardhealthrecord.org/oncology/BreastCancer")) {
			errors.push("#toxicity invalid without a breast cancer condition. Use @condition to add the breast cancer condition to your narrative.");
		}
		return errors;
	}

	getValidChildShortcuts() {
		let result = [];
		if (this.getAttributeValue("adverseEvent").length === 0) result.push(ToxicityAdverseEventCreator);
		if (this.getAttributeValue("grade").length === 0) result.push(ToxicityGradeCreator);
		if (this.getAttributeValue("attribution").length === 0) result.push(ToxicityAttributionCreator);
		return result; //[ ToxicityAdverseEventCreator, ToxicityGradeCreator, ToxicityAttributionCreator ];
	}
    shouldBeInContext() {
        return  (this.getAttributeValue("adverseEvent").length === 0) ||
                (this.getAttributeValue("grade").length === 0) ||
                (this.getAttributeValue("attribution").length === 0) ;
    }
    
	isContext() {
		return true;
	}
	getLabel() {
		return this.getShortcutType();
	}
	static getTriggers() {
		return [ "#toxicity" ];
	}
}

export default ToxicityCreator;