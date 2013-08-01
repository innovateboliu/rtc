// enter a room callback
function createEntreForm(roomKey) {
  document.getElementById("bkg").style.visibility = "";
  document.getElementById("enterRoomForm").style.visibility = "";
}
      
function enterRoom() {
  var request = new XMLHttpRequest();
  
  var userName = document.getElementById('enterUserName').value

  request.onreadystatechange = function() {
    if (request.readyState == 4 || request.readyState == 200) {
      if (request.responseText == "Failed") {
        alert("you already entered the room");
      } else {
        var win = window.open("http://www.google.com",'_self',false);
        win.document.open();
        win.document.write(request.responseText);
        win.document.close(); 
      }  
    }
  }

  request.open("GET", "chatPage?r=" + roomKey +"&userName=" + userName, true);
  request.send();
}

function returnToRoomList(){
  document.getElementById("bkg").style.visibility = "hidden";
  document.getElementById("enterRoomForm").style.visibility = "hidden";
}

function confirmNewRoom() {
  var createNewRoomButton = document.getElementById("createNewRoom");
  var parent=document.getElementById('newRoom');
  parent.appendChild(createNewRoomButton);

  var request = new XMLHttpRequest();
  var roomName = document.getElementById('newRoomName').value
  var userName = document.getElementById('newUserName').value
  

  request.open("GET", "createNewRoom?roomName=" + roomName +"&userName=" + userName, true);
  request.send();

  request.onreadystatechange = function() {
    if (request.readyState == 4 || request.readyState == 200) {
      var roomList = document.getElementById('roomList');
      var roomButton = document.createElement('button');
      roomButton.style.width='180px';
      roomButton.style.height = '180px';
      roomButton.style.fontFamily= 'Arial';
      roomButton.style.fontSize= '1.2em';
      roomButton.style.margin = '20px 20px 20px 0';
      
      result = request.responseText;
      if (result == 'failed') {
        alert("this name is not available, please use another one");
      } else {
        var roomKey = result.split('&')[1]
        roomButton.innerHTML = 'Room name: ' + roomKey;
        roomButton.id = roomKey
        roomButton.onclick = function() {
          createEntreForm(this.id);

        }
        roomList.appendChild(roomButton);
      }
    }
  }
  document.getElementById("newRoomBkg").style.visibility = "hidden";
  document.getElementById("newRoomForm").style.visibility = "hidden";
  document.getElementById("roomList").style.visibility = "";
}

function cancelNewRoom() {
  document.getElementById("newRoomBkg").style.visibility = "hidden";
  document.getElementById("newRoomForm").style.visibility = "hidden";
  document.getElementById("roomList").style.visibility = "";
}

// create a new room callback       
function createNewRoom() {
  document.getElementById("newRoomBkg").style.visibility = "";
  document.getElementById("newRoomForm").style.visibility = "";
  document.getElementById("roomList").style.visibility = "hidden";
}
  	  
document.onreadystatechange = initRoomList;

function initRoomList() {
  if (document.readyState == "complete") {
    if (rooms) {
      var roomList = document.getElementById('roomList');
      for (var i = 0; i < rooms.length; i++) {
        var roomButton = document.createElement('button');
        roomButton.style.width='180px';
        roomButton.style.height = '180px';
        roomButton.style.fontFamily= 'Arial';
        roomButton.style.fontSize= '1.2em';
        roomButton.style.margin = '20px 20px 20px 0';
        roomKey = rooms[i];
        roomButton.id = roomKey
        roomButton.innerHTML = 'Room name: ' + roomKey;
        roomButton.onclick = function() {
          createEntreForm(this.id);
        }
        roomList.appendChild(roomButton);
      }
    }
  }
}
