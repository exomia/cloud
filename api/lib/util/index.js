const SECRETKEY = 'mr1CblSuueLdVVmciEYP'

export function xor_encode(s) {
    if (!s) {
        return null
    }
    let enc = ''
    let str = s.toString()
    for (let i = 0; i < str.length; ++i) {
        enc += String.fromCharCode(str.charCodeAt(i) ^ SECRETKEY.charCodeAt(i % SECRETKEY.length))
    }
    return Buffer.from(enc).toString('base64')
}

export function xor_decode(s) {
    if (!s) {
        return null
    }
    let enc = ''
    let str = Buffer.from(s.toString(), 'base64').toString('ascii')
    for (let i = 0; i < str.length; ++i) {
        enc += String.fromCharCode(str.charCodeAt(i) ^ SECRETKEY.charCodeAt(i % SECRETKEY.length))
    }
    return enc
}
