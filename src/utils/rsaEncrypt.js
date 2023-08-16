import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+u08sULPPVcgmA8HJASLtgYEsJBTMQ5F8Wgis5Es8tXaKNPyMXi4we8Cp7ipAIxS9ZAtLgboK46YU9Siot5P4quvMsfhiW8b3fKWeGvegi1h0haGk6zTxYwFaGaKhM9icnOnLMQ8BKIE7E37FOWIZ7jfC7NgCvnzaaHnRfmPKzQIDAQAB'
const privateKey = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAL67TyxQs89VyCYDwckBIu2BgSwkFMxDkXxaCKzkSzy1doo0/IxeLjB7wKnuKkAjFL1kC0uBugrjphT1KKi3k/iq68yx+GJbxvd8pZ4a96CLWHSFoaTrNPFjAVoZoqEz2Jyc6csxDwEogTsTfsU5YhnuN8Ls2AK+fNpoedF+Y8rNAgMBAAECgYEAhIsYNvySKAg9waUkurFue0xe3rToOxbNeHP8yWEQo8ya5upxgn5EbO7i8XQPqmh2ljJ64urwxXZzyOahbbW9PoMvLNiF+HmqWoNUgsUdl/YN7LcfKKP4MQOyjgi3Z9u6OkJaCQaFJbwD0PUPxT6MiOctUSRt8PLGfRz9J1oPIKUCQQDfJBatvBKnn1v+AdvYzvVy12NKLQRnBE0bMq3bW3DngkLtVzdPLiaSATIl/ZjOR3lUDIqVLdo+pgXtZ3jq2HDnAkEA2tF2n7iGi3tPQ3028rnAzPUu0M1hGU0EVXUqIBt8v99DOfeRtDB6+nTVDqotbDlN9/dbvsyofKZK8pLtBZIMKwJBALu7/yCYVRGV762bHr4gET1XnX+wtD1/zueNEdy16B2+6FQKxsvlRiocu3ZfEAqs85UVIBs2gqGmyOHd5kufYg0CQGPBPBgCcmviEjeNPOCY6BlH6UjNaGe1YbVnzYWHom6CZM5nW6hOtbG6U2r1D/IXicDypoOsH198HAzMCHwSobMCQBZ7hU9XIwSM2rA75bLxhj50vmq8DHj3sbCHy5tFbOWwwM3fjMQ1Fn0833NJIQcYC8OOF2Sc/eyQRgDaJuW1Y18='


// 加密
export function encrypt(txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey) // 设置公钥
    return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPrivateKey(privateKey) // 设置私钥
    return encryptor.decrypt(txt) // 对数据进行解密
}

// 非对称加密公钥:
// -----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+u08sULPPVcgmA8HJASLtgYEs
// JBTMQ5F8Wgis5Es8tXaKNPyMXi4we8Cp7ipAIxS9ZAtLgboK46YU9Siot5P4quvM
// sfhiW8b3fKWeGvegi1h0haGk6zTxYwFaGaKhM9icnOnLMQ8BKIE7E37FOWIZ7jfC
// 7NgCvnzaaHnRfmPKzQIDAQAB
// -----END PUBLIC KEY-----

// 非对称加密私钥:
// -----BEGIN PRIVATE KEY-----
// MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAL67TyxQs89VyCYD
// wckBIu2BgSwkFMxDkXxaCKzkSzy1doo0/IxeLjB7wKnuKkAjFL1kC0uBugrjphT1
// KKi3k/iq68yx+GJbxvd8pZ4a96CLWHSFoaTrNPFjAVoZoqEz2Jyc6csxDwEogTsT
// fsU5YhnuN8Ls2AK+fNpoedF+Y8rNAgMBAAECgYEAhIsYNvySKAg9waUkurFue0xe
// 3rToOxbNeHP8yWEQo8ya5upxgn5EbO7i8XQPqmh2ljJ64urwxXZzyOahbbW9PoMv
// LNiF+HmqWoNUgsUdl/YN7LcfKKP4MQOyjgi3Z9u6OkJaCQaFJbwD0PUPxT6MiOct
// USRt8PLGfRz9J1oPIKUCQQDfJBatvBKnn1v+AdvYzvVy12NKLQRnBE0bMq3bW3Dn
// gkLtVzdPLiaSATIl/ZjOR3lUDIqVLdo+pgXtZ3jq2HDnAkEA2tF2n7iGi3tPQ302
// 8rnAzPUu0M1hGU0EVXUqIBt8v99DOfeRtDB6+nTVDqotbDlN9/dbvsyofKZK8pLt
// BZIMKwJBALu7/yCYVRGV762bHr4gET1XnX+wtD1/zueNEdy16B2+6FQKxsvlRioc
// u3ZfEAqs85UVIBs2gqGmyOHd5kufYg0CQGPBPBgCcmviEjeNPOCY6BlH6UjNaGe1
// YbVnzYWHom6CZM5nW6hOtbG6U2r1D/IXicDypoOsH198HAzMCHwSobMCQBZ7hU9X
// IwSM2rA75bLxhj50vmq8DHj3sbCHy5tFbOWwwM3fjMQ1Fn0833NJIQcYC8OOF2Sc
// /eyQRgDaJuW1Y18=
// -----END PRIVATE KEY-----

