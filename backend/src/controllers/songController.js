import {v2 as cloudinary} from 'cloudinary'
import songModel from '../models/songModel.js';



const addSong = async (req,res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
            resource_type: "video",
            folder: "musicPlayer/songs"
        });
        
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
            folder: "musicPlayer/images"
        });
        
        console.log("Audio upload response:", audioUpload);
        console.log("Image upload response:", imageUpload);
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = songModel(songData);
        await song.save();

        res.json({success:true,message:"Song added"})

    } catch (error) {
        console.log('Audio Folder Path:', "musicPlayer/songs");
    console.log('Image Folder Path:', "musicPlayer/images");
        console.log("Cloudinary Name:", process.env.CLOUDINARY_NAME);
        console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
        console.log("Cloudinary Secret Key:", process.env.CLOUDINARY_SECRET_KEY);
        console.error('Error in addSong:', error.message); // Log the error message
        res.json({ success: false, message: error.message || 'An error occurred while adding the song' });
    }
};

const listSong = async (req,res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({success: true, songs:allSongs});
    } catch (error) {
        console.error("Error fetching songs:", error.message);
        res.json({ success: false, message: error.message });
    }
}

const removeSong = async(req,res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message: "Song removed"});
    } catch (error) {
        res.json({success:false}); 
    }
}


export {addSong, listSong, removeSong}