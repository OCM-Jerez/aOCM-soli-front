1.- Realizar los cambios en local y hacer push
2.- Recordar no tocar environment
          export const environment = {
          production: false,
          // baseUrl: 'http://localhost:4000/api'
          baseUrl: 'http://localhost:8081/api/',
          // baseUrl: 'http://mamjerez.es/api/',
          IsAdmin: true,
          // userLoged: 'string'
        };

3.- Abrir consola de Digital Ocean
4.- dockers ps  comprueba que todos los servicios estan levantados.
5.- cd al directorio del front o el back (el que tenga cambios)
6.- git pull
7.- cd a home
8.- docker-compose up -d --build
9.- Si al abrir el navegador no refleja los cambios, probar desde una ventana de incognito, si funciona es problema de la cache, limpiar historico de navegación.
