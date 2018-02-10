$(document).ready(function () {
    setTimeout(function () {
        var $dialogdiv = $("#loadXml");
        var confirm_check = false;
        var save_done = false;
        var override = false;
        var program_name = '';
        var same_exists = false;
        $('#saveButton').click(function () {
            // count++;
            var $savedialog_div = $('#saveButton');
            //$savedialog_div.addClass("loading");
            var xml = Blockly.Xml.workspaceToDom(workspace);
            domToPretty = Blockly.Xml.domToPrettyText(xml);
            if (program_name == '' && (domToPretty != '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>')) {
                $('#saveXml').dialog({
                    height: 250,
                    width: 300,
                    modal: true,
                    open: function () {
                        $savedialog_div.addClass("loading");
                        $.ajax({
                            type: "POST",
                            url: "get_program_list.php",
                            success: function (data, textStatus, jqXHR) {
                                //console.log(data);
                                $savedialog_div.removeClass("loading");
                                var options;
                                json_xml = JSON.parse(data);
                                var options;
                                //   data.forEach(function (obj){
                                $("#load_program_list").empty();
                                options += '<option value ="blank" selected></option> ';
                                for (var prop in json_xml) {
                                    // for (var sub_prop in prop){
                                    //console.log(json_xml[prop]);

                                    for (var sub_prop in json_xml[prop]) {
                                        //console.log(json_xml[prop][sub_prop]);
                                        options += '<option value ="' + json_xml[prop][sub_prop] + '">' + json_xml[prop][sub_prop] + '</option>'
                                    }
                                    //}

                                }
                                //  });
                                $("#load_program_list").append(options);
                            }
                        });
                        $('#load_program_list').change(function () {
                            //console.log($("#load_program_list option:selected").text());
                            $('#save_to_program_name').val($("#load_program_list option:selected").text());
                            // program_name = $('#save_to_program_name').val();

                        });
                    },
                    buttons: {
                        Ok: function () {
                            var save_input_text = $('#save_to_program_name').val();
                            //console.log(save_input_text);
                            for (var prop in json_xml) {
                                // for (var sub_prop in prop){
                                //console.log(json_xml[prop]);
                                for (var sub_prop in json_xml[prop]) {
                                    //console.log(json_xml[prop][sub_prop]);
                                    //  console.log(json_xml[prop]);
                                    if (save_input_text == json_xml[prop][sub_prop]) {
                                        // alert("yup");
                                        same_exists = true;
                                    }
                                }
                                //}

                            }



                            if (same_exists === true) {
                                var confiramtion = confirm("Are you sure you want to override?");
                                if (confiramtion === true) {
                                    //alert("came here  true")
                                    confirm_check = true;
                                    program_name = $('#save_to_program_name').val();
                                    save_done = true;
                                    override = true;
                                } else {
                                    // alert("came here false");
                                    confirm_check = false;
                                    //aler("Dfsd");
                                    // $('#saveXml').dialog("open");
                                    $("#save_to_program_name").val("");
                                    $('#load_program_list').val("blank");
                                }
                            } else {
                                //alert("came here too");
                                program_name = $('#save_to_program_name').val();
                                confirm_check = true;
                            }

                            if (confirm_check === true) {
                                //console.log(confirm_check);
                                $.ajax({
                                    type: "POST",
                                    url: "save_blockly.php",
                                    data: {'block_string': domToPretty, 'program_name': program_name, 'override': override},
                                    success: function (data, textStatus, jqXHR) {
                                        // console.log(data);
                                        // alert();
                                        //  program_id=data;
                                    }
                                });
                                $("#saveXml").dialog("close");
                            }
                        },
                        Cancel: function () {
                            //console.log(domToPretty);
                            $("#saveXml").dialog("close");
                        }
                    },
                });
            } else {
                if (domToPretty != '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>') {
                    override = true;
                    save_done = true;
                    ///alert();
                    $.ajax({
                        type: "POST",
                        url: "save_blockly.php",
                        data: {'block_string': domToPretty, 'program_name': program_name, 'override': override},
                        success: function (data, textStatus, jqXHR) {
                            //  console.log(data);
                            // alert();
                            //  program_id=data;
                        }
                    });
                } else {
                    alert('you cannot save an empty page');
                }

                //  alert(domToPretty);

            }
        });
        $('#loadButton').click(function () {
            //alert();
            $("#loadXml").dialog({
                height: 250,
                width: 300,
                modal: true,
                open: function () {
                    $dialogdiv.addClass("loading");
                    $.ajax({
                        type: "POST",
                        url: "./get_program_list.php",
                        success: function (data, textStatus, jqXHR) {
                            //console.log(data);
                            $dialogdiv.removeClass("loading");
                            var options;
                            var json_xml = JSON.parse(data);
                            var options;
                            //   data.forEach(function (obj){
                            $("#program_name_list").empty();
                            options += '<option value ="blank" selected></option> ';
                            for (var prop in json_xml) {
                                // for (var sub_prop in prop){
                                //console.log(json_xml[prop]);

                                for (var sub_prop in json_xml[prop]) {
                                    //console.log(json_xml[prop][sub_prop]);
                                    options += '<option value ="' + json_xml[prop][sub_prop] + '">' + json_xml[prop][sub_prop] + '</option>'
                                }
                                //}

                            }
                            //  });
                            $("#program_name_list").append(options);
                        }
                    });
                },
                buttons: {
                    Ok: function () {
                        Blockly.mainWorkspace.clear();
                        var program_name_selected = $("#program_name_list option:selected").text();
                        program_name = program_name_selected;
                        current_xml_block = program_name_selected;
                        $.ajax({
                            type: "POST",
                            url: "./load_blockly.php",
                            data: {'program_name': program_name},
                            success: function (data, textStatus, jqXHR) {
                                //console.log(data);
                                $dialogdiv.removeClass("loading");
                                Blockly.mainWorkspace.clear();
                                domToPretty = data;
//console.log(domToPretty);
                                var xml = Blockly.Xml.textToDom(data);
//console.log(xml);
                                Blockly.Xml.domToWorkspace(xml, workspace);
                                // Code.renderContent();
                            }
                        });
                        $("#loadXml").dialog("close");
                    },
                    CanCel: function () {
                        $("#loadXml").dialog("close");
                    }
                }

            });
        });
        $('#new_program').click(function () {
            //Code.discard();

            // Code.renderContent();
            var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
            var domToPretty_current = Blockly.Xml.domToPrettyText(xml);
            //console.log(domToPretty_current);
            if (save_done === false && domToPretty_current !== '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>') {
                var new_confirm = confirm("Are you sure you want to Clear Blocks?");
                if (new_confirm === true) {
                    Blockly.mainWorkspace.clear();
                    var codeDiv = document.getElementById('code_segment');
                    var codeHolder = document.createElement('pre');
                    codeHolder.className = 'prettyprint but-not-that-pretty';
                   // var code = document.createTextNode(" ");
                   // console.log()
                    codeDiv.appendChild(codeHolder);
                    program_name = '';
                    save_done = false;
                }
            } else {
                Blockly.mainWorkspace.clear();
                program_name = '';
            }

        });
        $('#trashButton').click(function () {
            $("#loadXml").dialog({
                height: 250,
                width: 300,
                modal: true,
                open: function () {
                    $dialogdiv.addClass("loading");
                    $.ajax({
                        type: "POST",
                        url: "get_program_list.php",
                        success: function (data, textStatus, jqXHR) {
                            //console.log(data);
                            $dialogdiv.removeClass("loading");
                            var options;
                            var json_xml = JSON.parse(data);
                            var options;
                            //   data.forEach(function (obj){
                            $("#program_name_list").empty();
                            options += '<option value ="blank" selected></option> ';
                            for (var prop in json_xml) {
                                // for (var sub_prop in prop){
                                //console.log(json_xml[prop]);

                                for (var sub_prop in json_xml[prop]) {
                                    //console.log(json_xml[prop][sub_prop]);
                                    options += '<option value ="' + json_xml[prop][sub_prop] + '">' + json_xml[prop][sub_prop] + '</option>'
                                }
                                //}

                            }
                            //  });
                            $("#program_name_list").append(options);
                        }
                    });
                },
                buttons: {
                    Delete: function () {

                        var program_name_selected = $("#program_name_list option:selected").text();
                        program_name = '';
                        if (program_name_selected === current_xml_block) {
                            Blockly.mainWorkspace.clear();
                        }
                        $.ajax({
                            type: "POST",
                            url: "delete_program.php",
                            data: {'program_name': program_name_selected},
                            success: function (data, textStatus, jqXHR) {
                                //console.log(data);
                                // Blockly.mainWorkspace.clear();
                                //domToPretty=data;
                                //  var xml = Blockly.Xml.textToDom(data);
                                // Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
                            }
                        });
                        $("#loadXml").dialog("close");
                    },
                    CanCel: function () {
                        $("#loadXml").dialog("close");
                    }
                }

            });
        });
    },2000);

});