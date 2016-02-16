var __REGEXS = {
    NAME: /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/,
    DATE: /^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/,
    ADDRESS: /^[A-Z][a-z]+(\s[A-Z][a-z]+)*([,][\s])[A-Z][a-z]+(\s[A-Z][a-z]+)*$/,
    OHCN: /^[0-9]{4,4}([\s\-]{1,1})[0-9]{3,3}([\s\-]{1,1})[0-9]{3,3}(([\s\-]{1,1})([A-Z]{2,2}))*$/
};

function checkFName(myName) {
    if (__REGEXS.NAME.test(myName)) {
        $("#firstName").addClass("success").removeClass("error");
        return true;
    } else {
        $("#firstName").addClass("error").removeClass("success");
        return false;
    }
}

function checkLName(myName){
    if( __REGEXS.NAME.test(myName)){
        $( "#lastName" ).addClass("success").removeClass("error");
        return true;
    }else{
        $( "#lastName" ).addClass("error").removeClass("success");
        return false;
    }
}

function checkDate(myDate){
    if( __REGEXS.DATE.test(myDate)){
        $( "#dob" ).addClass("success").removeClass("error");
        return true;
    }else{
        $( "#dob" ).addClass("error").removeClass("success");
        return false;
    }
}

function checkAddress(myAddress){
    if( __REGEXS.ADDRESS.test(myAddress)){
        $( "#address" ).addClass("success").removeClass("error");
        return true;
    }else{
        $( "#address" ).addClass("error").removeClass("success");
        return false;
    }
}

function checkOhcNumber(myOHCN){
    if( __REGEXS.OHCN.test(myOHCN)){
        var count = 0;
        var arrayCount = 0;
        var numArray = [];
        var calcNumArray = [];
        var sum = 0;

        // Double 1st, 3rd, 5th, and 9th digit
        for(var i = 0; i < myOHCN.length - 4; i++){
            if( !isNaN(myOHCN[i]) ){
                count++;
                if( count % 2 == 1 ){
                    calcNumArray[arrayCount++] = ( (myOHCN[i] * 2) % 10 ) + ( parseInt( (myOHCN[i] * 2) / 10) );
                }else {
                    calcNumArray[arrayCount++] = myOHCN[i];
                }
            }
        }

        for(var i = 0; i < calcNumArray.length; i++){
            sum += parseInt(calcNumArray[i]);
        }

        if( ( 10 - (sum % 10) ) == myOHCN[myOHCN.length - 4]  ){
            $( "#ohc" ).addClass("success").removeClass("error");
            return true;
        }else{
            $( "#ohc" ).addClass("error").removeClass("success");
            return false;
        }
    }else{
        $( "#ohc" ).addClass("error").removeClass("success");
        return false;
    }
}

function _parseJSON( data ) {
    $( "#patient_records").append(
        "<tr>" +
        "<th>Name</th>" +
        "<th>Gender</th>" +
        "<th>Date of Birth</th>" +
        "<th>Address</th>" +
        "<th>Health Card #</th>" +
        "<th>Generic Notes</th>" +
        "</tr>"
    );

    $.each( data, function( key, val ) {
        $( "#patient_records").append(
            "<tr>" +
            "<td>" + val.first_name + " " + val.last_name + "</td>" +
            "<td>" + val.gender + "</td>" +
            "<td>" + val.date_of_birth.substr(0,10) +"</td>" +
            "<td>" + val.address + "</td>" +
            "<td>" + val.ohc_number + "</td>" +
            "<td>" + val.generic_notes + "</td>" +
            "</tr>"
        );
    });
}

function _submitForm(event){
    event.preventDefault();

    var itsOK = checkFName($( "#firstName" ).val())  == true &
                checkLName($( "#lastName" ).val())   == true &
                checkAddress($( "#address" ).val())  == true &
                checkDate($( "#dob" ).val())         == true &
                checkOhcNumber($( "#ohc" ).val())    == true;

    if( itsOK ){
        $( "#middleName").addClass("success");
        $( "#gen_notes").addClass("success");

        var patient = {
            first_name: $( "#firstName").val(),
            middle_name: $( "#middleName").val(),
            last_name: $( "#lastName").val(),
            date_of_birth: $( "#dob").val(),
            gender: $( "#gender").val(),
            ohc_number: $( "#ohc").val(),
            address: $( "#address").val(),
            generic_notes: $( "#gen_notes").val()
        };

        $.ajax({
            url: 'http://localhost:3000/app/patient',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                $( "#patient_records").html();
                $.getJSON( "http://localhost:3000/app/patients", _parseJSON);
            },
            data: patient
        });
    }else{
        //alert("All is BAD!");
    }

}

function cleanFormValues(){
    $( "#firstName").removeClass("error").removeClass("success").val("");
    $( "#middleName").removeClass("error").removeClass("success").val("");
    $( "#lastName").removeClass("error").removeClass("success").val("");
    $( "#dob").removeClass("error").removeClass("success").val("");
    $( "#address").removeClass("error").removeClass("success").val("");
    $( "#ohc").removeClass("error").removeClass("success").val("");
    $( "#gen_notes").removeClass("error").removeClass("success").val("");
}


$( document).ready(function(){
    $.getJSON( "http://localhost:3000/app/patients", _parseJSON);

    $( "#newPatient_Form").submit(_submitForm);

    $( "#clearButton").click(cleanFormValues);
});
