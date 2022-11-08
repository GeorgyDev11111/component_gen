# Component generator

Simple component generator for React js.

**Example**:
```console
$ gen-component -c=name
```
```console
|-- components
   |-- name
      |-- Name.jsx
      |-- style.css
```

## Links

* [Install](#install)
* [Flags and Aliases](#flags-and-aliases)
* [Subfolders](#subfolders)
* [Npm script](#npm-script)

## Install
Install with [npm](https://www.npmjs.com/)

```console
$ npm i gen-component -g
```

## Flags and Aliases
File name
> name for component, !required
```console
--component=name as -c=name
```
Component extension
> extension name for component, by default equals `jsx`
```console
--ext=extname as -e=extname
```
File is style
> `extension name` for style, by default equals `css`
```console
--style-type=extname as -st=extname
```
or
> `null` for remove file
```console
--style-type=null as -st=null
```
Index file:
> create index file with export, by default not exist
```console
--index as -i
```

## Subfolders

```console
$ gen-component -c=folder/component
```
```console
|-- components
   |-- folder
      |-- component
         |-- Component.jsx
         |-- style.css
```

## Npm script
 **Example**:

File: `package.json`

```console
"scripts": {
   "create": "gen-component -i -e=tsx -st=scss" 
}
```
```console
$ npm run create -- -c=name
```

```console
|-- components
   |-- name
      |-- Name.tsx
      |-- style.scss
      |-- index.ts
```