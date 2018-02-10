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



