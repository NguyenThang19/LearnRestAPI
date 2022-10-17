var urlAPI = "http://localhost:3000/posts";
var container = document.querySelector('#content');

function documentAlready() {
    // Call function Display data
    readData(getData);
    handdleCreateData();
}
documentAlready();

// Read data 
function readData(funcCallback) {
    fetch(urlAPI)
        .then((response) => {
            return response.json();
        })
        .then(funcCallback);

}

// Get Data
function getData(data) {
    var text = "";
    data.map((item) => {
        text += `<div class="items-${item.id}" id=${item.id} onclick="fillDataToForm(this)">
                        <p>STT: <span class="id">${item.id} </span> <br> Ten sach: <span class="title"> ${item.title} </span> 
                        <br> Tac gia: <span class="author">${item.author} <span> </p>
                        <button class="btn-delete-data" onclick="deleteFunction(this)">DELETE</button>
                    </div>`
    });
    container.innerHTML = text;
};



//Create Data
function createDataToBack(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(urlAPI, options)
        .then((response) => {
            response.json();
        })
}

function handdleCreateData() {
    var btnHanddleCreate = document.querySelector('#btn-handdle-create-data');
    var valueID = document.querySelector("#id-item");
    var valueTitle = document.querySelector('#title-item');
    var valueAuthor = document.querySelector('#author-item');

    btnHanddleCreate.addEventListener('click', (e) => {
        valueData = {
            id: valueID.value,
            title: valueTitle.value,
            author: valueAuthor.value
        };

        createDataToBack(valueData, () => {
            var newElement = document.createElement('div');
            var contentEle = document.createTextNode(`<div class="items" id=${valueID.value}>
            <p>STT: ${valueID.value} <br> Ten sach: ${valueTitle.value}  <br> Tac gia: ${valueAuthor.value}  </p>
        </div>`);
            newElement.appendChild(contentEle);
            container.appendChild(newElement);
        })
    });
}

// Delete Data

function deleteData(idElement) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    fetch(urlAPI + '/' + idElement, options)
        .then(response => {
            response.json();
        })
        .then(data => {
            console.log(data)
        })
}

function deleteFunction(data) {
    var parentNode = data.parentNode;
    var idElement = parentNode.getAttribute('id');
    deleteData(idElement);
    parentNode.remove();

};


// Update Data

var btnUpdateData = document.querySelector('#btn-update-data');
btnUpdateData.addEventListener('click', () => {
    funcHanddleUpdateData();
});

function updateData(idElement, titleData, authorData) {
    alert(titleData);
    var options = {
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(
        {
          "id": 3,
          "title":titleData,
          "author": authorData
        }
      )
    }
    fetch(urlAPI + '/' + idElement, options)
        .then(response => {
           response.json();
        })
}

function fillDataToForm(data) {
    var idData = data.getAttribute('class');
    var idCurentElement = document.querySelector(`.${idData} .id`).textContent;
    var titleCurentElement = document.querySelector(`.${idData} .title`).textContent;
    var authorCurentElement = document.querySelector(`.${idData} .author`).textContent;

    // Form Input
    var valueID = document.querySelector("#id-item");
    var valueTitle = document.querySelector('#title-item');
    var valueAuthor = document.querySelector('#author-item');

    valueID.value = parseInt(idCurentElement);
    valueTitle.value = titleCurentElement;
    valueAuthor.value = authorCurentElement;
}

function funcHanddleUpdateData() {
    var valueID = document.querySelector("#id-item").value;
    var valueTitle = document.querySelector('#title-item').value;
    var valueAuthor = document.querySelector('#author-item').value;
    updateData(valueID, valueTitle, valueAuthor);
}