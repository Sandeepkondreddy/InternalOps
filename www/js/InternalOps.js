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
       //$("#hidusrid").val(atob(qsParm["user"]));
	   $("#hidusrid").val(qsParm["user"]);
	   //alert($("#hidusrid").val());
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
                url: 'http://202.83.27.199/KyTeMobileAPI/api/RFIDInternal/GeoCoordinateDetails',		
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
		document.getElementById('lblmessage').innerHTML='..' ;
		var imei =document.getElementById('hidIMEI').value;
		var GeoCoordinates01 = document.getElementById('geolocation').innerHTML; 
		//alert('IMEI:'+imei);	
		//debugger;	
		//imei=867634029115001;
		//alert('http://202.83.27.199/KyTeMobileAPI/api/RFIDInternal/GetTaskDetails/'+imei);
    if(imei != "")
    {
        $.ajax({ 			
            url: 'http://202.83.27.199/KyTeMobileAPI/api/RFIDInternal/GetTaskDetails/'+imei,	    
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
					//alert('Task Details Not Found.');  
					document.getElementById('lblmessage').innerHTML = 'Task Details Not Found!';
			
                }
            },
            error: function () {
                alert('Error occurred while loading Task details.');
					
					document.getElementById('lblmessage').innerHTML =	'Error occurred while loading Task details.'; 			
               // $("#loading").hide();
            }
        });
    }
}

var Operation='';

function SaveTripStartDetails(){
	//alert('Save:Trip Start');
	document.getElementById('lblmessage').innerHTML = 'Save Trip Start..!';
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
                url: 'http://202.83.27.199/KyTeMobileAPI/api/RFIDInternal/TripStartDetails',
				//url: 'http://localhost:51594/api/RFIDInternal/TripStartDetails',								
                dataType: "json",
                data: TripStartDetails,
                success: function (result) {
                    //alert('Data Saved Successfully.');
					document.getElementById('lblmessage').innerHTML = 'Trip Started Successfully.!';                    
                },
                error: function (xhr, status, error) {
                    //alert('Error occurred while saving the data.\n\r');
                    document.getElementById('lblmessage').innerHTML ='Error occurred while saving the data.!';
					Operation='Load';insertRecord();
					
					
                }
            });
			var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = true;
			var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = false;
}

function SaveTripEndDetails(){

	document.getElementById('lblmessage').innerHTML = 'Save Trip End..!';
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
                url: 'http://202.83.27.199/KyTeMobileAPI/api/RFIDInternal/TripEndDetails',
				//url: 'http://localhost:51594/api/RFIDInternal/TripEndDetails',				
                dataType: "json",
                data: Adddata,
                success: function (result) {
                    //alert('Data Saved Successfully.');     
					document.getElementById('lblmessage').innerHTML = 'Trip Ended Successfully.!';     
                },
                error: function (xhr, status, error) {
                    //alert('Error occurred while saving the data.\n\r');
					document.getElementById('lblmessage').innerHTML ='Error occurred while saving the data.!';
                    Operation='UnLoad';insertRecord();
                }
            });	
}

function SaveTaskEndDetails(){
	//alert('Save: Task End');
	document.getElementById('lblmessage').innerHTML ='Save Task End details.';
	var Adddata = {};
            Adddata.TaskCode = $("#txtTaskCode").val();
            Adddata.SubTaskCode = $("#txtSubTaskCode").val();
            Adddata.IMEI = document.getElementById('hidIMEI').value;;
            Adddata.GeoCoordinates = document.getElementById('geolocation').innerHTML;            
            Adddata.User = $("#hidusrid").val();
            $.ajax({
                type: 'POST',
                url: 'http://202.83.27.199/KyTeMobileAPI/api/RFIDInternal/TaskEndDetails',				
                dataType: "json",
                data: Adddata,
                success: function (result) {
					$("#txtTaskCode").val("");
					$("#txtSubTaskCode").val("");
					$("#txtSourceLoc").val("");
					$("#txtDestinationLoc").val("");					
                    var taskclosebtn = document.getElementById("btnEndTask"); taskclosebtn.disabled = true;
					document.getElementById('lblmessage').innerHTML = 'Task Closed Successfully.!';					
                },
                error: function (xhr, status, error) {
                    //alert('Error occurred while saving the data.\n\r');
					document.getElementById('lblmessage').innerHTML ='Error occurred while saving the data.';
                    
                }
            });	
}

