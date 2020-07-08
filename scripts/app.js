axios.get('https://localhost:44388/api/books')
    .then(function (response) {
        response.data.forEach(book => {
            createBookCard(book);
        });
    })
    .catch(function (error) {
        console.log(error);
    });


function createBookCard(book) {
    var cardColumn = document.createElement("div");
    cardColumn.classList.add("col-md-3");

    var card = document.createElement("div");
    card.classList.add("card");

    cardColumn.appendChild(card);

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    card.appendChild(cardBody);

    var cardTitle = document.createElement("h4");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = book.title

    cardBody.appendChild(cardTitle);

    var cardAuthor = document.createElement("h4");
    cardAuthor.classList.add("card-title");
    cardAuthor.innerHTML = `Author: ${book.author}`;

    cardBody.appendChild(cardAuthor);

    var cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.innerHTML = book.description;

    cardBody.appendChild(cardDescription);

    var cardPrice = document.createElement("p");
    cardPrice.classList.add("card-text");
    cardPrice.innerHTML = `Price: ${book.price}`;

    cardBody.appendChild(cardPrice);

    var cardGenre = document.createElement("p");
    cardGenre.classList.add("card-text");
    cardGenre.innerHTML = `Genre: ${book.genre}`;

    cardBody.appendChild(cardGenre);

    var cardBtn = document.createElement("button");
    cardBtn.classList.add("btn");
    cardBtn.classList.add("btn-primary");

    if(storageService.existsInLocalStorage(book.id, "cartItems")){
        cardBtn.innerHTML = "Remove from cart";
        cardBtn.onclick = function (e) {
            removeFromCart(e, book.id)
        };
    }else{
        cardBtn.innerHTML = "Add to cart";
        cardBtn.onclick = function (e) {
            addToCart(e, book.id)
        };
    }

    cardBody.appendChild(cardBtn);

    var cardContainer = document.getElementById("card-container");
    cardContainer.appendChild(cardColumn);
}

function addToCart(event, bookId) {
    storageService.addToLocalStorage(bookId, "cartItems");
    event.target.innerHTML = "Remove from cart";
    event.target.onclick = function (e) { removeFromCart(e, bookId) };
}

function removeFromCart(event, bookId) {
    storageService.removeFromLocalStorage(bookId, "cartItems");
    event.target.innerHTML = "Add to  cart";
    event.target.onclick = function (e) { addToCart(e, bookId) };
}




