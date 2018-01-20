/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.procedures');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.procedures.HUE = 290;

Blockly.Blocks['procedures_defnoreturn'] = {
    /**
     * Block for defining a procedure with no return value.
     * @this Blockly.Block
     */
    init: function() {
        var nameField = new Blockly.FieldTextInput('',
            Blockly.Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE)
            .appendField(new Blockly.FieldTextInput(name,
                Blockly.Procedures.rename), 'NAME')
            .appendField('', 'PARAMS')
            .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        if ((this.workspace.options.comments ||
                (this.workspace.options.parentWorkspace &&
                    this.workspace.options.parentWorkspace.options.comments)) &&
            Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT) {
            this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
        }
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
        this.arguments_ = [];
        this.setStatements_(true);
        this.statementConnection_ = null;
        this.types_ = [];
        this.dist_ = [];
        this.spec_ =[];
        this.tag = Blockly.Msg.TAG_PROCEDURE_DEFNORETURN;
        this.setPreviousStatement(true, ["procedures_defnoreturn", "procedures_defreturn", "main_block"]);
        this.setNextStatement(true, ["procedures_defnoreturn", "procedures_defreturn"]);
    },
    initName: function() {
        this.setFieldValue('', 'NAME');
    },

    getName: function(){
        return [this.getFieldValue('NAME')];
    },
    onchange: Blockly.Blocks.requireOutFunction,
    /**
     * Add or remove the statement block from this function definition.
     * @param {boolean} hasStatements True if a statement block is needed.
     * @this Blockly.Block
     */
    setStatements_: function(hasStatements) {
        if (this.hasStatements_ === hasStatements) {
            return;
        }
        if (hasStatements) {
            this.appendStatementInput('STACK')
                .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
            if (this.getInput('RETURN')) {
                this.moveInputBefore('STACK', 'RETURN');
            }
        } else {
            this.removeInput('STACK', true);
        }
        this.hasStatements_ = hasStatements;
    },
    /**
     * Update the display of parameters for this procedure definition block.
     * Display a warning if there are duplicately named parameters.
     * @private
     * @this Blockly.Block
     */
    updateParams_: function() {
        // Check for duplicated arguments.
        var badArg = false;
        var hash = {};
        //console.log("cam to update params");
        ///console.log(this.arguments_.length);
        for (var i = 0; i < this.arguments_.length; i++) {
            //  console.log(this.arguments_[i]);
            if (hash['arg_' + this.arguments_[i].toLowerCase()]) {

                badArg = true;
                break;
            }
            var paramString = '';
            if (this.arguments_.length) {
                paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS +
                    ' ' + this.arguments_.join(', ');
                //   console.log(paramString);
            }
            hash['arg_' + this.arguments_[i].toLowerCase()] = true;
            if (this.arguments_.length) {
                paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS;

                for (var x = 0; x < this.arguments_.length; x++) {
                    if (x == 0) {
                        if(this.dist_[x]=='v'){
                            paramString = paramString + ' ' + this.types_[x] + ' ' + this.arguments_[x];
                        }
                        else if(this.dist_[x]=='a'){
                            if(this.spec_[x][0]==1)
                                paramString = paramString + ' ' + this.types_[x] + ' '+ this.arguments_[x] + '[' + this.spec_[x][1] + ']';
                            else if(this.spec_[x][0]==2)
                                paramString = paramString + ' ' + this.types_[x] + ' '+ this.arguments_[x] + '[' + this.spec_[x][1] + ']' + '[' + this.spec_[x][2] + ']';
                            else if(this.spec_[x][0]==3)
                                paramString = paramString + ' ' + this.types_[x] + ' '+ this.arguments_[x] + '[' + this.spec_[x][1] + ']' + '[' + this.spec_[x][2] + ']' + '[' + this.spec_[x][3] + ']';
                        }
                        else if(this.dist_[x]=='p'){
                            paramString = paramString + ' ' + this.types_[x] + this.spec_[x] + ' ' + this.arguments_[x];
                        }
                    }
                    else {
                        if(this.dist_[x]=='v'){
                            paramString = paramString + ', ' + this.types_[x] + ' ' + this.arguments_[x];
                        }
                        else if(this.dist_[x]=='a'){
                            if(this.spec_[x][0]==1)
                                paramString = paramString + ' ' + this.types_[x] + ' '+ this.arguments_[x] + '[' + this.spec_[x][1] + ']';
                            else if(this.spec_[x][0]==2)
                                paramString = paramString + ' ' + this.types_[x] + ' '+ this.arguments_[x] + '[' + this.spec_[x][1] + ']' + '[' + this.spec_[x][2] + ']';
                            else if(this.spec_[x][0]==3)
                                paramString = paramString + ' ' + this.types_[x] + ' '+ this.arguments_[x] + '[' + this.spec_[x][1] + ']' + '[' + this.spec_[x][2] + ']' + '[' + this.spec_[x][3] + ']';
                        }
                        else if(this.dist_[x]=='p'){
                            paramString = paramString + ', ' + this.types_[x] + this.spec_[x] + ' ' + this.arguments_[x];
                        }
                    }
                }
                //    console.log(paramString);
            }
        }
        if (badArg) {
            this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
        } else {
            this.setWarningText(null);
        }
        // Merge the arguments into a human-readable list.

        // The params field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
            // console.log(paramString);
            if(paramString==undefined){
                paramString='';
            }
            this.setFieldValue(paramString, 'PARAMS');
        } finally {
            Blockly.Events.enable();
        }
    },
    /**
     * Create XML to represent the argument inputs.
     * @param {boolean=} opt_paramIds If true include the IDs of the parameter
     *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function(opt_paramIds) {
        var container = document.createElement('mutation');
        for (var x = 0; x < this.arguments_.length; x++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[x]);
            parameter.setAttribute('types', this.types_[x]);
            parameter.setAttribute('dist', this.dist_[x]);
            if(this.dist_[x]=='a'){
                if(this.spec_[x][0] == 1 ){
                    parameter.setAttribute('length_1', this.spec_[x][1]);
                }
                else if(this.spec_[x][0] == 2){
                    parameter.setAttribute('length_1', this.spec_[x][1]);
                    parameter.setAttribute('length_2', this.spec_[x][2]);
                }
                else if(this.spec_[x][0] == 3){
                    parameter.setAttribute('length_1', this.spec_[x][1]);
                    parameter.setAttribute('length_2', this.spec_[x][2]);
                    parameter.setAttribute('length_3', this.spec_[x][3]);
                }
            }
            else if(this.dist_[x]=='p'){
                parameter.setAttribute('iteration', this.spec_[x]);
            }
            container.appendChild(parameter);
        }

        // Save whether the statement input is visible.
        if (!this.getInput('STACK').isVisible()) {
            container.setAttribute('statements', 'false');
        }
        return container;
    },
    /**
     * Parse XML to restore the argument inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        //console.log(xmlElement);
        this.arguments_ = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() == 'arg') {
                this.arguments_.push(childNode.getAttribute('name'));
            }
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);

        // Show or hide the statement input.
        this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = Blockly.Block.obtain(workspace,
            'procedures_mutatorcontainer');
        containerBlock.initSvg();

        // Check/uncheck the allow statement box.
        if (this.getInput('RETURN')) {
            var hasStatements = this.getInput('STACK').isVisible();
            containerBlock.setFieldValue(hasStatements ? 'TRUE' : 'FALSE',
                'STATEMENTS');
        } else {
            containerBlock.getInput('STATEMENT_INPUT').setVisible(false);
        }

        // Parameter list.
        var connection = containerBlock.getInput('STACK').connection;
        console.log(this.arguments_.length);
        for (var x = 0; x < this.arguments_.length; x++) {
            var paramBlock;
            if(this.dist_[x]=='v'){
                //paramBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorarg');
                paramBlock=workspace.newBlock('procedures_mutatorarg');
                paramBlock.initSvg();
                paramBlock.setFieldValue(this.arguments_[x], 'NAME');
                paramBlock.setFieldValue(this.types_[x], 'TYPES');
            }
            else if(this.dist_[x]=='a'){
                paramBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorarg_array');
                paramBlock.initSvg();
                paramBlock.setFieldValue(this.arguments_[x], 'NAME');
                paramBlock.setFieldValue(this.types_[x], 'TYPES');
                if(this.spec_[x][0]==1)
                    paramBlock.setFieldValue(this.spec_[x][1], 'LENGTH_1');
                else if(this.spec_[x][0]==2){
                    paramBlock.setFieldValue(this.spec_[x][1], 'LENGTH_1');
                    paramBlock.setFieldValue(this.spec_[x][2], 'LENGTH_2');
                }
                else if(this.spec_[x][0]==3){
                    paramBlock.setFieldValue(this.spec_[x][1], 'LENGTH_1');
                    paramBlock.setFieldValue(this.spec_[x][2], 'LENGTH_2');
                    paramBlock.setFieldValue(this.spec_[x][3], 'LENGTH_3');
                }
            }
            else if(this.dist_[x]=='p'){
                paramBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorarg_pointer');
                paramBlock.initSvg();
                paramBlock.setFieldValue(this.arguments_[x], 'NAME');
                paramBlock.setFieldValue(this.types_[x], 'TYPES');
                paramBlock.setFieldValue(this.spec_[x], 'ITERATION');
            }
            // Store the old location.
            paramBlock.oldLocation = x;
            connection.connect(paramBlock.previousConnection);
            connection = paramBlock.nextConnection;
        }
        // Initialize procedure's callers with blank IDs.
        Blockly.Procedures.mutateCallers(this);
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        // Parameter list.
        // console.log("came to configure block");
        this.arguments_ = [];
        this.types_ = [];
        this.dist_ = [];
        this.spec_ = [];
        this.paramIds_ = [];
        var paramBlock = containerBlock.getInputTargetBlock('STACK');
        while (paramBlock) {
            this.arguments_.push(paramBlock.getFieldValue('NAME'));
            this.types_.push(paramBlock.getFieldValue('TYPES'));
            this.dist_.push(paramBlock.getDist());
            if(paramBlock.getDist()==='v'){
                this.spec_.push(null);
                // console.log(this.spec_);
            }
            else if(paramBlock.getDist()=='a') {
                var length_1 = paramBlock.getFieldValue('LENGTH_1');
                var length_2 = paramBlock.getFieldValue('LENGTH_2');
                var length_3 = paramBlock.getFieldValue('LENGTH_3');
                var convert_length_1 = length_1 * 1;
                var convert_length_2 = length_2 * 1;
                var convert_length_3 = length_3 * 1;

                if (convert_length_1 != 0 && convert_length_2 == 0 && convert_length_3 == 0)
                    this.spec_.push([1, length_1]);
                else if (convert_length_1 != 0 && convert_length_2 != 0 && convert_length_3 == 0)
                    this.spec_.push([2, length_1, length_2]);
                else if (convert_length_1 != 0 && convert_length_2 != 0 && convert_length_3 != 0)
                    this.spec_.push([3, length_1, length_2, length_3]);

            }
            else if(paramBlock.getDist()=='p'){
                this.spec_.push(paramBlock.getFieldValue('ITERATION'));
            }
            this.paramIds_.push(paramBlock.id);
            paramBlock = paramBlock.nextConnection &&
                paramBlock.nextConnection.targetBlock();
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);

        // Show/hide the statement input.
        var hasStatements = containerBlock.getFieldValue('STATEMENTS');
        if (hasStatements !== null) {
            hasStatements = hasStatements == 'TRUE';
            if (this.hasStatements_ != hasStatements) {
                if (hasStatements) {
                    this.setStatements_(true);
                    // Restore the stack, if one was saved.
                    Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
                    this.statementConnection_ = null;
                } else {
                    // Save the stack, then disconnect it.
                    var stackConnection = this.getInput('STACK').connection;
                    this.statementConnection_ = stackConnection.targetConnection;
                    if (this.statementConnection_) {
                        var stackBlock = stackConnection.targetBlock();
                        stackBlock.unplug();
                        stackBlock.bumpNeighbours_();
                    }
                    this.setStatements_(false);
                }
            }
        }
    },
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES NOT have a return value.
     * @this Blockly.Block
     */
    getProcedureDef: function() {
        return [false, this.getFieldValue('NAME'), this.getFieldValue('TYPES'), this.arguments_, this.types_, this.dist_, this.spec_];
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function() {
        return this.arguments_;
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function(oldName, newName) {
        var change = false;
        for (var i = 0; i < this.arguments_.length; i++) {
            if (Blockly.Names.equals(oldName, this.arguments_[i])) {
                this.arguments_[i] = newName;
                change = true;
            }
        }
        if (change) {
            this.updateParams_();
            // Update the mutator's variables if the mutator is open.
            if (this.mutator.isVisible()) {
                var blocks = this.mutator.workspace_.getAllBlocks();
                for (var i = 0, block; block = blocks[i]; i++) {
                    if (block.type == 'procedures_mutatorarg' &&
                        Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
                        block.setFieldValue(newName, 'NAME');
                    }
                }
            }
        }
    },
    /**
     * Add custom menu options to this block's context menu.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function(options) {
        // Add option to create caller.
        var option = {enabled: true};
        var name = this.getFieldValue('NAME');
        option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
        var xmlMutation = goog.dom.createDom('mutation');
        xmlMutation.setAttribute('name', name);
        for (var i = 0; i < this.arguments_.length; i++) {
            var xmlArg = goog.dom.createDom('arg');
            xmlArg.setAttribute('name', this.arguments_[i]);
            xmlMutation.appendChild(xmlArg);
        }
        var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
        xmlBlock.setAttribute('type', this.callType_);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);

        // Add options to create getters for each parameter.
        if (!this.isCollapsed()) {
            for (var i = 0; i < this.arguments_.length; i++) {
                var option = {enabled: true};
                var name = this.arguments_[i];
                option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
                var xmlField = goog.dom.createDom('field', null, name);
                xmlField.setAttribute('name', 'VAR');
                var xmlBlock = goog.dom.createDom('block', null, xmlField);
                xmlBlock.setAttribute('type', 'variables_get');
                option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
                options.push(option);
            }
        }
    },
    callType_: 'procedures_callnoreturn',
    /**
     * return function's parameter information
     * return type = [type, dist, name, scope, position, specific]
     * */
    getParamInfo: function(){
        var paramList = [];
        for(var i = 0; i<this.arguments_.length; i++){
            paramList.push([this.types_[i], this.dist_[i], this.arguments_[i], this.getFieldValue('NAME'), this.getRelativeToSurfaceXY().y, this.spec_[i]]);
        }
        return paramList;
    }
};

Blockly.Blocks['procedures_defreturn'] = {
    /**
     * Block for defining a procedure with a return value.
     * @this Blockly.Block
     */
    init: function() {
        var nameField = new Blockly.FieldTextInput('',
            Blockly.Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE)
            .appendField(nameField, 'NAME')
            .appendField('', 'PARAMS');
        this.appendValueInput('RETURN')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        if ((this.workspace.options.comments ||
                (this.workspace.options.parentWorkspace &&
                    this.workspace.options.parentWorkspace.options.comments)) &&
            Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
            this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
        }
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
        this.arguments_ = [];
        this.setStatements_(true);
        this.statementConnection_ = null;
    },
    setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
    updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
    mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
    decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
    compose: Blockly.Blocks['procedures_defnoreturn'].compose,
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES have a return value.
     * @this Blockly.Block
     */
    getProcedureDef: function() {
        return [this.getFieldValue('NAME'), this.arguments_, true];
    },
    getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
    renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
    customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
    callType_: 'procedures_callreturn'
};

Blockly.Blocks['procedures_mutatorcontainer'] = {
    /**
     * Mutator block for procedure container.
     * @this Blockly.Block
     */
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
        this.appendStatementInput('STACK');
        this.appendDummyInput('STATEMENT_INPUT')
            .appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS)
            .appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['procedures_mutatorarg'] = {
    /**
     * Mutator block for procedure argument.
     * @this Blockly.Block
     */
    init: function() {
        var field = new Blockly.FieldTextInput('x', this.validator_);
        var TYPE =
            [
                [Blockly.Msg.VARIABLES_SET_TYPE_INT, 'int'],
                [Blockly.Msg.VARIABLES_SET_TYPE_UNSIGNED_INT, 'unsigned int'],
                [Blockly.Msg.VARIABLES_SET_TYPE_FLOAT, 'float'],
                [Blockly.Msg.VARIABLES_SET_TYPE_DOUBLE, 'double'],
                [Blockly.Msg.VARIABLES_SET_TYPE_CHAR, 'char']];
        this.appendDummyInput()
            .appendField('variable')
            .appendField(new Blockly.FieldDropdown(TYPE), 'TYPES')
            .appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE)
            .appendField(new Blockly.FieldTextInput('x', Blockly.Blocks.CNameValidator), 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = true;

        // Create the default variable when we drag the block in from the flyout.
        // Have to do this after installing the field on the block.
        field.onFinishEditing_ = this.createNewVar_;
        field.onFinishEditing_('x');
    },
    /**
     * Obtain a valid name for the procedure.
     * Merge runs of whitespace.  Strip leading and trailing whitespace.
     * Beyond this, all names are legal.
     * @param {string} newVar User-supplied name.
     * @return {?string} Valid name, or null if a name was not specified.
     * @private
     * @this Blockly.Block
     */
    validator_: function(newVar) {
        newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        return newVar || null;
    },
    /**
     * Called when focusing away from the text field.
     * Creates a new variable with this name.
     * @param {string} newText The new variable name.
     * @private
     * @this Blockly.FieldTextInput
     */
    createNewVar_: function(newText) {
        var source = this.sourceBlock_;
        if (source && source.workspace && source.workspace.options &&
            source.workspace.options.parentWorkspace) {
            var workspace = source.workspace.options.parentWorkspace;
            var variable = workspace.getVariable(newText);
            // If there is a case change, rename the variable.
            if (variable && variable.name !== newText) {
                workspace.renameVariableById(variable.getId(), newText);
            } else {
                workspace.createVariable(newText);
            }
        }
    },
    getTypes: function() {
        return [this.getFieldValue('TYPES')];
    },
    getDist: function() {
        return 'v';
    },
    getSpec: function(){
        return null;
    }
};

Blockly.Blocks['procedures_callnoreturn'] = {
    /**
     * Block for calling a procedure with no return value.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(300);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_CALLNORETURN_CALL)
            .appendField('', 'NAME')
            .appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, 'WITH');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Tooltip is set in domToMutation.
        this.arguments_ = [];
        this.types_ = [];
        this.dist_ = [];
        this.spec_ = [];
        this.quarkConnections_ = null;
        this.quarkArguments_ = null;
    },
    /**
     * Returns the name of the procedure this block calls.
     * @return {string} Procedure name.
     * @this Blockly.Block
     */
    getProcedureCall: function() {
        // The NAME field is guaranteed to exist, null will never be returned.
        return /** @type {string} */ (this.getFieldValue('NAME'));
    },
    /**
     * Notification that a procedure is renaming.
     * If the name matches this block's procedure, rename it.
     * @param {string} oldName Previous name of procedure.
     * @param {string} newName Renamed procedure.
     * @this Blockly.Block
     */
    renameProcedure: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
            this.setFieldValue(newName, 'NAME');
            this.setTooltip(
                (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP :
                    Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP)
                    .replace('%1', newName));
        }
    },
    /**
     * Notification that the procedure's parameters have changed.
     * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
     * @param {!Array.<string>} paramIds IDs of params (consistent for each
     *     parameter through the life of a mutator, regardless of param renaming),
     *     e.g. ['piua', 'f8b_', 'oi.o'].
     * @private
     * @this Blockly.Block
     */
    setProcedureParameters: function(paramNames, paramTypes, paramDist, paramSpec, paramIds) {
        // Data structures:
        // this.arguments = ['x', 'y']
        //     Existing param names.
        // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
        //     Look-up of paramIds to connections plugged into the call block.
        // this.quarkArguments_ = ['piua', 'f8b_']
        //     Existing param IDs.
        // Note that quarkConnections_ may include IDs that no longer exist, but
        // which might reappear if a param is reattached in the mutator.
        if (!paramIds) {
            // Reset the quarks (a mutator is about to open).
            this.quarkConnections_ = {};
            this.quarkArguments_ = null;
            return;
        }
        if (paramIds.length != paramNames.length) {
            throw 'Error: paramNames and paramIds must be the same length.';
        }
        if (!this.quarkArguments_) {
            // Initialize tracking for this block.
            this.quarkConnections_ = {};
            if (paramNames.join('\n') == this.arguments_.join('\n')) {
                // No change to the parameters, allow quarkConnections_ to be
                // populated with the existing connections.
                this.quarkArguments_ = paramIds;
            } else {
                this.quarkArguments_ = [];
            }
        }
        // Switch off rendering while the block is rebuilt.
        var savedRendered = this.rendered;
        this.rendered = false;
        // Update the quarkConnections_ with existing connections.
        for (var x = this.arguments_.length - 1; x >= 0; x--) {
            var input = this.getInput('ARG' + x);
            if (input) {
                var connection = input.connection.targetConnection;
                this.quarkConnections_[this.quarkArguments_[x]] = connection;
                // Disconnect all argument blocks and remove all inputs.
                this.removeInput('ARG' + x);
            }
        }
        // Rebuild the block's arguments.
        this.arguments_ = [].concat(paramNames);
        this.types_ = [].concat(paramTypes);
        this.dist_ = [].concat(paramDist);
        this.spec_ = [].concat(paramSpec);
        this.quarkArguments_ = paramIds;
        for (var x = 0; x < this.arguments_.length; x++) {
            var input;
            if(this.dist_[x]=='v'){
                input = this.appendValueInput('ARG' + x)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(this.types_[x])
                    .appendField(this.arguments_[x]);
                //  Blockly.Blocks.setCheckVariable(this, this.types_[x], 'ARG'+x);
            }
            else if(this.dist_[x]=='a'){
                if(this.spec_[x][0] ==1){
                    input = this.appendValueInput('ARG' + x)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField(this.types_[x])
                        .appendField(this.arguments_[x]+'[' + this.spec_[x][1] + ']');
                    console.log('types_[x]: '+ this.types_[x]);
                    //    Blockly.Blocks.setCheckVariable(this, this.types_[x], 'ARG'+x);
                }
                else if(this.spec_[x][0] ==2){
                    input = this.appendValueInput('ARG' + x)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField(this.types_[x])
                        .appendField(this.arguments_[x]+'[' + this.spec_[x][1] + ']'+'[' + this.spec_[x][2] + ']');
                    //    Blockly.Blocks.setCheckVariable(this, this.types_[x], 'ARG'+x);
                }
                else if(this.spec_[x][0] ==3){
                    input = this.appendValueInput('ARG' + x)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField(this.types_[x])
                        .appendField(this.arguments_[x]+'[' + this.spec_[x][1] + ']'+'[' + this.spec_[x][2] + ']'+'[' + this.spec_[x][3] + ']');
                    //    Blockly.Blocks.setCheckVariable(this, this.types_[x], 'ARG'+x);
                }
            }
            else if(this.dist_[x]=='p'){
                input = this.appendValueInput('ARG' + x)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(this.types_[x] + this.spec_[x])
                    .appendField(this.arguments_[x]);
                //   Blockly.Blocks.setCheckPointer(this, this.types_[x], 'ARG'+x);
            }

            if (this.quarkArguments_) {
                // Reconnect any child blocks.
                var quarkName = this.quarkArguments_[x];
                if (quarkName in this.quarkConnections_) {
                    var connection = this.quarkConnections_[quarkName];
                    if (!connection || connection.targetConnection ||
                        connection.sourceBlock_.workspace != this.workspace) {
                        // Block no longer exists or has been attached elsewhere.
                        delete this.quarkConnections_[quarkName];
                    } else {
                        input.connection.connect(connection);
                    }
                }
            }
        }
        //console.log(this.getField);
        // Add 'with:' if there are parameters.
        this.getField_('WITH').setVisible(!!this.arguments_.length);
        // Restore rendering and show the changes.
        this.rendered = savedRendered;
        if (this.rendered) {
            this.render();
        }
    },
    /**
     * Modify this block to have the correct number of arguments.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function() {
        for (var i = 0; i < this.arguments_.length; i++) {
            var field = this.getField('ARGNAME' + i);
            if (field) {
                // Ensure argument name is up to date.
                // The argument name field is deterministic based on the mutation,
                // no need to fire a change event.
                Blockly.Events.disable();
                try {
                    field.setValue(this.arguments_[i]);
                } finally {
                    Blockly.Events.enable();
                }
            } else {
                // Add new input.
                field = new Blockly.FieldLabel(this.arguments_[i]);
                var input = this.appendValueInput('ARG' + i)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(field, 'ARGNAME' + i);
                input.init();
                //  console.log(input);
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ARG' + i)) {
            this.removeInput('ARG' + i);
            i++;
        }
        // Add 'with:' if there are parameters, remove otherwise.
        var topRow = this.getInput('TOPROW');
        if (topRow) {
            if (this.arguments_.length) {
                if (!this.getField('WITH')) {
                    topRow.appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, 'WITH');
                    topRow.init();
                }
            } else {
                if (this.getField('WITH')) {
                    topRow.removeField('WITH');
                }
            }
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('name', this.getProcedureCall());
        for (var x = 0; x < this.arguments_.length; x++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[x]);
            parameter.setAttribute('types', this.types_[x]);
            parameter.setAttribute('dist', this.dist_[x]);
            if(this.dist_[x]=='a'){
                if(this.spec_[x][0] == 1){
                    parameter.setAttribute('length_1', this.spec_[x][1]);
                }
                else if(this.spec_[x][0] == 2){
                    parameter.setAttribute('length_1', this.spec_[x][1]);
                    parameter.setAttribute('length_2', this.spec_[x][2]);
                }
                else if(this.spec_[x][0] == 3){
                    parameter.setAttribute('length_1', this.spec_[x][1]);
                    parameter.setAttribute('length_2', this.spec_[x][2]);
                    parameter.setAttribute('length_3', this.spec_[x][3]);
                }
            }
            else if(this.dist_[x]=='p'){
                parameter.setAttribute('iteration', this.spec_[x]);
            }
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        var name = xmlElement.getAttribute('name');
        this.setFieldValue(name, 'NAME');
        this.setTooltip(
            (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace('%1', name));
        var def = Blockly.Procedures.getDefinition(name, this.workspace);
        if (def && def.mutator.isVisible()) {
            // Initialize caller with the mutator's IDs.
            this.setProcedureParameters(def.arguments_, def.types_, def.dist_, def.spec_, def.paramIds_);
        } else {
            this.arguments_ = [];
            this.types_ = [];
            this.dist_ = [];
            this.spec_ = [];
            for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
                if (childNode.nodeName.toLowerCase() == 'arg') {
                    this.arguments_.push(childNode.getAttribute('name'));
                    this.types_.push(childNode.getAttribute('types'));
                    this.dist_.push(childNode.getAttribute('dist'));
                    if(childNode.getAttribute('dist')=='v'){
                        this.spec_.push(null);
                    }
                    else if(childNode.getAttribute('dist')=='a'){
                        var length_1 = childNode.getAttribute('LENGTH_1');
                        var length_2 = childNode.getAttribute('LENGTH_2');
                        var length_3 = childNode.getAttribute('LENGTH_3');
                        length_1 = length_1 * 1;
                        length_2 = length_2 * 1;
                        length_3 = length_3 * 1;

                        if (length_1 != 0 && length_2 == 0 && length_3 == 0)
                            this.spec_.push([1, length_1]);
                        else if (length_1 != 0 && length_2 != 0 && length_3 == 0)
                            this.spec_.push([2, length_1, length_2]);
                        else if (length_1 != 0 && length_2 != 0 && length_3 != 0)
                            this.spec_.push([3, length_1, length_2, length_3]);
                    }
                    else if(childNode.getAttribute('dist')=='p'){
                        this.spec_.push(childNode.getAttribute('iteration'));
                    }
                }
            }
            // For the second argument (paramIds) use the arguments list as a dummy
            // list.
            console.log(this);
            this.setProcedureParameters(this.arguments_, this.types_, this.dist_, this.spec_, this.arguments_);
        }
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function(oldName, newName) {
        for (var i = 0; i < this.arguments_.length; i++) {
            if (Blockly.Names.equals(oldName, this.arguments_[i])) {
                this.arguments_[i] = newName;
                this.getField('ARGNAME' + i).setValue(newName);
            }
        }
    },
    /**
     * Procedure calls cannot exist without the corresponding procedure
     * definition.  Enforce this link whenever an event is fired.
     * @param {!Blockly.Events.Abstract} event Change event.
     * @this Blockly.Block
     */
    onchange: function(event) {
        if (!this.workspace || this.workspace.isFlyout) {
            // Block is deleted or is in a flyout.
            return;
        }
        if (event.type == Blockly.Events.BLOCK_CREATE &&
            event.ids.indexOf(this.id) != -1) {
            // Look for the case where a procedure call was created (usually through
            // paste) and there is no matching definition.  In this case, create
            // an empty definition block with the correct signature.
            var name = this.getProcedureCall();
            var def = Blockly.Procedures.getDefinition(name, this.workspace);
            if (def && (def.type != this.defType_ ||
                    JSON.stringify(def.arguments_) != JSON.stringify(this.arguments_))) {
                // The signatures don't match.
                def = null;
            }
            if (!def) {
                Blockly.Events.setGroup(event.group);
                /**
                 * Create matching definition block.
                 * <xml>
                 *   <block type="procedures_defreturn" x="10" y="20">
                 *     <mutation name="test">
                 *       <arg name="x"></arg>
                 *     </mutation>
                 *     <field name="NAME">test</field>
                 *   </block>
                 * </xml>
                 */
                var xml = goog.dom.createDom('xml');
                var block = goog.dom.createDom('block');
                block.setAttribute('type', this.defType_);
                var xy = this.getRelativeToSurfaceXY();
                var x = xy.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);
                var y = xy.y + Blockly.SNAP_RADIUS * 2;
                block.setAttribute('x', x);
                block.setAttribute('y', y);
                var mutation = this.mutationToDom();
                block.appendChild(mutation);
                var field = goog.dom.createDom('field');
                field.setAttribute('name', 'NAME');
                field.appendChild(document.createTextNode(this.getProcedureCall()));
                block.appendChild(field);
                xml.appendChild(block);
                Blockly.Xml.domToWorkspace(xml, this.workspace);
                Blockly.Events.setGroup(false);
            }
        } else if (event.type == Blockly.Events.BLOCK_DELETE) {
            // Look for the case where a procedure definition has been deleted,
            // leaving this block (a procedure call) orphaned.  In this case, delete
            // the orphan.
            var name = this.getProcedureCall();
            var def = Blockly.Procedures.getDefinition(name, this.workspace);
            if (!def) {
                Blockly.Events.setGroup(event.group);
                this.dispose(true, false);
                Blockly.Events.setGroup(false);
            }
        }
    },
    /**
     * Add menu option to find the definition block for this call.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function(options) {
        var option = {enabled: true};
        option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
        var name = this.getProcedureCall();
        var workspace = this.workspace;
        option.callback = function() {
            var def = Blockly.Procedures.getDefinition(name, workspace);
            def && def.select();
        };
        options.push(option);
    },
    defType_: 'procedures_defnoreturn'
};

Blockly.Blocks['procedures_callreturn'] = {
    /**
     * Block for calling a procedure with a return value.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(300);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_CALLRETURN_CALL)
            .appendField('', 'NAME')
            .appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, 'WITH');
        this.setOutput(true);
        // Tooltip is set in domToMutation.
        this.arguments_ = [];
        this.types_ = [];
        this.dist_ = [];
        this.spec_ = [];
        this.quarkConnections_ = null;
        this.quarkArguments_ = null;
    },
    getProcedureCall: Blockly.Blocks['procedures_callnoreturn'].getProcedureCall,
    renameProcedure: Blockly.Blocks['procedures_callnoreturn'].renameProcedure,
    setProcedureParameters: Blockly.Blocks['procedures_callnoreturn'].setProcedureParameters,
    updateShape_: Blockly.Blocks['procedures_callnoreturn'].updateShape_,
    mutationToDom: Blockly.Blocks['procedures_callnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_callnoreturn'].domToMutation,
    renameVar: Blockly.Blocks['procedures_callnoreturn'].renameVar,
    onchange: Blockly.Blocks['procedures_callnoreturn'].onchange,
    customContextMenu:
    Blockly.Blocks['procedures_callnoreturn'].customContextMenu,
    defType_: 'procedures_defreturn'
};

Blockly.Blocks['procedures_ifreturn'] = {
    /**
     * Block for conditionally returning a value from a procedure.
     * @this Blockly.Block
     */
    init: function() {
        this.appendValueInput('CONDITION')
            .setCheck('Boolean')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_IFRETURN_HELPURL);
        this.hasReturnValue_ = true;
    },
    /**
     * Create XML to represent whether this block has a return value.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('value', Number(this.hasReturnValue_));
        return container;
    },
    /**
     * Parse XML to restore whether this block has a return value.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        var value = xmlElement.getAttribute('value');
        this.hasReturnValue_ = (value == 1);
        if (!this.hasReturnValue_) {
            this.removeInput('VALUE');
            this.appendDummyInput('VALUE')
                .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        }
    },
    /**
     * Called whenever anything on the workspace changes.
     * Add warning if this flow block is not nested inside a loop.
     * @param {!Blockly.Events.Abstract} e Change event.
     * @this Blockly.Block
     */
    onchange: function(/* e */) {
        if (!this.workspace.isDragging || this.workspace.isDragging()) {
            return;  // Don't change state at the start of a drag.
        }
        var legal = false;
        // Is the block nested in a procedure?
        var block = this;
        do {
            if (this.FUNCTION_TYPES.indexOf(block.type) != -1) {
                legal = true;
                break;
            }
            block = block.getSurroundParent();
        } while (block);
        if (legal) {
            // If needed, toggle whether this block has a return value.
            if (block.type == 'procedures_defnoreturn' && this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendDummyInput('VALUE')
                    .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
                this.hasReturnValue_ = false;
            } else if (block.type == 'procedures_defreturn' &&
                !this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendValueInput('VALUE')
                    .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
                this.hasReturnValue_ = true;
            }
            this.setWarningText(null);
            if (!this.isInFlyout) {
                this.setDisabled(false);
            }
        } else {
            this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING);
            if (!this.isInFlyout && !this.getInheritedDisabled()) {
                this.setDisabled(true);
            }
        }
    },
    /**
     * List of block types that are functions and thus do not need warnings.
     * To add a new function type add this to your code:
     * Blockly.Blocks['procedures_ifreturn'].FUNCTION_TYPES.push('custom_func');
     */
    FUNCTION_TYPES: ['procedures_defnoreturn', 'procedures_defreturn']
};