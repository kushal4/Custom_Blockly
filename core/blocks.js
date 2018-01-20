/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview A mapping of block type names to block prototype objects.
 * @author spertus@google.com (Ellen Spertus)
 */
'use strict';

/**
 * A mapping of block type names to block prototype objects.
 * @name Blockly.Blocks
 */
goog.provide('Blockly.Blocks');

/*
 * A mapping of block type names to block prototype objects.
 * @type {!Object<string,Object>}
 */
Blockly.Blocks = new Object(null);
Blockly.Blocks.addTemplate = function(details) {
    // Validate inputs.  TODO: Add more.
    goog.asserts.assert(details.blockName);
    goog.asserts.assert(Blockly.Blocks[details.blockName],
        'Blockly.Blocks already has a field named ', details.blockName);
    goog.asserts.assert(details.message);
    goog.asserts.assert(details.colour && typeof details.colour == 'number' &&
        details.colour >= 0 && details.colour < 360,
        'details.colour must be a number from 0 to 360 (exclusive)');
    if (details.output != 'undefined') {
        goog.asserts.assert(!details.previousStatement,
            'When details.output is defined, ' +
            'details.previousStatement must not be true.');
        goog.asserts.assert(!details.nextStatement,
            'When details.output is defined, ' +
            'details.nextStatement must not be true.');
    }

    // Build up template.
    var block = {};
    block.init = function() {
        var thisBlock = this;
        // Set basic properties of block.
        this.setColour(details.colour);
        this.setHelpUrl(details.helpUrl);
        if (typeof details.tooltip == 'string') {
            this.setTooltip(details.tooltip);
        } else if (typeof details.tooltip == 'function') {
            this.setTooltip(function() {
                return details.tooltip(thisBlock);
            });
        }
        // Set output and previous/next connections.
        if (details.output != 'undefined') {
            this.setOutput(true, details.output);
        } else {
            this.setPreviousStatement(
                typeof details.previousStatement == 'undefined' ?
                    true : details.previousStatement);
            this.setNextStatement(
                typeof details.nextStatement == 'undefined' ?
                    true : details.nextStatement);
        }
        // Build up arguments in the format expected by interpolateMsg.
        var interpArgs = [];
        interpArgs.push(details.text);
        if (details.args) {
            details.args.forEach(function(arg) {
                goog.asserts.assert(arg.name);
                goog.asserts.assert(arg.check != 'undefined');
                if (arg.type == 'undefined' || arg.type == Blockly.INPUT_VALUE) {
                    interpArgs.push([arg.name,
                        arg.check,
                        typeof arg.align == 'undefined' ? Blockly.ALIGN_RIGHT : arg.align
                    ]);
                } else {
                    // TODO: Write code for other input types.
                    goog.asserts.fail('addTemplate() can only handle value inputs.');
                }
            });
        }
        // Neil, how would you recommend specifying the final dummy alignment?
        // Should it be a top-level field in details?
        interpArgs.push(Blockly.ALIGN_RIGHT);
        if (details.inline) {
            this.setInlineInputs(details.inline);
        }
        Blockly.Block.prototype.interpolateMsg.apply(this, interpArgs);
    };

    // Create mutationToDom if needed.
    if (details.switchable) {
        block.mutationToDom = function() {
            var container = details.mutationToDomFunc ? details.mutatationToDomFunc() : document.createElement('mutation');
            container.setAttribute('is_statement', this['isStatement'] || false);
            return container;
        };
    } else {
        block.mutationToDom = details.mutationToDomFunc;
    }
    // TODO: Add domToMutation and customContextMenu.

    // Add new block to Blockly.Blocks.
    Blockly.Blocks[details.blockName] = block;
};

/*
 The Function to set warning text and show it when the block
 that must be in function is out of function.
 */
Blockly.Blocks.requireInFunction = function(block) {
    if(!block) {
        if (!this.workspace) {
            // Block has been deleted.
            return;
        }
        if (this.getSurroundParent()) {
            this.setWarningText(null);
        } else {
            this.setWarningText(Blockly.Msg.PLZ_INSIDE_FUNCTION);
        }
    }
    else {
        if (!block.workspace) {
            // Block has been deleted.
            return;
        }
        if (block.getSurroundParent()) {
            block.setWarningText(null);
        } else {
            block.setWarningText(Blockly.Msg.PLZ_INSIDE_FUNCTION);
        }
    }
};
/*
 The Function to check if variable, array, #define, or pointer declare block's position is legal or illegal.
 */
