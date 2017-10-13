import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import ClinicalTrialsList from '../clinicalTrials/ClinicalTrialsList';
import './ClinicalTrialForm.css';

class ClinicalTrialForm extends Component {
    constructor(props) {
        super(props);
        this.clinicalTrialsList = new ClinicalTrialsList();
        
        this.state = {
            trials: this.clinicalTrialsList.getAllTrials()
        };
    }
    
    currentlySelected = (item, i) => {
        return (item === i ? true : false);
    }
    
    handleTrialSelection = (e, i) => {
        e.preventDefault();
        const newTrial = this.state.trials[i].id;
        this.props.updateValue("title", newTrial);
    }
    
    handleDateSelection = (event, value) => {
        const date = event.target.value;
        let formattedDate = null;
        if (date) {
            formattedDate = new moment(date).format('D MMM YYYY');
        }
        this.props.updateValue(value, formattedDate);
    }
    
    renderTrialButtonGroup = (trial, i) => {
        const marginSize = "10px";
        const trialName = trial.name;
        const trialDescription = trial.description;
        const tooltipClass = (trialDescription.length > 100) ? "tooltiptext-clinical-trial large-clinical-trial" : "tooltiptext-clinical-trial";
        
        return (
            <div key={trialName} className="tooltip-clinical-trial">
                <span id={trialName} className={tooltipClass}>{trialDescription}</span>
                <Button raised
                    key={i}
                    label={trialName}
                    onClick={(e) => this.handleTrialSelection(e, i)}
                    className="button_disabled_is_selected"
                    style={{
                        marginBottom: marginSize,
                        marginLeft: marginSize,
                        height: "75px",
                        width: "180px",
                        padding: "20px 0 20px 0",
                        backgroundColor: "white",
                        textTransform: "none"
                    }}
                    disabled={this.currentlySelected(this.props.clinicalTrial.title, this.state.trials[i].id)}
                    >{trialName}
                </Button>
            </div>
        )
    }
    
    render() {
        return (
            <div>
                <h1>Clinical Trial</h1>
                <p id="data-element-description">
                    {ClinicalTrialsList.getDescription("clinicalTrial")}
                    <br/>
                    <br/>
                    Based on your selections below, the copy button at the bottom will copy a <a href="clinicalTrialSheet.pdf" target="_blank">formatted phrase</a> to paste in your EHR.
                </p>
                <Divider className="divider"/>
                
                <h4 className="header-spacing">Clinical Trial</h4>
                <p id="data-element-description">
                    {ClinicalTrialsList.getDescription("trial")}
                    <span className="helper-text"> Choose one</span>
                </p>
                
                <div className="btn-group-trial-clinical-trial">
                    {this.state.trials.map((trial, i) => {
                        return this.renderTrialButtonGroup(trial, i)
                    })}
                </div>
                
                <h4 className="header-spacing">Enrollment Date</h4>
                <p id="data-element-description">
                    {ClinicalTrialsList.getDescription("enrollmentDate")}
                    <span className="helper-text"> mm/dd/yyyy</span>
                </p>
                <TextField
                    id="enrollment-date"
                    type="date"
                    onChange={(e) => this.handleDateSelection(e, "enrollmentDate")}
                />
                
                <h4 className="header-spacing">End Date <span className="helper-text"> (Optional)</span></h4>
                <p id="data-element-description">
                    {ClinicalTrialsList.getDescription("endDate")}
                    <span className="helper-text"> mm/dd/yyyy</span>
                </p>
                <TextField
                    id="end-date"
                    type="date"
                    onChange={(e) => this.handleDateSelection(e, "endDate")}
                />
            </div>
        )
    }
}

export default ClinicalTrialForm;