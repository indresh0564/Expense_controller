const AWS = require('aws-sdk');

exports.UploadToS3 = async(data , filename)=>{

    const IAM_USER_KEY = 'AKIA5AQPD7A6R5LKYK6M';
    const IAM_USER_SECRET = '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';
    const BucketName = 'indreshsahubucket';
      
    const s3bucket = new AWS.S3({
      accessKeyId:IAM_USER_KEY,
      secretAccessKey:IAM_USER_SECRET
    })
    
    var params = {
      Bucket:BucketName,
      Key:filename,
      Body:data,
      ACL:'public-read'
    }
    
    return new Promise((resolve , reject)=>{
      s3bucket.upload(params , (err , response)=>{
        if(err){
          console.log('somthing went wrong', err)
          reject(err);
        }else{
          console.log('success', response.Location);
          resolve(response.Location);
        }
      })
    })
    }