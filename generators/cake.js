/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Helper functions for generating cake for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.cake');

goog.require('Blockly.Generator');


/**
 * cake code generator.
 * @type {!Blockly.Generator}
 */
Blockly.cake = new Blockly.Generator('cake');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.cake.C_VARIABLE_TYPES =
    [['float', 'float'],
        ['int', 'int'],
        ['unsigned int', 'unsigned int'],
        ['short', 'short'],
        ['unsigned short', 'unsigned short'],
        ['bool', 'bool']];

Blockly.cake.C_GLOBAL_VARS = [];

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.cake.addReservedWords(
    ',alignas,alignof,and,and_eq,asm,auto,bitand,bitor,bool,break,case,catch,char,char16_t,char32_t,class,compl,const,constexpr,const_cast,continue,decltype,default,delete,do,double,dynamic_cast,else,enum,explicit,export,extern,false,float,for,friend,goto,if,inline,int,long,long double,long long,mutable,namespace,new,noexcept,not,not_eq,nullptr,operator,or,or_eq,private,protected,public,register,reinterpret_cast,return,short,signed,sizeof,static,static_assert,static_cast,struct,switch,template,this,thread_local,throw,true,try,typedef,typeid,typename,union,unsigned,using,virtual,void,volatile,wchar_t,while,xor,xor_eq,posix,'
    // http://en.cppreference.com/w/cpp/keyword
    + 'game,api,PI,PI2,PI3,PI4,DEG2RAD,RAD2DEG,ZRMS,ZR2D,ZR3D,ALLIANCE' //TODO: add ZR #defines to list
);
/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/cake/Reference/Operators/Operator_Precedence
 */
