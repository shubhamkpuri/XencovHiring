const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Record = require('../models/Record');
const fs = require('fs');
const upload = require('../config/multer');
const csv = require('csv-parser');
const converter = require('../util/dataToModel');
const Busboy = require('busboy');
const path = require('path');

router.get('/',(req,res)=>{
    Record.findAll()
    .then(records =>{
         console.log(records)
         res.send(records);
    })
    .catch(err => console.log('Error : '+err))
    
})
router.post('/upload-file',upload.single('file'),(req,res)=>{
    fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data',  (data)=>{
        try {
            savingRecord = converter.convertData(data);
            Record.create(
                    savingRecord
            ).then(()=>{

            }).catch((err)=>{
                console.error('Error  : ' +' '+ err );
            })      
        }
        catch(err) {
            console.error(err)
        }
    })
    .on('end',function(){
        /* Delete file after processing */
        fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error('Error while deleting the file : ',err);
            } 
        })
      
    });
    return  res.status(200).send(
        'Filed uploaded successfully and Data is being migrated to Database'
    )
})

router.post('/chunk-file',(req,res)=>{
    var busboy = new Busboy({
        headers: req.headers
    });
    let saveTo ;
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        file.on('data', function(data) {
            console.log('File [' + fieldname + '] got '+data.length+' bytes');
        });
        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
        });
         saveTo = path.join(__dirname, '../public/data/', path.basename(filename));
        var outStream = fs.createWriteStream(saveTo);
        file.pipe(outStream);
    });
    busboy.on('finish', function() {
        res.writeHead(200, {
            'Connection': 'close'
        });
        fs.createReadStream(saveTo)
        .pipe(csv())
        .on('data',  (data)=>{
            try {
                savingRecord = converter.convertData(data);
                Record.create(
                    savingRecord
                ).then(()=>{
                    savedCount+=1;
                    console.log('Saved ')
                }).catch((err)=>{
                    errorCount = errorCount+1;
                    console.error('Error  : ' +errorCount+' '+ err );
                })     
            }
            catch(err) {
                console.error(err)
            }
        })
        .on('end',function(){
            res.end("Records have been migrated");
        });
       
    });
    return req.pipe(busboy);
})

module.exports = router;