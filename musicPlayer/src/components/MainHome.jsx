import React from 'react';
import NavigationBar from './NavigationBar';
import Album from './AlbumItem';
import Song from './SongItem';
import { useContext } from 'react';
import { PlayerContext } from '../context/playerContext';

const MainHome = () => {
    const { songsData, albumsData } = useContext(PlayerContext);

    return (
        <>
            <NavigationBar />
            <div className='mt-5 mb-4 overflow-auto flex-grow'>
                <h1 className='font-inter text-white font-bold pl-2 mt-10 text-5xl'>Explore Albums</h1>
                <div
                    className="flex scrollbar-hide mt-3"
                    style={{
                        overflowX: 'auto',
                        display: 'flex',
                        width: '100%', // Ensure full width
                    }}
                >
                    {albumsData.map((item, index) => (
                        <Album
                            key={index}
                            name={item.name}
                            image={item.image}
                            desc={item.desc}
                            id={item._id}
                        />
                    ))}
                </div>
            </div>
            <div className='mb-4 pb-20'>
                <h1 className='text-white font-inter font-bold pl-2 mt-5 text-3xl'>Explore Songs</h1>
                <div
                    className="flex scrollbar-hide mt-5"
                    style={{
                        overflowX: 'auto',
                        display: 'flex',
                        width: '100%', // Ensure full width
                    }}
                >
                    {songsData.map((item, index) => (
                        <Song key={index} name={item.name} image={item.image} desc={item.desc} id={item._id} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MainHome;