function SaveBreakdownDetails(){debugger;
	document.getElementById('lblmessage').innerHTML ='Save Truck Breakdown details.';
	var Adddata = {};            
            Adddata.IMEI = document.getElementById('hidIMEI').value;;
            Adddata.GeoCoordinates = document.getElementById('geolocation').innerHTML; 
            //Adddata.IMEI = 867634029115001;
			//Adddata.GeoCoordinates="10,10";			
            Adddata.User = $("#hidusrid").val();
            $.ajax({
                type: 'POST',
                url: 'http://202.83.27.199/KyTeMobileAPI/api/RFIDInternal/BreakdownDetails',				
                dataType: "json",
                data: Adddata,
                success: function (result) {				
					document.getElementById('lblmessage').innerHTML = 'Breakdown Details Saved Successfully.!';					
                },
                error: function (xhr, status, error) {                    
					document.getElementById('lblmessage').innerHTML ='Error occurred while saving the data.';                    
                }
            });
}


//  DB Section-----Start---

//  Declare SQL Query for SQLite
 
var createStatement = "CREATE TABLE IF NOT EXISTS TransactionsTbl (Id INTEGER PRIMARY KEY AUTOINCREMENT,  TaskCode TEXT, SubTaskCode TEXT, Operation TEXT, Location TEXT, IMEI TEXT, GeoCoordinates TEXT,CreatedTime TEXT,CreatedBy TEXT)";
 
var selectAllStatement = "SELECT * FROM TransactionsTbl";
 
var insertStatement = "INSERT INTO TransactionsTbl (TaskCode, SubTaskCode, Operation, Location, IMEI, GeoCoordinates, CreatedTime, CreatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
 
var updateStatement = "UPDATE TransactionsTbl SET username = ?, useremail = ? WHERE id=?";
 
var deleteStatement = "DELETE FROM TransactionsTbl WHERE Id=?";

var deleteAllStatement = "DELETE FROM TransactionsTbl";
 
var dropStatement = "DROP TABLE TransactionsTbl";
 
var db = openDatabase("LocalDB", "1.0", "Local Database", 200000);  // Open SQLite Database
 
var dataset;
 
var DataType;

function initDatabase()  // Function Call When Page is ready.
{
     try {
         if (!window.openDatabase)  // Check browser is supported SQLite or not.
         {
             alert('Databases are not supported in this browser.');
         }
         else {
             createTable();  // If supported then call Function for create table in SQLite
         }
     }
 
    catch (e) {
         if (e == 2) {
             // Version number mismatch. 
             console.log("Invalid database version.");
         } else {
             console.log("Unknown error " + e + ".");
         }
         return;
     }
 }


function createTable()  // Function for Create Table in SQLite.
{

    db.transaction(function (tx) { tx.executeSql(createStatement, [], TableCeationMessage, onError); });
	
}
function TableCeationMessage()
{
	document.getElementById('lblmessage').innerHTML = 'Offline Table Created Successfully.!';
}
function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{debugger;
		var TaskCodeTemp = document.getElementById("txtTaskCode").value;
        var SubTaskCodeTemp = $("#txtSubTaskCode").val();
        var OperationTemp = Operation;
        var LocationTemp = $("#txtDestinationLoc").val();
        var IMEITemp =document.getElementById('hidIMEI').value;;
		var GeoCoordinatesTemp = document.getElementById('geolocation').innerHTML;
		if(GeoCoordinatesTemp=='Finding geolocation...')GeoCoordinatesTemp = document.getElementById('geolocation').innerHTML;
		var currentdate = new Date(); 

		var CreatedTimeTemp =getDateTime();
		
		var CreatedByTemp=$("#hidusrid").val();
        db.transaction(function (tx) { tx.executeSql(insertStatement, [TaskCodeTemp, SubTaskCodeTemp, OperationTemp, LocationTemp, IMEITemp, GeoCoordinatesTemp, CreatedTimeTemp, CreatedByTemp], loadAndReset, onError); });
		
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}

function loadAndReset() //Function for Load and Reset...
{     
	//alert (' Offline Data Saved Successfully.!');
	showOfflineRecordsCount();
	document.getElementById('lblmessage').innerHTML = 'Offline Data Saved Successfully.! OfflineCount:'+offlinedatacount;
    //showRecords(); 
}
 
function onError(tx, error) // Function for Hendeling Error...
{
    alert(error.message);
}
 
