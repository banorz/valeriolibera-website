function counterPageHit(){$.ajax({url:counterURL,type:"PUT",success:function(){}})}function counterGetStats(t,n){$.ajax({url:counterURL,type:"GET",success:function(u){null!=u&&null!=u.last_hour&&null!=u.max_value&&null!=u.total?null!=t&&t(u):n()},error:function(){null!=n&&n()}})}var counterURL="https://www.valeriolibera.it/services/counter.php";$(function(){counterPageHit()});