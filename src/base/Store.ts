export class Store {
    private readonly _key: string;
    private readonly _storage = sessionStorage;

    constructor(key: string) {
        this._key = key;
    }

    public save(data: string) {
        this._storage.setItem(this._key, data)
    }

    public read() {
        return this._storage.getItem(this._key) || ''
    }
}
