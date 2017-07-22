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
		document.getElementById('lblmessage').innerHTML='..' ;
		var imei =document.getElementById('hidIMEI').value;
		//var GeoCoordinates = document.getElementById('geolocation').innerHTML; 
		//alert('IMEI:'+imei);	
		//debugger;	
		imei=867634029115001;
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


function SaveTripStartDetails(){debugger;
	//alert('Save:Trip Start');
	document.getElementById('lblmessage').innerHTML = 'Save Trip Start..!';
	var TripStartDetails = {};
            TripStartDetails.TaskCode = $("#txtTaskCode").val();
            TripStartDetails.SubTaskCode = $("#txtSubTaskCode").val();
            TripStartDetails.Location = $("#txtSourceLoc").val();
            TripStartDetails.IMEI = 867634029115001;
			TripStartDetails.GeoCoordinates='0,0';
			//TripStartDetails.IMEI = document.getElementById('hidIMEI').value;
            //TripStartDetails.GeoCoordinates = document.getElementById('geolocation').innerHTML; 
			
			
			if(TripStartDetails.GeoCoordinates =='Finding geolocation...')TripStartDetails.GeoCoordinates = document.getElementById('geolocation').innerHTML; 
			TripStartDetails.User = $("#hidusrid").val();SaveLoadTransactionsDetails();					
            //TripStartDetails.User = 'User';
            $.ajax({
                type: 'POST',
                url: 'http://202.83.27.199/RFIDAPI/api/RFIDInternal/TripStartDetails',
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
                }
            });
	
}

function SaveTripEndDetails(){
	//alert('Save: Trip End');
	document.getElementById('lblmessage').innerHTML = 'Save Trip End..!';
	var Adddata = {};
            Adddata.TaskCode = $("#txtTaskCode").val();
            Adddata.SubTaskCode = $("#txtSubTaskCode").val();
            Adddata.Location = $("#txtDestinationLoc").val();
            //Adddata.IMEI = document.getElementById('hidIMEI').value;
			Adddata.IMEI = 867634029115001;
			Adddata.GeoCoordinates='0,0';
            //Adddata.GeoCoordinates = document.getElementById('geolocation').innerHTML; 

			Adddata.User = $("#hidusrid").val();		SaveUnLoadTransactionsDetails();	
            //Adddata.User = 'User';
            $.ajax({
                type: 'POST',
                url: 'http://202.83.27.199/RFIDAPI/api/RFIDInternal/TripEndDetails',
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
                    
                }
            });
	
}

function SaveTaskEndDetails(){
	//alert('Save: Task End');
	document.getElementById('lblmessage').innerHTML ='Save Task End details.';
	var Adddata = {};
            Adddata.TaskCode = $("#txtTaskCode").val();
            Adddata.SubTaskCode = $("#txtSubTaskCode").val();
            //Adddata.IMEI = document.getElementById('hidIMEI').value;;
            //Adddata.GeoCoordinates = document.getElementById('geolocation').innerHTML;   
			Adddata.IMEI = 867634029115001;
			Adddata.GeoCoordinates='0,0';			
            Adddata.User = $("#hidusrid").val();GetOfflineDetails();
            $.ajax({
                type: 'POST',
                url: 'http://202.83.27.199/RFIDAPI/api/RFIDInternal/TaskEndDetails',				
                dataType: "json",
                data: Adddata,
                success: function (result) {
					$("#txtTaskCode").val("");
					$("#txtSubTaskCode").val("");
					$("#txtSourceLoc").val("");
					$("#txtDestinationLoc").val("");					
                    //alert('Data Saved Successfully.');
					document.getElementById('lblmessage').innerHTML = 'Task Closed Successfully.!';					
                },
                error: function (xhr, status, error) {
                    //alert('Error occurred while saving the data.\n\r');
					document.getElementById('lblmessage').innerHTML ='Error occurred while saving the data.';
                    
                }
            });
	
}


//////////Region ----DB Seection ---Start------
function DBHelper() {
    var database = window.openDatabase("InternalDB", "1.0", "InternalDB", 200000);
    return database;
}

function SuccessDB(tx) {
    alert('Successfully Inserted.');
    
}

function SucessCreateTable(tx) {
    //alert('Successfully Table Created.');
  //document.getElementById('lblmessage').innerHTML = 'Offline Table Created.!'; 
}

