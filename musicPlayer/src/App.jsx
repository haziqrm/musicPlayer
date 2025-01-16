import React, { useContext } from 'react';
import Sidebar from './components/Bar';
import Player from './components/Player';
import Main from './components/Main';
import { PlayerContext } from './context/playerContext';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-[#f5f5f5]'>
      {songsData.length !== 0 ? (
        <>
          <div className='flex flex-grow'>
            <Main />
          </div>
          <Player />
        </>
      ) : null}

      <audio ref={audioRef} src={track ? track.file : ''} preload='auto'></audio> 
    </div>
  );
};

export default App;