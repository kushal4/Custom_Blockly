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
 * @fileoverview Variable blocks for Blockly.

 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.variables');  // Deprecated.
goog.provide('Blockly.Constants.Variables');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * Should be the same as Blockly.Msg.VARIABLES_HUE.
 * @readonly
 */
Blockly.Constants.Variables.HUE = 330;
/** @deprecated Use Blockly.Constants.Variables.HUE */
Blockly.Blocks.variables.HUE = Blockly.Constants.Variables.HUE;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for variable getter.
  {
    "type": "variables_get",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
      }
    ],
    "output": null,
    "colour": "%{BKY_VARIABLES_HUE}",
    "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
    "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
    "extensions": ["contextMenu_variableSetterGetter"]
  }
  // Block for variable setter.



]);
var var_set_json={
    "type": "variables_set",
    "message0": "%{BKY_VARIABLES_SET}",
    "args0": [
        {
            "type": "field_variable",
            "name": "VAR",
            "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
        },
        {
            "type": "input_value",
            "name": "VALUE"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_VARIABLES_HUE}",
    "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
    "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
    "extensions": ["contextMenu_variableSetterGetter"]
}
Blockly.Blocks['variables_set']={
  init:function () {
      this.jsonInit(var_set_json);
  },
  onchange:function () {

      if(this.getChildren()[0]){
          console.log("parent set block changed");
          num_count=this.getChildren()[0].inputList.length;
          console.log(num_count);
      }

  }
}
var num_count;
var arr_Json=
    {
         "arr_count":"3",
        /*
        "message0":"%{BKY_VARIABLES_ARR}",
        "args0":[
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
            },
            {
                "type": "field_dropdown",
                "options": [
                    ["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"],
                    ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"]
                ],
                "name": "VAR_ARR"
            }
        ],
        */
        "colour": "%{BKY_VARIABLES_HUE}",
        "extensions": ["contextMenu_variableSetterGetter"]
    }
function dynam() {
    var options = [];
    //console.log(this.type);
    var now = Date.now();
    for (var i = 0; i < 7; i++) {
        options.push([String(new Date(now)).substring(0, 3), 'DAY' + i]);
        now += 24 * 60 * 60 * 1000;
    }
    console.log(this);
    console.log(this.arr_count);
    //console.log(options);
    return options;
}
// END JSON EXTRACT (Do not delete this comment.)
Blockly.Blocks['variables_arr'] = {
  count_arr:3,
  init: function () {
    //  this.setColour(Blockly.Blocks.lists.HUE);
      this.jsonInit(arr_Json);
      //this.updateDropDown_();
      this.setOutput(true);
     // this.setMutator()
      //var dyn_options=[];
     //this.arrcount_=3;
//console.log(this.count_arr);
      num_count=this.count_arr;
      var dyn_options=[
       ['0','0'],
        ['1','1']
       ];
      this.input= this.appendDummyInput('EMPTY').
      appendField(new Blockly.FieldVariable('%{BKY_VARIABLES_DEFAULT_NAME}'), 'VAR');
      var dropdown = new Blockly.FieldDropdown(this.dynamicOptions);
     // this.setFieldValue()

      this.input.appendField(dropdown,'VAR_ARR');
      //console.log("this is init");
     // console.log(dropdown);
     // this.appendDummyInput().
     // appendField(new Blockly.FieldVariable('%{BKY_VARIABLES_DEFAULT_NAME}'), 'VAR').

//this .updateDropDown_();
      //this.;
  },
    onchange:function(){
    // ThisBlock=this;
   // this.arr=4;
        //num_count=
    /*if(this.getField('VAR_ARR')){
        this.getField('VAR_ARR').setValidator(function(option) {
            ThisBlock.removeField('VAR_ARR');
            // console.log(this.input);
            var dyn_options=[];
            var arrCount_ = 3;
            console.log(arrCount_);
            for (var idx = 0; idx < arrCount_; idx++) {
                dyn_options.push([idx, idx]);
            }
           // console.log(dyn_options);
            var dropdown = new Blockly.FieldDropdown(dyn_options);
            //ThisBlock.getField('VAR_ARR').setVisible( false );
            ThisBlock.appendField(dropdown,'VAR_ARR');
            //ThisBlock.setFieldValue(dyn_options,'VAR_ARR');
        });
    }
    */
  //  console.log("changed overall");

    },
    dynamicOptions:function () {
//console.log(val);
        var options = [];
        console.log(this.count_arr);
       // var now = Date.now();
        for (var idx = 0; idx < num_count; idx++) {
            //options.push([String(new Date(now)).substring(0, 3), 'DAY' + i]);
            //now += 24 * 60 * 60 * 1000;
            options.push([String(idx),String(idx)]);
        }
        console.log(this);

        //console.log(options);
        return options;
    }
};
/**
 * Mixin to add context menu items to create getter/setter blocks for this
 * setter/getter.
 * Used by blocks 'variables_set' and 'variables_get'.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
     // console.log("came to setter variable");
    // Getter blocks have the option to create a setter block, and vice versa.
      //if(options.deleteOption.num_blocks>1){
      //  console.log("more than one block");
      //}
     // console.log(options);
    if (this.type === 'variables_get') {
      var opposite_type = 'variables_set';
      var contextMenuMsg = Blockly.Msg.VARIABLES_GET_CREATE_SET;
    } else {
      var opposite_type = 'variables_get';
      var contextMenuMsg = Blockly.Msg.VARIABLES_SET_CREATE_GET;

    }

   // console.log(this.getChildren()[0].type);
      if(this.getChildren()[0] !== undefined){
          if(this.getChildren()[0].type==='lists_create_with'){
              var option1 = {enabled: this.workspace.remainingCapacity() > 0};
              var name = this.getFieldValue('VAR');
              console.log(this.getChildren()[0]);
              var contextMenuArrMsg=Blockly.Msg.VARIABLES_GET_ARR;
              console.log(contextMenuArrMsg);
              option1.text = contextMenuArrMsg.replace('%1', name);
              var xmlField = goog.dom.createDom('field', null, name);
              xmlField.setAttribute('name', 'VAR');
              //
              var xmlBlock = goog.dom.createDom('block', null, xmlField);
              xmlBlock.setAttribute('type', 'variables_arr');
              option1.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
              options.push(option1);
          }
      }

    var option = {enabled: this.workspace.remainingCapacity() > 0};
    var name = this.getFieldValue('VAR');
    option.text = contextMenuMsg.replace('%1', name);
    var xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'VAR');
    //
    var xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', opposite_type);
     // console.log(xmlBlock);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    //console.log(options);

  }
};

Blockly.Extensions.registerMixin('contextMenu_variableSetterGetter',
  Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);
