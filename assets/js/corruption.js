var corrupt_originalText = []
var corrupt_intervals = []
var defaultCorruptionProbability = 0.035
var minCorruption = 0.005
var maxCorruption = 0.33
var currentCorruptionProbability = defaultCorruptionProbability
var corrupt_forcedMode = localStorage.getItem("corrupt_forcedMode") || null;

function corrupt_checkProbability(callback){
  if (corrupt_forcedMode === 'order') {
    currentCorruptionProbability = 0.0;
    if(callback!=null) callback();
    corrupt_init();
    updateDiagnosticUI();
    return;
  }
  if (corrupt_forcedMode === 'chaos') {
    currentCorruptionProbability = 0.8;
    if(callback!=null) callback();
    corrupt_init();
    updateDiagnosticUI();
    return;
  }

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
  updateDiagnosticUI();
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
    updateDiagnosticUI();
  },function(){
    currentCorruptionProbability=defaultCorruptionProbability;
    if(callback!=null){
      callback()
    }
    corrupt_init()
    updateDiagnosticUI();
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
  if (corrupt_forcedMode === 'order') {
    if (element.innerHTML !== corrupt_originalText[index]) {
      element.innerHTML = corrupt_originalText[index];
    }
    return;
  }

  var probability = currentCorruptionProbability;
  if (corrupt_forcedMode === 'chaos') {
    probability = 0.8;
  } else {
    probability = corrupt_clamp(probability, 0.01, 1);
  }

  if(!isDestructive){
    if(!(Math.random() >= 0.003)){
      element.innerHTML = corrupt_originalText[index]
    }
  }
  var text = element.innerHTML
  if(!(Math.random() >= probability)){
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

function setForcedMode(mode) {
  corrupt_forcedMode = mode;
  if (mode === null) {
    localStorage.removeItem("corrupt_forcedMode");
  } else {
    localStorage.setItem("corrupt_forcedMode", mode);
  }
  
  if (mode === 'order') {
    currentCorruptionProbability = 0.0;
    // Restore all text elements instantly
    var corrupt_elements = document.getElementsByClassName("corrupt-text");
    for (var i = 0; i < corrupt_elements.length; i++) {
      if (corrupt_originalText[i] !== undefined) {
        corrupt_elements[i].innerHTML = corrupt_originalText[i];
      }
    }
  } else if (mode === 'chaos') {
    currentCorruptionProbability = 0.8;
  }
  
  corrupt_init();
  updateDiagnosticUI();
}

function updateDiagnosticUI() {
  var probabilityEl = document.getElementById("diag-prob");
  var modeEl = document.getElementById("diag-mode");
  
  if (probabilityEl) {
    var displayProb = (currentCorruptionProbability * 100).toFixed(1) + "%";
    probabilityEl.innerHTML = displayProb;
  }
  
  if (modeEl) {
    var displayMode = corrupt_forcedMode ? corrupt_forcedMode.toUpperCase() : "AUTO";
    modeEl.innerHTML = displayMode;
  }
}

// Deprecated functions kept for compatibility
function chaos(){
  setForcedMode('chaos');
}
function order(){
  setForcedMode('order');
}
