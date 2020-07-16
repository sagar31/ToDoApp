var expanded = false;
var validToDoList = [];
var profileImage, userId, user = "",
    todo;
var categoryvalues = "";
var temptodoid;
var userValidToDoList = [];
var arrHead = ['ToDoId', 'ToDoItem', 'Date', 'Categories', 'Status', 'ReminderDate']; // table headers.
var editdelHead = ['Edit', 'Delete', 'Check'];
var multiDeleteValue = [];
var sortType = "asc";
var sortTypestring = "asc";
var filter1 = "",
    filter2 = "",
    filter3 = "",
    filter4 = "",
    filter5 = "";


//get valid user list if present in localStorage on  Page Load
window.onload = (function() {

    if (sessionStorage.IsLoggedIn == undefined || sessionStorage.IsLoggedIn == false) {
        window.location.href = "../Views/Login.html";
    }
    userId = window.sessionStorage.UserId;
    if (localStorage.getItem("ValidToDoList") !== null) {
        validToDoList = JSON.parse(localStorage.getItem("ValidToDoList"));
        userValidToDoList = validToDoList.filter(function(index) {
            if (index.UserId == sessionStorage.UserId) {
                return index;
            }
        });
    }

    generateTable(userValidToDoList);
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("Date")[0].setAttribute('min', today);

})()


function generateTable(data) {
    var table = document.getElementById("myTable");
    table.style.width = '100%';
    table.setAttribute('border', '1');
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            if (arrHead.includes(key)) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
        for (key in editdelHead) {
            if (editdelHead[key] == "Edit") {
                let cell = row.insertCell();
                var button = document.createElement('input');
                // set input attributes.
                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Edit');
                // add button's 'onclick' event.
                button.setAttribute('onclick', 'OneditRow(this)');
                cell.appendChild(button);
            }
            if (editdelHead[key] == "Delete") {
                let cell2 = row.insertCell();
                var button2 = document.createElement('input');
                // set input attributes.
                button2.setAttribute('type', 'button');
                button2.setAttribute('value', 'Delete');
                // add button's 'onclick' event.
                button2.setAttribute('onclick', 'OnedeleteRow(this)');
                cell2.appendChild(button2);
            }
            if (editdelHead[key] == "Check") {
                let cell3 = row.insertCell();
                var button3 = document.createElement('input');
                // set input attributes.
                button3.setAttribute('type', 'checkbox');
                button3.setAttribute('value', 'check');
                button3.setAttribute('name', 'multicheck');
                // add button's 'onclick' event.
                button3.setAttribute('onchange', 'MultideleteRow(this)');
                cell3.appendChild(button3);
            }
        }

    }
}


function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}


function ToDoInputFunction() {
    var input;
    input = document.getElementById("ToDoInput");
    filter1 = input.value;
    //Mainfilter(filter1,"","","","");
    Mainfilter(filter1, filter2, filter3, filter4, filter5);

}

function DateFunction() {
    var input3
    input = document.getElementById("Date");
    filter3 = input.value.toUpperCase();
    //Mainfilter("","",filter3,"","");
    Mainfilter(filter1, filter2, filter3, filter4, filter5);
}

function IsCategoryCheck() {
    var input; //input2, filter2  
    input = document.getElementById("Technical").checked == true ? document.getElementById("Technical").value : "";
    input2 = document.getElementById("Practical").checked == true ? document.getElementById("Practical").value : "";
    filter2 = input + ',' + input2
    filter2 = filter2.replace(/^,|,$/g, '');
    //Mainfilter("",filter2,"","","");
    Mainfilter(filter1, filter2, filter3, filter4, filter5);

}



function IsPendingCheck() {
    var input; //filter4, table, tr, td, i, txtValue;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    input = document.getElementById("PendingDate").checked;

    if (input == true) {
        filter4 = new Date().toISOString().split('T')[0];
    } else {
        filter4 = "";
    }
    Mainfilter(filter1, filter2, filter3, filter4, filter5);
    //Mainfilter("","","",filter4,"");

}

//status filter
function IsStatusPendingCheck() {
    var input, input2; //filter5, 
    input = document.getElementById("StatusPending").checked == true ? document.getElementById("StatusPending").value : "";
    input2 = document.getElementById("StatusDone").checked == true ? document.getElementById("StatusDone").value : "";
    filter5 = input + ',' + input2
    filter5 = filter5.replace(/^,|,$/g, '');
    //Mainfilter("","","","",filter5);  
    Mainfilter(filter1, filter2, filter3, filter4, filter5);
}



