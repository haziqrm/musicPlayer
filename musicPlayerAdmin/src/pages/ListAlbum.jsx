import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      toast.error("Error occurred while fetching albums.");
    }
  };

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        
        // Manually remove the album from state without re-fetching
        setData((prevData) => prevData.filter((album) => album._id !== id));
      }
    } catch (error) {
      toast.error("Error occurred while removing the album.");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="bg-[#121212] h-screen text-white">
      <h1 className="text-xl font-bold">ALL ALBUMS:</h1>
      <br />
      <div>
        {/* Header Row */}
        <div className="sm:grid hidden grid-cols-[1fr_2fr_1fr_1fr] items-center gap-2.5 p-3 border border-black text-small mr-2.5 bg-black">
          <b>Image</b>
          <b>Name</b>
          <b>Artist</b>
          <b>Action</b>
        </div>

        {/* Data Rows */}
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr_1fr_1fr] sm:grid-cols-[1fr_2fr_1fr_1fr] items-center gap-2.5 p-3 border border-black text-small mr-2.5"
          >
            {/* Image */}
            <img className="w-24" src={item.image} alt="" />

            {/* Name */}
            <p className="text-left">{item.name}</p> 

            {/* Artist (Description) */}
            <p className="text-left">{item.desc}</p> 

            {/* Action (Remove Button) */}
            <button
              onClick={() => removeAlbum(item._id)}
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

export default ListAlbum;