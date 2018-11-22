import query from '../uitls/query.js'
import escape from '../uitls/escape'

class AboutModel {

    async updateAbout(data) {
        return await query(escape`UPDATE about SET content=${data} WHERE id=${1}`)
    }

    async GetAbout() {
        return await query(escape`SELECT * FROM about`)
    }
}

export default new AboutModel()