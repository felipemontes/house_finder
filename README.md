# House Scraper

Web scraper que genera un CSV con todos los apartamentos que estan siendo listados en la pagina web fincaraiz.com.co. La intencion es poder ver y procesar los datos de una manera mas sencilla y encontrar el apartamento deseado.

## Instalacion

Debe tener instalado npm para correr el scraper

```bash
cd house_scraper
npm install
```

## Uso

Primero debe configurar la cantidad de paginas que desea recorrer con el scraper, para esto entre al archivo scrapper.js con cualquier editor de codigo y cambie la variable TOTAL con el valor deseado.

![](https://i.imgur.com/JLa82Nl.jpg)
Para iniciar el scraper:

```javascript
node scrapper.js
```

![](https://i.imgur.com/X16cFYd.jpg)  
En la consola se van a ir viendo los diferentes datos obtenidos y cuando el scraper termine va a quedar un archivo llamado out.csv donde van a quedar guardados todos los datos obtenidos

![](https://i.imgur.com/7DBRELu.jpg)

## Contributing

Los pull request son bienvenidos para implementar funcionalidades, puedes crear un ticket si encuentras algun error.

## License

[MIT](https://choosealicense.com/licenses/mit/)
