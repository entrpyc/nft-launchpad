const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwOWMxNmIzYy05ZWRlLTQ2MDQtYmYyMi0zYmQ4YzUxYjE0NjkiLCJlbWFpbCI6ImFzZW5hbmdlbG92LmN2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2OWI5NjJjZGY0ZGIwNTBhZWU4ZSIsInNjb3BlZEtleVNlY3JldCI6IjRlY2Y2ZWYzNTM4MWY5NTUwZWZkOWM0ZDM5ODMxZDNmNGI5OWQ4MmQ3Y2FiMTRlNTdiNDgzNDRlNmY1MWM1MGMiLCJpYXQiOjE3MTI1NzA2MTB9.nvQi42yCDIqTXwnBp6-jsb4V84CwsPmxtdHmFDGZj94"

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "./test.jpg";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()


// https://fuchsia-neighbouring-lemur-97.mypinata.cloud