import {v4 as uuidv4} from "uuid";
import {PutObjectCommand, S3} from "@aws-sdk/client-s3";
import {handleError} from "@/lib/utils";

const s3Client = new S3({
    region: process.env.NEXT_PUBLIC_AWS_REGION!,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
});

export const uploadToS3 = async ( file : File, prefix?: string)=> {
    const prefixString = prefix ? prefix : '';
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const fileExtension = file.name.split('.').pop();
    const id = uuidv4();
    const fileId = `${id}.${fileExtension}`
    const file_key = `${process.env.NEXT_PUBLIC_AWS_BUCKET_WAREHOUSE}${prefixString}/${dateStr}/${Date.now()}/${fileId}`;

    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Key: file_key,
        Body: file,
    };
    const command = new PutObjectCommand(params);
    try {
         await s3Client.send(command);
        return file_key;
    } catch (error) {
        handleError(error)
    }
}