$(document).ready(function () {
setTimeout(function () {
    function update_code_div() {
        var codeDiv = document.getElementById('code_segment');
        var codeHolder = document.createElement('pre');
        codeHolder.className = 'prettyprint but-not-that-pretty';
        var code = document.createTextNode(Blockly['Python'].workspaceToCode(workspace));
        // console.log(code);
        codeHolder.appendChild(code);
        //  if(codeDiv.children.length>1)
       // console.log(codeDiv.lastElementChild);
        codeDiv.replaceChild(codeHolder, codeDiv.lastElementChild);
       // console.log("this is change");
    }

    Blockly.Python['math_representation']=function (block) {
        //var math_func=Blockly.Python.variableDB_.getName(block.getFieldValue('math_rep_drdwn')
        // ,Blockly.VARIABLE_CATEGORY_NAME);
        //  var code="Math."+math_func+"()";
        //console.log(block);
        var code="";
        // console.log(block);
        var condtioner_func=block.getFieldValue('math_dropdwn');
        if(condtioner_func === 'FMOD'||condtioner_func ==='COPYSIGN'||
            condtioner_func ==="LDEXP" || condtioner_func=== "POW"||condtioner_func=== "GCD"){
            var argument0 = Blockly.Python.valueToCode(block, 'A', 6) || '0';
            var argument1 = Blockly.Python.valueToCode(block, 'sense_B', 6) || '0';
            //console.log(argument0);
            //console.log(argument1);
            code="math."+condtioner_func.toLowerCase()+"("+argument0
                +","+argument1+")";

        }else{
            // var tuple = OPERATORS[block.getFieldValue('math_dropdwn')];
            // var operator = tuple[0];
            // var order = tuple[1];
            var argument0 = Blockly.Python.valueToCode(block, 'A', 6) || '0';
            // console.log(argument0);
            code="math."+condtioner_func.toLowerCase()+"("+argument0
                +")";
        }
        //console.log(condtioner_func);
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['math_angular'] = function (block) {
        var angular_func=block.getFieldValue('math_ang_drpdwn');
        var argument0 = Blockly.Python.valueToCode(block, 'NUM', 6) || '0';
        var code="math."+angular_func.toLowerCase()+"("+argument0+")";
        return code;
    };


    Blockly.Python['Input_Channel'] = function () {
        var code = 'Channel inp_1';
        return code;
    };
    Blockly.Python['Output_Channel'] = function () {
        var code = 'Channel out_1';

        return code;
    };
    Blockly.Python['conditioner']= function (block) {
        // var sub_str = Blockly.cake.variableDB_.getName(block.getFieldValue('VAR'),
        //   Blockly.Variables.NAME_TYPE);
        //sub_str = Blockly.Blocks.checkUnselect(sub_str);
        //console.log(block.getFieldValue('sense_condition'));
        var condtioner_func=block.getFieldValue('sense_condition');
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
},1000);

});