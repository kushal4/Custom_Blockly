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
 * @fileoverview Math blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.math');  // Deprecated
goog.provide('Blockly.Constants.Math');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * Should be the same as Blockly.Msg.MATH_HUE
 * @readonly
 */
Blockly.Constants.Math.HUE = 230;
/** @deprecated Use Blockly.Constants.Math.HUE */
Blockly.Blocks.math.HUE = Blockly.Constants.Math.HUE;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for numeric value.
  {
    "type": "math_number",
    "message0": "%1",
    "args0": [{
      "type": "field_number",
      "name": "NUM",
      "value": 0
    }],
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "helpUrl": "%{BKY_MATH_NUMBER_HELPURL}",
    "tooltip": "%{BKY_MATH_NUMBER_TOOLTIP}",
    "extensions": ["parent_tooltip_when_inline"]
  },

  // Block for basic arithmetic operator.
  {
    "type": "math_arithmetic",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
          ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
          ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
          ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
            ["%{BKY_MATH_NUM_DIVISION_SYMBOL}", "NUMDIVIDE"],
                ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    "extensions": ["math_op_tooltip"]
  },

  // Block for advanced math operators with single operand.
  {
    "type": "math_single",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_SINGLE_OP_ROOT}", 'ROOT'],
          ["%{BKY_MATH_SINGLE_OP_ABSOLUTE}", 'ABS'],
          ['-', 'NEG'],
          ['ln', 'LN'],
            ['log1p','LOG1P'],
          ['log10', 'LOG10'],
          ['e^', 'EXP'],
            ['e^x -1','EXPM1'],
          ['10^', 'POW10']
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "helpUrl": "%{BKY_MATH_SINGLE_HELPURL}",
    "extensions": ["math_op_tooltip"]
  },

  // Block for trigonometry operators.
  {
    "type": "math_trig",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_TRIG_SIN}", "SIN"],
          ["%{BKY_MATH_TRIG_COS}", "COS"],
          ["%{BKY_MATH_TRIG_TAN}", "TAN"],
          ["%{BKY_MATH_TRIG_ASIN}", "ASIN"],
          ["%{BKY_MATH_TRIG_ACOS}", "ACOS"],
          ["%{BKY_MATH_TRIG_ATAN}", "ATAN"],
            ["%{BKY_MATH_TRIG_ATAN2}", "ATAN2"],
            ["%{BKY_MATH_TRIG_HYPOT}", "HYPOT"]
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "helpUrl": "%{BKY_MATH_TRIG_HELPURL}",
      "mutator": "math_is_divisibleby_mutator",
    "extensions": ["math_op_tooltip"]
  },

  // Block for constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  {
    "type": "math_constant",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "CONSTANT",
        "options": [
          ["\u03c0", "PI"],
          ["e", "E"],
          ["\u03c6", "GOLDEN_RATIO"],
          ["sqrt(2)", "SQRT2"],
          ["sqrt(\u00bd)", "SQRT1_2"],
          ["\u221e", "INFINITY"]
        ]
      }
    ],
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "tooltip": "%{BKY_MATH_CONSTANT_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_CONSTANT_HELPURL}"
  },

  // Block for checking if a number is even, odd, prime, whole, positive,
  // negative or if it is divisible by certain number.
  {
    "type": "math_number_property",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "NUMBER_TO_CHECK",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "PROPERTY",
        "options": [
          ["%{BKY_MATH_IS_EVEN}", "EVEN"],
          ["%{BKY_MATH_IS_ODD}", "ODD"],
          ["%{BKY_MATH_IS_PRIME}", "PRIME"],
          ["%{BKY_MATH_IS_WHOLE}", "WHOLE"],
          ["%{BKY_MATH_IS_POSITIVE}", "POSITIVE"],
          ["%{BKY_MATH_IS_NEGATIVE}", "NEGATIVE"],
          ["%{BKY_MATH_IS_DIVISIBLE_BY}", "DIVISIBLE_BY"]
        ]
      }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": "%{BKY_MATH_HUE}",
    "tooltip": "%{BKY_MATH_IS_TOOLTIP}",
    "mutator": "math_is_divisibleby_mutator"
  },

  // Block for adding to a variable in place.
  {
    "type": "math_change",
    "message0": "%{BKY_MATH_CHANGE_TITLE}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_MATH_CHANGE_TITLE_ITEM}"
      },
      {
        "type": "input_value",
        "name": "DELTA",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_VARIABLES_HUE}",
    "helpUrl": "%{BKY_MATH_CHANGE_HELPURL}",
    "extensions": ["math_change_tooltip"]
  },

  // Block for rounding functions.
  {
    "type": "math_round",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ROUND_OPERATOR_ROUND}", "ROUND"],
          ["%{BKY_MATH_ROUND_OPERATOR_ROUNDUP}", "ROUNDUP"],
          ["%{BKY_MATH_ROUND_OPERATOR_ROUNDDOWN}", "ROUNDDOWN"]
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "helpUrl": "%{BKY_MATH_ROUND_HELPURL}",
    "tooltip": "%{BKY_MATH_ROUND_TOOLTIP}"
  },

  // Block for evaluating a list of numbers to return sum, average, min, max,
  // etc.  Some functions also work on text (min, max, mode, median).
  {
    "type": "math_on_list",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ONLIST_OPERATOR_SUM}", "SUM"],
          ["%{BKY_MATH_ONLIST_OPERATOR_MIN}", "MIN"],
          ["%{BKY_MATH_ONLIST_OPERATOR_MAX}", "MAX"],
          ["%{BKY_MATH_ONLIST_OPERATOR_AVERAGE}", "AVERAGE"],
          ["%{BKY_MATH_ONLIST_OPERATOR_MEDIAN}", "MEDIAN"],
          ["%{BKY_MATH_ONLIST_OPERATOR_MODE}", "MODE"],
          ["%{BKY_MATH_ONLIST_OPERATOR_STD_DEV}", "STD_DEV"],
          ["%{BKY_MATH_ONLIST_OPERATOR_RANDOM}", "RANDOM"]
        ]
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "helpUrl": "%{BKY_MATH_ONLIST_HELPURL}",
    "mutator": "math_modes_of_list_mutator",
    "extensions": ["math_op_tooltip"]
  },

  // Block for remainder of a division.
  {
    "type": "math_modulo",
    "message0": "%{BKY_MATH_MODULO_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "DIVIDEND",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "DIVISOR",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "tooltip": "%{BKY_MATH_MODULO_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_MODULO_HELPURL}"
  },

  // Block for constraining a number between two limits.
  {
    "type": "math_constrain",
    "message0": "%{BKY_MATH_CONSTRAIN_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "LOW",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "HIGH",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "tooltip": "%{BKY_MATH_CONSTRAIN_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_CONSTRAIN_HELPURL}"
  },

  // Block for random integer between [X] and [Y].
  {
    "type": "math_random_int",
    "message0": "%{BKY_MATH_RANDOM_INT_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "FROM",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "TO",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "tooltip": "%{BKY_MATH_RANDOM_INT_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_RANDOM_INT_HELPURL}"
  },

  // Block for random integer between [X] and [Y].
  {
    "type": "math_random_float",
    "message0": "%{BKY_MATH_RANDOM_FLOAT_TITLE_RANDOM}",
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "tooltip": "%{BKY_MATH_RANDOM_FLOAT_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_RANDOM_FLOAT_HELPURL}"
  },
    {
        "type":"math_random",
        "message0": "%1 %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PROPERTY",
                "options": [
                    ["%{BKY_MATH_RAND_SHUFFLE}", "SHUFFLE"],
                    ["%{BKY_MATH_RAND_UNIFORM}", "UNIFORM"],
                    ["%{BKY_MATH_RAND_TRIANGULAR}", "TRIANGULAR"],
                    ["%{BKY_MATH_RAND_BETAVARIATE}", "BETAVARIATE"],
                    ["%{BKY_MATH_RAND_EXPOVARIATE}", "EXPOVARIATE"],
                    ["%{BKY_MATH_RAND_GAMMAVARIATE}", "GAMMAVARIATE"],
                    ["%{BKY_MATH_RAND_GAUSS}","GAUSS"],
                    ["%{BKY_MATH_RAND_LOGNORMVARIATE}","LOGNORMVARIATE"],
                    ["%{BKY_MATH_RAND_NORMALVARIATE}","NORMALVARIATE"],
                    ["%{BKY_MATH_RAND_VONMISESVARIATE}","VONMISESVARIATE"],
                    ["%{BKY_MATH_RAND_PARETOVARIATE}","PARETOVARIATE"],
                    ["%{BKY_MATH_RAND_WEIBULLVARIATE}","WEIBULLVARIATE"]
                ]
            },
            {
              "type":"input_value",
                "name":"A",
                "check": "Number"
            }
        ],
        "output": "Number",
        "inputsInline":true,
        "mutator":"random_arg_mutator",
        "colour": "%{BKY_MATH_HUE}"

    },
    {
      "type":"math_representation",
        "message0": "%1 %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PROPERTY",
                "options": [
                    ["%{BKY_MATH_OPERATOR_FLOOR}", "FLOOR"],
                    ["%{BKY_MATH_OPERATOR_CIEL}", "CIEL"],
                    ["%{BKY_MATH_OPERATOR_FACTORIAL}", "FACTORIAL"],
                    ["%{BKY_MATH_OPERATOR_COPYSIGN}", "COPYSIGN"],
                    ["%{BKY_MATH_OPERATOR_ERF}", "ERF"],
                    ["%{BKY_MATH_OPERATOR_ERFC}", "ERFC"],
                    ["%{BKY_MATH_OPERATOR_GAMMA}","GAMMA"],
                    ["%{BKY_MATH_OPERATOR_LGAMMA}","LGAMMA"],
                    ["%{BKY_MATH_OPERATOR_FMOD}","FMOD"],
                    ["%{BKY_MATH_OPERATOR_FREXP}","FREXP"],
                    ["%{BKY_MATH_OPERATOR_ISNAN}","ISNAN"],
                    ["%{BKY_MATH_OPERATOR_ISINF}","ISINF"],
                    ["%{BKY_MATH_OPERATOR_LDEXP}","LDEXP"],
                    ["%{BKY_MATH_OPERATOR_POW}","POW"],
                    ["%{BKY_MATH_OPERATOR_GCD}","GCD"],
                    ["%{BKY_MATH_OPERATOR_ISCLOSE}","ISCLOSE"],
                    ["%{BKY_MATH_OPERATOR_TRUNC}","TRUNC"]
                ]
            },
            {
                "type":"input_value",
                "name":"A",
                "check": "Number"
            }
        ],
        "output": "Number",
        "inputsInline":true,
        "mutator":"math_is_divisibleby_mutator",
        "colour": "%{BKY_MATH_HUE}"
    }
]);  // END JSON EXTRACT (Do not delete this comment.)

