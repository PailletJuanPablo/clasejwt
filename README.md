# JSON WEB TOKENS

- Estandar de codificación de datos
- Se utiliza para realizar peticiones a la API y persistir al usuario que la realiza, es decir, saber cual es el usuario que realiza la petición (que no podemos persistirlo directamente con la API)

## Proceso de autenticación con JSON Web Token (no es el único)

### Servidor
- Recibirá una petición para registro o login, con los datos que correspondan (por ejemplo, el usuario y contraseña de quien quiera loguearse)
- Verificará estos datos (si el usuario existe, si la contraseña es correcta)
- Si los datos son correctos, generará el token con los datos del usuario (su id, el objeto completo, etc)
- Devolverá el token al cliente, que lo almacenará para enviarlo luego
- En las próximas peticiones que nos envíe el cliente, podremos identificar a cual usuario corresponden, convirtiendo el token a los datos originales

# Cliente
- Realizaremos una petición a la API (por ejemplo login) que, si sale correctamente, nos devolverá en la respuesta el token
-  Almacenaremos este token en localStorage
- En las próximas peticiones, obtendremos este token almacenado, y se lo enviaremos a la API. En este caso, lo enviamos agregando el Header Authorization con el valor 'Bearer ' + el token

# Proceso Completo

- Instalar la libreria [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

```
npm install jsonwebtoken
```

- Generamos un token desde el server y se lo devolvemos al usuario, con el método jwt.sign(). El primer parámetro son los datos a encodear (puede ser un string o un objeto), y como segundo parámetro nuestro string secreto (puede ser cualquiera)
- El cliente almacena el token enviado en su localStorage para enviarlo en la próximas peticiones
- Cliente envía token a la API, puede ser a través el Header Authorization, con el valor 'Bearer ' + token, o puede ser como parámetro de query http://localhost:3000/users/saludar?token=1234132 
- Se crea un middleware a través del cual API recibe Token, lo decodifica. Si el token es correcto, agrega estos datos al objeto req. para que pueda ser utilizado por los siguientes elementos (controladores, otros middlewares, etc.).  Para poder verificarlo, llamamos al método jwt.decode(tokenADecodificar). Este token a decodificar lo obtendremos del header Authorization (como en este ejemplo), de un parámetro de query, etc.

### Generación del token
Ver archivo controllers/userController.js

### Decodificación del token
Ver archivo mdidlewares/jwtMiddleware




