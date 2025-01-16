import React from 'react'
import { useNavigate } from 'react-router-dom'

const Album = ({ name, image, desc, id }) => {
    const navigate = useNavigate();

    return (
        <>
            <div
                onClick={() => navigate(`/album/${id}`)}
                className='text-white min-w-[250px] p-2 rounded cursor-pointer font-inter hover:bg-[#0b0b0b] flex-shrink-0' // Add flex-shrink-0
    
            >
                <img
                    className='rounded object-cover'
                    src={image}
                    alt={name}
                    style={{
                        width: '250px',
                        height: '250px', // Keep the height and width consistent
                    }}
                />
                <p className='max-w-[250px] font-bold mt-2 text-[#ff0342] mb-1 text-2xl'>{name}</p>
                <p className='max-w-[250px] text-white font-extralight text-m'>{desc}</p>
            </div>
        </>
    );
};

export default Album;
