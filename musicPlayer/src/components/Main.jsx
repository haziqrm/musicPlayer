import React from 'react'
import MainHome from './MainHome'
import AlbumPage from './AlbumPage'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { PlayerContext } from '../context/playerContext'
import { useContext } from 'react'
const Main = () => {
    const { albumsData } = useContext(PlayerContext)
    const isAlbum = location.pathname.includes("album")
    const albumId = isAlbum ? location.pathname.split('/').pop() : "";
    return (
        <div className='w-full h-screen px-6 pt-4 bg-[#121212] text-black overflow-auto lg:w-[100%] ml-0'>
            <Routes>
                <Route path='/' element={<MainHome />} />
                <Route path='/album/:id' element={<AlbumPage album={albumsData.find((x) => x._id === albumId)} />} />
            </Routes>
        </div>
    )
}

export default Main