//Plugin: <plugin name="uk.co.workingedge.cordova.plugin.sqliteporter" source="npm" />

function testCreateNewdb() //Step 001
{
	var db = window.openDatabase("Test", "1.0", "TestDB", 1 * 1024);
		var sql = "CREATE TABLE IF NOT EXISTS DataTbl ([Id] PRIMARY KEY, [Data]);"+
			"INSERT INTO DataTbl(Id,Data) VALUES ('1','Hi');";
		var successFn = function(count){
			alert("Successfully imported "+count+" SQL statements to DB");
			totalcount=count;
		};
		var errorFn = function(error){
			alert("The following error occurred: "+error.message);
		};
		var progressFn = function(current, total){
			console.log("Imported "+current+"/"+total+" statements");
		};
		cordova.plugins.sqlitePorter.importSqlToDb(db, sql, {
			successFn: successFn,
			errorFn: errorFn,
			progressFn: progressFn
		});
	window.closeDatabase();
}

function testUseExistingDB() //Step 001
{
	var db = window.openDatabase("Test", "1.0", "TestDB", 2 * 1024);
	var sql = "INSERT INTO DataTbl(Id,Data) VALUES ('6','Jane');"+
		"UPDATE DataTbl SET Data='Susan' WHERE Id='2';"+
		"DELETE FROM DataTbl WHERE Id='5';";
	var successFn = function(count){
		//alert("Successfully imported "+count+" SQL statements to DB");
		totalcount=count;
	};
	var errorFn = function(error){
		alert("The following error occurred: "+error.message);
	};
	var progressFn = function(current, total){
		console.log("Imported "+current+"/"+total+" statements");
	};
	cordova.plugins.sqlitePorter.importSqlToDb(db, sql, {
		successFn: successFn,
		errorFn: errorFn,
		progressFn: progressFn
	});
	
}
//---Successfully Completed Above and failed below---

var totalcount=0;
function savedatainlocaldb()
{
	id=totalcount+1;
	var Adddata = {};
            Adddata.TaskCode = $("#txtTaskCode").val();
            Adddata.SubTaskCode = $("#txtSubTaskCode").val();
            Adddata.IMEI = document.getElementById('hidIMEI').value;;
            Adddata.GeoCoordinates = document.getElementById('geolocation').innerHTML;            
            Adddata.User = $("#hidusrid").val();
			Adddata.currentTimestamp = date.getTime();alert(currentTimestamp);
	var db = window.openDatabase("Test", "1.0", "TestDB", 2 * 1024);		
	var sql = INSERT INTO DataTbl(Id,Data) VALUES (+id+,'+Adddata+');
	var successFn = function(count){		
		totalcount=count;alert('Total Count:' +count);
	};
	var errorFn = function(error){
		alert("The following error occurred: "+error.message);
	};
	//var progressFn = function(current, total){
	//	console.log("Imported "+current+"/"+total+" statements");
	//};
	cordova.plugins.sqlitePorter.importSqlToDb(db, sql, {
		successFn: successFn,
		errorFn: errorFn,
		progressFn: progressFn
	});
	
}