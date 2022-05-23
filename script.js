let div = document.createElement("div");
let title = document.createElement("h1")
let titleText = document.createTextNode("Book Shop")
let header = document.createElement("div")
let cartInfo = document.createElement("div")
let cartInfoImg = document.createElement("div")
let cartInfoP = document.createElement("p")
let itemCount = document.createElement("span")
let totalCount = document.createElement("span")
let itemCountText = document.createTextNode("0")
let totalCountText = document.createTextNode("0")
let cart = document.createElement("div")
let bookCatalog = document.createElement("div")
let startText = document.createTextNode("Books: ")
let middleText = document.createTextNode(" - ")
let endText = document.createTextNode(" $")
let cartEndText = document.createTextNode(" $")
let cartTotal = document.createElement("p")
let cartTotalText = document.createTextNode("1")
let cartToTalContainer = document.createElement("div")
let checkout = document.createElement("button")
let checkoutText = document.createTextNode("Checkout")
let insidecartTotalDiv = document.createElement("div")
let insideCartTotal = document.createElement("span")
let insideCartTotalText = document.createTextNode("0")
checkout.classList.add("checkout")
insidecartTotalDiv.classList.add("inside-cart-total-div")
insideCartTotal.classList.add("item-totall")
insideCartTotal.append(insideCartTotalText)
insidecartTotalDiv.append(insideCartTotal)
insidecartTotalDiv.append(cartEndText)
checkout.append(checkoutText)
insidecartTotalDiv.append(checkout)

cart.classList.add("cart")
title.classList.add("header-title")
div.classList.add("main-div")
bookCatalog.classList.add("book-catalog")
header.classList.add("header")
cartInfo.classList.add("cart-info")
cartInfoImg.classList.add("cart-info-img")
cartInfoP.classList.add("cart-count/total-info")
itemCount.classList.add("item-count")
totalCount.classList.add("item-total")
cartToTalContainer.classList.add("cart-total-container")
cartTotal.classList.add("cart-total")

document.body.appendChild(header);
document.body.appendChild(cartInfo);
document.body.appendChild(cart)
document.body.appendChild(div);
cartInfo.append(cartInfoImg)
cartInfoP.append(startText)
itemCount.append(itemCountText)
totalCount.append(totalCountText)
cartInfoP.append(itemCount)
cartInfoP.append(middleText)
cartInfoP.append(totalCount)
cartInfoP.append(endText)
cartInfo.append(cartInfoP)
header.appendChild(title);
title.appendChild(titleText);
div.appendChild(bookCatalog);
cartTotal.append(cartTotalText)
cartToTalContainer.appendChild(cartTotal)

