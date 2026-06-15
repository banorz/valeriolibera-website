// Requires jQuery
var counterURL = "https://api.counterapi.dev/v1/valeriolibera/visits";

function counterPageHit(){
  $.ajax({
   url: counterURL + "/up",
   type: 'GET',
   success: function(response){
     if (response && response.count !== undefined) {
       updateVisitsUI(response.count);
     }
   }
  });
}

function counterGetStats(callback,errorCallback){
  // Appending the trailing slash directly avoids the HTTP 301 redirect which strips CORS headers
  $.ajax({
   url: counterURL + "/",
   type: 'GET',
   success: function(response) {
     if(response==null||response.count==null){
       if (errorCallback) errorCallback();
       return;
     }

     var value = response.count;
     var mockResponse = {
       total: value,
       last_hour: Math.min(10, Math.floor(Math.random() * 2) + 1), // Simulated activity
       max_value: 20
     };

     if(callback!=null){
       callback(mockResponse);
     }
     
     updateVisitsUI(value);
   },
   error: function(){
     if(errorCallback!=null){
       errorCallback();
     }
   }
  });
}

function updateVisitsUI(value) {
  var visitsEl = document.getElementById("diag-visits");
  if (visitsEl) {
    visitsEl.innerHTML = value;
  }
}

$(function(){
  // Prevent double counting during hot-reloads in local development sessions
  if (!sessionStorage.getItem("hit_registered")) {
    counterPageHit();
    sessionStorage.setItem("hit_registered", "true");
  } else {
    counterGetStats(null, function() {
      // If the API fails or fails to fetch, fallback silently
    });
  }
});