function OnedeleteRow(row) {

    //var d = row.parentNode.parentNode.rowIndex;
    //document.getElementById('myTable').deleteRow(d); 
    var deletedValue = [];
    deletedValue[0] = row.parentNode.parentNode.children[0].innerText;
    validToDoList = validToDoList.filter(function(index) {
        if (!deletedValue.includes(index.ToDoId.toString())) {
            return index;
        }
    });
    localStorage.setItem("ValidToDoList", JSON.stringify(validToDoList));
    alert('Item deleted Successfully!!');
    window.location.reload();
}

function MultideleteRow(row) {
    //var d = row.parentNode.parentNode.rowIndex;
    var deleteTodolist = row.parentNode.parentNode.children[0].innerText;
    if (row.checked) {
        multiDeleteValue.push(deleteTodolist);
    } else {
        multiDeleteValue = multiDeleteValue.filter(function(e) { return e !== deleteTodolist.toString() })
    }
}

function Clearfilters() {
    //Clearfilters
    document.getElementById('ToDoInput').value = "";
    document.getElementById('Technical').checked = false;
    document.getElementById('Practical').checked = false;
    document.getElementById('Date').value = "";
    document.getElementById('PendingDate').checked = false;
    document.getElementById('StatusPending').checked = false;
    document.getElementById('StatusDone').value = false;
    window.location.reload();
}

function MultipleDelete() {
    if (multiDeleteValue.length == 0) {
        alert('One Item needs to be selected for deletion !!');
        return;
    }

    validToDoList = validToDoList.filter(function(index) {
        if (!multiDeleteValue.includes(index.ToDoId.toString())) {
            return index;
        }
    });
    localStorage.setItem("ValidToDoList", JSON.stringify(validToDoList));
    alert('Items deleted Successfully!!');
    window.location.reload();
}



function OneditRow(row) {

    var d = row.parentNode.parentNode.rowIndex;
    var editTodoval = row.parentNode.parentNode.children[0].innerText;
    localStorage.setItem("CurrentToDoItem", editTodoval);
    window.location.href = '../Views/EditToDo.html';

}

function Mainfilter(filter1, filter2, filter3, filter4, filter5) {
    var table, tr, td, i, txtValue;
    var childelements = []

    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i <= tr.length - 1; i++) {
        if (tr) {
            childelements = tr[i].childNodes;
            var txtValue = [];
            for (var k = 0; k < childelements.length; k++) {
                txtValue[k] = childelements[k].innerHTML
            }
            if (
                (txtValue[1].toUpperCase().indexOf(filter1.toUpperCase()) > -1) &&
                ((txtValue[2].indexOf(filter2.split(',')[0]) > -1 || txtValue[2].indexOf(filter2.split(',')[1]) > -1) || filter2 == "") &&
                (filter3 >= txtValue[3] || filter3 == "") &&
                (filter4 <= txtValue[4] || filter4 == "") &&
                ((txtValue[5].indexOf(filter5.split(',')[0]) > -1 || txtValue[5].indexOf(filter5.split(',')[1]) > -1) || filter5 == "")
            ) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}

function SortId() {
    if (sortType == "asc") {
        sortType = "desc";
    } else {
        sortType = "asc";
    }

    userValidToDoList.sort(function(a, b) {
        return sortType === "asc" ? a.ToDoId - b.ToDoId : -(a.ToDoId - b.ToDoId);
    });
    generatedSortedTabled();
}


function SortToDoinput() {
    if (sortTypestring == "asc") {
        sortTypestring = "desc";
    } else
        sortTypestring = "asc";

    userValidToDoList.sort(function(a, b) {
        return sortTypestring === "asc" ? a.ToDoItem.localeCompare(b.ToDoItem) : -(a.ToDoItem.localeCompare(b.ToDoItem));
    });
    generatedSortedTabled();
    Mainfilter(filter1, filter2, filter3, filter4, filter5);
}

function generatedSortedTabled() {
    var tbl = document.getElementById("myTable");
    var rowcount = tbl.rows.length;
    for (var j = 1; j < rowcount; j++) {
        document.getElementById("myTable").deleteRow(1);
    }
    generateTable(userValidToDoList);
    Mainfilter(filter1, filter2, filter3, filter4, filter5);
}


//  event handler click to stop propogation 
document.getElementById("ToDoInput").addEventListener("click", function(event) {
    event.stopPropagation();
});