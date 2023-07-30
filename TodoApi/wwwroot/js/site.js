

const uri = 'api/Todo';
let todos = [];

function getItems() {

  fetch(uri)      //get Items from Server
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error)); //error when server problem

}

function displayaddform() {

  datebox1 = document.getElementById("datebox");      //get html elements
  addform = document.getElementById("addtodo");
  addform.style.display = "block";      //display modal dialog form
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');     //get html textbox

  if (addNameTextbox.value == null || addNameTextbox.value.trim() == "") {      //security check if textbox is empty
    var fehlerdiv = document.getElementById('eingabefehler');     //get html error text
    fehlerdiv.textContent = "Please enter a Name";      //set error text
    return;
  } else {        //hide if all correct
    var fehlerdiv = document.getElementById('eingabefehler');
    fehlerdiv.textContent = "";
  }

  datebox1 = document.getElementById("datebox");      // get html datebox

  if (datebox1.value == null || datebox1.value == "") {     //same security check as in line 20
    var fehlerdivdate = document.getElementById('dateerroradd');
    fehlerdivdate.textContent = "Please enter a Date";
    return;
  } else {
    var fehlerdivdate = document.getElementById('dateerroradd');
    fehlerdivdate.textContent = "";
  }

  var dateboxrow = datebox1.value;        //copy value of datebox in working variable
  var dateboxvalue = dateboxrow.split("-")   //split value for working

  const item = {      //creat item for sending to server
    isComplete: false,
    name: addNameTextbox.value.trim(),  //trim the text input
    day: dateboxvalue[2], //use data from array
    month: dateboxvalue[1],
    year: dateboxvalue[0]
  };

  fetch(uri, {      //send item to server
    method: 'POST',   //set sending method
    headers: {
      'Accept': 'application/json',  //configurate json
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)    //creat json
  })
    .then(response => response.json())      //get response
    .then(() => {
      getItems();     //reloade items
      addNameTextbox.value = '';      //clear input textbox
    })
    .catch(error => alert("Error: Unable to add item. No name"));    //if something went wrong error
  addform = document.getElementById("addtodo");     // get html modal dialog
  addform.style.display = "none";       //hide modal dialogue
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {       //send 
    method: 'DELETE'      //set sending method
  })
    .then(() => getItems())     //reloade items
    .catch(error => console.error('Unable to delete item.', error));      //if something went wrong error
}

function displayEditForm(id) {
  editformdis = document.getElementById("editmodal");      //get html edit modal dialog
  const item = todos.find(item => item.id === id);      //find the right item for editing
  dateusable = item.year + "-" + item.month + "-" + item.day;      //set date variables in usable format

  document.getElementById('dateboxedit').value = dateusable;      //set value of datebox
  document.getElementById('edit-name').value = item.name;     //set value of text box
  document.getElementById('edit-id').value = item.id;     //set item id
  document.getElementById('edit-isComplete').checked = item.isComplete;     //set is completed or not
  editformdis.style.display = 'block';     //display modal dialog form
}

function closeaddbox() {
  addbox = document.getElementById("addtodo");   //get html add modal dialog
  addbox.style.display = "none";      //hide modal dialog form
  var fehlerdivdate4 = document.getElementById('dateerroradd');     //error text date box
  fehlerdivdate4.textContent = "";      //clear error text 
  error = document.getElementById('eingabefehler');     //error text input box
  error.textContent = "";     //clear error text
  textboxadd = document.getElementById('add-name');
  textboxadd.textContent = "";        //clear input box
}

function closebox() {
  var fehlerdiv2 = document.getElementById('editerror');
  fehlerdiv2.textContent = "";      //clear error text 
  var fehlerdivdate3 = document.getElementById('dateerroredit');
  fehlerdivdate3.textContent = "";        //clear error text 
  editform = document.getElementById("editmodal");
  editform.style.display = "none";      //hide edit modal dialog

}
function updateItem() {
  const itemId = document.getElementById('edit-id').value;    //get item id
  const edittext = document.getElementById('edit-name');
  if (edittext.value == null || edittext.value.trim() == "") {        //security check if text box is emty
    var fehlerdiv = document.getElementById('editerror');
    fehlerdiv.textContent = "Please enter a Name";
    return;
  } else {
    var fehlerdiv = document.getElementById('editerror');     //else delete error text
    fehlerdiv.textContent = "";
  }

  datebox2 = document.getElementById("dateboxedit");
  if (datebox2.value == null || datebox2.value == "") {     //security check if date box is emty
    var fehlerdivdate3 = document.getElementById('dateerroredit');
    fehlerdivdate3.textContent = "Please enter a Date";
    return;
  } else {
    var fehlerdivdate3 = document.getElementById('dateerroredit');      //else delete error text
    fehlerdivdate3.textContent = "";
  }

  var dateboxrow = datebox2.value;      //read date box value
  var dateboxendvalue = dateboxrow.split("-")     //split value for working

  //creat item for sending
  const item = {
    id: (itemId),
    isComplete: document.getElementById('edit-isComplete').checked,
    name: edittext.value.trim(),
    day: dateboxendvalue[2],
    month: dateboxendvalue[1],
    year: dateboxendvalue[0]
  };
  //send item to server
  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(() => getItems())     //reload items
    .catch(error => alert("Error: Unable to add item. No name"));

  //hide edit modal dialog form
  editform = document.getElementById("editmodal");
  editform.style.display = "none";

  //clear error message
  var fehlerdiv2 = document.getElementById('editerror');
  fehlerdiv2.textContent = "";
}

