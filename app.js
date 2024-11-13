

var input = document.getElementById('input');
var array = [];
var idCount = 1;

function addToDo() {
  var inputValue = input.value;
  if (inputValue.trim() === '') return;

  // Check if update mode is active
  if (input.dataset.updateId) {
    // Update existing item
    const idToUpdate = parseInt(input.dataset.updateId, 10);
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === idToUpdate) {
        array[i].value = inputValue;
        break;
      }
    }
    input.removeAttribute('data-update-id'); // Clear update mode
  } else {
    // Add new item
    array.push({
      id: idCount,
      value: inputValue,
    });
    idCount += 1;
  }

  input.value = '';
  render();
}

function render() {
  var add = document.getElementById("add");
  add.innerHTML = "";
  
  for (let i = 0; i < array.length; i++) {
    var newAdd = document.createElement("div");
    newAdd.setAttribute("id", array[i].id);
    newAdd.setAttribute("class", "brd");

    var newAddpara = document.createElement("p");
    newAddpara.innerHTML = `${array[i].id} - <br> ${array[i].value}`;
    newAdd.appendChild(newAddpara);

    // Update button
    var updatebtn = document.createElement("button");
    updatebtn.setAttribute("class", "update");
    updatebtn.textContent = "UPDATE";
    updatebtn.onclick = function () {
      // Set input value to current item’s value and enter update mode
      input.value = array[i].value;
      input.dataset.updateId = array[i].id; // Store ID in input for update mode
    };

    // Delete button
    var deletebtn = document.createElement("button");
    deletebtn.setAttribute("class", "decro");
    deletebtn.textContent = "DELETE";
    deletebtn.onclick = function () {
      deleteToDo(array[i].id);
    };

    newAdd.appendChild(updatebtn);
    newAdd.appendChild(deletebtn);
    add.appendChild(newAdd);
  }
}

function deleteToDo(id) {
  for (let j = 0; j < array.length; j++) {
    if (array[j].id === id) {
      array.splice(j, 1);
      break;
    }
  }
  render();
}

function updateToDo(id) {
  var newValue = document.getElementById("input").value;
  if (newValue.trim() === '') return;

  for (let k = 0; k < array.length; k++) {
    if (array[k].id === id) {
      array[k].value = newValue;
      break;
    }
  }
  input.value = '';
  render();
}

