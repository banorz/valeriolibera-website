// Requires jQuery
var counterURL = "https://www.valeriolibera.it/services/counter.php";
function counterPageHit(){
  $.ajax({
   url: counterURL,
   type: 'PUT',
   success: function(){
     //console.log("page hit ok");
   }
  });
}
function counterGetStats(callback,errorCallback){
  $.ajax({
   url: counterURL,
   type: 'GET',
   success: function(response) {
     if(response==null||response["last_hour"]==null||response["max_value"]==null||response["total"]==null){
       errorCallback();
       return;
     }

     if(callback!=null){
       callback(response);
     }

   },
   error: function(){
     if(errorCallback!=null){
       errorCallback();
     }
   }
  });
}
$(function(){
  counterPageHit();
});
