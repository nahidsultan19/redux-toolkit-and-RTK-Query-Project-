import React, { useEffect } from 'react';
import { useState } from 'react';
import ProductCard from '../../components/ProductCard';

const Home = () => {
    // const filters = useSelector(state => state.filter.filters);
    // const products = useSelector(state => state.product.products);
    // const { brands, stock } = filters;

    // const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data.data))
    }, [])

    const activeClass = 'text-white bg-indigo-500 border-white'

    let content;

    if (products.length) {
        content = products.map(product => <ProductCard key={product._id} product={product} s />)
    }

    // if (products.length && (stock || brands.length)) {
    //     content = products.filter(product => {
    //         if (stock) {
    //             return product.status === true;
    //         }
    //         return product;
    //     })
    //         .filter(product => {
    //             if (brands.length) {
    //                 return brands.includes(product.brand);
    //             }
    //             return product;
    //         })
    //         .map(product => <ProductCard key={product._id} product={product} s />)
    // }


    return (
        <div className='max-w-7xl gap-14 mx-auto my-10'>
            <div className='mb-10 flex justify-end gap-5'>
                <button className={`border px-3 py-2 rounded-full font-semibold `}>In Stock</button>
                <button className={`border px-3 py-2 rounded-full font-semibold `}>AMD</button>
                <button className={`border px-3 py-2 rounded-full font-semibold `}>Intel</button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
                {content}
            </div>
        </div>
    );
};

export default Home;