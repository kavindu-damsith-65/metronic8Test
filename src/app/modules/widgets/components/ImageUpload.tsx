
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {motion} from 'framer-motion'
import { defaultReqPost, statics } from '../../../request/main';
import axios from 'axios';





export default function ImageUpload({image,setImage}:{image:any;setImage:any}) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setUploadedFiles(acceptedFiles);
      uploadImage(acceptedFiles[0]);
    },
    accept: {
      'image/*': []
    },
  });


  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file); 
    
    try {
      const response = await defaultReqPost(formData , 'uploads/image-upload');
      setImage(response.data.imageUrl)

  } catch (error:any) {
      console.error('Error fetching movie details:', error);
  }

  };


  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {image ?

        <div className="image-upload-container">
          <div
            className="image-input-wrapper w-250px h-250px"
            style={{
              backgroundImage: `url(${statics+image})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }}
          >
            <div className='edit-icon-img-upload'>
              <div style={{width:'100%',height:'100%'}} className="d-flex justify-content-center align-items-center ">
                <motion.div whileHover={{scale:1.5}}>✏️</motion.div>
              </div>
            </div>

          </div>
        </div>
        :
        <div
          className='image-input-wrapper w-250px h-250px'
          style={{ backgroundImage: `url(${'https://cdn-icons-png.flaticon.com/512/2716/2716054.png'})` }}
        ></div>
      }


    </div>
  );
}