Blockly.Blocks.variablePlaceCheck = function(block) {
    if(!block) {
        if (!this.workspace) {
            // Block has been deleted.
            return;
        }
        if (this.getSurroundParent() && (this.getSurroundParent().type == 'main_block' || this.getSurroundParent().type == 'procedures_defnoreturn' || this.getSurroundParent().type == 'procedures_defreturn')) {
            this.setWarningText(null);
        } else if (this.getSurroundParent()) {
            this.setWarningText(Blockly.Msg.PLZ_OUT_OF_BLOCK);
        } else {
            this.setWarningText(Blockly.Msg.PLZ_INSIDE_FUNCTION);
        }
    }
    else {
        if (!block.workspace) {
            // Block has been deleted.
            return;
        }
        if (block.getSurroundParent() && (block.getSurroundParent().type == 'main_block' || block.getSurroundParent().type == 'procedures_defnoreturn' || block.getSurroundParent().type == 'procedures_defreturn')) {
            block.setWarningText(null);
        } else if (block.getSurroundParent()) {
            block.setWarningText(Blockly.Msg.PLZ_OUT_OF_BLOCK);
        } else {
            block.setWarningText(Blockly.Msg.PLZ_INSIDE_FUNCTION);
        }
    }
};

Blockly.Blocks.requireOutFunction=function(block){
    if(!block) {
        if (!this.workspace) {
            // Block has been deleted.
            return;
        }
        if (this.getSurroundParent() && (this.getSurroundParent().type == 'main_block' || this.getSurroundParent().type == 'procedures_defnoreturn' || this.getSurroundParent().type == 'procedures_defreturn')) {
            this.setWarningText(Blockly.Msg.PLZ_OUT_OF_FUNCTION);
        } else {
            this.setWarningText(null);
        }
    }
    else {
        if (!block.workspace) {
            // Block has been deleted.
            return;
        }
        if (block.getSurroundParent() && (block.getSurroundParent().type == 'main_block' || block.getSurroundParent().type == 'procedures_defnoreturn' || block.getSurroundParent().type == 'procedures_defreturn')) {
            block.setWarningText(Blockly.Msg.PLZ_OUT_OF_FUNCTION);
        } else {
            block.setWarningText(null);
        }
    }
};

Blockly.Blocks.checkArrayIndex = function(inputNum, arrayIdx) {
    // if inputNum is variable
    if (isNaN(inputNum) == true ){
        return true;
    }
    if ((inputNum < 0) || (arrayIdx < 0) || (inputNum >= arrayIdx)) {
        return false;
    }
    else
        return true;
};

Blockly.Blocks.getWantedBlockArray = function(wantedType) {
    var varList = Blockly.Variables.allVariables();
    var wantedList = [];
    for (var temp = 0 ; temp < varList.length ; temp++ ){
        if (varList[temp][1] == wantedType) {
            wantedList.push([varList[temp][0], varList[temp][1], varList[temp][2], varList[temp][3], varList[temp][4], varList[temp][5]]);
        }
    }

    return wantedList;
};

Blockly.Blocks.getIndexArray = function(arrList, arrName) {
    var idxList = [];
    var fixedIdx1, fixedIdx2, fixedIdx3;
    for (var temp = 0 ; temp < arrList.length ; temp++) {
        if (arrList[temp][2] == arrName) {
            fixedIdx1 = arrList[temp][5][1];
            fixedIdx2 = arrList[temp][5][2];
            fixedIdx3 = arrList[temp][5][3];


            switch(arrList[temp][5][0]) {

                case 1:
                    fixedIdx2 = -1;
                    fixedIdx3 = -1;
                    break;
                case 2:
                    fixedIdx3 = -1;
                    break;
                default:
                    break;
            }

        }
    }
    idxList.push(fixedIdx1, fixedIdx2, fixedIdx3);
    return idxList;
};


Blockly.Blocks.arrayTestFunction = function(block, len1, len2, len3){

    if(len1 != 0 && len2 == 0 && len3 == 0)
        block.setWarningText(null);
    else if(len1 != 0 && len2 != 0 && len3 == 0)
        block.setWarningText(null);
    else if(len1 != 0 && len2 != 0 && len3 != 0)
        block.setWarningText(null);
    else
        block.setWarningText('Warning: Array length must be writen by order.');

};

/**
 * block search and show the result.
 * just use searchTag function and showResult function.
 * @param searchingWord
 */
Blockly.Blocks.search = function(searchingWord){
    var result = Blockly.Blocks.searchTag(searchingWord);
    Blockly.Blocks.showResult(result);
};

/**
 * searching tag from all blocks
 * return block array that have the tag
 * @param searchingTag
 * @returns {Array}
 */
