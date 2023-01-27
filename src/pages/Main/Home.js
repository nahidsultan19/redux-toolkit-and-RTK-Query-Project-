import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductCard from '../../components/ProductCard';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import { toggle, toggleBrands } from '../../features/filter/filterSlice';

const Home = () => {
    // const filter = useSelector(state => state.filter);
    // const { products, isLoading } = useSelector(state => state.products);
    // const { brands, stock } = filter;

    const dispatch = useDispatch();

    const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();
    const products = data?.data;


    const activeClass = 'text-white bg-indigo-500 border-white'

    let content;

    if (isLoading) {
        content = <h1>Loading...</h1>
    }

    if (products) {
        content = products.map(product => <ProductCard key={product._id} product={product} />)
    }

    // if (products.length && (filter.stock || filter.brands.length)) {
    //     content = products.filter(product => {
    //         if (stock) {
    //             return product.status === true;
    //         }
    //         return product;
    //     })
    //         .filter(product => {
    //             if (brands.length) {
    //                 return brands.includes(product.brands);
    //             }
    //             return product;
    //         })
    //         .map(product => <ProductCard key={product._id} product={product} />)
    // }


    return (
        <div className='max-w-7xl gap-14 mx-auto my-10'>
            <div className='mb-10 flex justify-end gap-5'>
                <button onClick={() => dispatch(toggle())} className={`border px-3 py-2 rounded-full font-semibold`}>In Stock</button>
                <button onClick={() => dispatch(toggleBrands('amd'))} className={`border px-3 py-2 rounded-full font-semibold `}>AMD</button>
                <button onClick={() => dispatch(toggleBrands('intel'))} className={`border px-3 py-2 rounded-full font-semibold`}>Intel</button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
                {content}
            </div>
        </div>
    );
};

export default Home;