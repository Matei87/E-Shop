"use strict";

let buttonAddToCart = document.querySelectorAll('.btn-outline-secondary');

const buttons = (a) => {
    for (let i = 0; i < buttonAddToCart.length; i++) {
        buttonAddToCart[i].addEventListener('click', () => {
            cartNumbers(a[i]);
            totalCost(a[i]);
        });
    }
};

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart-icon span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = Number(productNumbers);

    if ( action ){

        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart-icon span').textContent = productNumbers - 1;

    } else if ( productNumbers ){

        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-icon span').textContent = productNumbers + 1;

    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-icon span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    if ( cartItems !== null ){
        if( cartItems[product.tag] === undefined ){
            cartItems = {
                    ...cartItems,
                [product.tag]: product
            };
        }
        cartItems[product.tag].quantity += 1;
    } else {
        product.quantity = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product, action){
    
    let cartCost = localStorage.getItem('totalCost');
    if ( action ){
        cartCost = Number(cartCost);
        localStorage.setItem('totalCost', (cartCost - product.price).toFixed(2));

    } else if ( cartCost != null ){

        cartCost = Number(cartCost);
        localStorage.setItem('totalCost', (cartCost + product.price).toFixed(2));
    } else {
        localStorage.setItem('totalCost', product.price);
    }

}

function displayCart() {
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        let itemContainer = document.querySelector('.item');
        let cartCost = localStorage.getItem('totalCost');

        if (cartItems && itemContainer){
            itemContainer.innerHTML = '';
            Object.values(cartItems).map( i => {
                itemContainer.innerHTML += `
                <div class="items col-md-12">
                    <div class="item-imageContainer">
                        <img src="./img/${i.tag}.png">
                    </div>
                    <span class="item-name col-md-2">${i.name}</span>
                    <span class="item-quantity col-md-2">
                        <div class="item-quantity-modify">
                            <div class="item-arrow-left"><i class="fas fa-chevron-left"></i></div>
                            <span class="item-value">${i.quantity}</span>
                            <div class="item-arrow-right"><i class="fas fa-chevron-right"></i></div>
                        </div>
                        <div class="item-removeButton col-md-2"><i class="fas fa-times"></i></div>
                    </span>
                    <span class="item-price col-md-2">${(i.price).toFixed(2)}  €</span>
                    <div class="item-total col-md-2"> ${(i.quantity * i.price).toFixed(2)} €</div>
                </div>`;
            });

            cartCost = Number(cartCost).toFixed(2);
            document.querySelector('.total').innerHTML = `<span>TOTAL: ${cartCost}  €</span> `;

            deletecartRow();
            modifyQuantity();
        }
}


function modifyQuantity() {
    let up = document.querySelectorAll('.item-arrow-right');
    let down = document.querySelectorAll('.item-arrow-left');
    let curentQuantity = 0;
    let curentProduct = ' ';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < up.length; i++){
            down[i].addEventListener('click', function () {
               console.log(cartItems);
                curentQuantity = down[i].parentElement.querySelector('span').textContent;
                curentProduct = down[i].parentElement.parentElement.parentElement.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                console.log(curentProduct);

                if (cartItems[curentProduct].quantity > 1){
                    cartItems[curentProduct].quantity -= 1;
                    cartNumbers(cartItems[curentProduct], 'down');
                    totalCost(cartItems[curentProduct], 'down');
                    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                    displayCart();
                }
            });

        up[i].addEventListener('click', () => {
            console.log(cartItems);
            curentQuantity = up[i].parentElement.querySelector('span').textContent;
            curentProduct = up[i].parentElement.parentElement.parentElement.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();

            cartItems[curentProduct].quantity += 1;
            cartNumbers(cartItems[curentProduct]);
            totalCost(cartItems[curentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deletecartRow() {
    let deleteButtons = document.querySelectorAll('.item-removeButton');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.previousElementSibling.textContent.toLocaleLowerCase().replace(/ /g,'').trim();

            console.log(productName, productNumbers, cartItems);
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].quantity);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].quantity));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        });
    }
}

onLoadCartNumbers();
displayCart();


$(".hovered").hover(
    function() {  $(this).find(".dropdown-menu").stop(true, true).delay(100).fadeIn(400); },
    function() { $(this).find(".dropdown-menu").stop(true, true).delay(100).fadeOut(400); }
);
$(".hovered").hover(
    function () { $(this).addClass('show'); },
    function() { $(this).removeClass('show');}
);
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});
$(function () {
    $('[data-toggle="popover"]').popover();
});

$('.click').on('click', function () {
    $('#payme').toggle();
});

$('#checkoutPaypal').on('click', function () {
    $("#checkoutCollapse").collapse('hide');
});

//Show year in footer
document.querySelector('.year').textContent = new Date().getFullYear();
