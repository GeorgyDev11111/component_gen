 ## Component Generator

 ##### Example:
```pwsh
component_gen -c=name
```

```
|-- components
   |-- name
      |-- Name.jsx
      |-- style.css
```

 >Install locally:

 1. `git clone <this repo>`
 2. `cd component_gen`
 3. `npm link`

 >Uninstall:

 ```pwsh
 npm unlink component_gen
 ```

## Flags and Aliases
File name
> name for component, !required
```pwsh
--component=name as -c=name
```
Component extension
> ext name for component, default = jsx
```pwsh
--ext=extname as -e=extname
```
Style extension
> style ext name or null for remove file styles, default = css
```pwsh
--style-type=extname as -st=extname
or
--style-type=null as -st=null
```
Index file:
> create index file with export, default = not exist
```pwsh
--index as -i
```

## Nested folders support

```pwsh
component_gen -c=folder/component
```
```
|-- components
   |-- folder
      |-- component
         |-- Component.jsx
         |-- style.css
```

### npm script
##### Example:

```
"scripts": {
   "create": "component_gen -i -e=tsx -st=scss" 
}
```
`npm run create -- -c=name`

```
|-- components
   |-- name
      |-- Name.tsx
      |-- style.scss
      |-- index.ts

```

### Notes:
* The executable file can be run from anywhere
