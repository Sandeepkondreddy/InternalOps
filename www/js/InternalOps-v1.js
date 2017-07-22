var qsParm = new Array();
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
    //$("#txtuuid").val(device.uuid);
	$("#hidUUID").val(device.uuid);
    window.plugins.imeiplugin.getImei(callback);
	var options = {frequency: 3000, enableHighAccuracy: true};
    navigator.geolocation.watchPosition(onSuccess, onError, options);	
}
function callback(imei) {
    $("#hidIMEI").val(imei);
	//$("#txtimei").val(imei);
}
 // onSuccess Geolocation
        //
        function onSuccess(position) {
			//alert('Hi:'+position.coords.latitude+ ',' +position.coords.longitude);
            //var element =document.getElementById('hidGeolocation')//.value=( position.coords.latitude+ ',' +position.coords.longitude);//document.getElementById('geolocation');		
			var element = document.getElementById('geolocation');
			element.innerHTML=position.coords.latitude + ',' +position.coords.longitude; //SaveGeoCordinateDetails();
			//alert(element);
            /* element.innerHTML = element.innerHTML + 
                                'Latitude: '          + position.coords.latitude         + ' ' +
                                'Longitude: '         + position.coords.longitude        + '<br />'+
                                'Altitude: '          + position.coords.altitude         + '<br />' +
                                'Accuracy: '          + position.coords.accuracy         + '<br />' +
                                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                                'Heading: '           + position.coords.heading          + '<br />' +
                                'Speed: '             + position.coords.speed            + '<br />' +
                                'Timestamp: '         + position.timestamp               + '<br />'*/
                                ;
        }

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }


function onBackKeyDown() {
}
function qs() {
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    for (var i = 0; i < parms.length; i++) {
        var pos = parms[i].indexOf('=');
        if (pos > 0) {
            var key = parms[i].substring(0, pos);
            var val = parms[i].substring(pos + 1);
            qsParm[key] = val;
        }
    }
    if (parms.length > 0) {
       $("#hidusrid").val(atob(qsParm["user"]));
	   $("#hidusrid").val(qsParm["user"]);
	   alert($("#hidusrid").val());
    }
    else {
        //window.location.href = 'Login.html';
		alert('user required.');
        return false;
    }
}

function SaveGeoCordinateDetails(){
	alert('Save: GeoCordinates');
	var Adddata = {};
			Adddata.IMEI = document.getElementById('hidIMEI').value;
            Adddata.GeoLocation = document.getElementById('geolocation').innerHTML;            
            Adddata.User = $("#hidusrid").val();
            $.ajax({
                type: 'POST',
                url: 'http://202.83.27.199/RFIDAPI/api/RFIDInternal/GeoCoordinateDetails',		
                dataType: "json",
                data: Adddata,
                success: function (result) {
                    alert('Data Saved Successfully.');                    
                },
                error: function (xhr, status, error) {
                    alert('Error occurred while saving the data.\n\r');
                    
                }
            });
	
}


 // Get Task details
function GetTaskDetails(){
		
		var imei =document.getElementById('hidIMEI').value;
		var GeoCoordinates01 = document.getElementById('geolocation').innerHTML; 
		//alert('IMEI:'+imei);	
		//debugger;	
		//imei=867634029115001;
		//alert('http://202.83.27.199/RFIDAPI/api/RFIDInternal/GetTaskDetails/'+imei);
    if(imei != "")
    {
        $.ajax({ 			
            url: 'http://202.83.27.199/RFIDAPI/api/RFIDInternal/GetTaskDetails/'+imei,	    
            type: 'GET',
            data: '{}',
            dataType: 'json',
            async: false,
            success: function (result) {
                if (result.length > 0) {
                    $("#txtTaskCode").val(result[0].TaskCode);
                    $("#txtSubTaskCode").val(result[0].SubTaskCode);
                    $("#txtSourceLoc").val(result[0].Source);
                    $("#txtDestinationLoc").val(result[0].Destination);                  
                }
                else {                    
					alert('Task Details Not Found.');                    
                }
            },
            error: function () {
                alert('Error occurred while loading Task details.');               
                $("#loading").hide();
            }
        });
    }
}