let http = new XMLHttpRequest();
http.open('get', 'books.json', true);
http.send();
http.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
        let books = JSON.parse(this.responseText);
        let output = "";
        for (let x of books) {
            output += `
            <div class="book">
               <img src="${x.imageLink}" alt="">
               <p class="title">${x.title}</p>
               <p class="author">${x.author}</p>
               <p class="price-info">
                  <span>Price: </span>
                  <span class="price">${x.price}</span>
                  <span>$</span>
               </p>
               <a href="#" class="show-more">Show more</a><br><br>
               <button type="button" class="add-to-bag">Add to bag</button>
            </div>
         `;
        }
        document.querySelector(".book-catalog").innerHTML = output;
    }

    //show cart
    (function () {
        const cartInfo = document.querySelector(".cart-info");
        const cart = document.querySelector(".cart")
        cartInfo.addEventListener("click", () => {
            cart.classList.toggle("show-cart")
        })
    })();

    //add items to the cart
    (function () {
        const cartBtn = document.querySelectorAll(".add-to-bag");
        cartBtn.forEach(btn => {
            btn.addEventListener("click", event => {
                if (event.target.classList.contains("add-to-bag")) {
                    let fullPath = event.target.parentElement.firstElementChild.src;
                    const item = {};
                    item.img = `${fullPath}`;
                    let title = event.target.parentElement.children[1].textContent;
                    item.title = title;
                    let price = event.target.parentElement.children[3].children[1].textContent
                    item.price = price
                    const cartItem = document.createElement("div");
                    cartItem.classList.add("cart-item")
                    cartItem.innerHTML = `
                    <div class="cart-item-element">
               <img src="${item.img}" alt="">
               <p class="title">${item.title}</p>
               <p class="price-info">
                  <span>Price: </span>
                  <span class="cart-price">${item.price}</span>
                  <span>$</span>
               </p>
               <div class="remove-btn"><img src="assets/icons/remove-btn.png" class="remove-img" alt="remove btn"></div>
            </div>
                    `;
                    //select cart
                    const cart = document.querySelector(".cart")
                    const total = document.querySelector(".cart-total-container")
                    cart.insertBefore(cartItem, total)

                    showTotals()
                    cart.appendChild(insidecartTotalDiv)
                    let removeBtn = cartItem.querySelector(".remove-img");
                    addRemoveCartEvent(removeBtn);


                    //open checkout
                    (function () {
                        const checkoutBtn = document.querySelector(".checkout")
                        checkoutBtn.addEventListener("click", event => {
                            let x = event.target.parentElement.parentElement.parentElement.firstElementChild
                            x.style.display = "block"

                        })
                    })();


                }
            })
        })

        function addRemoveCartEvent(removeBtn) {
            removeBtn.addEventListener("click", (target) => {
                target.target.closest(".cart-item").remove();
                showTotals()
            })
        };

        //show totals
        function showTotals() {
            const total = []
            const items = document.querySelectorAll(".cart-price")

            items.forEach(item => {
                total.push(parseFloat(item.textContent));
            });

            const totalMoney = total.reduce((total, item) => {
                total += item;
                return total;
            }, 0)
            const finalMoney = totalMoney.toFixed(2);

            document.querySelector(".item-total").textContent = finalMoney;
            document.querySelector(".item-count").textContent = total.length;
            insideCartTotal.textContent = finalMoney;

            if (total.length == 0) {
                cart.classList.remove("show-cart")
                document.querySelector(".checkout").disabled = true;
            }
        }
    })();



    const form = document.getElementById('form');
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const date = document.getElementById('date');
    const street = document.getElementById('street');
    const houseNumber = document.getElementById('houseNumber');
    const flatNumber = document.getElementById('flatNumber');
    const submitBtn = document.getElementById('submitBtn')

    form.addEventListener('submit', e => {
        e.preventDefault();

        checkInputs();
    });

    function checkInputs() {
        const nameValue = name.value.trim();
        const surnameValue = surname.value.trim();
        const streetValue = street.value;
        const houseNumberValue = houseNumber.value;
        const flatNumberValue = flatNumber.value;

        //Name
        if (nameValue === '') {
            setErrorFor(name, 'Name cannot be blank');
        }
        else if (nameValue.match(/[0-9]/g)) {
            setErrorFor(name, 'Please enter alphapet only');
        }
        else if (nameValue.length <= 3) {
            setErrorFor(name, 'Please enter at least 4 symbol');
        }
        else {
            setSuccessFor(name);
        }

        //Surname
        if (surnameValue === '') {
            setErrorFor(surname, 'Surname cannot be blank');
        }
        else if (surnameValue.length <= 4) {
            setErrorFor(surname, 'Please enter at least 5 symbol');
        }
        else if (surnameValue.match(/[0-9]/g)) {
            setErrorFor(surname, 'Please enter alphapet only');
        }
        else {
            setSuccessFor(surname);
        }

        //Delivery Date


        //Street
        if (streetValue === '') {
            setErrorFor(street, 'Street cannot be blank');
        }
        else if (streetValue.length <= 4) {
            setErrorFor(street, 'Please enter at least 5 symbol');
        }
        else {
            setSuccessFor(street);
        }

        //House Number

        if (houseNumberValue === '') {
            setErrorFor(houseNumber, 'House Number cannot be blank');
        }
        else if (!houseNumberValue.match(/[0-9]/g)) {
            setErrorFor(houseNumber, 'House Number cannot be text');
        }
        else if (houseNumberValue < 0) {
            setErrorFor(houseNumber, 'House Number cannot be negative number');
        }
        else {
            setSuccessFor(houseNumber);
        }

        //Flat Number

        if (flatNumberValue === '') {
            setErrorFor(flatNumber, 'Flat Number cannot be blank');
        }
        else if (flatNumberValue.match(/[a-z]/g) || flatNumberValue.match(/[A-Z]/g)) {
            setErrorFor(flatNumber, 'Flat Number cannot be text');
        }
        else if (flatNumberValue < 0) {
            setErrorFor(flatNumber, 'House Number cannot be negative number');
        }
        else if (flatNumberValue[0] == flatNumberValue.match(/[/]/g) || flatNumberValue[0] == flatNumberValue.match(/[-]/g)) {
            setErrorFor(flatNumber, 'House Number cannot start with "-" or "/" symbol');
        }
        else if (flatNumberValue.match(/[/-]/g)) {
            setSuccessFor(flatNumber);
        }
        else {
            setSuccessFor(flatNumber);
        }
    }

    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control error';
        small.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }
}