function ErrorDB(error) {
    alert('Error : ' + error.message);
}

function ErrorInsertDB(error) {
    alert('Error when inserting : ' + error.message);
}

var SaveLoadTransactionsDetails = function () {debugger;
 //alert('Syncanswertable');
 //PRIMARY KEY (ID),
// DBHelper().transaction(function (tx) {
	//tx.executeSql('DROP TABLE IF EXISTS TransactionsTbl');document.getElementById('lblmessage').innerHTML = 'Offline Table Deleted.!'; 
//}); 
DBHelper().transaction(function (tx) {
	//tx.executeSql('DROP TABLE IF EXISTS TransactionsTbl');document.getElementById('lblmessage').innerHTML = 'Offline Table Deleted.!'; 
    tx.executeSql('CREATE TABLE IF NOT EXISTS TransactionsTbl(Id Text, TaskCode Text, SubTaskCode Text, Operation Text, Location Text, IMEI Text, GeoCoordinates Text)');
	//alert('Table Created Successfully.!');
	//document.getElementById('lblmessage').innerHTML = 'Offline Table Created.!'; 
}); 

  DBHelper().transaction(function (tx) { tx.executeSql("DELETE FROM TransactionsTbl"); });

  DBHelper().transaction(function (tx) {

      var Id = 1;
        var TaskCode = document.getElementById("txtTaskCode").value;
        var SubTaskCode = $("#txtSubTaskCode").val();
        var Operation = 'Load';
        var Location = $("#txtSourceLoc").val();
        //var IMEI =867634029115001;
	     var IMEI = document.getElementById('hidIMEI').value;
		var GeoCoordinates = document.getElementById('geolocation').innerHTML; 
		//var	GeoCoordinates		='00,00';
			//Adddata.User = $("#hidusrid").val();
         tx.executeSql("INSERT INTO TransactionsTbl( TaskCode, SubTaskCode, Operation, Location, IMEI,GeoCoordinates) values( '" + TaskCode + "', '" + SubTaskCode + "', '" + Operation + "', '" + Location + "', '" + IMEI + "', '" + GeoCoordinates + "' " + ");");
		document.getElementById('lblmessage').innerHTML = 'Trip Start Offline-Save Successfull.!'; 
 }, ErrorDB, SucessCreateTable);
           /* DBHelper().transaction(function (tx) {
        // NOT NULL AUTO_INCREMENT
        tx.executeSql('CREATE TABLE IF NOT EXISTS app_getanswers(ID Text, question Text, answer Text, weight Text, synonyms Text, other Text,UNIQUE (question))');
     
     }, ErrorDB, SucessCreateTable);
  
    var url = 'http://joethemes.com/chatadmin/webservices/getanswers.php?uid=1';
     $.post(url, function(data){
   //alert(JSON.stringify(data)+'i am getanswers');
         //var getanswers = data; " + "
         
         
         for (var i = 0; i < data.length; i++) {
             
             //alert(data[i].question);
             var queryss = "INSERT OR REPLACE INTO app_getanswers(ID, question, answer, weight, synonyms , other) values( '" + data[i].ID + "'  , '" + data[i].question + "'  , '" + data[i].answer + "'  , '" + data[i].weight + "' , '" + data[i].synonyms + "' , '" + data[i].other + "' ); ";
                 alert(queryss);
             
             
             
             DBHelper().transaction(function (tx) {
        // NOT NULL AUTO_INCREMENT
                 
                 
        tx.executeSql(queryss);
     
     }, ErrorInsertDB, SuccessDB);
             
         }
         
         //var strQuery="INSERT INTO app_getanswers(ID, question, answer, weight, synonyms, other) Values(?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE subs_name     = VALUES("+subs_name+"),subs_birthday = VALUES("+subs_name+")";
            
         /*   $.each(data.d, function (index, store) {
             alert(store.StoreID);
            DBHelper().transaction(function (tx) {
             tx.executeSql(strQuery,[store.StoreID, store.Name, store.Address, store.State, store.City, store.CountryName]);
            }, ErrorDB, SuccessDB);
            
            });  
         
         
         */
         
        
   

    }

	
