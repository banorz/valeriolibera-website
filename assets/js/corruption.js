var corrupt_originalText = []
var corrupt_intervals = []
var defaultCorruptionProbability = 0.015
var minCorruption = 0.005
var maxCorruption = 0.33
var currentCorruptionProbability = defaultCorruptionProbability
function corrupt_checkProbability(callback){
  var dataCheck = localStorage.getItem("lastCorruptionCheck");
  if(dataCheck==null){
    corrupt_getProbability(callback)
    return;
  }
  var current = new Date(formatDate(new Date()));
  var given = new Date(formatDate(dataCheck));
  if(given < current){
    corrupt_getProbability(callback)
    return;
  }else{
    var corruption = localStorage.getItem("corruption");
    if(corruption==null){
      localStorage.removeItem("lastCorruptionCheck")
      corrupt_getProbability(callback)
      return;
    }
    if(corruption==0){
      localStorage.removeItem("corruption")
      localStorage.removeItem("lastCorruptionCheck")
      corrupt_getProbability(callback)
      return;
    }
    currentCorruptionProbability = parseFloat(corruption);
    if(callback!=null){
      callback()
    }
    corrupt_init()
  }
}
function formatDate(date) {
  var date = new Date(date);
  var hours = date.getHours();
  var minutes = '00';
  var strTime = hours + ':' + minutes;
  return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}
function corrupt_getProbability(callback){
  counterGetStats(function(result){
    var maxValue = result.max_value
    var lastHourCount = result.last_hour
    var corruption = lastHourCount/maxValue/3
    corruption = corrupt_clamp(corruption,minCorruption,maxCorruption)
    var current = new Date()
    localStorage.setItem("lastCorruptionCheck",formatDate(current))
    localStorage.setItem("corruption",corruption)
    currentCorruptionProbability=parseFloat(corruption);
    if(callback!=null){
      callback()
    }
    corrupt_init()
  },function(){
    currentCorruptionProbability=defaultCorruptionProbability;
    if(callback!=null){
      callback()
    }
    corrupt_init()
  })
}
function corrupt_init(){
  var corrupt_elements = document.getElementsByClassName("corrupt-text")
  var corrupt_index
  for (var i = 0; i < corrupt_intervals.length; i++){
    window.clearInterval(corrupt_intervals[i])
  }
  corrupt_intervals = []
  corrupt_originalText = []
  for (corrupt_index = 0; corrupt_index < corrupt_elements.length; corrupt_index++) {
      var corrupt_element = corrupt_elements[corrupt_index]
      var corrupt_destructive = corrupt_element.getAttribute("destructive")
      var corrupt_probability = corrupt_element.getAttribute("probability")
      corrupt_intervals[corrupt_index] = window.setInterval(corrupt_text,500,corrupt_element,corrupt_index,corrupt_destructive,corrupt_probability)
      corrupt_originalText[corrupt_index] = corrupt_element.innerHTML
  }
}
function corrupt_text(element,index,isDestructive,corruptionProbability){

  //if(corruptionProbability == 0){
  //  corruptionProbability=currentCorruptionProbability
  //}
  corruptionProbability = corrupt_clamp(currentCorruptionProbability,0.01,1)
  if(!isDestructive){
    if(!(Math.random() >= 0.003)){
      element.innerHTML = corrupt_originalText[index]
    }
  }
  var text = element.innerHTML
  if(!(Math.random() >= corruptionProbability)){
    var charIndex = corrupt_random(0,text.length)
    var resultText = corrupt_setCharAt(text,charIndex,String.fromCharCode(corrupt_random(0,65536)))
    element.innerHTML = resultText
  }
}
function corrupt_clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num
}
function corrupt_random(min,max){
  return Math.random() * (max - min) + min
}
function corrupt_setCharAt(str,index,chr) {
    if(index > str.length-1) return str
    return str.substr(0,index) + chr + str.substr(index+1)
}
function chaos(){
  currentCorruptionProbability=parseFloat(5);
  localStorage.setItem("corruption",currentCorruptionProbability)
  corrupt_init()
}
function order(){
  currentCorruptionProbability=defaultCorruptionProbability;
  localStorage.removeItem("corruption")
  corrupt_checkProbability()
}
