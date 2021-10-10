import React, { useState } from 'react';
import './Product.css';

const Product = ({ name, price, onShowProduct, onCalculateTotal }) => {
    // Declare a new state variable called quantity
    const [quantity, setQuantity] = useState(0);
    const buy = () => {
        setQuantity(quantity + 1);
        onCalculateTotal(price);
    };

    return (
        <div>
            <h3>{name}</h3>
            <p>${price}</p>
            <div className="d-grid gap-2 col-md-3">
                <button className="btn btn-primary" onClick={buy}>
                    Buy
                </button>
                <button className="btn btn-secondary" onClick={() => onShowProduct(name)}>
                    Show
                </button>
            </div>
            <h3 className="mt-3">Quantity: {quantity}</h3>
            <hr className="d-grid gap-2 col-md-3"/>
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
        event.preventDefault();
        const product = { id: index, name, price };
        onCreateProduct(product);

        setName('');
        setPrice(0);
    };

    return (
        <form onSubmit={createProduct}>
            <div className="col col-md-3">
            <label>Product Name: </label>
                <input
                    className="form-control"
                    type="text"
                    required="true"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label>Product Price: </label>
                <input
                    className="form-control"
                    type="number"
                    required="true"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br />
            </div>
            <div className="d-grid gap-2 col-md-3">
            <button className="btn btn-success">Create</button>
            </div>
            <hr className="d-grid gap-2 col-md-3"/>
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
