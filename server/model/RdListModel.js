import query from '../uitls/query.js'
import escape from '../uitls/escape'

class RdListModel {

    async getReadList() {
        return await query(escape`SELECT * FROM rd_list ORDER BY id DESC`)
    }

    async getReadListLimit(size, limit) {
        return await query(escape`SELECT * FROM rd_list ORDER BY id DESC LIMIT ${size},${limit}`)
    }

    async updateReadList(author, name, score, id) {
        return await query(escape`UPDATE rd_list SET author=${author}, name=${name}, score=${score} WHERE id=${id}`)
    }

    async addBooks(author, name, score) {
        return await query(escape`INSERT INTO rd_list SET author=${author}, name=${name}, score=${score}`)
    }

    async delReadList(id) {
        return await query(escape`DELETE FROM rd_list WHERE id=${id}`)
    }
}

export default new RdListModel()