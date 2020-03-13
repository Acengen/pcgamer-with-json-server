const contCategories = document.querySelector('.games-list-buttons');
const contProducts = document.querySelector('.main-products');
const myForm = document.querySelector('.myForm');

function fillCategoriesAndProducts() {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'db.json',true);

    xhr.onreadystatechange = function() {
        if(this.status === 200 && this.readyState === 4) {
            let data = JSON.parse(this.responseText);
            let categories = data.categories;
            let products = data.products;
            let Actioncounter = 0;
            let Rpgcounter = 0;
            let Advanturecounter = 0;
            let Sportscounter = 0;
            let Strategycounter = 0;
            let allCounter = 0;
            for(let i = 0; i < products.length;i++) {

                contProducts.innerHTML += `
                    <div class="myBlock card" style="width: 200px;">
                        <img src="${products[i].picture}" class="card-img-top" alt="..." style="width: 100%;height: 300px;">
                        <div class="card-body">
                            <p class="name">${products[i].name}</p>
                            <p class="type">${products[i].type}</p>
                            <span class="description">${products[i].description}</span>
                            <p class="price">$${products[i].price}</p>
                        </div>
                    </div>`;
                if(products[i].type === "Action") {
                    Actioncounter++;
                }
                if(products[i].type === 'Rpg') {
                    Rpgcounter++;
                }
                if(products[i].type === 'Adventure') {
                    Advanturecounter++;
                }
                if(products[i].type === 'Sports') {
                    Sportscounter++;
                }
                if(products[i].type === 'Strategy') {
                    Strategycounter++;
                }
                if(products[i].type) {
                    allCounter++;
                }
            }
            for(let i = 0; i < categories.length;i++) {
                let html = 
                `
                <button onclick='getProductsByReset(${categories[i].id})'>all
                 <span class="badge badge-light">${allCounter}</span>
                </button>
                <button onclick='getProductsByID(${categories[0].id})'>${categories[0].type}
                 <span class="badge badge-light">${Actioncounter}</span>
                </button>
                <button onclick='getProductsByID(${categories[1].id})'>${categories[1].type}
                 <span class="badge badge-light">${Rpgcounter}</span>
                </button>
                <button onclick='getProductsByID(${categories[2].id})'>${categories[2].type}
                 <span class="badge badge-light">${Advanturecounter}</span>
                </button>
                <button onclick='getProductsByID(${categories[3].id})'>${categories[3].type}
                 <span class="badge badge-light">${Sportscounter}</span>
                </button>
                <button onclick='getProductsByID(${categories[4].id})'>${categories[4].type}
                 <span class="badge badge-light">${Strategycounter}</span>
                </button>
                `;
                contCategories.innerHTML = html;
            }
        }
    }
    xhr.send();
}

function getProductsByID(id) {
    contProducts.innerHTML = "";
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `http://localhost:3000/products?categorieID=${id}`,true);

    xhr.onreadystatechange = function() {
        if(this.status === 200 && this.readyState === 4) {
            let data = JSON.parse(this.responseText);
            for(let i = 0; i < data.length;i++) {
                contProducts.innerHTML += `
                <div class="card" style="width: 200px;">
                    <img src="${data[i].picture}" class="card-img-top" alt="..." style="width: 200px;height: 300px;">
                    <div class="card-body">
                        <p class="name">${data[i].name}</p>
                        <p class="type">${data[i].type}</p>
                        <span class="description">${data[i].description}</span>
                        <p class="price">$${data[i].price}</p>
                    </div>
                </div>`;
            }
        }
    }
    xhr.send();
}

function getProductsByReset() {
    contProducts.innerHTML = "";
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `http://localhost:3000/products`,true);

    xhr.onreadystatechange = function() {
        if(this.status === 200 && this.readyState === 4) {
            let data = JSON.parse(this.responseText);
            for(let i = 0; i < data.length;i++) {
                contProducts.innerHTML += `
                <div class="card" style="width: 200px;">
                    <img src="${data[i].picture}" class="card-img-top" alt="..." style="width: 200px;height: 300px;">
                    <div class="card-body">
                        <p class="name">${data[i].name}</p>
                        <p class="type">${data[i].type}</p>
                        <span class="description">${data[i].description}</span>
                        <p class="price">$${data[i].price}</p>
                    </div>
                </div>`;
            }
        }
    }
    xhr.send();
}

function searchForProducts(name) {
    contProducts.innerHTML = "";
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `http://localhost:3000/products?name=${name}`, true);

    xhr.onreadystatechange = function() {
        if(this.status===200 && this.readyState === 4) {
            let data = JSON.parse(this.responseText);
            for(let i = 0; i < data.length;i++) {
                contProducts.innerHTML += `
                <div class="card" style="width: 200px;">
                    <img src="${data[i].picture}" class="card-img-top" alt="..." style="width: 200px;height: 300px;">
                    <div class="card-body">
                        <p class="name">${data[i].name}</p>
                        <p class="type">${data[i].type}</p>
                        <span class="description">${data[i].description}</span>
                        <p class="price">$${data[i].price}</p>
                    </div>
                </div>`;
            }
        }
    }
    xhr.send();
}



fillCategoriesAndProducts();


myForm.addEventListener('submit', e=> {
    e.preventDefault();
    const input = myForm.search.value.toUpperCase();
    searchForProducts(input);
})