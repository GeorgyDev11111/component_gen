 ## Component Generator

 ##### Example:
```pwsh
component_gen -c=name
```

```
|-- components
   |-- name
      |-- Name.jsx
      |-- name.css
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
```pwsh
--component=name as -c=name
```
Component extension
```pwsh
--ext=extname as -e=extname
```
Style extension
```pwsh
--style-type=extname as -st=extname
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
         |-- component.css
```

 ### Notes:
* The executable file can be run from anywhere
