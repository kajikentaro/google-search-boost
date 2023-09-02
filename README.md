# Chrome Extension Template

## Usage

Install package

```
npm run i
```

Start development compiler

```
npm run watch
```

After your development, build a package.
`build.zip` will be appeard.

```
npm run build
```

## Docker for development

You can develop chrome-extension without installation of Node.js.

Linux distribution or Mac OS are highly recommended because Windows hasn't support hot-reload yet.

```
docker compose run dev bash
# or
docker-compose run dev bash
```
