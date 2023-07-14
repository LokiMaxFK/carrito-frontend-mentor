// Creación de constantes para el Slider
const fullImage = document.querySelector('.slider__full');
const figuresThumb = document.querySelectorAll('.slider__figures');
const activeImage = 'slider__figures--active';
const nextButtonSlider = document.querySelector('.slider__next');
const prevButtonSlider = document.querySelector('.slider__prev');


// Creación de constantes para Slideshow
const slideShowContainer = document.querySelector('.slideshow');
const fullImageSlide = document.querySelector('.slideshow__full');
const figuresThumbSlide = document.querySelectorAll('.slideshow__figures');
const activeImageSlide = 'slideshow__figures--active';
const nextButtonSlide = document.querySelector('.slideshow__next');
const prevButtonSlide = document.querySelector('.slideshow__prev');
const buttonCloseSlide = document.querySelector('.slideshow__close');


// Clase Slider
class Slider{

    constructor(fullImage, figuresThumb, activeImage, nextButtonSlider, prevButtonSlider){

        console.log(this);
        this.fullImage = fullImage;
        this.figuresThumb = figuresThumb;
        this.sliderLimitPosition = figuresThumb.length - 1;
        this.activeImage = activeImage;
        this.sliderCurrentPosition = 0;


        this.nextButtonSlider = nextButtonSlider;
        this.prevButtonSlider = prevButtonSlider;

        this.currentAction = null;

        this.changeImage();
        this.events();
    }

    changeSlider(){

        console.log(this.currentAction)

        if(this.sliderCurrentPosition === 0 && this.currentAction === -1){
            this.sliderCurrentPosition = this.sliderLimitPosition;
        }
        else if(this.sliderCurrentPosition === this.sliderLimitPosition && this.currentAction === 1){
            this.sliderCurrentPosition = 0;
        }else{
            this.sliderCurrentPosition += this.currentAction;
        }

        console.log(this.sliderCurrentPosition)
        
        this.changeImage();

    }

    getNewImage(){
        const figure = this.figuresThumb[this.sliderCurrentPosition];
        const image = figure.querySelector('img');

        return image;
    }

    changeImage(){
      
        const image = this.getNewImage();
        const imageURL = image.getAttribute('data-image');
        
        this.fullImage.src = imageURL;
    
        this.setImage();
    }

    getSliderCurrentPosition(){
        return this.sliderCurrentPosition;
    }

    setImage(){
        const figure = this.figuresThumb[this.sliderCurrentPosition];

        const getActiveImage = document.querySelector(`.${this.activeImage}`);

        getActiveImage.classList.remove(this.activeImage)

        figure.classList.add(this.activeImage);
    }

    events(){
       
        this.nextButtonSlider.addEventListener('click',()=>{
            console.log('next')
            this.currentAction = 1;
            this.changeSlider();
        });
        this.prevButtonSlider.addEventListener('click', ()=>{
            console.log('prev')
            this.currentAction = -1;
            this.changeSlider();
        });

        this.figuresThumb.forEach(figure =>{
            figure.addEventListener('click', ()=>{
                if(figure.classList.contains(this.activeImage)) return

                const dataPosition = parseInt(figure.getAttribute('data-id')) -1;
                
                this.sliderCurrentPosition = dataPosition;

                this.changeImage();
            })
        })
    }

}

// Clase Slideshow que extiende de Slider
class Slideshow extends Slider{
    constructor(fullImage, figuresThumb, activeImage, nextButtonSlider, prevButtonSlider, slideShow, buttonCloseSlide){
        super(fullImage, figuresThumb, activeImage, nextButtonSlider, prevButtonSlider);

        this.slideShow = slideShow;
        this.buttonCloseSlide = buttonCloseSlide;
        this.closeModal();
    }

    openSlideShow(position){
        this.sliderCurrentPosition = position;
        this.slideShow.classList.add('slideshow--active');
        this.changeImage();
    }

    closeModal(){
        this.buttonCloseSlide.addEventListener('click', ()=>{
            this.slideShow.classList.remove('slideshow--active')
        })
    }

}

// Creación de un Slider
const slider = new Slider(
    fullImage, 
    figuresThumb, 
    activeImage, 
    nextButtonSlider, 
    prevButtonSlider
);

// Creación de un Slideshow
const slideshow = new Slideshow(
    fullImageSlide, 
    figuresThumbSlide, 
    activeImageSlide, 
    nextButtonSlide, 
    prevButtonSlide,
    slideShowContainer,
    buttonCloseSlide
);

// Evento que activa el Slideshow, de acuerdo a la imagen que se da click
fullImage.addEventListener('click', ()=>{
    slideshow.openSlideShow(slider.getSliderCurrentPosition());
})



// Constantes para crear el counter que permite crear el carrito

const counterText = document.querySelector('.product__shopping');
const decrementButtonCounter = document.querySelector('.product__decrement');
const incrementButtonCounter = document.querySelector('.product__increment');
const addProductButton = document.querySelector('.product__add');
let counter = 0;


setCounter();

function setCounter(){
    counterText.textContent = counter;
}

function incrementCounter(){
    counter++;
    setCounter();
}

function decrementCounter(){
    if(counter === 0) return
    counter--;
    setCounter();
}

decrementButtonCounter.addEventListener('click', decrementCounter);
incrementButtonCounter.addEventListener('click', incrementCounter);


addProductButton.addEventListener('click', ()=>{
    if(counter <= 0) return;

    cart = [];
    const nameProduct = document.querySelector('.product__name').textContent;
    const priceProduct = parseInt(document.querySelector('.product__finally').textContent);
    const stock = counter;
    const image = document.querySelector('.slider__figures--active img').src;

    cart.push({
        name: nameProduct,
        priceProduct: priceProduct, 
        stock, 
        total: priceProduct * stock,
        image
    });

    showProduct();
});

const cartContent = document.querySelector('.cart__content');
let cart = [];

showProduct();

function clearCart(){
    cart = [];
    
    const p = document.createElement('p');
    p.textContent = "Your cart is empty";
    p.classList.add('cart__empty')
    cartContent.innerHTML = "";
    cartContent.appendChild(p);

}

function showProduct(){
    if(cart.length <= 0) {
        clearCart();

        return;
    }

    const {name,
        priceProduct,
        stock, 
        total,
        image} = cart[0];

    cartContent.innerHTML = `
        <div class="cart__item">
            <img src="${image}" class="cart__img"/>
                        

            <div class="cart__text">
                <h3 class="cart__product">${name}<h3>
                <p class="card__copy">$${priceProduct}x${stock}<span class="cart__total"> $${total}</span> </p>
            </div>            

            <button class="cart__delete">
                <img src="./images/icon-delete.svg"/>
            </button>
        </div>

        <button class="cart__checkout">Checkout</button>
    `
    
    const buttonDelete = document.querySelector('.cart__delete');

    buttonDelete.addEventListener('click', clearCart);
        
}


// Función que me permite mostrar el carrito

const buttonShowCart = document.querySelector('.nav__cart');
const cartShowItems = document.querySelector('.cart');

buttonShowCart.addEventListener('click', ()=>{
    cartShowItems.classList.toggle('cart--show');
});