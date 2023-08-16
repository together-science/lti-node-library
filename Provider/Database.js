/*
* Database class to maintain and access Platform information
*/

const nullDb = {
    find: async (query)=>{
        return nullDb.storage[query]
    },
    add: async (key, object)=>{
        nullDb.storage[key] = object;
    },
    storage: {},
};

export class Database {
    
    static init(db) {
        Database.db = db;
    }

    static async Get(query) {
        try {
            return await Database.db.find(query)
        } catch(err) {
            console.log(`Error finding platform ${err}`)
            throw err;
        };
    };

    static async GetKey(query) {
        try {
            const key = await Database.db.find(query);
            return key[0].kid.publicKey;
        } catch(err) {
            console.log(`Error finding platform ${err}`)
            throw err;
        };
    }

    static async Insert(newPlatform) {
        return Database.db.add(newPlatform.consumerUrl, newPlatform);
    };

};


Database.init(nullDb);
