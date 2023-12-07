import fs from 'fs';
import path from 'path';


const fileRemover = (filename) => {
  const uploadsPath = path.join(process.cwd(), 'uploads'); // Use process.cwd() to get the current working directory
  fs.unlink(path.join(uploadsPath, filename), (err) => {
    if (err && err.code === 'ENOENT') {
      // File doesn't exist
      console.log(`File ${filename} doesn't exist, won't remove it.`);
    } else if (err) {
      console.error(`Error removing file ${filename}`, err);
    } else {
      console.log(`Removed ${filename}`); 
    }   
  }); 
};

export { fileRemover };