Blockly.cake.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.cake.ORDER_NEW = 1.1;            // new
Blockly.cake.ORDER_MEMBER = 1.2;         // . []
Blockly.cake.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.cake.ORDER_INCREMENT = 3;        // ++
Blockly.cake.ORDER_DECREMENT = 3;        // --
Blockly.cake.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.cake.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.cake.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.cake.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.cake.ORDER_TYPEOF = 4.5;         // typeof
Blockly.cake.ORDER_VOID = 4.6;           // void
Blockly.cake.ORDER_DELETE = 4.7;         // delete
Blockly.cake.ORDER_DIVISION = 5.1;       // /
Blockly.cake.ORDER_MULTIPLICATION = 5.2; // *
Blockly.cake.ORDER_MODULUS = 5.3;        // %
Blockly.cake.ORDER_SUBTRACTION = 6.1;    // -
Blockly.cake.ORDER_ADDITION = 6.2;       // +
Blockly.cake.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.cake.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.cake.ORDER_IN = 8;               // in
Blockly.cake.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.cake.ORDER_EQUALITY = 9;         // == != === !==
Blockly.cake.ORDER_BITWISE_AND = 10;     // &
Blockly.cake.ORDER_BITWISE_XOR = 11;     // ^
Blockly.cake.ORDER_BITWISE_OR = 12;      // |
Blockly.cake.ORDER_LOGICAL_AND = 13;     // &&
Blockly.cake.ORDER_LOGICAL_OR = 14;      // ||
Blockly.cake.ORDER_CONDITIONAL = 15;     // ?:
Blockly.cake.ORDER_ASSIGNMENT = 16;      // = += -= *= /= %= <<= >>= ...
Blockly.cake.ORDER_COMMA = 17;           // ,
Blockly.cake.ORDER_NONE = 99;            // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.cake.ORDER_OVERRIDES = [
    // (foo()).bar -> foo().bar
    // (foo())[0] -> foo()[0]
    [Blockly.cake.ORDER_FUNCTION_CALL, Blockly.cake.ORDER_MEMBER],
    // (foo())() -> foo()()
    [Blockly.cake.ORDER_FUNCTION_CALL, Blockly.cake.ORDER_FUNCTION_CALL],
    // (foo.bar).baz -> foo.bar.baz
    // (foo.bar)[0] -> foo.bar[0]
    // (foo[0]).bar -> foo[0].bar
    // (foo[0])[1] -> foo[0][1]
    [Blockly.cake.ORDER_MEMBER, Blockly.cake.ORDER_MEMBER],
    // (foo.bar)() -> foo.bar()
    // (foo[0])() -> foo[0]()
    [Blockly.cake.ORDER_MEMBER, Blockly.cake.ORDER_FUNCTION_CALL],

    // !(!foo) -> !!foo
    [Blockly.cake.ORDER_LOGICAL_NOT, Blockly.cake.ORDER_LOGICAL_NOT],
    // a * (b * c) -> a * b * c
    [Blockly.cake.ORDER_MULTIPLICATION, Blockly.cake.ORDER_MULTIPLICATION],
    // a + (b + c) -> a + b + c
    [Blockly.cake.ORDER_ADDITION, Blockly.cake.ORDER_ADDITION],
    // a && (b && c) -> a && b && c
    [Blockly.cake.ORDER_LOGICAL_AND, Blockly.cake.ORDER_LOGICAL_AND],
    // a || (b || c) -> a || b || c
    [Blockly.cake.ORDER_LOGICAL_OR, Blockly.cake.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.cake.init = function(workspace) {
    // Create a dictionary of definitions to be printed before the code.
    Blockly.cake.definitions_ = Object.create(null);
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    Blockly.cake.functionNames_ = Object.create(null);

    if (!Blockly.cake.variableDB_) {
        Blockly.cake.variableDB_ =
            new Blockly.Names(Blockly.cake.RESERVED_WORDS_);
    } else {
        Blockly.cake.variableDB_.reset();
    }

    var defvars = [];
    var variables = workspace.getAllVariables();
    //console.log(variables);
    if (variables.length) {
        for (var i = 0; i < variables.length; i++) {
            defvars[i] = Blockly.cake.variableDB_.getName(variables[i].name,
                Blockly.Variables.NAME_TYPE);
        }
       // Blockly.cake.definitions_['variables'] = defvars.join('\n');
    }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.cake.finish = function(code) {
    // Convert the definitions dictionary into a list.
    var definitions = [];
    for (var name in Blockly.cake.definitions_) {
        definitions.push(Blockly.cake.definitions_[name]);
    }
    // Clean up temporary data.
    delete Blockly.cake.definitions_;
    delete Blockly.cake.functionNames_;
    Blockly.cake.variableDB_.reset();
    return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.cake.scrubNakedValue = function(line) {
    return line + ';\n';
};

/**
 * Encode a string as a properly escaped cake string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} cake string.
 * @private
 */
Blockly.cake.quote_ = function(string) {
    // Can't use goog.string.quote since Google's style guide recommends
    // JS string literals use single quotes.
    string = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n')
        .replace(/'/g, '\\\'');
    return '\'' + string + '\'';
};

/**
 * Common tasks for generating cake from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The cake code created for this block.
 * @return {string} cake code with comments and subsequent blocks added.
 * @private
 */
Blockly.cake.scrub_ = function(block, code) {
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        comment = Blockly.utils.wrap(comment, Blockly.cake.COMMENT_WRAP - 3);
        if (comment) {
            if (block.getProcedureDef) {
                // Use a comment block for function comments.
                commentCode += '/**\n' +
                    Blockly.cake.prefixLines(comment + '\n', ' * ') +
                    ' */\n';
            } else {
                commentCode += Blockly.cake.prefixLines(comment + '\n', '// ');
            }
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.cake.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Blockly.cake.prefixLines(comment, '// ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = Blockly.cake.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.cake.getAdjusted = function(block, atId, opt_delta, opt_negate,
                                          opt_order) {
    var delta = opt_delta || 0;
    var order = opt_order || Blockly.cake.ORDER_NONE;
    if (block.workspace.options.oneBasedIndex) {
        delta--;
    }
    var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
    if (delta > 0) {
        var at = Blockly.cake.valueToCode(block, atId,
            Blockly.cake.ORDER_ADDITION) || defaultAtIndex;
    } else if (delta < 0) {
        var at = Blockly.cake.valueToCode(block, atId,
            Blockly.cake.ORDER_SUBTRACTION) || defaultAtIndex;
    } else if (opt_negate) {
        var at = Blockly.cake.valueToCode(block, atId,
            Blockly.cake.ORDER_UNARY_NEGATION) || defaultAtIndex;
    } else {
        var at = Blockly.cake.valueToCode(block, atId, order) ||
            defaultAtIndex;
    }

    if (Blockly.isNumber(at)) {
        // If the index is a naked number, adjust it right now.
        at = parseFloat(at) + delta;
        if (opt_negate) {
            at = -at;
        }
    } else {
        // If the index is dynamic, adjust it in code.
        if (delta > 0) {
            at = at + ' + ' + delta;
            var innerOrder = Blockly.cake.ORDER_ADDITION;
        } else if (delta < 0) {
            at = at + ' - ' + -delta;
            var innerOrder = Blockly.cake.ORDER_SUBTRACTION;
        }
        if (opt_negate) {
            if (delta) {
                at = '-(' + at + ')';
            } else {
                at = '-' + at;
            }
            var innerOrder = Blockly.cake.ORDER_UNARY_NEGATION;
        }
        innerOrder = Math.floor(innerOrder);
        order = Math.floor(order);
        if (innerOrder && order >= innerOrder) {
            at = '(' + at + ')';
        }
    }
    return at;
};