/**
 * Mapping of math block OP value to tooltip message for blocks
 * math_arithmetic, math_simple, math_trig, and math_on_lists.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.Math.TOOLTIPS_BY_OP = {
  // math_arithmetic
  'ADD': '%{BKY_MATH_ARITHMETIC_TOOLTIP_ADD}',
  'MINUS': '%{BKY_MATH_ARITHMETIC_TOOLTIP_MINUS}',
  'MULTIPLY': '%{BKY_MATH_ARITHMETIC_TOOLTIP_MULTIPLY}',
  'DIVIDE': '%{BKY_MATH_ARITHMETIC_TOOLTIP_DIVIDE}',
    'NUMDIVIDE': '%{BKY_MATH_ARITHMETIC_TOOLTIP_NUM_DIVIDE}',
  'POWER': '%{BKY_MATH_ARITHMETIC_TOOLTIP_POWER}',

  // math_simple
  'ROOT': '%{BKY_MATH_SINGLE_TOOLTIP_ROOT}',
  'ABS': '%{BKY_MATH_SINGLE_TOOLTIP_ABS}',
  'NEG': '%{BKY_MATH_SINGLE_TOOLTIP_NEG}',
  'LN': '%{BKY_MATH_SINGLE_TOOLTIP_LN}',
  'LOG10': '%{BKY_MATH_SINGLE_TOOLTIP_LOG10}',
    'LOG1P':'%{BKY_MATH_SINGLE_TOOLTIP_LOG10}',
  'EXP': '%{BKY_MATH_SINGLE_TOOLTIP_EXP}',
    'EXPM1':'%{BKY_MATH_SINGLE_TOOLTIP_EXP}',
  'POW10': '%{BKY_MATH_SINGLE_TOOLTIP_POW10}',

  // math_trig
  'SIN': '%{BKY_MATH_TRIG_TOOLTIP_SIN}',
  'COS': '%{BKY_MATH_TRIG_TOOLTIP_COS}',
  'TAN': '%{BKY_MATH_TRIG_TOOLTIP_TAN}',
  'ASIN': '%{BKY_MATH_TRIG_TOOLTIP_ASIN}',
  'ACOS': '%{BKY_MATH_TRIG_TOOLTIP_ACOS}',
  'ATAN': '%{BKY_MATH_TRIG_TOOLTIP_ATAN}',
    'ATAN2':'%{BKY_MATH_TRIG_TOOLTIP_ATAN2}',
    'HYPOT':'%{BKY_MATH_TRIG_TOOLTIP_HYPOT}',
    'SUM': '%{BKY_MATH_ONLIST_TOOLTIP_SUM}',
  'MIN': '%{BKY_MATH_ONLIST_TOOLTIP_MIN}',
  'MAX': '%{BKY_MATH_ONLIST_TOOLTIP_MAX}',
  'AVERAGE': '%{BKY_MATH_ONLIST_TOOLTIP_AVERAGE}',
  'MEDIAN': '%{BKY_MATH_ONLIST_TOOLTIP_MEDIAN}',
  'MODE': '%{BKY_MATH_ONLIST_TOOLTIP_MODE}',
  'STD_DEV': '%{BKY_MATH_ONLIST_TOOLTIP_STD_DEV}',
  'RANDOM': '%{BKY_MATH_ONLIST_TOOLTIP_RANDOM}'
};

Blockly.Extensions.register('math_op_tooltip',
  Blockly.Extensions.buildTooltipForDropdown(
    'OP', Blockly.Constants.Math.TOOLTIPS_BY_OP));


/**
 * Mixin for mutator functions in the 'math_is_divisibleby_mutator'
 * extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Math.IS_DIVISIBLEBY_MUTATOR_MIXIN = {
  /**
   * Create XML to represent whether the 'divisorInput' should be present.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var two_arg_val_arr=["DIVISIBLE_BY","ATAN2","HYPOT","FMOD"
        ,"COPYSIGN","POW","GCD","ISCLOSE"];
    var field_prop;
      if(this.getField('PROPERTY')){
          field_prop='PROPERTY';
      }else{
          field_prop='OP';
      }
      var option=this.getFieldValue(field_prop);
    var container = document.createElement('mutation');
    var divisorInput = two_arg_val_arr.includes(option);
    container.setAttribute('divisor_input', divisorInput);
   // console.log(divisorInput);
    return container;
  },
  /**
   * Parse XML to restore the 'divisorInput'.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
    this.updateShape_(divisorInput);
  },
  /**
   * Modify this block to have (or not have) an input for 'is divisible by'.
   * @param {boolean} divisorInput True if this block has a divisor input.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function(divisorInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('DIVISOR');
   // console.log(inputExists);
    if (divisorInput) {
      if (!inputExists) {
        this.appendValueInput('DIVISOR')
            .setCheck('Number');
      }
    } else if (inputExists) {
      this.removeInput('DIVISOR');
    }
  }
};

/**
 * 'math_is_divisibleby_mutator' extension to the 'math_property' block that
 * can update the block shape (add/remove divisor input) based on whether
 * property is "divisble by".
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.Math.IS_DIVISIBLE_MUTATOR_EXTENSION = function() {
  //console.log('mutator fired here');
  var field_prop;
    var two_arg_val_arr=["DIVISIBLE_BY","ATAN2","HYPOT","FMOD"
        ,"COPYSIGN","POW","GCD","ISCLOSE"];
  if(this.getField('PROPERTY')){
    field_prop='PROPERTY';
  }else{
    field_prop='OP';
  }
  this.getField(field_prop).setValidator(function(option) {
    var divisorInput =two_arg_val_arr.includes(option);
    this.sourceBlock_.updateShape_(divisorInput);
  });
};

Blockly.Extensions.registerMutator('math_is_divisibleby_mutator',
  Blockly.Constants.Math.IS_DIVISIBLEBY_MUTATOR_MIXIN,
  Blockly.Constants.Math.IS_DIVISIBLE_MUTATOR_EXTENSION);

/**
 * Update the tooltip of 'math_change' block to reference the variable.
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.Math.CHANGE_TOOLTIP_EXTENSION = function() {
  this.setTooltip(function() {
    return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
        this.getFieldValue('VAR'));
  }.bind(this));
};

Blockly.Extensions.register('math_change_tooltip',
  Blockly.Extensions.buildTooltipWithFieldValue(
    Blockly.Msg.MATH_CHANGE_TOOLTIP, 'VAR'));

/**
 * Mixin with mutator methods to support alternate output based if the
 * 'math_on_list' block uses the 'MODE' operation.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Math.LIST_MODES_MUTATOR_MIXIN = {
  /**
   * Modify this block to have the correct output type.
   * @param {string} newOp Either 'MODE' or some op than returns a number.
   * @private
   * @this Blockly.Block
   */
  updateType_: function(newOp) {
    if (newOp === 'MODE') {
      this.outputConnection.setCheck('Array');
    } else {
      this.outputConnection.setCheck('Number');
    }
  },
  /**
   * Create XML to represent the output type.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('op', this.getFieldValue('OP'));
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.updateType_(xmlElement.getAttribute('op'));
  }
};

/**
 * Extension to 'math_on_list' blocks that allows support of
 * modes operation (outputs a list of numbers).
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.Math.LIST_MODES_MUTATOR_EXTENSION = function() {
  this.getField('OP').setValidator(function(newOp) {
    this.updateType_(newOp);
  }.bind(this));
};

Blockly.Extensions.registerMutator('math_modes_of_list_mutator',
  Blockly.Constants.Math.LIST_MODES_MUTATOR_MIXIN,
  Blockly.Constants.Math.LIST_MODES_MUTATOR_EXTENSION);

Blockly.Constants.Math.RANDOM_API_MUTATOR_MIXIN={

    mutationToDom:function () {
        var container = document.createElement('mutation');
        var two_arg_func=["UNIFORM","BETAVARIATE","GAMMAVARIATE","GAUSS",
            "LOGNORMVARIATE","NORMALVARIATE","VONMISESVARIATE","WEIBULLVARIATE"];
        var three_arg_func=["triangular"];
        var dropdown_val=this.getFieldValue('PROPERTY');
        var container_val=0;
       // var is_there=two_arg_func.includes(dropdown_val);
        if(two_arg_func.includes(dropdown_val)){
            container_val=2;
           // console.log(container_val);
        }else if(three_arg_func.includes(dropdown_val)){
             container_val=3;
        }
        //console.log(container_val);
        container.setAttribute("arg",container_val);
       // console.log(container);
        return container;
    },
    domToMutation:function (xmlElement) {
      console.log(xmlElement);
        var get_arg=xmlElement.getAttribute("arg");
        console.log("domtoMutation called"+get_arg);
        this.updateShape_(get_arg);
    },
    updateShape_:function (arg_param) {
        console.log("update shape called with arg parameter"+arg_param);
        var inputExists = this.getInput('TWO_ARG_BLOCK');
        var InputExists1 = this.getInput('THREE_ARG_BLOCK');
      //  console.log(InputExists1);
        console.log(inputExists);
        if(arg_param!==undefined){
       //   if(!InputExists1 && !inputExists){
           //console.log(arg_param);
            if(arg_param==2){
              console.log("came to 2 args");
              if(InputExists1){
             //   console.log("input 3 remove");
                  this.removeInput('THREE_ARG_BLOCK');
                  //this.removeInput('THREE_ARG_BLOCK');
              }
              if(inputExists==null){
                  this.appendValueInput('TWO_ARG_BLOCK')
                      .setCheck('Number');
              }

            }else if(arg_param==3){
             // if(){
                if(!inputExists){
                    this.appendValueInput('TWO_ARG_BLOCK')
                        .setCheck('Number');
                }

                  this.appendValueInput('THREE_ARG_BLOCK').setCheck('Number');
            //  }

              }
       //   }
        }else if(InputExists1){
        //  console.log("removed");
            this.removeInput('TWO_ARG_BLOCK');
            this.removeInput('THREE_ARG_BLOCK');
        }else if(inputExists){
            this.removeInput('TWO_ARG_BLOCK');
        }
       // console.log("end");
    }

};
Blockly.Constants.Math.RANDOM_API_MUTATOR_EXTENSION = function() {
    //console.log('mutator fired here');
    var field_prop;
    if(this.getField('PROPERTY')){
        field_prop='PROPERTY';
    }else{
        field_prop='OP';
    }
    this.getField(field_prop).setValidator(function(option) {
      var ret_arg_code;
        var two_arg_func=["UNIFORM","BETAVARIATE","GAMMAVARIATE","GAUSS",
            "LOGNORMVARIATE","NORMALVARIATE","VONMISESVARIATE","WEIBULLVARIATE"];
        if(two_arg_func.includes(option)){
          ret_arg_code=2;
        }else if(option==="TRIANGULAR"){
          ret_arg_code=3;
        }
      //  console.log(ret_arg_code);
        this.sourceBlock_.updateShape_(ret_arg_code);
    });
};
Blockly.Extensions.registerMutator('random_arg_mutator'
    ,Blockly.Constants.Math.RANDOM_API_MUTATOR_MIXIN,
    Blockly.Constants.Math.RANDOM_API_MUTATOR_EXTENSION);