function showRecords() // Function For Retrive data from Database Display records as list
{
    //$("#results").html('')
     db.transaction(function (tx) {
         tx.executeSql(selectAllStatement, [], function (tx, result) {
             dataset = result.rows;
			 if(dataset.length==0)
			 {				 
				 document.getElementById('lblmessage').innerHTML = 'Offline Data Not Available.!';
			 }
			 else{
				 document.getElementById('lblmessage').innerHTML = dataset.length+ ' Records Offline Data Available.!';
			 }
             for (var i = 0, item = null; i < dataset.length; i++) {
                 item = dataset.item(i);
                 //var linkeditdelete = '<li>' + item['username'] + ' , ' + item['useremail'] + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +
                 //                            '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';
				alert('Id:'+item['Id']+ ', TaskCode:'+item['TaskCode']+', SubTaskCode:'+item['SubTaskCode']+', Operation:'+item['Operation']+', Location:'+item['Location']+', GeoCoordinates:'+item['GeoCoordinates']+', CreatedTime:'+item['CreatedTime']+',CreatedBy:'+item['CreatedBy']);							 
                 //$("#results").append(linkeditdelete);
             }
			 
         });
     });
 }

var offlinedatacount=0; 
function showOfflineRecordsCount() // Function For Retrive data from Database Display records count
{
    
     db.transaction(function (tx) {
         tx.executeSql(selectAllStatement, [], function (tx, result) {
             dataset = result.rows;
			 if(dataset.length==0)
			 {				 
				 //document.getElementById('lblmessage').innerHTML = 'Offline Data Not Available.!';
				 offlinedatacount=0;
			 }
			 else{
				 document.getElementById('lblmessage').innerHTML = dataset.length+ ' Records of Offline Data Available.!';
				 offlinedatacount=dataset.length;
			 }
         });
     });
 }

var uploadcount=0; 
var uploadstatus=0;
function uploadOfflineData() // Function For Retrive data from Offline Database and push the data to Server
{
     db.transaction(function (tx) {
         tx.executeSql(selectAllStatement, [], function (tx, result) {
             dataset = result.rows;
			 if(dataset.length==0)
			 {
				 //alert('No records found.');
				 document.getElementById('lblmessage').innerHTML = 'Offline Data Not Available.!';
			 }
			 else{uploadcount=0; 
				 document.getElementById('lblmessage').innerHTML = dataset.length+ ' Records Offline Data Available.!';
			 }
             for (var i = 0, item = null; i < dataset.length; i++) {
                 item = dataset.item(i);
				alert('Id:'+item['Id']+ ', TaskCode:'+item['TaskCode']+', SubTaskCode:'+item['SubTaskCode']+', Operation:'+item['Operation']+', Location:'+item['Location']+', GeoCoordinates:'+item['GeoCoordinates']+', CreatedTime:'+item['CreatedTime']+',CreatedBy:'+item['CreatedBy']);							 
                 var Adddata = {};
					Adddata.TaskCode = item['TaskCode'];
					Adddata.SubTaskCode = item['SubTaskCode'];
					Adddata.Location =item['Location'];
					Adddata.IMEI = item['IMEI'];
					Adddata.Operation = item['Operation'];
					Adddata.GeoCoordinates = item['GeoCoordinates'];  
					Adddata.CreatedTime=item['CreatedTime'];
					Adddata.User =item['CreatedBy'];
					 deleteRecord(item['Id']);
					$.ajax({
						type: 'POST',
						url: 'http://202.83.27.199/KyTeMobileAPI/api/RFIDInternal/OfflineTransDetails',
				//url: 'http://localhost:51594/api/RFIDInternal/OfflineTransDetails',				
						dataType: "json",
						data: Adddata,
						success: function (result) {    
							document.getElementById('lblmessage').innerHTML = dataset.length+':Trip Uploaded Successfully.!';
						    //deleteRecord(item['Id']);
							//deleteOfflineRecords();
							
						},
						error: function (xhr, status, error) {
                    		document.getElementById('lblmessage').innerHTML ='Error occurred while Uploading the data.!';
							uploadstatus=0;
						}
						});
						uploadcount++; 
						
             }
			
         });
     });
 }
 
  function deleteOfflineRecords() // Get id of record . Function Call when Delete Button Click..
{
     var iddelete = id.toString();
     db.transaction(function (tx) { tx.executeSql(deleteAllStatement, DeleteSuccessMessage, onError); //document.getElementById('lblmessage').innerHTML = 'All Offline Data Deleted Successfully.!';});
 }
 
 
 function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..
{
     var iddelete = id.toString();
     db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], DeleteSuccessMessage, onError); //document.getElementById('lblmessage').innerHTML = id+':Trip Deleted Successfully.!';});
 }
 function DeleteSuccessMessage()
 {
	 
 }
