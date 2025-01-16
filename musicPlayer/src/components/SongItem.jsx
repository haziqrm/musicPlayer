import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/playerContext'

const SongItem = ({ name, image, desc, id }) => {
    const navigate = useNavigate()
    const { playWithId } = useContext(PlayerContext)

    return (
        <>
            <div
                onClick={() => playWithId(id)}
                className='min-w-[150px] p-2 rounded cursor-pointer text-white font-inter hover:bg-[#0b0b0b] flex-shrink-0' // Add flex-shrink-0
    
            >
                <img
                    className='rounded object-cover'
                    src={image}
                    alt={name}
                    style={{
                        width: '150px',
                        height: '150px',
                    }}
                />
                <p className='max-w-[150px] text-[#ff0342] font-bold mt-2 mb-1'>{name}</p>
                <p className='max-w-[150px] text-white font-extralight text-sm'>{desc}</p>
            </div>
        </>
    )
}

export default SongItem