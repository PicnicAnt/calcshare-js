import memoryCache from 'memory-cache';

class EquationCache {
    cache;

    constructor() {
        this.cache = new memoryCache.Cache();
    }

    get(key) {
        return this.cache.get(key);
    }

    put(key, value) {
        return this.cache.put(key, value);
    }

    getOrCreate(key, func) {
        const existingValue = this.cache.get(key);
        if (existingValue) {
            return existingValue;
        }

        const newValue = func();
        this.cache.put(key, newValue);
        return newValue;
    }
}

export const equationCache = new EquationCache();