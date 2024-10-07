


const cartProducts = [];
function addToCart(id, name, price, image) {
    const inCart = cartProducts.find(item => item.id === id);
    
    if (inCart) {
        inCart.quantity++; // This is to add an additional item to cart if it already exists or has already been added to cart. if this condition is false, we will test the following condition found in the 'else' box.
    } else {
        cartProducts.push({ id, name, price, quantity: 1, image }); // This is to add a new item to cart if it has not been added already. this will be tested if the condition in the 'if' box is false.
    }
    initCart();
}

function initCart() { // The initCart function is to add items to our cart. it gives the instruction to add items to cart. another option that could have been used is the "render" function.
    const cartContent = document.getElementById('cartContent');
    cartContent.innerHTML = '';
    let total = 0;

    cartProducts.forEach(item => {
        total += item.price * item.quantity;

        const row = document.createElement('tr');//creating a row element for the items that will be added to cart when selected. 

        row.innerHTML = ` 
            <td><img src="${item.image}" alt="${item.name}" width="50%"></td>
            <td>${item.name}</td>
            <td>ZAR ${item.price}</td>
            <td>
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </td>
            <td>ZAR${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeItem(${item.id})">Delete</button></td>
        `; // Just like you would've done in HTML document after creating a row element, you would then go on to add table data cells to insert information that is to go onto the table.
        
        cartContent.appendChild(row);
    });

    document.getElementById('cartTotal').innerText = `Cart Total: ${total.toFixed(2)}`; // Calculates the total amount of the cart as a whole. we have accessed the div element using the id it was given in the HTML document.
}

function changeQuantity(id, delta) { //Here we have created some sort of quantity button which can be increased or decreased depending on whether you want to add more items of the same product to the cart.
    const item = cartProducts.find(item => item.id === id);
    item.quantity += delta;

    if (item.quantity < 1) {
        removeItem(id);
    } else {
        initCart();
    }
}

function removeItem(id) { //gives rise to the functionality of our 'delete' button if you would like to remove a product that has been added to cart. You are able to remove items by pressing the "-" button but this one gives convenience of removing an item at one go. 
    const index = cartProducts.findIndex(item => item.id === id);
    if (index > -1) {
        cartProducts.splice(index, 1);
    }
    initCart();
}

function showAlert() {
    alert('Successfully added to cart!');}

initCart();


