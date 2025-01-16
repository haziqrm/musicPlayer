import React, { useContext, useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../context/playerContext';

const AlbumPage = () => {
    const { id } = useParams();
    const [albumData, setAlbumData] = useState(null); // Initialize with null
    const { playWithId, albumsData, songsData } = useContext(PlayerContext);

    useEffect(() => {
        const foundAlbum = albumsData.find(item => item._id === id);
        if (foundAlbum) {
            setAlbumData(foundAlbum);
        }
    }, [id, albumsData]);

    if (!albumData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavigationBar />
            {/* Add a scrollable container for the entire page */}
            <div
                className='album-page-container height-100vh overflow-y-auto p-5 pb-20'
            >
                <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                    <img className="w-48 rounded" style={{
                        width: '250px',
                        height: '250px',
                    }} src={albumData.image} alt="" />
                    <div className="mb-16 flex flex-col">
                        <h1 className="text-7xl text-[#ff0342] font-inter font-bold mb-50">{albumData.name}</h1>
                        <p className="pl-1 mt-2 text-white font-extralight text-xl font-inter">{albumData.desc}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-3 mt-10 mb-4 pl-2 text-[#ff0342] font-inter font-semibold">
                    <p>
                        <b className="mr-4">#</b>Title
                    </p>
                    <p>Album</p>
                    <p>Duration</p>
                </div>
                <hr className='border-t-2 border-[#1f1f1f]' />
                {songsData.filter(item => item.album === albumData.name).map((item, index) => (
                    <div
                        onClick={() => {
                            console.log("Playing song with ID: ", item._id); // Debugging line
                            playWithId(item._id); // Ensure the correct ID is passed
                        }}
                        key={index}
                        className="grid grid-cols-3 sm:grid-cols-3 gap-2 p-2 items-center cursor-pointer hover:bg-[#ff0342] hover:rounded"
                    >
                        <p className="text-white font-thin flex">
                            <b>{index + 1}</b>
                            <div className="ml-4">{item.name}</div>
                        </p>
                        <p className="text-white font-thin">{albumData.name}</p>
                        <p className="text-white font-thin">{item.duration}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AlbumPage;