function _displayCount(itemCount) {
  //count items and display
  const name = (itemCount === 1) ? 'to-do' : 'to-dos';
  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}


function closeerrorbox() {
  errorbox = document.getElementById("erroricsall");
  errorbox.style.display = "none";
}


function getItemsics() {
  //get current items and trigger ics function 
  fetch(uri)
    .then(response => response.json())
    .then(data => _genicsallitems(data))     //trigger ics function 
    .catch(error => console.error('Unable to get items.', error));
}
function _genicsallitems(data) {

  // if no data display error dialog
  if (data == null || data.length == 0) {
    errorbox = document.getElementById("erroricsall");
    errorbox.style.display = "block";
    return;
  }

  //set file name
  fileName = 'all_ToDos.ics';



  //iso date for ical formats
  this._isofix = function (d) {
    var offset = ("0" + ((new Date()).getTimezoneOffset() / 0)).slice(-2);

    if (typeof d == 'string') {
      return d.replace(/\-/g, '') + 'T' + offset + '0000Z';
    } else {
      return d.getFullYear() + this._zp(d.getMonth() + 1) + this._zp(d.getDate()) + 'T' + this._zp(d.getHours()) + "0000Z";
    }
  }

  //zero padding for data fixes
  this._zp = function (s) { return ("0" + s).slice(-2); }
  this._save = function (fileURL) {
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
    else if (!!window.ActiveXObject && document.execCommand) {
      var _window = window.open(fileURL, '_blank');
      _window.document.close();
      _window.document.execCommand('SaveAs', true, this.fileName || fileURL)
      _window.close();
    }
  }

  //creat ics item array
  var now = new Date();
  var ics_lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ToDoAPI",
    "METHOD:PUBLISH",
  ];

  // add each item
  data.forEach(item => {
    //prepare variables and read values
    summary = "SUMMARY:" + item.name;
    decrip = "DESCRIPTION:" + item.name;
    day0 = item.day;
    month0 = item.month;
    year0 = item.year;
    dateics = year0 + month0 + day0 + "T" + "120000Z";
    dtstart = "DTSTART:" + dateics;
    dtend = "DTEND:" + dateics;
    dtstamp = "DTSTAMP:" + dateics;
    uide = "UID:event-" + now.getTime() + "@addroid.com";

    //add item to array
    ics_lines.push("BEGIN:VEVENT", uide, summary, decrip, "CLASS: PRIVATE", dtstart, dtend, dtstamp, "END:VEVENT");

    //set alls variable to null
    summary = null;
    decrip = null;
    day0 = null;
    month0 = null;
    year0 = null;
    dateics = null;
    dtstart = null;
    dtend = null;
    dtstamp = null;
    uide = null;
    ics_linesitem = null;
  });
  //add end of ics
  ics_lines.push("END:VCALENDAR");

  //configure the file for calender
  var dlurl = 'data:text/calendar;base64,' + btoa(ics_lines.join('\r\n'));
  var dlurl = 'data:text/calendar;base64,' + btoa(ics_lines.join('\r\n'));

  //try to save file
  try {
    this._save(dlurl);
  } catch (e) {
    console.log(e);
  }
}
function genradeics(_name, _day, _month, _year) {

  //creat useable time variable
  date2 = _year + _month + _day + "T" + "120000Z";

  //name of todo
  eventName = _name;

  //name of file to download as
  fileName = 'my-ToDo.ics';

  //start time of todo
  dateStart = date2;

  //end time of todo
  dateEnd = date2;


  //zero padding for data fixes
  this._zp = function (s) { return ("0" + s).slice(-2); }
  this._save = function (fileURL) {
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
    else if (!!window.ActiveXObject && document.execCommand) {
      var _window = window.open(fileURL, '_blank');
      _window.document.close();
      _window.document.execCommand('SaveAs', true, this.fileName || fileURL)
      _window.close();
    }
  }

  //creat ics item array
  var now = new Date();
  var ics_lines2 = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ToDoAPI",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:event-" + now.getTime() + "@addroid.com",
    "SUMMARY:" + this.eventName,
    "DESCRIPTION:" + this.eventName,
    "CLASS: PRIVATE",
    "DTSTART:" + dateStart,
    "DTEND:" + dateEnd,
    "DTSTAMP:" + dateStart,
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  //configure the file for calender
  var dlurl = 'data:text/calendar;base64,' + btoa(ics_lines2.join('\r\n'));
  var dlurl = 'data:text/calendar;base64,' + btoa(ics_lines2.join('\r\n'));

  //try to save file
  try {
    this._save(dlurl);
  } catch (e) {
    console.log(e);
  }


}