Blockly.Blocks.searchTag = function(searchingTag){
    var tree = Blockly.Toolbox.tree_;
    var blocks = [];
    for (var i = 0; i<tree.children_.length; i++) {
        var tree_i =tree.children_[i];
        if(tree_i.blocks == 'PROCEDURE'){
            var proNoReturn = new Blockly.Block();
            proNoReturn.id = Blockly.genUid();
            proNoReturn.fill(Blockly.mainWorkspace, "procedures_defnoreturn");
            blocks.push(proNoReturn);

            var proReturn = new Blockly.Block();
            proReturn.id = Blockly.genUid();
            proReturn.fill(Blockly.mainWorkspace, "procedures_defreturn");
            blocks.push(proReturn);
        }
        else if(tree_i.blocks =='STRUCTURE'){
            var structDefine = new Blockly.Block();
            structDefine.id = Blockly.genUid();
            structDefine.fill(Blockly.mainWorkspace, "structure_define");
            blocks.push(structDefine);

            var structDeclare = new Blockly.Block();
            structDeclare.id = Blockly.genUid();
            structDeclare.fill(Blockly.mainWorkspace, "structure_declare");
            blocks.push(structDeclare);
        }
        else if(tree_i.blocks.length){
            for(var j =0;j<tree_i.blocks.length;j++){
                var block = Blockly.Xml.domToBlockObject(Blockly.mainWorkspace, tree_i.blocks[j]);
                blocks.push(block);
            }
        }
        else if(tree_i.html_.privateDoNotAccessOrElseSafeHtmlWrappedValue_ != 'result' && tree_i.children_.length){
            for(var j=0;j<tree_i.children_.length;j++){
                var tree_j=tree_i.children_[j];
                if(tree_j.blocks){
                    for(var k=0;k<tree_j.blocks.length;k++){
                        var block = Blockly.Xml.domToBlockObject(Blockly.mainWorkspace, tree_j.blocks[k]);
                        blocks.push(block);
                    }
                }
            }
        }
    }

    var result = [];
    for(var n=0;n<blocks.length;n++){
        if(blocks[n].tag){
            for(var m=0;m<blocks[n].tag.length;m++){
                if(blocks[n].tag[m].indexOf(searchingTag) != -1){
                    result.push(blocks[n]);
                    break;
                }
            }
        }
    }
    return result;
};

/**
 * Check if type is same as one of result or not.
 * If there is same type block among result, function return the index.
 * If there is no same type block among result, function return -1 value.
 * @param type: type that will be checked.
 * @param result: list of blocks.
 * @returns {number}
 */
Blockly.Blocks.checkResult = function(type, result){
    var returnValue = -1;
    for(var i=0;i<result.length;i++){
        if(result[i].type.toUpperCase() == type){
            returnValue = i;
        }
    }
    return returnValue;
};

/**
 * rendering the block into main workspace to show the result to user
 * @param result
 */
Blockly.Blocks.showResult = function(result){

    var tree = new Blockly.Toolbox.TreeControl(goog.html.SafeHtml.EMPTY,
        Blockly.Toolbox.CONFIG_);
    Blockly.Toolbox.tree_ = tree;
    tree.setShowRootNode(false);
    tree.setShowLines(false);
    tree.setShowExpandIcons(false);


    var rootOut = Blockly.Toolbox.tree_;
    rootOut.removeChildren();  // Delete any existing content.
    rootOut.blocks = [];
    var searchResult = rootOut.createNode("result");
    searchResult.blocks = [];
    Blockly.Toolbox.tree_.add(searchResult);
    function syncTrees(treeIn, treeOut) {
        for (var i = 0, childIn; childIn = treeIn.childNodes[i]; i++) {
            if (!childIn.tagName) {
                // Skip over text.
                continue;
            }
            var name = childIn.tagName.toUpperCase();
            if (name == 'CATEGORY') {
                var childOut = rootOut.createNode(childIn.getAttribute('name'));
                childOut.blocks = [];
                treeOut.add(childOut);
                var custom = childIn.getAttribute('custom');
                if (custom) {
                    childOut.blocks = custom;
                    for(var j = 0, child; child=childIn.childNodes[j];j++){
                        if(!child.tagName){
                            continue;
                        }
                        var childName = child.tagName.toUpperCase();
                        if(childName == 'BLOCK'){
                            var check = Blockly.Blocks.checkResult(child.getAttribute('type').toUpperCase(), result);
                            if(check != -1){
                                result.splice(check, 1);
                                searchResult.blocks.push(child);
                            }
                        }
                    }
                } else {
                    syncTrees(childIn, childOut);
                }
            } else if (name == 'BLOCK') {
                treeOut.blocks.push(childIn);
                var check = Blockly.Blocks.checkResult(childIn.getAttribute('type').toUpperCase(), result);
                if(check != -1){
                    result.splice(check, 1);
                    searchResult.blocks.push(childIn);
                }
            }
        }
    }
    syncTrees(Blockly.languageTree, Blockly.Toolbox.tree_);

    if (rootOut.blocks.length) {
        throw 'Toolbox cannot have both blocks and categories in the root level.';
    }

    // Fire a resize event since the toolbox may have changed width and height.
    Blockly.fireUiEvent(window, 'resize');
    Blockly.Toolbox.HtmlDiv.childNodes[0].remove();
    tree.setSelectedItem(searchResult);
    tree.render(Blockly.Toolbox.HtmlDiv);
};

