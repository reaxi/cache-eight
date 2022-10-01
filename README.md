# cache-eight

> **cache** + v**8**

-   checksum keys

-   access data from json files (persistent cache)

-   optimize functions execution time for expensive operations

-   data is saved using v8's serialize / deserialize

## why?

caching expensive pure functions results

same inputs -> same results

### use case

from 3s to 1s

> @todo

## Usage

```ts
import Cache from 'cache-eight';

const cache = new Cache();
```

```
folder                           file
> OS_temp_dir/.cache8/appName -> cache.json
```

#### high level api

```ts
const values = [1, 2, 3];
const key = values.toString();

const cached = await cache.get(key, () => values.map(value => value * 2));
// will return the cached if valid or the actual value (and serialize for the future)
```

custom options:

```ts
const customPath = path.resolve(process.cwd());

//custom folder:
const customCache = new Cache(customPath);

//custom file:
customCache.get(k, () => v, { filePath: 'my-file.json' });

// cache duration (time to live):
customCache.get(k, () => v, { ttl: 1000 * 60 }); // number in ms;
```

#### granular control api

```ts
const values = [1, 2, 3];
const key = values.toString();

async function get() {
    const cached = await cache.deserialize(key);

    // if has cached value, return early (skipping further functions)
    if (cached) return cached;

    //else get it from somewhere
    const result = values.map(value => value * 2);

    //cache the result
    await cache.serialize(key, result);

    return result;
}

await get();
```

## API

```ts
get(key, () => val, options?) => val
serialize(key, val, options?) => val
deserialize(key, options?) => cachedVal | false

// key and val are any valid Json objects


options = {
    filPath: string + .json //file.json
    ttl: number //ms
}

```