function updatecheckbox(_id, _isComplete, _name, _day, _month, _year) {

  //read variable 
  let completedvar = (_isComplete === "true");

  //creat item for update
  var _item = {
    id: _id,
    isComplete: completedvar,
    name: _name,
    day: _day,
    month: _month,
    year: _year

  };

  //send updated item to server
  fetch(`${uri}/${_id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(_item)
  })
    .then(() => getItems())     //reload items
    .catch(error => console.error('Unable to update item.', error));
}

function _displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';     //clear body

  _displayCount(data.length);     //send the counted items to function

  const button = document.createElement('button');      //create html button element
  //configurate html items
  data.forEach(item => {
    //is completed checkbox
    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';     //configure box as checkbox
    isCompleteCheckbox.setAttribute("class", "form-check-input checkbox");      //set class
    isCompleteCheckbox.disabled = false;      //enable check box
    isCompleteCheckbox.id = "check";      //set id of checkbox
    isCompleteCheckbox.checked = item.isComplete;       //set status
    isCompleteCheckbox.setAttribute('onchange', 'updatecheckbox(\'' + item.id + '\',\'' + !(item.isComplete) + '\',\'' + item.name + '\', \'' + item.day + '\', \'' + item.month + '\',\'' + item.year + '\',)');     //set onchange event

    //edit button
    let editButton = button.cloneNode(false);
    editButton.innerHTML = "&#9998;";       //set style icon
    editButton.setAttribute('onclick', 'displayEditForm(\'' + item.id + '\')');     //set onclick event
    editButton.setAttribute('title', 'Edit');     //set title
    editButton.setAttribute("type", "button");      //set type as button
    editButton.setAttribute("class", "btn buttonslight btn-light");       //set class
    //delete button
    let deleteButton = button.cloneNode(false);
    deleteButton.innerHTML = "&#x1F5D1;";     //set style icon
    deleteButton.setAttribute('onclick', 'deleteItem(\'' + item.id + '\')');      //set onclick event
    deleteButton.setAttribute('title', 'Delete')      //set title
    deleteButton.setAttribute("type", "button");      //set type as button
    deleteButton.setAttribute("class", "btn buttonslight btn-light");     //set class

    //export button
    let expotbutton = button.cloneNode(false);
    expotbutton.innerHTML = "&#128197;";      //set style icon
    expotbutton.setAttribute('onclick', 'genradeics(\'' + item.name + '\', \'' + item.day + '\', \'' + item.month + '\',\'' + item.year + '\',)');      //set onclick event
    expotbutton.setAttribute('title', 'Export for Calender')      //set title
    expotbutton.setAttribute('type', 'button');     //set type as button
    expotbutton.setAttribute("class", "btn buttonslight btn-light");      //set class

    //set date
    date = item.day;
    year = item.year;
    month = item.month;
    date2 = date + "." + month + "." + year;      //set date tu useful variable

    //insert item to table
    let tr = tBody.insertRow();     //insert new row

    //insert isComplete checkbox to row
    let td1 = tr.insertCell(0);
    td1.appendChild(isCompleteCheckbox);
    td1.setAttribute("class", "text-center");

    //insert todo name to row 
    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.name);
    td2.appendChild(textNode);

    //insert date to row
    let td5 = tr.insertCell(2);
    let textNode2 = document.createTextNode(date2);
    td5.appendChild(textNode2)

    //insert editbutton to row
    let td3 = tr.insertCell(3);
    td3.appendChild(editButton);

    //insert deletebutton to row
    let td4 = tr.insertCell(4);
    td4.appendChild(deleteButton);
    td4.setAttribute("style", "border-left-style: hidden;");

    //insert exportbutton to row
    let td6 = tr.insertCell(5);
    td6.appendChild(expotbutton);
    td6.setAttribute("style", "border-left-style: hidden;");
  });
  todos = data;     //copy data in new variable
}