var SaveUnLoadTransactionsDetails = function () {debugger;
 //alert('Syncanswertable');
 //PRIMARY KEY (ID),


  //DBHelper().transaction(function (tx) { tx.executeSql("DELETE FROM app_getanswers"); });

  DBHelper().transaction(function (tx) {

      var Id = 1;
        var TaskCode = document.getElementById("txtTaskCode").value;
        var SubTaskCode = $("#txtSubTaskCode").val();
        var Operation = 'UnLoad';
        var Location = $("#txtDestinationLoc").val();
        //var IMEI =867634029115001;
	     var IMEI = document.getElementById('hidIMEI').value;
		var GeoCoordinates = document.getElementById('geolocation').innerHTML; 
		//var	GeoCoordinates		='00,00';
			//Adddata.User = $("#hidusrid").val();
         tx.executeSql("INSERT INTO TransactionsTbl( TaskCode, SubTaskCode, Operation, Location, IMEI,GeoCoordinates) values( '" + TaskCode + "', '" + SubTaskCode + "', '" + Operation + "', '" + Location + "', '" + IMEI + "', '" + GeoCoordinates + "' " + ");");
		document.getElementById('lblmessage').innerHTML = 'Trip Start Offline-Save Successfull.!'; 
 }, ErrorDB, SucessCreateTable);

}	
	
function GetOfflineDetails()
{debugger;
    
    //return new Promise(function(resolve, reject) {
   // var question = 'hi';
 //var sqlData = "SELECT * FROM TransactionsTbl WHERE question LIKE '%"+question+"%'";
 var sqlData = "SELECT * FROM TransactionsTbl";
    //alert(sqlData);
    DBHelper().transaction(function (tx) {
        tx.executeSql(sqlData, [], function (tx, results) {

            for (var i = 0; i < results.rows.length; i++) {
                //alert(results.rows.item(i).answer+'i am the answer');
                
				var Id = results.rows.item(i).Id;
                var TaskCode = results.rows.item(i).TaskCode;
				var SubTaskCode = results.rows.item(i).SubTaskCode;
				var Operation = results.rows.item(i).Operation;
				var Location = results.rows.item(i).Location;
				var IMEI = results.rows.item(i).IMEI;
				var GeoCoordinates = results.rows.item(i).GeoCoordinates;
                alert('Id:'+Id+ ', TaskCode:'+TaskCode+', SubTaskCode:'+SubTaskCode+', Operation:'+Operation+', Location:'+Location+', GeoCoordinates:'+GeoCoordinates);
                //resolve(answer);
            }
            
        });
    },ErrorDB, function (data) {
        alert('success');
    });
    
    // });       
   //return 5; 
}
	
	
//////////Region ----DB Seection ---End------





$(document).ready(function () {
	var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = true;
	var taskclosebtn = document.getElementById("btnEndTask"); taskclosebtn.disabled = true;
	//var taskclosecheckbox = document.getElementById("chkboxComplete"); taskclosecheckbox.disabled = true;
    $("#loading").hide();
    qs();
   //createTransactionsTbl();
	
	$("#btnStartTrip").click(function (){
		//alert('Hi.\n\r');		
		$("#loading").show();
		var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = false;
		//var taskclosecheckbox = document.getElementById("chkboxComplete"); taskclosecheckbox.disabled = true;
		var taskclosebtn = document.getElementById("btnEndTask"); taskclosebtn.disabled = true;		
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
		if(task==0 && document.getElementById("txtTaskCode").value!='')
		{
			SaveTripStartDetails();
		}
		else{
			document.getElementById('lblmessage').innerHTML ='Task details not found.!';
		}
		var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = false;
		$("#loading").hide();
	});
	
	$("#btnEndTrip").click(function (){
		//alert('Hi 2.\n\r');
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
	
	$("#btnEndTask").click(function (){
		//alert('Hi 2.\n\r');
		$("#loading").show();
		var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = true;		
		//var options = {frequency: 3000, enableHighAccuracy: true};
		//navigator.geolocation.watchPosition(onSuccess, onError, options);			
		
		SaveTaskEndDetails();
		
		//document.getElementById("chkboxComplete").checked = false;
		//var taskclosecheckbox = document.getElementById("chkboxComplete"); taskclosecheckbox.disabled = false;
		var endbtn = document.getElementById("btnEndTrip"); endbtn.disabled = true;
		var startbtn = document.getElementById("btnStartTrip"); startbtn.disabled = false;	
		var taskclosebtn = document.getElementById("btnEndTask"); taskclosebtn.disabled = true;
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


