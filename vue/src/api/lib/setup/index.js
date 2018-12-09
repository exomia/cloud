import fs from 'fs'
import path from 'path'

const CONFIG_PATH = path.resolve(__dirname, '../../../', '.config')
const TEMPLATE_PATH = path.join(__dirname, 'config')

function createConfig(srcName, destName) {
    fs.copyFile(
        path.join(TEMPLATE_PATH, srcName),
        path.join(CONFIG_PATH, destName),
        err => {
            if (err) throw err
        }
    )
}

export default () => {
    // Notify
    console.log('Running setup...')
    console.log('Checking configs...')

    // Config lookup
    const configTemplates = fs.readdirSync(TEMPLATE_PATH, 'utf8')
    for (let srcFilename of configTemplates) {
        // Generate destination filename
        const destFilename = `.${srcFilename.replace('.json', '')}.config.json`

        // Check if config exists
        if (
            fs.stat(path.join(CONFIG_PATH, destFilename), err => {
                if (err) {
                    console.log(`Creating config file '${destFilename}'`)
                    createConfig(srcFilename, destFilename)
                }
            })
        );
    }
}