//  DB Section-----End---

function getDateTime(){
	var currentdate = new Date().toLocaleString(); 
		//alert(currentdate); 
	 var n1 =currentdate.split(' ');//109
	 var n2=n1[0].split('/');
	 //var date=n2[2].substr(0, n2[2].length - 1)+'-'+n2[0]+'-'+n2[1];
        var time = am_pm_to_hours(n1[1]+' '+n1[2]);
		var year=n2[2].substr(0, n2[2].length - 1);
		var month=n2[0];
		if(month.length==1)month='0'+n2[0];
		var day=n2[1];
		if(day.length==1)day='0'+n2[1];
     //var datetime=year+'-'+month+'-'+day +' '+time;  //System Time
	 var datetime=year+'-'+month+'-'+day+' '+time;	//Mobile Time
	 if(datetime.length>19){
	 datetime=year+'-'+day+'-'+month +' '+time;		 
	 datetime=datetime.substr(0,datetime.length-7); //Mobile Tiem
	 }
	 return (datetime);
}

//Time Covertion
function am_pm_to_hours(time) {
        console.log(time);
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
		//var sSecons=
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
		var sec=time.split(':');
        return (sHours +':'+sMinutes+':'+sec[2].substr(0, sec[2].length - 3));
    }

// 


$(document).ready(function () {
	var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = true;
	var taskclosebtn = document.getElementById("btnEndTask"); taskclosebtn.disabled = true;
	//var taskclosecheckbox = document.getElementById("chkboxComplete"); taskclosecheckbox.disabled = true;
    $("#loading").hide();
    qs();
   initDatabase();
 
	showOfflineRecordsCount();
	$("#btnStartTrip").click(function (){
		//alert('Hi.\n\r');		
		$("#loading").show();
		var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = false;
		//var taskclosecheckbox = document.getElementById("chkboxComplete"); taskclosecheckbox.disabled = true;
		var taskclosebtn = document.getElementById("btnEndTask"); taskclosebtn.disabled = true;		
		var options = {frequency: 3000, enableHighAccuracy: true};
		navigator.geolocation.watchPosition(onSuccess, onError, options);	
		
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
			var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = true;			
			var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = false;
			
		}		
		var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = true;
		if(task==0 && document.getElementById("txtTaskCode").value!='')
		{
			SaveTripStartDetails();
			var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = true;
			var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = false;
		}
		else if(document.getElementById("txtTaskCode").value==''){
			document.getElementById('lblmessage').innerHTML ='Task details not found.!';
			var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = false;
			var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = true;
		}
		else{
			var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = true;
			var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = false;
		}
		
		$("#loading").hide();
	});
	
	$("#btnEndTrip").click(function (){
		$("#loading").show();
		var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = false;		
		var options = {frequency: 3000, enableHighAccuracy: true};
		navigator.geolocation.watchPosition(onSuccess, onError, options);	
		
		SaveTripEndDetails();
		//var taskclosecheckbox = document.getElementById("chkboxComplete"); taskclosecheckbox.disabled = false;
		var taskclosebtn = document.getElementById("btnEndTask"); taskclosebtn.disabled = false;
		var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = true;
		$("#loading").hide();
	});
	
	$("#btnBreakdown").click(function (){
		SaveBreakdownDetails();
	});
	
	$("#btnEndTask").click(function (){
		
		$("#loading").show();
		var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = true;		
		debugger;
		
		showOfflineRecordsCount(); 
		if(offlinedatacount!=0){
		uploadOfflineData();showOfflineRecordsCount();
			if(offlinedatacount==0){SaveTaskEndDetails();}
		}
		else {
			SaveTaskEndDetails();			
		}
		var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = true;
		var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = false;	
		
		//document.getElementById("chkboxComplete").checked = false;
		//var taskclosecheckbox = document.getElementById("chkboxComplete"); taskclosecheckbox.disabled = false;
		
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

		var TaskClosebtn = document.getElementById("btnEndTask"); TaskClosebtn.disabled = true;		
		}
		$("#loading").hide();
	});
	
    $("#btnSubmit").click(function (){

            $(this).find("i.fa").attr('class', 'fa fa-spinner fa-spin');
            $(this).find("span").text(" device is registering please wait...");
            $(this).attr('disabled', true);
            $(this).attr('class', 'btn btn-custom-icon');
            $("#loading").show();
            var Adddata = {};
            Adddata.IMEI = $("#txtimei").val();
            Adddata.UUID = $("#txtuuid").val();
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