function SaveTripStartDetails(){
	alert('Save:Trip Start');
	var TripStartDetails = {};
            TripStartDetails.TaskCode = $("#txtTaskCode").val();
            TripStartDetails.SubTaskCode = $("#txtSubTaskCode").val();
            TripStartDetails.Location = $("#txtSourceLoc").val();
            //TripStartDetails.IMEI = 867634029115001;
			TripStartDetails.IMEI = document.getElementById('hidIMEI').value;
            TripStartDetails.GeoCoordinates = document.getElementById('geolocation').innerHTML;
			if(TripStartDetails.GeoCoordinates =='Finding geolocation...')TripStartDetails.GeoCoordinates = document.getElementById('geolocation').innerHTML; 
			TripStartDetails.User = $("#hidusrid").val();					
            //TripStartDetails.User = 'User';
            $.ajax({
                type: 'POST',
                url: 'http://202.83.27.199/RFIDAPI/api/RFIDInternal/TripStartDetails',
				//url: 'http://localhost:51594/api/RFIDInternal/TripStartDetails',								
                dataType: "json",
                data: TripStartDetails,
                success: function (result) {
                    alert('Data Saved Successfully.');                    
                },
                error: function (xhr, status, error) {
                    alert('Error occurred while saving the data.\n\r');
                    
                }
            });
	
}

function SaveTripEndDetails(){
	alert('Save: Trip End');
	var Adddata = {};
            Adddata.TaskCode = $("#txtTaskCode").val();
            Adddata.SubTaskCode = $("#txtSubTaskCode").val();
            Adddata.Location = $("#txtDestinationLoc").val();
            Adddata.IMEI = document.getElementById('hidIMEI').value;
			//Adddata.IMEI = 867634029115001;
            Adddata.GeoCoordinates = document.getElementById('geolocation').innerHTML;  
			Adddata.User = $("#hidusrid").val();			
            //Adddata.User = 'User';
            $.ajax({
                type: 'POST',
                url: 'http://202.83.27.199/RFIDAPI/api/RFIDInternal/TripEndDetails',
				//url: 'http://localhost:51594/api/RFIDInternal/TripEndDetails',				
                dataType: "json",
                data: Adddata,
                success: function (result) {
                    alert('Data Saved Successfully.');                    
                },
                error: function (xhr, status, error) {
                    alert('Error occurred while saving the data.\n\r');
                    
                }
            });
	
}

function SaveTaskEndDetails(){
	alert('Save: Trip End');
	var Adddata = {};
            Adddata.TaskCode = $("#txtTaskCode").val();
            Adddata.SubTaskCode = $("#txtSubTaskCode").val();
            Adddata.IMEI = document.getElementById('hidIMEI').value;;
            Adddata.GeoLocation = document.getElementById('geolocation').innerHTML;            
            Adddata.User = $("#hidusrid").val();
            $.ajax({
                type: 'POST',
                url: 'http://202.83.27.199/RFIDAPI/api/RFIDInternal/SaveTaskEndDetails/AddData',				
                dataType: "json",
                data: Adddata,
                success: function (result) {
					$("#txtTaskCode").val("");
					$("#txtSubTaskCode").val("");
					$("#txtSourceLoc").val("");
					$("#txtDestinationLoc").val("");					
                    alert('Data Saved Successfully.');					                    
                },
                error: function (xhr, status, error) {
                    alert('Error occurred while saving the data.\n\r');
                    
                }
            });
	
}

