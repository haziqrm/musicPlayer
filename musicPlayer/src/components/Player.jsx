import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/playerContext';

const Player = () => {
    const { track, seekBar, seekBg, playStatus, play, pause, time, previousTrack, nextTrack, seekSong } = useContext(PlayerContext);

    return track ? (
        <div className="bg-gradient-to-r from-[#011101] to-[#2e0107] h-[10%] w-full flex text-white px-4 fixed bottom-0 left-0 z-50">
            {/* Left Section: Track Info */}
            <div className="flex items-center gap-4 flex-none w-[30%] overflow-hidden">
                <img className="w-12" src={track.image} alt="Track Thumbnail" />
                <div
                    className="font-inter truncate"
                    style={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    <b>
                        <p className = 'font-bold text-[#ff0342] text-xl'>{track.name}</p>
                    </b>
                    <p className = 'font-extralight text-xs'>{track.desc.slice(0, 12)}</p>
                </div>
            </div>

            {/* Center Section: Playbar */}
            <div className="pt-1 flex flex-col items-center justify-center gap-1 m-auto">
                <div className="flex gap-4">
                    <img
                        onClick={previousTrack}
                        className="w-4 cursor-pointer"
                        src={assets.prev_icon}
                        alt="Previous Track"
                    />
                    {playStatus ? (
                        <img
                            onClick={pause}
                            className="w-4 cursor-pointer"
                            src={assets.pause_icon}
                            alt="Pause"
                        />
                    ) : (
                        <img
                            onClick={play}
                            className="w-4 cursor-pointer"
                            src={assets.play_icon}
                            alt="Play"
                        />
                    )}
                    <img
                        onClick={nextTrack}
                        className="w-4 cursor-pointer"
                        src={assets.next_icon}
                        alt="Next Track"
                    />
                </div>
                <div className="font-inter font-extralight font-normal flex items-center gap-5">
                    <p className = 'lg:visible' style={{ width: "3ch", textAlign: "center" }}>
                        {time.currentTime.minute}:{time.currentTime.second}
                    </p>
                    <div
                        ref={seekBg}
                        onClick={(e) => seekSong(e)}
                        className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
                    >
                        <hr
                            ref={seekBar}
                            className="h-1 border-none bg-[#ff0342] rounded-full"
                        />
                    </div>
                    <p className = 'lg:visible' style={{ width: "3ch", textAlign: "center" }}>
                        {time.totalTime.minute}:{time.totalTime.second}
                    </p>
                </div>
            </div>

            {/* Right Section: Empty for alignment */}
            <div className="flex-none w-[30%]"></div>
        </div>
    ) : null
};

export default Player;