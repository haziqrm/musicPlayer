import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { url } from '../App'

const AddSongs = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('audio', song);
      formData.append('album', album);

      const response = await axios.post(`${url}/api/song/add`, formData);

      if (response.data.success) {
        toast.success("Song added successfully!");
        // Reset form state
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);
      } else {
        toast.error("Something went wrong.");
      }
      setLoading(false);
    } catch (error) {
      toast.error("An error occurred while uploading the song.");
      console.error(error); // Log the error for debugging
    } finally {
      // Ensure loading is stopped regardless of success or error
      setName("");
      setDesc("");
      setAlbum("none");
      setImage(false);
      setSong(false);
      setLoading(false);
    }
  };

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setAlbumData(response.data.albums);
      }
      else {
        toast.error("Unable to load album data")
      }
    } catch (error) {
      toast.error("Error occured");
    }
  }

  useEffect(() => {
    loadAlbumData();
  }, [])

  return loading ? (
    <div className='grid place-items-center min-h-[82vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-white rounded-full animate-spin' />
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-white'>
      <div className='flex flex-row gap-8'>
        {/* Upload Song Section */}
        <div className='flex flex-col gap-4'>
          <p>UPLOAD SONG</p>
          <input
            onChange={(e) => setSong(e.target.files[0])}
            type='file'
            id='song'
            accept='audio/*'
            hidden
          />
          <label htmlFor='song'>
            <img
              src={song ? assets.upload_added : assets.upload_song}
              className='w-24 cursor-pointer'
              alt=''
            />
          </label>
        </div>

        {/* Upload Image Section */}
        <div className='flex flex-col gap-4'>
          <p>UPLOAD IMAGE</p>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type='file'
            id='image'
            accept='image/*'
            hidden
          />
          <label htmlFor='image'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className='w-24 cursor-pointer'
              alt=''
            />
          </label>
        </div>
      </div>

      {/* Song Name */}
      <div className='flex flex-col gap-2.5'>
        <p>SONG NAME</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='bg-transparent outline-gray border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          placeholder='Type here'
          type="text"
          required
        />
      </div>

      {/* Artist Name */}
      <div className='flex flex-col gap-2.5'>
        <p>ARTIST</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className='bg-transparent outline-gray border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          placeholder='Type here'
          type="text"
          required
        />
      </div>

      {/* Album */}
      <div className='flex flex-col gap-2.5'>
        <p>ALBUM</p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          defaultValue={album}
          className='text-gray-400 bg-transparent outline-none border-2 border-gray-400 p-2.5 w-[max(10vw,250px)]'
          value={album}
        >
          <option value='None' className='text-white bg-[#121212]'>None</option>
          {albumData.map((item, index) => (
            <option key={index} value={item.name} className='text-white bg-[#121212]'>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button type="submit" className='font-bold text-base bg-black text-white py-2.5 px-14 cursor-pointer mb-5'>
        SUBMIT
      </button>
    </form>
  );
};

export default AddSongs;