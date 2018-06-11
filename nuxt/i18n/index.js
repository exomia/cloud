import fs from 'fs'
import path from 'path'

fs.readdir(path.join(__dirname, '/translations'), (err, files) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(files)
})
