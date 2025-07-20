import OSS from 'ali-oss';

let client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI5tBXxCoXxhr7FeSnBJQx',
    accessKeySecret: 'MHIqgPBVzcVyZ3j6egU2Ccc8txzTf6',
    bucket: 'fangzhengyuan'
})

export default client;