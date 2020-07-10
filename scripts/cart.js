function initCart() {
    var cartItems = storageService.getFromLocalStorage("cartItems");

    for (let i = 0; i < cartItems.length; i++) {
        axios.get(`https://localhost:44388/api/books/${cartItems[i]}`)
            .then(function (response) {
                createCartItem(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

function createCartItem(book) {
    var card = document.createElement("div");
    card.classList.add("bookCard");

    var cardTitle = document.createElement("h4");
    cardTitle.innerHTML = `Title: ${book.title} - Author: ${book.author}`;

    var cardPrice = document.createElement("h4");
    cardPrice.innerHTML = `Price: ${book.price}`;

    var cardBtn = document.createElement("button");
    cardBtn.classList.add("btn");
    cardBtn.classList.add("btn-primary");
    cardBtn.innerHTML = "Remove from cart"
    cardBtn.onclick = function (e) { removeFromCart(e, book.id) };

    card.appendChild(cardTitle);
    card.appendChild(cardPrice);
    card.appendChild(cardBtn);

    var container = document.getElementById("card-container");
    container.appendChild(card);
}

function removeFromCart(event, bookId){
    storageService.removeFromLocalStorage(bookId, "cartItems");
    event.target.parentElement.remove();  
}

function orderBooks(){
    //get all inputs

    var name = document.getElementById("customerName").value;
    var email = document.getElementById("customerEmail").value;
    var address = document.getElementById("customerAddress").value;
    var phone = document.getElementById("customerPhone").value;

    //get bookIds from localStorage
    var storageData = storageService.getFromLocalStorage("cartItems");

    if(storageData.length > 0){
        //send to api 
        axios.post('https://localhost:44388/api/orders', {
            name: name,
            email: email,
            address: address,
            phone: phone,
            bookIds : storageData
        })
        .then(function (response) {
            console.log(response.data);
            alert(`Thanks for ordering. Your order code is: ${response.data}`);
            storageService.clearStorage("cartItems");
            location.href = "./index.html"
        })
        .catch(function (error) {
            console.log(error.response);
            if(error.response.status == 400){
                alert(JSON.stringify(error.response.data.errors));
            }else{
                alert("Something went wrong")
            }
        });
    }
}

initCart();