Blockly.Blocks.checkLegalName = function(msg, name){
    var err = 0;

    if(name.length>0){
        var chk = name.substring(0,1);
        if(!chk.match(/[a-z]|[A-Z]/)){
            err = err+1;
        }
    }
    for (var i=1; i<name.length; i++)  {
        var chk = name.substring(i,i+1);
        if(!chk.match(/[0-9]|[a-z]|[A-Z]|_/)) {
            err = err + 1;
        }
    }

    if(err>0){
        window.alert(msg);
        return -1;
    }
    return;
};


/**
 * setCheck - variable with type
 * @param block
 * @param varType
 * @param inputName
 */
Blockly.Blocks.setCheckVariable = function(block, varType, inputName) {
    switch (varType)
    {
        case('int'):
            block.getInput(inputName)
                .setCheck(['Number', 'Aster', 'Array', 'Boolean', 'Macro', 'Variable', 'VAR_INT', 'NEGATIVE', 'INT']);
            break;

        case('unsigned int'):
            block.getInput(inputName)
                .setCheck(['Number', 'Aster', 'Array', 'Boolean', 'Macro', 'Variable', 'VAR_UNINT', 'NEGATIVE']);
            break;
        case('float') :
            block.getInput(inputName)
                .setCheck(['Number', 'Aster', 'Array', 'Boolean', 'Macro', 'Variable', 'VAR_FLOAT', 'DOUBLE']);

        case('double') :
            block.getInput(inputName)
                .setCheck(['Number', 'Aster', 'Array', 'Boolean', 'Macro', 'Variable', 'VAR_DOUBLE', 'DOUBLE']);
            break;
        case('char'):
            block.getInput(inputName)
                .setCheck(['String', 'Aster', 'Array', 'Boolean', 'Macro', 'Variable', 'VAR_CHAR', 'CHAR', 'Number', 'INT']);
            break;
        /*        default:
         block.getInput(inputName)
         .setCheck(['Number', 'Aster', 'Array', 'Boolean', 'Macro', 'Variable', 'NEGATIVE', 'INT']);
         */
    }
};

/**
 * setCheck - pointer with type
 * @param block
 * @param ptrType
 * @param inputName
 */
Blockly.Blocks.setCheckPointer = function(block, ptrType, inputName) {
    switch (ptrType) {
        case ('int'):
            block.getInput(inputName).setCheck(['PTR_INT', 'Address', 'Pointer', 'Array', 'Aster']);
            break;
        case ('unsigned int'):
            block.getInput(inputName).setCheck(['PTR_UNINT', 'Address', 'Pointer', 'Array', 'Aster']);
            break;
        case ('float'):
            block.getInput(inputName).setCheck(['PTR_FLOAT', 'Address', 'Pointer', 'Array', 'Aster']);
            break;
        case ('double'):
            block.getInput(inputName).setCheck(['PTR_DOUBLE', 'Address', 'Pointer', 'Array', 'Aster']);
            break;
        case ('char'):
            block.getInput(inputName).setCheck(['PTR_CHAR', 'Address', 'Pointer', 'String', 'STR', 'CHAR', 'Array', 'Aster']);
            break;
        case ('dbint'):
            block.getInput(inputName).setCheck(['DBPTR_INT', 'Address', 'Pointer', 'Aster', 'Array', 'Aster']);
            break;
        case ('dbunsigned int'):
            block.getInput(inputName).setCheck(['DBPTR_UNINT', 'Address', 'Pointer', 'Aster', 'Array', 'Aster']);
            break;
        case ('dbfloat'):
            block.getInput(inputName).setCheck(['DBPTR_FLOAT', 'Address', 'Pointer', 'Aster', 'Array', 'Aster']);
            break;
        case ('dbdouble'):
            block.getInput(inputName).setCheck(['DBPTR_DOUBLE', 'Address', 'Pointer', 'Aster', 'Array', 'Aster']);
            break;
        case ('dbchar'):
            block.getInput(inputName).setCheck(['DBPTR_CHAR', 'Address', 'Pointer', 'String', 'STR', 'CHAR', 'Array', 'Aster']);
            break;
        /*        default:
         block.getInput(inputName).setCheck(['String', 'Pointer', 'Array', 'Aster']);
         */    }
};

Blockly.Blocks.checkUnselect = function(content){
    if(content == '___EC_84_A0_ED_83_9D__' || content == '--Select--' || content == '___ED_83_80_EC_9E_85__' || content == '--Type--'){
        content = 'unselected';
    }
    return content;
}