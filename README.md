# House Scraper
# (En construccion el fron-end con REACT)

House Scraper es un web scraper que genera un CSV con todos los apartamentos en arriendo que están siendo listados en la pagina web fincaraiz.com.co. La intención es poder ver y procesar los datos de una manera mas sencilla y encontrar el apartamento deseado.

## Instalación

Clone el repositorio y ejecute el siguiente codigo en la carpeta cliente y servidor para descargar todos los paquetes necesarios.

```bash
cd house_scraper
cd client
npm install
cd ..
cd server
npm install

```
Recuerde que tiene que crear un archivo de configuracion con la informacion de la base de datos y ajustar la hora que aparece dentro del archivo cron.js dentro de la carpeta servidor.


## Uso

En una consola ingrese a la carpeta cliente y ejecute el siguiente codigo, se le abrira una ventana del navegador en donde encontrar la interfaz.

![](https://i.imgur.com/IM78T8T.jpg)
Para iniciar el scraper:

```python
npm start
```

En una nueva consola ingrese a la carpeta servidor y ejecute el siguiente codigo, esto iniciara el servidor express y a su vez iniciara la cuenta regresiva para ejecutar los cron que obtienen los datos.
![](https://i.imgur.com/X16cFYd.jpg)
![](https://i.imgur.com/7DBRELu.jpg)

## Contribuir

Los pull request son bienvenidos para implementar funcionalidades.  
Puedes crear un ticket si encuentras algún error.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
