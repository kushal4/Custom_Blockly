
$(document).ready(function () {
    var count_of_create_fired = 0;
    //alert(Blockly.Msg.TEXT_LENGTH_TITLE);
    var file_name_json = {};
    var Require_block, file_block;



    Blockly.Blocks['custom_input_channel'] = {
        init: function () {
            file_block = this;

            this.appendCstomInpChan("custom_block").setCheck(true).appendField("InpChannel", "paho_chan");
            this.setColour(120);
            this.setRightOutput(true, 'Number');
            //console.log(this);
           // this.set("custom_inp");
            //this.setOutput(true, 'Number');
            //this.setTooltip('');
            //this.setHelpUrl('http://www.example.com/');
        }
    };
    Blockly.Blocks['sh_input_channel'] = {
        init: function () {
            file_block = this;

            this.appendSHInpChan("custom_block").setCheck(false).appendField("ShChannel", "sh_chan");
            //this.setInputsInline(true);
            this.setColour(120);
            this.setRightOutput(true, 'Number');
            //this.setTooltip('');
            //this.setHelpUrl('http://www.example.com/');
        }
    };


         Blockly.Blocks['require_file'] = {
                init: function () {
                    //Require_block=this;
                    this.appendValueInput("Req")
                        .setCheck(null)
                        .appendField("Require", "res");
                    this.setInputsInline(false);
                    this.setOutput(true, 'Number');
                    this.setColour(65);
                    // this.setTooltip('');
                    //this.setHelpUrl('http://www.example.com/');
                }
            };
    //Require_block = Blockly.Blocks['require_file'];
    Blockly.JavaScript['require_file'] = function (block) {
        // String or array length.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
            Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
        return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
    };

    /* Blockly.Blocks['custom_input_channel'] = {
          init: function () {
              file_block = this;
              this.appendDummyInput("custom_block").appendField("Input_channel", "paho_chan");
              this.setColour(120);
              this.setTooltip('');
              this.setHelpUrl('http://www.example.com/');
          }
      };
  */
   /* Blockly.Blocks['file_name'] = {
        init: function () {
            file_block = this;
            this.appendCustomInput("custom_block").appendField(new Blockly.FieldTextInput("<    >"), "CUstom_NAME");
            this.setOutput(true, null);
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };
*/
    file_block = Blockly.Blocks['custom_input_channel'];
    Blockly.JavaScript['file_name'] = function () {
        var code = '../n';
        return code;
    }
    Blockly.JavaScript['file_text_name'] = function () {
        var code = '../n';
        return code;
    }
  //  var joined_block = Blockly.Blocks['join_blocks'];
   // console.log(joined_block);
  //  Blockly.JavaScript['join_blocks'] = function () {
    //    var code = '.../n';
     //   return code;
   // }


    var selected_file_name_value;
  //  var workspace = Blockly.inject('blocklyDiv', //this  includes the workspace inside the blocklydiv
     //   {toolbox: document.getElementById('toolbox')});
    //var defaultBlocks = document.getElementById('blocklyDefault');
   /// Blockly.Xml.domToWorkspace(defaultBlocks, workspace);
    // var parentBlock = Blockly.Block.obtain(Blockly.getMainWorkspace(), 'require_file');
    // parentBlock.initSvg();
    // parentBlock.render();

    // var childBlock = Blockly.Block.obtain(Blockly.getMainWorkspace(), 'file_name');
    //childBlock.setFieldValue('Hello', 'TEXT');
    //  childBlock.initSvg();
    // childBlock.render();

    //parentConnection.connect(childConnection);
    /// var parentConnection = parentBlock.getInput('req');
    // console.log(parentConnection);
    //console.log(parentBlock);
    Blockly.mainWorkspace.clear();//clear the workspace if any code is present at the start
    // var parentBlock = Blockly.Block.obtain(Blockly.getMainWorkspace(), 'require_file');
    // parentBlock.initSvg();
    //  parentBlock.render();

    //  var childBlock = Blockly.Block.obtain(Blockly.getMainWorkspace(), 'file_name');
    //  childBlock.initSvg();
    //childBlock.setFieldValue('program_name', '');
    //  childBlock.render();
    //console.log(childBlock);
    // var parentConnection = parentBlock.getInput('Req').connection;
    // var childConnection = childBlock.outputConnection;
    // parentConnection.connect(childConnection);
    //  // console.log(Require_block.nextConnection);
    //console.log(file_block);
    // Require_block.nextConnection.connect(file_block.previousConnection);
    //$('#languageDropdown').change(myUpdateFunction);


});