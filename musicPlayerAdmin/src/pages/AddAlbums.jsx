import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { assets } from '../assets/assets';
import { url } from '../App';
import { toast } from 'react-toastify'; // Ensure toast is imported

const AddAlbums = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [colour, setColour] = useState("#ffffff");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('bgColour', colour);
  
      const response = await axios.post(`${url}/api/album/add`, formData);
  
      if (response.data.success) {
        toast.success("Album added successfully!");
        // Reset form state
        setName("");
        setDesc("");
        setImage(false);
        setColour('#ffffff');
      } else {
        toast.error("Something went wrong.");
      }
      setLoading(false);
    } catch (error) {
      toast.error("An error occurred while uploading the album.");
      console.error(error); // Log the error for debugging
      setLoading(false);
    } finally {
      // Ensure loading is stopped regardless of success or error
    }
  };

  return loading ?  (
    <div className="grid place-items-center min-h-[82vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-white rounded-full animate-spin" />
    </div> 
  ) : (
    <div className="bg-[#121212] h-screen">
      <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-white">
        <div className="flex flex-row gap-8">
          {/* Upload Image Section */}
          <div className="flex flex-col gap-4">
            <p>UPLOAD IMAGE</p>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
              hidden
            />
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                className="w-24 cursor-pointer"
                alt=""
              />
            </label>
          </div>
        </div>

        {/* ALBUM Name */}
        <div className="flex flex-col gap-2.5">
          <p>ALBUM NAME</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-transparent outline-gray border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
            placeholder="Type here"
            type="text"
            required
          />
        </div>

        {/* Artist Name */}
        <div className="flex flex-col gap-2.5">
          <p>ARTIST</p>
          <input
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="bg-transparent outline-gray border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
            placeholder="Type here"
            type="text"
            required
          />
        </div>

        {/* Album Colour */}
        <div className="flex flex-col gap-2.5">
          <p>COLOUR</p>
          <input 
            type="color" 
            value={colour} 
            onChange={(e) => setColour(e.target.value)} 
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="font-bold text-base bg-black text-white py-2.5 px-14 cursor-pointer mb-5"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default AddAlbums;