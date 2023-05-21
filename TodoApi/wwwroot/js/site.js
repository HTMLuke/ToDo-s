

const uri = 'api/Todo';
let todos = [];


function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
    
}
function modaladd2() {
  /*date = new Date();
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  date2 = year + "-" + month + "-" + day;
  // String(date2);*/
  datebox1 = document.getElementById("datebox");
  // datebox1.setAttribute('value', date2);
  addmodaö = document.getElementById("addtodo");
  // var teste = datebox1.value;
  addmodaö.style.display = "block";

}
function addItem() {
  const addNameTextbox = document.getElementById('add-name');
  if (addNameTextbox.value == null || addNameTextbox.value.trim() == "") {
    var fehlerdiv = document.getElementById('eingabefehler');
    fehlerdiv.textContent = "Please enter a Name";
    return;
  } else {
    var fehlerdiv = document.getElementById('eingabefehler');
    fehlerdiv.textContent = "";
  }
  datebox1 = document.getElementById("datebox");
  if (datebox1.value == null || datebox1.value == "") {
    var fehlerdivdate = document.getElementById('dateerroradd');
    fehlerdivdate.textContent = "Please enter a Date";
    return;
  } else {
    var fehlerdivdate = document.getElementById('dateerroradd');
    fehlerdivdate.textContent = "";
  }
  var dateboxrow = datebox1.value;
  var dateboxvalue = dateboxrow.split("-")
  /*var day =  dateboxvalue[2]; // parseInt(stSplit[1],10)-1, parseInt(stSplit[0],10);
  var month = dateboxvalue[1];
  var year = dateboxvalue[0];*/
  const item = {
    isComplete: false,
    name: addNameTextbox.value.trim(),
    day: dateboxvalue[2], // parseInt(stSplit[1],10)-1, parseInt(stSplit[0],10);
    month: dateboxvalue[1],
    year: dateboxvalue[0]
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
    })
    //.catch(error => console.error('Unable to add item.', error));
    .catch(error => alert("Error: Unable to add item. No name"));
  addmodaö = document.getElementById("addtodo");
  // datebox1.setAttribute('value', '');

  addmodaö.style.display = "none";
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
    .then(() => getItems())
    .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  el = document.getElementById("example");
  const item = todos.find(item => item.id === id);
  date3 = item.year + "-" + item.month + "-" + item.day;
  document.getElementById('dateboxedit').value = date3;
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-isComplete').checked = item.isComplete;
  document.getElementById('example').style.display = 'block';


}

function closeaddbox() {
  box = document.getElementById("addtodo");
  box.style.display = "none";
  var fehlerdivdate4 = document.getElementById('dateerroredit');
    fehlerdivdate4.textContent = "";
  error = document.getElementById('eingabefehler');
  error.textContent = "";
}
function closebox() {
  var fehlerdiv2 = document.getElementById('editerror');
  fehlerdiv2.textContent = "";
  var fehlerdivdate3 = document.getElementById('dateerroredit');
    fehlerdivdate3.textContent = "";
  el = document.getElementById("example");
  el.style.display = "none";

}
function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const er = document.getElementById('edit-name');
  if (er.value == null || er.value.trim() == "") {
    var fehlerdiv = document.getElementById('editerror');
    fehlerdiv.textContent = "Please enter a Name";
    return;
  } else {
    var fehlerdiv = document.getElementById('editerror');
    fehlerdiv.textContent = "";
  }
  datebox2 = document.getElementById("dateboxedit");
  if (datebox2.value == null || datebox2.value == "") {
    var fehlerdivdate3 = document.getElementById('dateerroredit');
    fehlerdivdate3.textContent = "Please enter a Date";
    return;
  } else {
    var fehlerdivdate3 = document.getElementById('dateerroredit');
    fehlerdivdate3.textContent = "";
  }
  var dateboxrow = datebox2.value;
  var dateboxvalue = dateboxrow.split("-")
  const item = {
    id: (itemId),
    isComplete: document.getElementById('edit-isComplete').checked,
    name: document.getElementById('edit-name').value.trim(),
    day: dateboxvalue[2], // parseInt(stSplit[1],10)-1, parseInt(stSplit[0],10);
    month: dateboxvalue[1],
    year: dateboxvalue[0]
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(() => getItems())
    //.catch(error => console.error('Unable to update item.', error));
    .catch(error => alert("Error: Unable to add item. No name"));
  el = document.getElementById("example");
  el.style.display = "none";
  var fehlerdiv2 = document.getElementById('editerror');
  fehlerdiv2.textContent = "";
  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('example').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'to-do' : 'to-dos';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}
