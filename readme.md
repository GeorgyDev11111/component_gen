  ## Генирация компонентов jsx

```pwsh
node app.js --component=<Name> 
```
```
|-- components 
   |-- <Name> 
      |-- <Name>.jsx 
      |-- <Name>.css
``` 

```pwsh
node app.js --component=<Name> --style-type=<ext> 
```
```
|-- components 
   |-- <Name> 
      |-- <Name>.jsx 
      |-- <Name>.<ext> 
``` 

## Alias

```pwsh
--component=<Name> as -c=<Name> 
```

```pwsh
--style-type=<ext> as -st=<ext> 
```

 ### Примечания:
* Исполняемый файл можно запускать из любого места, всё будет работать
