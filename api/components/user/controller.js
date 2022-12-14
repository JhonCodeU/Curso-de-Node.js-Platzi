import { list, get, upsert, update, remove } from '../../../store/mysql.js';
//import { list, get, upsert, remove, update } from '../../../store/mysql.js';
import { nanoid } from 'nanoid';
import auth from '../auth/index.js';
const TABLE = 'user';

export default function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        return;
    }

    function listUsers (req, res) {
        console.log('listUsers');
        return list(TABLE)
    }

    function getUser (id) {
        return get(TABLE, id);
    }

    async function createUser (data) {
        const user = {
            id: data.id || nanoid(),
            name: data.name,
            username: data.username
        };

        if (data.password || data.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password
            });
        }

        return upsert(TABLE, user);
    }

    function updateUser (id, data) {
        return update(TABLE, { id, ...data });
    }

    function deleteUser (id) {
        return remove(TABLE, id);
    }

    function follow (from, to) {
        return upsert(TABLE + '_follow', {
            user_from: from,
            user_to: to
        });
    }

    return {
        listUsers,
        getUser,
        createUser,
        deleteUser,
        updateUser,
        follow
    }
}