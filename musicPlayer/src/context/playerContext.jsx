import { createContext, useRef, useState, useEffect } from "react";
import axios from 'axios';

// Create PlayerContext
export const PlayerContext = createContext();

// PlayerContextProvider component
const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBar = useRef();
    const seekBg = useRef();

    const url = 'http://localhost:4000'; // API URL

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(songsData[0]);
    const [time, setTime] = useState({ currentTime: { second: 0, minute: 0 }, totalTime: { second: 0, minute: 0 } });
    const [playStatus, setPlayStatus] = useState(false);

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    // Play a song by its ID
    const playWithId = async (id) => {
        const selectedTrack = songsData.find((item) => item._id === id);
        if (selectedTrack) {
            setTrack(selectedTrack); // Update the track state
            audioRef.current.src = selectedTrack.file; // Set the audio source to the selected song file
            audioRef.current.load(); // Reload the audio element to load the new source
            await audioRef.current.play(); // Play the new song
            setPlayStatus(true); // Update play status
        }
    };

    // Handle previous track
    const previousTrack = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id && index > 0) {
                await setTrack(songsData[index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    };

    // Handle next track
    const nextTrack = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id && index < songsData.length - 1) {
                await setTrack(songsData[index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    };

    // Handle seek bar click
    const seekSong = async (e) => {
        console.log("Seek bar clicked", e.nativeEvent.offsetX); // Log to check click position
        const position = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
        console.log("New position: ", position); // Log the calculated position
        audioRef.current.currentTime = position; // Set the new playback position
    };

    // Fetch song data from the API
    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]);
        } catch (error) {
            console.error('Error fetching songs data:', error);
        }
    };

    // Fetch albums data from the API
    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.error('Error fetching albums data:', error);
        }
    };

    // Update time and seek bar on audio time update
    useEffect(() => {
        const timer = setInterval(() => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = () => {
                    seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                    const formatTime = (value) => String(value).padStart(2, '0');

                    setTime({
                        currentTime: {
                            second: formatTime(Math.floor(audioRef.current.currentTime % 60)),
                            minute: Math.floor(audioRef.current.currentTime / 60),
                        },
                        totalTime: {
                            second: formatTime(Math.floor(audioRef.current.duration % 60)),
                            minute: Math.floor(audioRef.current.duration / 60),
                        },
                    });
                };
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [audioRef]);

    // Fetch songs and albums data when component mounts
    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []); // Empty dependency array ensures this runs only once

    // Automatically play the track once it changes
    useEffect(() => {
        if (track) {
            // Reload and play the audio once track is updated
            audioRef.current.load(); // Reload the audio element
            audioRef.current.play(); // Play the new track immediately
            setPlayStatus(true); // Set play status to true
        }
    }, [track]); // This effect runs every time the 'track' state changes

    // Handle song end (move to next or loop)
    useEffect(() => {
        const handleSongEnd = () => {
            const currentIndex = songsData.findIndex((item) => item._id === track._id);
            if (currentIndex !== -1) {
                const nextIndex = currentIndex === songsData.length - 1 ? 0 : currentIndex + 1; // Loop to the first song if it's the last song
                setTrack(songsData[nextIndex]); // Set the track to the next one
            }
        };

        if (audioRef.current) {
            audioRef.current.onended = handleSongEnd; // Listen for when the song ends
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.onended = null; // Clean up the event listener
            }
        };
    }, [track, songsData]);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previousTrack,
        nextTrack,
        seekSong,
        songsData,
        albumsData,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;