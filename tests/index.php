<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Blockly Playground</title>
    <script src="../blockly_uncompressed.js"></script>
    <script src="../generators/python.js"></script>
    <script src="../generators/python/logic.js"></script>
    <script src="../generators/python/loops.js"></script>
    <script src="../generators/python/math.js"></script>
    <script src="../generators/python/text.js"></script>
    <script src="../generators/python/lists.js"></script>
    <script src="../generators/python/colour.js"></script>
    <script src="../generators/python/variables.js"></script>
    <script src="../generators/python/procedures.js"></script>
    <script src="../msg/messages.js"></script>
    <script src="../blocks/logic.js"></script>
    <script src="../blocks/loops.js"></script>
    <script src="../blocks/math.js"></script>
    <script src="../blocks/text.js"></script>
    <script src="../blocks/lists.js"></script>
    <script src="../blocks/colour.js"></script>
    <script src="../blocks/variables.js"></script>
    <script src="../blocks/procedures.js"></script>

    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/custom-dialog.js"></script>
    <script src="js/sense_custom_blocks.js"></script>
    <script src="js/python_gen_bl_code.js"></script>
    <script src="js/program_comp.js"></script>
    <link rel="stylesheet" href="css/jquery-ui.min.css">
    <link rel="stylesheet" href="css/sense_block.css">
    <script>
        'use strict';
        var workspace = null;
        var fakeDragStack = [];
        function start() {
            setBackgroundColor();
            // Parse the URL arguments.
            var match = location.search.match(/dir=([^&]+)/);
            var rtl = match && match[1] == 'rtl';
            // document.forms.options.elements.dir.selectedIndex = Number(rtl);
            var toolbox = getToolboxElement();
            //document.forms.options.elements.toolbox.selectedIndex =
            //  Number(toolbox.getElementsByTagName('category').length == 0);
            match = location.search.match(/side=([^&]+)/);
            var side = match ? match[1] : 'start';
            //document.forms.options.elements.side.value = side;
            // Create main workspace.
            workspace = Blockly.inject('blocklyDiv',
                {comments: true,
                    collapse: true,
                    disable: true,
                    grid:
                        {spacing: 25,
                            length: 3,
                            colour: '#ccc',
                            snap: true},
                    horizontalLayout: side == 'top' || side == 'bottom',
                    maxBlocks: Infinity,
                    media: '../media/',
                    oneBasedIndex: true,
                    readOnly: false,
                    rtl: rtl,
                    scrollbars: true,
                    toolbox: toolbox,
                    toolboxPosition: side == 'top' || side == 'start' ? 'start' : 'end',
                    zoom:
                        {controls: true,
                            wheel: true,
                            startScale: 1.0,
                            maxScale: 4,
                            minScale: .25,
                            scaleSpeed: 1.1}
                });
            // Restore previously displayed text.
        }
        function setBackgroundColor() {
            var lilac = '#d6d6ff';
            var currentPage = window.location.href;
            var regexFile = /^file[\S]*$/;
            if (regexFile.test(currentPage)) {
                document.getElementsByTagName('body')[0].style.backgroundColor = lilac;
            }
        }
        function getToolboxElement() {
            var match = location.search.match(/toolbox=([^&]+)/);
            return document.getElementById('toolbox-' + (match ? match[1] : 'categories'));
        }
        // Disable the "Import from XML" button if the XML is invalid.
        // Preserve text between page reloads.
    </script>

</head>
<body onload="start()">
<div id="blockly_header_controls">

    <button id="new_program" class="notext">New Program</button>
    <button id="trashButton" class="notext" title="Delete blocks from Workspace">
        <img src="../media/1x1.gif" class="trash icon21">
    </button>
    <button id="loadButton" class="notext" title="Load Block with id">
        <img src="../media/loading.png">
    </button>
    <button id="saveButton" class="notext" title="Save to Server">
        <img src="../media/1x1.gif" class="link icon21">
    </button>
</div>
<div id="main_container">
    <div id="blocklyDiv"></div>
    <div id="c_code_div" class="code_main">
        <div class="panel-heading">
            <h3 class="panel-title">Code</h3>
        </div>
        <div id="code_segment" class="panel-body pre-scrollable">
            <pre class="prettyprint but-not-that-pretty"></pre>
        </div>
    </div>
</div>
<div id="loadXml" class="load_dialog" title="Program Name to Load Block">
    <select id="program_name_list">

    </select>
    <img  class="modal">
</div>
<div id="saveXml" class="save_dialog" title="Save Program Name">
    <input id="save_to_program_name" type="text">
    <br>
    <select id="load_program_list">

    </select>
    <img  class="modal">
</div>
<xml id="toolbox-simple" style="display: none">
    <block type="controls_ifelse"></block>
    <block type="logic_compare"></block>
    <block type="control_repeat"></block>
    <block type="logic_operation"></block>
    <block type="controls_repeat_ext">
        <value name="TIMES">
            <shadow type="math_number">
                <field name="NUM">10</field>
            </shadow>
        </value>
    </block>
    <block type="logic_operation"></block>
    <block type="logic_negate"></block>
    <block type="logic_boolean"></block>
    <block type="logic_null" disabled="true"></block>
    <block type="logic_ternary"></block>
</xml>

<xml id="toolbox-categories" style="display: none">
    <category name="Logic" colour="210">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null" disabled="true"></block>
        <block type="logic_ternary"></block>
    </category>
    <category name="Loops" colour="120">
        <block type="controls_repeat_ext">
            <value name="TIMES">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="controls_whileUntil"></block>
        <block type="controls_for">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
            <value name="BY">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="controls_forEach"></block>
        <block type="controls_flow_statements"></block>
    </category>
    <category name="Math" colour="230">
        <block type="math_number" gap="32"></block>
        <block type="math_arithmetic">
            <value name="A">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="B">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="math_representation">
            <value name="A">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="sense_B">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="math_random">
            <value name="A">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="math_single">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">9</field>
                </shadow>
            </value>
        </block>
        <block type="math_trig">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">45</field>
                </shadow>
            </value>
        </block>
        <block type="math_angular">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">45</field>
                </shadow>
            </value>
        </block>
        <block type="math_constant"></block>
        <block type="math_number_property">
            <value name="NUMBER_TO_CHECK">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="math_round">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">3.1</field>
                </shadow>
            </value>
        </block>
        <block type="math_on_list"></block>
        <block type="math_modulo">
            <value name="DIVIDEND">
                <shadow type="math_number">
                    <field name="NUM">64</field>
                </shadow>
            </value>
            <value name="DIVISOR">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="math_constrain">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="LOW">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="HIGH">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="math_random_int">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="math_random_float"></block>
        <block type="lists_create_with"></block>
    </category>
    <sep></sep>
    <category name="sense_iot" colour="220">
        <block type="conditioner"></block>
        <block type="Input_Channel"></block>
        <block type="Output_Channel"></block>
    </category>
    <sep></sep>
    <category name="Variables" colour="330" custom="VARIABLE"></category>
    <category name="Functions" custom="PROCEDURE">
        <block type="procedures_defnoreturn"></block>
        <block type="procedures_defreturn"></block>
        <block type="procedures_ifreturn"></block>
    </category>
</xml>
</body>
</html>