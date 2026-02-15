import {S3Client, PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3'

export default defineNuxtPlugin(() => {
    const s3 = new S3Client({
        endpoint: 'https://storage.clo.ru/',
        region: 'us-east-1',
        credentials: {
            accessKeyId: '3815UPJNP3WD02UD7BR9',
            secretAccessKey: 'HOP8JyvDBhR6XQePPmD3DvscsKR890ND7W9eDmdy',
        },
    });

    const uploadFile = async (file) => {
        const bucket = 's3-user-e5a009-default-bucket'

        const uniqueKey = `${Date.now()}-${file.name}`;
        const buffer = await file.arrayBuffer()

        const command = new PutObjectCommand({
            Bucket: bucket,
            Body: buffer,
            Key: uniqueKey,
            ACL: 'public-read',
            ContentType: file.type,
        })

        const result = await s3.send(command)
        if (result) {
            return `https://${bucket}.storage.clo.ru/${uniqueKey}`
        }
        return result
    }

    const deleteFile = async (file) => {
        const bucket = 's3-user-e5a009-default-bucket'

        if (typeof file !== 'string' || file.trim() === '') {
            return;
        }

        try {
            const input = {
                Bucket: bucket,
                Key: file,
            };
            const command = new DeleteObjectCommand(input);
            const data = await s3.send(command);

            console.log("File deleted successfully:", data);
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    return {
        provide: {
            s3,
            uploadFile,
            deleteFile,
        },
    };
});
