import React from 'react';
import { BiListPlus } from 'react-icons/bi';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';

const ProductCard = ({ product }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    return (
        <div className='shadow-lg relative rounded-3xl border  p-3 flex flex-col text-indigo-900'>
            {pathname.includes('cart') && <div className='grid place-items-center bg-indigo-500 text-white rounded-full absolute top-1 right-1 h-8 w-8'>
                <p>{product.quantity}</p>
            </div>}
            <div className='h-52 w-52 mx-auto'>
                <img src={product.image} alt="" />
            </div>
            <h1 className='font-bold text-center'>{product.model}</h1>
            <p className='text-center font-semibold mb-3'>Rating:{product.rating}</p>
            <div className=' flex-1'>
                <ul className='space-y-2'>
                    {product.keyFeature.map(feature => {
                        return <li key={feature}>{feature}</li>;
                    })}
                </ul>
            </div>
            <div className='flex gap-2 mt-5'>
                {pathname.includes('cart') && <button className='bg-red-500 flex justify-between items-center px-3 rounded-full py-1 px-2 flex-1 text-white text-bold' >
                    <p className='text-lg'>Remove</p>
                    <RiDeleteBin2Line size={20} />
                </button>}
                {!pathname.includes('cart') && <button className='bg-indigo-500 rounded-full py-1 px-2 flex-1 text-white text-bold' onClick={() => dispatch(addToCart(product))} >
                    Add to cart
                </button>}
                {!pathname.includes('cart') && <button title='Add to wishlist' className='bg-indigo-500  py-1 px-2 rounded-full'>
                    <BiListPlus className='text-white' />
                </button>}
            </div>
        </div>
    );
};

export default ProductCard;