function triggerics(){
  fetch(uri)
  .then(response => response.json())
  .then(data => _genicserall(data))
  .catch(error => console.error('Unable to get items.', error));
}/*
function _genicserall(data){
  //  var data;
  fetch(uri)
  .then(response => response.json())
  // .then(data = data1)
  .catch(error => console.error('Unable to get items.', error));
 if (data == null){
  alert("No Item");
 }
 eventName1 = data1[0].name;
  day0 = data1[0].day
  month0 = data1[0].month
  year0 = data1[0].year

  // date5 = year0 + month0 + day0 + "T" + "120000Z";
 //name of file to download as
 fileName = 'my-complete-ToDo.ics';
 
 //start time of event in iCal
// dateStart = date5;
 
 //end time of event in iCal
//  dateEnd = date5;


     //helper functions
    
    //iso date for ical formats
    this._isofix = function(d){
		  var offset = ("0"+((new Date()).getTimezoneOffset()/0)).slice(-2);

	    if(typeof d=='string'){
		    return d.replace(/\-/g, '')+'T'+offset+'0000Z';
	    }else{
				return d.getFullYear()+this._zp(d.getMonth()+1)+this._zp(d.getDate())+'T'+this._zp(d.getHours())+"0000Z";
		  }
		}
		
    //zero padding for data fixes
    this._zp = function(s){ return ("0"+s).slice(-2); }
		this._save = function(fileURL){
		  if (!window.ActiveXObject) {
		      var save = document.createElement('a');
		      save.href = fileURL;
		      save.target = '_blank';
		      save.download = this.fileName || 'unknown';
		
		      var evt = new MouseEvent('click', {
		          'view': window,
		          'bubbles': true,
		          'cancelable': false
		      });
		      save.dispatchEvent(evt);
		
		      (window.URL || window.webkitURL).revokeObjectURL(save.href);
		  }
		
		  // for IE < 11
		  else if ( !! window.ActiveXObject && document.execCommand)     {
		      var _window = window.open(fileURL, '_blank');
		      _window.document.close();
		      _window.document.execCommand('SaveAs', true, this.fileName || fileURL)
		      _window.close();
		  }	
		}    

var now = new Date();
var ics_lines = [
 "BEGIN:VCALENDAR",
 "VERSION:2.0",
 "PRODID:-//ToDoAPI",
 "METHOD:PUBLISH",
 "BEGIN:VEVENT",
 "UID:event-"+now.getTime()+"@addroid.com",
 "SUMMARY:"+this.eventName,
 "DESCRIPTION:"+this.eventName,
 "CLASS: PRIVATE",
 "DTSTART:"+dateStart,
 "DTEND:"+dateEnd,
 "DTSTAMP:"+dateStart,
 "END:VEVENT"
 
];

var ics_lines = [];

  data.forEach[ics_lines => {
    eventName1 = ics_lines.name;
    day0 = ics_lines.day;
    month0 = ics_lines.month;
    year0 = ics_lines.year;
    date5 = year0 + month0 + day0 + "T" + "120000Z";
  +"BEGIN:VEVENT",
   "UID:event-"+now.getTime()+"@addroid.com",
   "SUMMARY:"+eventName1,
   "DESCRIPTION:"+eventName1,
   "CLASS: PRIVATE",
   "DTSTART:"+date5,
   "DTEND:"+date5,
   "DTSTAMP:"+dateStart,
   "END:VEVENT"+date5
  }];

var dlurl = 'data:text/calendar;base64,'+btoa(ics_lines.join('\r\n'));

 var dlurl = 'data:text/calendar;base64,'+btoa(ics_lines.join('\r\n'));
 
 try {
   this._save(dlurl);
 }catch(e){
   console.log(e);
 }
}*/
function genradeics(_name, _day, _month, _year){


  date2 = _year  + _month + _day + "T" + "120000Z";
 //name of event in iCal
eventName = _name;
    
 //name of file to download as
 fileName = 'my-ToDo.ics';
 
 //start time of event in iCal
dateStart = date2;
 
 //end time of event in iCal
 dateEnd = date2;


     //helper functions
    
    //iso date for ical formats
    /*this._isofix = function(d){
		  var offset = ("0"+((new Date()).getTimezoneOffset()/0)).slice(-2);

	    if(typeof d=='string'){
		    return d.replace(/\-/g, '')+'T'+offset+'0000Z';
	    }else{
				return d.getFullYear()+this._zp(d.getMonth()+1)+this._zp(d.getDate())+'T'+this._zp(d.getHours())+"0000Z";
		  }
		}*/
		
    this._zp = function(s){ return ("0"+s).slice(-2); }
		this._save = function(fileURL){
		  if (!window.ActiveXObject) {
		      var save = document.createElement('a');
		      save.href = fileURL;
		      save.target = '_blank';
		      save.download = this.fileName || 'unknown';
		
		      var evt = new MouseEvent('click', {
		          'view': window,
		          'bubbles': true,
		          'cancelable': false
		      });
		      save.dispatchEvent(evt);
		
		      (window.URL || window.webkitURL).revokeObjectURL(save.href);
		  }
		
		  // for IE < 11
		  else if ( !! window.ActiveXObject && document.execCommand)     {
		      var _window = window.open(fileURL, '_blank');
		      _window.document.close();
		      _window.document.execCommand('SaveAs', true, this.fileName || fileURL)
		      _window.close();
		  }	
		}    

var now = new Date();
var ics_lines2 = [
 "BEGIN:VCALENDAR",
 "VERSION:2.0",
 "PRODID:-//ToDoAPI",
 "METHOD:PUBLISH",
 "BEGIN:VEVENT",
 "UID:event-"+now.getTime()+"@addroid.com",
 "SUMMARY:"+this.eventName,
 "DESCRIPTION:"+this.eventName,
 "CLASS: PRIVATE",
 "DTSTART:"+dateStart,
 "DTEND:"+dateEnd,
 "DTSTAMP:"+dateStart,
 "END:VEVENT",
 "END:VCALENDAR"
];

var dlurl = 'data:text/calendar;base64,'+btoa(ics_lines2.join('\r\n'));

 var dlurl = 'data:text/calendar;base64,'+btoa(ics_lines2.join('\r\n'));
 
 try {
   this._save(dlurl);
 }catch(e){
   console.log(e);
 }
  

}
  


