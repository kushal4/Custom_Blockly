
$(document).ready(function () {
   // console.log("this is workspace");
    var count_of_create_fired = 0;
    //alert(Blockly.Msg.TEXT_LENGTH_TITLE);
    var file_name_json = {};
    var Require_block, file_block;
    var check_multi_inp=false;
   // $( "#panel-heading" ).click(function() {
     //   alert( "Handler for .click() called." );
   // });

//Blockly.Constants.Math.MUTATOR_MIXING={
   // update:function () {
     //   console.log("updated");
   // }
//};



/*

    Blockly.Blocks['math_representation']={
        init: function() {
            var math_rep_type= [
                ["floor","FLOOR"],
                ["ciel","CIEL"],
                ["factorial","FACTORIAL"],
                ["copysign","COPYSIGN"],
                ["erf","ERF"],
                ["erfc","ERFC"],
                ["gamma","GAMMA"],
                ["lgamma","LGAMMA"],
                ["fmod","FMOD"],
                ["frexp","FREXP"],
                ["isnan","ISNAN"],
                ["isinf","ISINF"],
                ["ldexp","LDEXP"],
                ["pow","POW"],
                ["gcd","GCD"],
                ["isclose","ISCLOSE"],
             ["trunc","TRUNC"]
            ];
            this.appendValueInput("A")
                .appendField(new Blockly.FieldDropdown(math_rep_type), 'math_dropdwn');
           // var thisBlock=this;
            this.setInputsInline(true);
            this.setOutput(true);
            this.setColour(230);
        },
        onchange:function () {
           // this.appendValueInput("new_add");
            var thisBlock=this;
            this.getField('math_dropdwn').setValidator(function(option) {
//this.sourceBlock_.update();
                var check_op_inp = ((option === 'FMOD'||option ==='COPYSIGN'||option=== 'POW'||option=== 'GCD' || option==='ISCLOSE'));
             //   console.log(option);
               // this.sourceBlock_.updateShape_(divisorInput);
                var inputExists = thisBlock.getInput('sense_B');

                if(check_op_inp){
                    console.log(thisBlock.getInput('sense_B'));
                  //  console.loifg(thisBlock);

                    if(!inputExists) {
                        thisBlock.appendValueInput("sense_B")
                            .appendField(",", "math_com")
                            .setCheck('Number');
                    }
                    }else  if (inputExists) {
                    console.log("input exists");
                    thisBlock.removeInput('sense_B');
                }

                    //thisBlock.getFieldValue("B")
                //}

              //  console.log("dropdown val changed");
            });
        }

    };
    */
   // Blockly.defineBlocksWithJsonArray([

      //  ]);
   /* Blockly.Blocks['math_random']={
        init:function () {
            var math_rndm_type=[
                ["shuffle","SHUFFLE"],
                ["uniform","UNIFORM"],
                ["triangular","TRIANGULAR"],
                ["betavariate","BETAVARIATE"],
                ["expovariate","EXPOVARIATE"],
                ["gammavariate","GAMMAVARIATE"],
                ["gauss","GAUSS"],
                ["lognormvariate","LOGNORMVARIATE"],
                ["normalvariate","NORMALVARIATE"],
                ["vonmisesvariate","VONMISESVARIATE"],
                ["paretovariate","PARETOVARIATE"],
                ["weibullvariate","WEIBULLVARIATE"]
            ]
            this.appendDummyInput("A")
                .appendField(new Blockly.FieldDropdown(math_rndm_type), 'math_dropdwn');
            this.setOutput(true,'Number');
            this.setColour(230);
           // this.setMutator('random_arg_mutator');
        }

    };
    */

    /**
     * mixing based on random api functions with variable number of function arguments
     *
     * @mixin
     * @augments Blockly.Block
     * @package
     */


    Blockly.Blocks['math_angular']={
        init: function() {
          var math_angular_type=[
              ['degrees','DEGREES'],
              ['radians','RADIANS']
          ]
            this.appendValueInput("NUM")
                .appendField(new Blockly.FieldDropdown(math_angular_type), 'math_ang_drpdwn');
            this.setInputsInline(true);
            this.setOutput(true);
            this.setColour(230);
        }

    };
 //   function myfunc() {
    //   $("#code_segment").empty();
   // }
  //  var new_prog=document.getElementById("new_program");
    //new_prog.addEventListener("click",myfunc);
//console.log(window.location.href.charAt((window.location.href.length)-1) );

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
   Blockly.Blocks['conditioner'] = {
       init : function () {
           var options = [['max', 'Max'], ['min', 'Min'],['floor','Floor'],['ceil','Ceil'],['sin','Sin'],['cos','Cos'],['tan','Tan']];
           this.appendValueInput("sense_conditioner").
           appendField(new Blockly.FieldDropdown(options), 'sense_condition')
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
          // this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
       }//,//,
       //onchange : function () {
        //   console.log("changed");
       //}
      // decompose: function(workspace) {
          //   console.log(workspace);
      // }

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
         //  this.setTooltip('dsgsdgsd');
           //this.setHelpUrl('http://www.example.com/');
       }
   };


});
