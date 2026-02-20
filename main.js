let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let catogery = document.getElementById('catogery');
let submit = document.getElementById('submit');
let mood = 'create';
let tem;





//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = ' ';
        total.style.background = '#a00d02';
    }

}



//create


// We use array to save data if it has value in localstorege save it else start from null
let dataPro
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}
else {
    dataPro = [];
}


// this object will add object by object to array to be stored
submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catogery: catogery.value,
    }
    //we add in this code the object to array accourding yto num of product
    if (title.value != '' && price.value != '' && catogery.value != '' && newPro.count < 100) {
        if (mood == 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            }
            else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tem] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block'
        }
        clearData()
    }





    //Add the data in localstorege 
    localStorage.setItem('product', JSON.stringify(dataPro));
    console.log(dataPro);

    //to clear the data

    showData()

}


//clear input

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    catogery.value = '';
}



//Read
//بياخد الداتا من الاوبجت ويعرضها في شكل جدول وهو هنا عامل التيبول + عشان يضيف علي الي موجود
function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
         <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].catogery}</td> 
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                 <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
       
       `;
    }

    //الجزء دا الخاص بحذف كل الداتا بستدعي العنصر من الاتش تي ام ال وبحطه جوه متغير 
    //وابدا اقارن الاري لو موجود فيه داتا اظهر زرار المسح 
    //لو مش موجود فيها داتا متظهروش 

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = ` 
        <button onclick="deleteAll()">delete All(${dataPro.length})</button>
        `
    } else {
        btnDelete.innerHTML = '';
    }
}

showData()


//delete

function deleteData(i) {

    //عشان يحذف من الاريي القيمةالي انت مساحتها
    dataPro.splice(i, 1);
    //عشان يشيلها من اللوكل استوردج برضو
    localStorage.product = JSON.stringify(dataPro);
    //عشان يحدث الداتا الي بتتعرض هي كمان
    showData()
}


//delete all
//لما يجي يمسح الداتا بيمسح من اللوكل و الاريي وبيستدعي الداله بتاع العارض من جديد

function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}



//update
//
function updateData(i) {
    title.value = dataPro[i].title;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    price.value = dataPro[i].price;
    getTotal()
    count.style.display = 'none';
    catogery.value = dataPro[i].catogery;
    submit.innerHTML = 'update';
    mood = 'update';
    tem = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })

}