function updatecheckbox(_id, _isComplete, _name, _day, _month, _year) {

  let chkd = (_isComplete === "true");
  var _item = {
    id: _id,
    isComplete: chkd,
    name: _name,
    day: _day,
    month: _month,
    year: _year

  };
  fetch(`${uri}/${_id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(_item)
  })
    .then(() => getItems())
    .catch(error => console.error('Unable to update item.', error));
}

function _displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';
    isCompleteCheckbox.setAttribute("class", "form-check-input checkbox");
    isCompleteCheckbox.disabled = false;
    isCompleteCheckbox.id = "check";
    isCompleteCheckbox.checked = item.isComplete;
    //var chk = document.getElementById('check');
    isCompleteCheckbox.setAttribute('onchange', 'updatecheckbox(\'' + item.id + '\',\'' + !(item.isComplete) + '\',\'' + item.name + '\', \'' + item.day + '\', \'' + item.month + '\',\'' + item.year + '\',)');
    let editButton = button.cloneNode(false);
    editButton.innerHTML = "&#9998;";
    editButton.setAttribute('onclick', 'displayEditForm(\'' + item.id + '\')');
    editButton.setAttribute('title', 'Edit');
    editButton.setAttribute("type", "button");
    editButton.setAttribute("class", "btn buttonslight btn-light");

    let deleteButton = button.cloneNode(false);
    deleteButton.innerHTML = "&#x1F5D1;";
    deleteButton.setAttribute('onclick', 'deleteItem(\'' + item.id + '\')');
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute('title', 'Delete')
    deleteButton.setAttribute("class", "btn buttonslight btn-light");
    let expotbutton = button.cloneNode(false);
    expotbutton.innerHTML = "&#128197;";
    expotbutton.setAttribute('onclick', 'genradeics(\'' + item.name + '\', \'' + item.day + '\', \'' + item.month + '\',\'' + item.year + '\',)');
    expotbutton.setAttribute('type', 'button');
    expotbutton.setAttribute('title', 'Export for Calender')
    expotbutton.setAttribute("class", "btn buttonslight btn-light");
    date = item.day;
    year = item.year;
    month = item.month;
    date2 = date + "." + month + "." + year;

    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    td1.appendChild(isCompleteCheckbox);
    td1.setAttribute("class", "text-center");
    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.name);
    td2.appendChild(textNode);

    let td5 = tr.insertCell(2);
    let textNode2 = document.createTextNode(date2);
    td5.appendChild(textNode2)

    let td3 = tr.insertCell(3);
    td3.appendChild(editButton);

    let td4 = tr.insertCell(4);
    td4.appendChild(deleteButton);
    td4.setAttribute("style", "border-left-style: hidden;");

    let td6 = tr.insertCell(5);
    td6.appendChild(expotbutton);
    td6.setAttribute("style", "border-left-style: hidden;");
  });

  todos = data;
}

