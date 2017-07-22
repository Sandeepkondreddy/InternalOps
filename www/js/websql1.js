function DBHelper() {
    var database = window.openDatabase("DoctorChat", "1.0", "DoctorChat", 200000);
    return database;
}

function SuccessDB(tx) {
    alert('Successfully Inserted.');
    
}

function SucessCreateTable(tx) {
    //alert('Successfully Table Created.');
  
}

function ErrorDB(error) {
    alert('Error : ' + error.message);
}

function ErrorInsertDB(error) {
    alert('Error when inserting : ' + error.message);
}

var Syncanswertable = function () {
 alert('Syncanswertable');
 //PRIMARY KEY (ID),
    
     var url = 'http://joethemes.com/chatadmin/webservices/getanswers.php?uid=1';
     $.post(url, function(data){
    DBHelper().transaction(function (tx) {
		
    tx.executeSql('CREATE TABLE IF NOT EXISTS app_getanswers(ID Text, question Text, answer Text, weight Text, synonyms Text, other Text)');
 });

  //DBHelper().transaction(function (tx) { tx.executeSql("DELETE FROM app_getanswers"); });

  DBHelper().transaction(function (tx) {

        
       
        var length = localStorage.getItem('length');
        
        if(length == null){length = 0;}
        
        
        alert(length+'i am length');
        if(length < data.length){
            
        localStorage.setItem('length',data.length);
        alert(data.length+'i am getanswers');
        tx.executeSql("DELETE FROM app_getanswers");
    for (var cnt = 0; cnt < data.length; cnt++) {

         var ID = data[cnt].CashRegisterID;
        var question = data[cnt].question;
        var answer = data[cnt].answer;
        var weight = data[cnt].weight;
        var synonyms = data[cnt].synonyms;
        var other = data[cnt].other;

         tx.executeSql("INSERT INTO app_getanswers(ID, question, answer, weight, synonyms, other) values('" + ID + "', '" + question + "', '" + answer + "', '" + weight + "', '" + synonyms + "', '" + other + "' " + ");");
    }
}
  
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
         
        
    }).fail( function(jqXHR, textStatus, errorThrown) {
  alert('error occured');
});
    }
Syncanswertable();

function GetAnswers(question)
{
    // WHERE question LIKE %"+question+"%
    //alert('hi i amget answers');
    
    return new Promise(function(resolve, reject) {
    var question = 'hi';
 var sqlData = "SELECT * FROM app_getanswers WHERE question LIKE '%"+question+"%'";
    alert(sqlData);
    DBHelper().transaction(function (tx) {
        tx.executeSql(sqlData, [], function (tx, results) {

            for (var i = 0; i < results.rows.length; i++) {
                //alert(results.rows.item(i).answer+'i am the answer');
                
                var answer = results.rows.item(i).answer;
                alert(answer);
                resolve(answer);
            }
            
        });
    },ErrorDB, function (data) {
        alert('success');
    });
    
     });       
   //return 5; 
}