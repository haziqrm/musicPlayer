import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App';
import { toast } from 'react-toastify'; // Ensure toast is imported

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSong = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error("Error occurred while fetching songs.");
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);

        // Immediately update the state to remove the song
        setData((prevData) => prevData.filter((song) => song._id !== id));
      }
    } catch (error) {
      toast.error("Error occurred while removing the song.");
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  return (
    <div className="bg-[#121212] h-screen text-white">
      <h1 className="text-xl font-bold">ALL SONGS:</h1>
      <br />
      <div>
        {/* Header Row */}
        <div className="sm:grid hidden grid-cols-[1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-black text-small mr-2.5 bg-black">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>

        {/* Data Rows */}
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-black text-small mr-2.5"
          >
            <img className="w-24" src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.album}</p>
            <p>{item.duration}</p>
            <button
              onClick={() => removeSong(item._id)}
              className="text-red-500 hover:underline text-bold"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSong;