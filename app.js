class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById("product-list");
        const element = document.createElement("div");
        element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body"> 
                <strong> Product Name</strong>: ${product.name}
                <strong> Product Price</strong>: ${product.price}
                <strong> Product Year</strong>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete">Delete</a>
            </div>
        </div>
        `;
        productList.appendChild(element);
        this.resetForm();
    }

    resetForm() {
        document.getElementById("product-form").reset()
    }

    deletProduct(element) {
        if(element.name === "delete"){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted', 'alert-danger');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div')
        div.className = `alert alert-success ${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        // Sowing in DOM with BootStrap //
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert-success').remove();
        }, 3000);
    }
}

// DOM = Document object module, eventos que ocurren (click, etc)

document.getElementById("product-form")
.addEventListener("submit", function(e){
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;

    const product = new Product(name, price, year);

    const ui = new UI();

    if(name === '' || price === '' || year === '') {
       return ui.showMessage('Must Complete All Fields', "alert-danger" );
    } else {    
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Product Added', 'success');
    }
    e.preventDefault();
});

document.getElementById("product-list")
.addEventListener("click", function(e) {
   const ui = new UI();
   ui.deletProduct(e.target);

});