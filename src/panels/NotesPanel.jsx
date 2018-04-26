import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import FluxNotesEditor from '../notes/FluxNotesEditor';
import Button from '../elements/Button';
import Lang from 'lodash';
import NoteAssistant from '../notes/NoteAssistant';
import NoteParser from '../noteparser/NoteParser';
import './NotesPanel.css';

export default class NotesPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // updatedEditorNote is the note to be loaded in the editor
            updatedEditorNote: null,
            noteAssistantMode: "context-tray",
            // selectedNote is the note that is selected in the clinical notes view in the NoteAssistant
            selectedNote: null,
            currentlyEditingEntryId: -1
        };

        this.handleUpdateEditorWithNote = this.handleUpdateEditorWithNote.bind(this);
        this.updateNoteAssistantMode = this.updateNoteAssistantMode.bind(this);
        this.updateSelectedNote = this.updateSelectedNote.bind(this);
        this.saveNoteUponKeypress = this.saveNoteUponKeypress.bind(this);
        this.closeNote = this.closeNote.bind(this);
        this.handleUpdateCurrentlyEditingEntryId = this.handleUpdateCurrentlyEditingEntryId.bind(this);
        this.noteParser = new NoteParser(this.props.shortcutManager, this.props.contextManager);
    }

    componentWillReceiveProps = (nextProps) => {
        if (Lang.isNull(nextProps.openClinicalNote) && !Lang.isNull(this.props.openClinicalNote) && !this.props.openClinicalNote.signed && nextProps.documentText !== this.props.documentText) {
            this.props.openClinicalNote.content = nextProps.documentText;
        }

        if (!Lang.isNull(nextProps.openClinicalNote) && this.props.openClinicalNote !== nextProps.openClinicalNote) {
            const note = nextProps.openClinicalNote;
            this.handleUpdateEditorWithNote(note);
        }
    }

    updateNoteAssistantMode(mode) {
        this.setState({noteAssistantMode: mode});
    }

    updateSelectedNote(note) {
        this.setState({selectedNote: note});
    }

    // Handle when the editor needs to be updated with a note. The note can be a new blank note or a pre existing note
    handleUpdateEditorWithNote(note) {
        // If in pre-encounter mode and the note editor doesn't exist, update the layout and add the editor
        if (!Lang.isNull(note)) {
            // *Note: setFullAppStateWithCallback is used instead of setFullAppState because the editor needs to be created
            // before editor related states can be set
            this.props.setFullAppStateWithCallback({
                layout: 'split',
                isNoteViewerVisible: true,
                isNoteViewerEditable: !note.signed,
                noteClosed: false
            }, () => {
                const mode = note.signed ? "clinical-notes" : "context-tray";
                this.setState({
                    selectedNote: note,
                    updatedEditorNote: note,
                    noteAssistantMode: mode,
                    currentlyEditingEntryId: note.entryInfo.entryId
                });
                this.props.setFullAppState("documentText", note.content);
                this.props.setOpenClinicalNote(note);
            });
        }
    }

    handleUpdateCurrentlyEditingEntryId(id) {
        this.setState({currentlyEditingEntryId: id});
    }

    // Save the note after every keypress. This function invokes the note saving logic in NoteAssistant
    saveNoteUponKeypress() {
        this.saveNoteChild();
    }

    // invokes closing logic in NoteAssistant
    closeNote() {
        this.closeNoteChild();
        this.props.setFullAppState("documentText", null);
        this.props.setOpenClinicalNote(null);
        this.setState({
            updatedEditorNote: null,
            noteAssistantMode: "context-tray",
            // selectedNote is the note that is selected in the clinical notes view in the NoteAssistant
            selectedNote: null,
            currentlyEditingEntryId: -1
        });
    }

    // Removes a note from patient object if the note is unsigned 
    deleteSelectedNote = () => { 
        if (this.state.selectedNote && !this.state.selectedNote.signed) { 
            // Find the shortcuts in the current note.
            const recognizedShortcutsObjects = this.noteParser.getListOfTriggersFromText(this.state.selectedNote.content)[0].reverse();
            for (const index in recognizedShortcutsObjects) { 
                // Get the actual shortcut obj from structuredFieldMapManager lookup -- need id of shortcut to retrieve
                const currentShortcutTrigger = recognizedShortcutsObjects[index].trigger.toLowerCase();
                const mappedShortcutMetadata = this.props.shortcutManager.shortcutMap[currentShortcutTrigger]
                const currentShortcutId = (mappedShortcutMetadata) ? mappedShortcutMetadata.id : null;
                const currentShortcut = this.props.structuredFieldMapManager.idToShortcutMap.get(currentShortcutId);
                if (currentShortcut && currentShortcut.onBeforeDeleted) { 
                    currentShortcut.onBeforeDeleted();
                }
            }
            // Clear all shortcuts from the current mapManager
            this.props.structuredFieldMapManager.clearStructuredFieldMap();
            this.props.patient.removeClinicalNote(this.state.selectedNote);

        } else { 
            console.error('Tried to remove a note that is signed')
        }
    }

    handleSignButtonClick = () => {

        // Set signed attribute on the selected note to be true
        
        const tempNote =  this.state.selectedNote;
        tempNote.signed = true;
        this.setState({selectedNote: tempNote});
        let inProg = this.props.patient.getInProgressNotes();
        inProg.forEach((a) => {
            this.props.patient.removeClinicalNote(a)
        });
        this.props.dataAccess.savePatient(this.props.patient);
        inProg.forEach((b) => {
            this.props.patient.reAddEntryToPatient(b);
        });

        // Close the current note
       this.closeNote();
    }

    renderSignButton = () => {
        return (
            <div id="finish-sign-component">
                <Button raised className="btn_finish" onClick={() => {
                    this.handleSignButtonClick();
                }}>
                    Sign note
                </Button>
            </div>
        );
    }

    renderNotesPanelContent() {

        // If isNoteViewerVisible is true, render the flux notes editor and the note assistant
        if (this.props.isNoteViewerVisible) {

            // If note viewer is editable and a note is selected, render the sign note button
            if(this.props.isNoteViewerEditable && this.state.selectedNote) {
                return (
                    <div>
                        <Row center="xs">
                            <Col sm={7} md={8} lg={9}>
                                {this.renderFluxNotesEditor()}
                                {this.renderSignButton()}
                            </Col>
                            <Col sm={5} md={4} lg={3}>
                                {this.renderNoteAssistant()}
                            </Col>
                        </Row>
                    </div>
                );
                // Else don't render sign note button
            } else {
                return (
                    <div>
                        <Row center="xs">
                            <Col sm={7} md={8} lg={9}>
                                {this.renderFluxNotesEditor()}
                            </Col>
                            <Col sm={5} md={4} lg={3}>
                                {this.renderNoteAssistant()}
                            </Col>
                        </Row>
                    </div>
                );
            }

            // Else just render the note assistant
        } else {
            return (
                <Row center="xs">
                    <Col sm={12}>
                        {this.renderNoteAssistant()}
                    </Col>
                </Row>
            );
        }
    }

    renderFluxNotesEditor() {
        return (
            <div className="panel-content dashboard-panel">
                <FluxNotesEditor
                    closeNote={this.closeNote}
                    contextManager={this.props.contextManager}
                    currentViewMode={this.props.currentViewMode}
                    documentText={this.props.documentText}
                    errors={this.props.errors}
                    handleUpdateEditorWithNote={this.handleUpdateEditorWithNote}
                    isNoteViewerEditable={this.props.isNoteViewerEditable}
                    itemInserted={this.props.itemInserted}
                    newCurrentShortcut={this.props.newCurrentShortcut}
                    patient={this.props.patient}
                    saveNoteUponKeypress={this.saveNoteUponKeypress}
                    selectedNote={this.state.selectedNote}
                    setFullAppState={this.props.setFullAppState}
                    setFullAppStateWithCallback={this.props.setFullAppStateWithCallback}
                    shortcutManager={this.props.shortcutManager}
                    structuredFieldMapManager={this.props.structuredFieldMapManager}
                    summaryItemToInsert={this.props.summaryItemToInsert}
                    // Pass in note that the editor is to be updated with
                    updatedEditorNote={this.state.updatedEditorNote}
                    updateErrors={this.props.updateErrors}
                    updateSelectedNote={this.updateSelectedNote}
                />
            </div>
        );
    }

    renderNoteAssistant() {
        return (
            <div className="fitted-panel panel-content dashboard-panel">
                <NoteAssistant
                    closeNote={click => this.closeNoteChild = click}
                    currentlyEditingEntryId={this.state.currentlyEditingEntryId}
                    contextManager={this.props.contextManager}
                    deleteSelectedNote={this.deleteSelectedNote}
                    documentText={this.props.documentText}
                    handleSummaryItemSelected={this.props.handleSummaryItemSelected}
                    isNoteViewerEditable={this.props.isNoteViewerEditable}
                    loadNote={this.handleUpdateEditorWithNote}
                    loginUser={this.props.loginUser}
                    noteAssistantMode={this.state.noteAssistantMode}
                    noteClosed={this.props.noteClosed}
                    patient={this.props.patient}
                    saveNote={click => this.saveNoteChild = click}
                    searchSelectedItem={this.props.searchSelectedItem}
                    selectedNote={this.state.selectedNote}
                    setFullAppState={this.props.setFullAppState}
                    shortcutManager={this.props.shortcutManager}
                    updateCurrentlyEditingEntryId={this.handleUpdateCurrentlyEditingEntryId}
                    updateNoteAssistantMode={this.updateNoteAssistantMode}
                    updateSelectedNote={this.updateSelectedNote}
                />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderNotesPanelContent()}
            </div>
        );
    }
}

NotesPanel.propTypes = {
    patient: PropTypes.object,
    contextManager: PropTypes.object,
    shortcutManager: PropTypes.object,
    summaryItemToBeInserted: PropTypes.string,
    documentText: PropTypes.string,
    openClinicalNote: PropTypes.object,
    saveNote: PropTypes.func,
    closeNote: PropTypes.func,
    errors: PropTypes.array,
    isNoteViewerEditable: PropTypes.bool,
    newCurrentShortcut: PropTypes.func,
    itemInserted: PropTypes.func,
    updateErrors: PropTypes.func,
    handleSummaryItemSelected: PropTypes.func,
    setFullAppState: PropTypes.func,
    summaryItemToInsert: PropTypes.string,
    searchSelectedItem: PropTypes.object,
    structuredFieldMapManager: PropTypes.object,
};
