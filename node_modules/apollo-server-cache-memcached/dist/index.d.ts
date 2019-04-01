import { KeyValueCache } from 'apollo-server-caching';
import Memcached from 'memcached';
export declare class MemcachedCache implements KeyValueCache {
    readonly client: any;
    readonly defaultSetOptions: {
        ttl: number;
    };
    constructor(serverLocation: Memcached.Location, options?: Memcached.options);
    set(key: string, value: string, options?: {
        ttl?: number;
    }): Promise<void>;
    get(key: string): Promise<string | undefined>;
    delete(key: string): Promise<boolean>;
    flush(): Promise<void>;
    close(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map