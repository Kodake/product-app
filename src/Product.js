import React, { useState } from 'react';
import './Product.css';

const Product = ({ name, price, onShowProduct, onCalculateTotal }) => {
    // Declare a new state variable called quantity
    const [quantity, setQuantity] = useState(0);

    //   const greenButton = {
    //     backgroundColor: 'green',
    //     color: 'white',
    //     padding: '5px 15px',
    //   };

    //   const maroonButton = {
    //     backgroundColor: 'maroon',
    //     color: 'white',
    //     padding: '5px 15px',
    //   };

    const buy = () => {
        // alert('You selected this product');
        setQuantity(quantity + 1);
        onCalculateTotal(price);
    };

    return (
        <div>
            <h3>{name}</h3>
            <p>${price}</p>
            <div class="d-grid gap-2 col-md-3">
                <button class="btn btn-primary" onClick={buy}>
                    Buy
                </button>
                <button class="btn btn-secondary" onClick={() => onShowProduct(name)}>
                    Show
                </button>
            </div>
            <h3 class="mt-3">Quantity: {quantity}</h3>
            <hr />
        </div>
    );
};

const Total = ({ totalCash }) => {
    return <h3>Total Cash: ${totalCash}</h3>;
};

const ProductForm = ({ index, onCreateProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const createProduct = (event) => {
        // alert('Name: ' + name + '- Price: ' + price);
        event.preventDefault();
        const product = { id: index, name, price };
        console.log(product);
        onCreateProduct(product);

        setName('');
        setPrice(0);
    };

    return (
        <form>
            <label>Product Name: </label>
            <div class="col col-md-3">
                <input
                    class="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label>Product Price: </label>
                <input
                    class="form-control"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br />
            </div>
            <div class="d-grid gap-2 col-md-3">
            <button class="btn btn-success" onClick={createProduct}>Create</button>
            </div>
            <hr />
        </form>
    );
};

const ProductList = () => {
    const [total, setTotal] = useState(0);

    const [products, setProducts] = useState([
        { id: 1, name: 'Android', price: 150 },
        { id: 2, name: 'Apple', price: 170 },
        { id: 3, name: 'Nokia', price: 190 },
    ]);

    const calculateTotal = (price) => {
        setTotal(total + parseInt(price));
    };

    const showProduct = (name) => {
        alert('You selected ' + name);
    };

    const addProduct = (product) => {
        // [1,2,3,4<--added]
        setProducts([...products, product]);
    };

    return (
        <div>
            <ProductForm index={products.length + 1} onCreateProduct={addProduct} />
            {products.map((p) => (
                <Product
                    key={p.id}
                    name={p.name}
                    price={p.price}
                    onCalculateTotal={calculateTotal}
                    onShowProduct={showProduct}
                />
            ))}

            <Total totalCash={total} />
        </div>
    );
};

export default ProductList;