$(document).ready(function () {
	var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = true;
	var taskclosebtn = document.getElementById("btnEndTask"); taskclosebtn.disabled = true;
	//var taskclosecheckbox = document.getElementById("chkboxComplete"); taskclosecheckbox.disabled = true;
    $("#loading").hide();
    qs();
   
	
	$("#btnStartTrip").click(function (){
		//alert('Hi.\n\r');		
		$("#loading").show();
		var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = false;
		var taskclosecheckbox = document.getElementById("chkboxComplete"); taskclosecheckbox.disabled = true;		
		var options = {frequency: 3000, enableHighAccuracy: true};
		navigator.geolocation.watchPosition(onSuccess, onError, options);	
		//alert('IMEI No:'+	document.getElementById('hidIMEI').value);
		//alert('Location:'+	document.getElementById('geolocation').innerHTML);
		var taskcode = document.getElementById("txtTaskCode").value;
		var task = 1;
		if(taskcode=='')
		{
			task = 0;
			//alert('taskcode is empty');
			GetTaskDetails();		
		}
		else{
			SaveTripStartDetails();			
			//var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = false;
			//alert('taskcode is not empty');
		}		
		var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = true;
		if(task==0)
		{
			SaveTripStartDetails();
		}
		var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = false;
		$("#loading").hide();
	});
	
	$("#btnEndTrip").click(function (){debugger;
		//alert('Hi 2.\n\r');
		$("#loading").show();
		var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = false;		
		var options = {frequency: 3000, enableHighAccuracy: true};
		navigator.geolocation.watchPosition(onSuccess, onError, options);	
		
		SaveTripEndDetails();
		var taskclosecheckbox = document.getElementById("chkboxComplete"); taskclosecheckbox.disabled = false;
		var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = true;
		$("#loading").hide();
	});
	
	$("#btnEndTask").click(function (){
		//alert('Hi 2.\n\r');
		$("#loading").show();
		var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = true;		
		//var options = {frequency: 3000, enableHighAccuracy: true};
		//navigator.geolocation.watchPosition(onSuccess, onError, options);	
		
		debugger;
		SaveTaskEndDetails();
		
		document.getElementById("chkboxComplete").checked = false;
		var taskclosecheckbox = document.getElementById("chkboxComplete"); taskclosecheckbox.disabled = false;
		var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = true;
		var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = false;	
		$("#loading").hide();
	});
	
	$("#chkboxComplete").change(function(event) {
		$("#loading").show();
    var checkbox = event.target;
    if (checkbox.checked) {
		
        //Checkbox has been checked
		//alert('Checked');
		var TaskClosebtn = document.getElementById("btnEndTask"); TaskClosebtn.disabled = false;	
		} else {
        //Checkbox has been unchecked
		//alert('UnChecked');
		var TaskClosebtn = document.getElementById("btnEndTask"); TaskClosebtn.disabled = true;		
		}
		$("#loading").hide();
	});
	
    $("#btnSubmit").click(function (){
        //var _loctype = $("#selLocType option:selected").val();
        //if(_loctype == 0) {
        //    $("#selLocType").focus();
        //    alert('Please Select Location Type.');
        //    return false;
        //}
        //else {
            $(this).find("i.fa").attr('class', 'fa fa-spinner fa-spin');
            $(this).find("span").text(" device is registering please wait...");
            $(this).attr('disabled', true);
            $(this).attr('class', 'btn btn-custom-icon');
            $("#loading").show();
            var Adddata = {};
            Adddata.IMEI = $("#txtimei").val();
            Adddata.UUID = $("#txtuuid").val();
            //Adddata.LocationType = _loctype;
            Adddata.User = 'admin';
            $.ajax({
                type: 'POST',
                url: 'http://202.83.27.199/TestAPI/api/Device/RegisterDevice',
                dataType: "json",
                data: Adddata,
                success: function (loctyperesult) {
                    alert('Device Registered Successfully');
                },
                error: function (xhr, status, error) {
                    $("#btnSubmit").prop('disabled', false);
                    alert('Error Occurred while Registring device.\n\r' + xhr.responseText);
                }
            });
        //}
        $(this).find("i.fa").attr('class', 'fa fa-check');
        $(this).find("span").text(" Submit");
        $(this).attr('disabled', false);
        $(this).attr('class', 'btn btn-custom');
        $("#loading").hide();
    });
});

function GetDeviceStatus(){
	
    var Adddata = {};
    Adddata.IMEI = $("#txtimei").val();
    Adddata.UUID = $("#txtuuid").val();
    $.ajax({
        type: "POST",
        url: "http://202.83.27.199/TestAPI/api/Account/GetDeviceStatus",
	//url: "http://182.72.244.25/KPCTSDS/api/Account/GetDeviceStatus",
        dataType: "json",
        data: Adddata,
        success: function (result) {
            $("#selLocType").empty();
			
            if (result != null) {
                $("#selLocType").append($("<option></option>").val(result).html(result));
                $("#btnSubmit").prop('disabled', true);
                $("#btnSubmit").html("Device already Registered.");
            }
            else {
                $("#btnSubmit").prop('disabled', false);
                $.ajax({
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    url: 'http://202.83.27.199/KPCTSDS/api/Location/GetLocationType/',
					//url: 'http://182.72.244.25/KPCTSDS/api/Location/GetLocationType/',
                    dataType: "json",
                    data: '{}',
                    async: false,
                    success: function (loctyperesult) {
                        $("#selLocType").append($("<option></option>").val('0').html('Select'));
                        $("#selLocType").append($("<option></option>").val('PARKING').html('PARKING'));
                        $.each(loctyperesult, function (key, value) {
                            $("#selLocType").append($("<option></option>").val(value.LocationType).html(value.LocationType));
                        });
                    },
                    error: function () {
                        alert('Error Occurred while getting Device Status');
                    }
                });
            }
        },
        error: function () {
            alert('Error Occurred while getting Device Status');
        }
    });
	
	
	
}


