
$(document).ready(function () {
   // console.log("this is workspace");
    var count_of_create_fired = 0;
    //alert(Blockly.Msg.TEXT_LENGTH_TITLE);
    var file_name_json = {};
    var Require_block, file_block;
   // $( "#panel-heading" ).click(function() {
     //   alert( "Handler for .click() called." );
   // });
    function myfunc() {
       $("#code_segment").empty();
    }
    var new_prog=document.getElementById("new_program");
    new_prog.addEventListener("click",myfunc);
//console.log(window.location.href.charAt((window.location.href.length)-1) );

     function update_code_div() {
         var codeDiv = document.getElementById('code_segment');
         var codeHolder = document.createElement('pre');
         codeHolder.className = 'prettyprint but-not-that-pretty';
         var code = document.createTextNode(Blockly['cake'].workspaceToCode(workspace));
        // console.log(code);
         codeHolder.appendChild(code);
       //  if(codeDiv.children.length>1)
         codeDiv.replaceChild(codeHolder, codeDiv.lastElementChild);
     }



    Blockly.Blocks['custom_input_channel'] = {
        init: function () {
         //   file_block = this;

            this.appendCstomInpChan("custom_block").setCheck(true)
                .appendField("InpChannel", "paho_chan").
            appendField(new
            Blockly.FieldImage("./google_blockly_old/media/dropdown.png", 8, 8, "V"));
            this.setCustomBlock(true);
            this.setRightOutput(true, 'Number');
            this.setLeftLineInput(true);
            this.setColour(120);
            //this.setCustomBlock(true);
           // this.setLineInput(true);
            //this.setRightOutput(true, 'Number');
            //console.lg(this);
           // this.set("custom_inp");
            //this.setOutput(true, 'Number');
            //this.setTooltip('');
            //this.setHelpUrl('http://www.example.com/');
        }
    };

    Blockly.Blocks['sh_input_channel'] = {
        init: function () {
            //file_block = this;

            this.appendSHInpChan("custom_block").setCheck(false).appendField("ShChannel", "sh_chan");
            this.setCustomBlock(true);
            this.setRightOutput(true, 'Number');
            this.setLeftInput(true);
            //this.setInputsInline(true);
            this.setColour(120);
            //console.log(this);
            //this.setRightOutput(true, 'Number');
            //this.setTooltip('');
            //this.setHelpUrl('http://www.example.com/');
        }
    };


    Blockly.Blocks['Max'] = {
        init: function () {
            file_block = this;

            this.appendSHInpChan("custom_block").setCheck(false).appendField("Max","max_info").appendField(new Blockly.FieldTextInput("    "), "CUstom_NAME");
            this.setCustomBlock(true);
            this.setRightOutput(true, 'Number');
            this.setLeftInput(true);
            //this.setInputsInline(true);
            this.setColour(120);
           // console.log(this);
            //this.setRightOutput(true, 'Number');
            this.setTooltip('hello');
            //this.setHelpUrl('http://www.example.com/');
        }
    };

    Blockly.Blocks['Min'] = {
        init: function () {
            file_block = this;

            this.appendSHInpChan("custom_block").setCheck(false).appendField("Min","min_info").appendField(new Blockly.FieldTextInput("    "), "CUstom_NAME");
            this.setCustomBlock(true);
            this.setRightOutput(true, 'Number');
            this.setLeftInput(true);
            //this.setInputsInline(true);
            this.setColour(120);
           // console.log(this);
            //this.setRightOutput(true, 'Number');
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
                     this.setTooltip('dsgsdgsd');
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
   Blockly.Blocks['conditioner'] = {
       init : function () {
           var options = [['max', 'Max'], ['min', 'Min'],['floor','Floor'],['ceil','Ceil'],['sin','Sin'],['cos','Cos'],['tan','Tan']];
           this.appendValueInput("sense_conditioner").appendField(new Blockly.FieldDropdown(options), 'sense_condition')
               .appendField(new Blockly.FieldTextInput(""), "stat_inp");
           this.setOutput(true,'Number');
           this.senseBlock(true);
           this.setColour(85);
           this.setLeftVerticalLen(8);

       }
   };
   Blockly.Blocks['Input_Channel'] ={
       init : function () {
           this.appendValueInput("custom_block").setCheck(true)
               .appendField("InpChannel", "paho_chan");
           this.setOutput(true);
           this.senseBlock(true);
           this.setColour(65);
         //  this.setLeftVerticalLen(8);
           this.setRightLineInput(true);
           this.setLeftVerticalLen(8);
       }
   };
   Blockly.Blocks['Output_Channel']= {
       init: function () {
           //Require_block=this;
           this.appendValueInput("Req")
               .setCheck(null)
               .appendField("OUtchannel", "res");
           //this.setInputsInline(false);
           this.setLeftLineOutput(true);
           this.senseBlock(true);
           this.setOutput(true);
           this.setColour(65);
           this.setLeftVerticalLen(9);
           this.setTooltip('dsgsdgsd');
           //this.setHelpUrl('http://www.example.com/');
       }
   };
   // file_block = Blockly.Blocks['custom_input_channel'];
    Blockly.JavaScript['file_name'] = function () {
        var code = '../n';
        return code;
    };
    Blockly.JavaScript['file_text_name'] = function () {
        var code = '../n';
        return code;
    };

    //console.lg(workspace);
   // var input_channel_param=window.location.href.substr(window.location.href.indexOf("=")+1);
    //console.log(input_channel_param);

 //  var diff_x=0,diff_y=40,orig_x=350,orig_y=100;
//for(var block_gen_idx=0;block_gen_idx<input_channel_param;block_gen_idx++){
   // var parentBlock = workspace.newBlock('Input_Channel');
    //parentBlock.x=12;
    //parentBlock.y=14;
 //   parentBlock.moveBy(orig_x,orig_y);
 //   parentBlock.initSvg();
  ///  parentBlock.render();
   // orig_x+=diff_x;
   // orig_y+=diff_y;
//}

    //parentBlock.setMovable(false);

   // console.log(parentBlock.getRelativeToSurfaceXY());
Blockly.cake['Input_Channel'] = function () {
    var code = 'Channel inp_1';
    return code;
};
Blockly.cake['Output_Channel'] = function () {
    var code = 'Channel out_1';

    return code;
};
Blockly.cake['conditioner']= function (block) {
   // var sub_str = Blockly.cake.variableDB_.getName(block.getFieldValue('VAR'),
     //   Blockly.Variables.NAME_TYPE);
    //sub_str = Blockly.Blocks.checkUnselect(sub_str);
    //console.log(block.getFieldValue('sense_condition'));
    var condtioner_func=Blockly.cake.variableDB_.getName(block.getFieldValue('sense_condition'),Blockly.VARIABLE_CATEGORY_NAME);
    //console.log(condtioner_func);
    var inp_val=block.getFieldValue('stat_inp');
   // if (inp_val) {
     //  console.log("val here");
   // }
if(!inp_val){
    inp_val="0";
}
    var code = condtioner_func+"(13,"+inp_val+")";
    return code;
};

workspace.addChangeListener(update_code_div);
//ar new_button=document.getElementById("new_program");
//new_button.addEventListener("click");

});
