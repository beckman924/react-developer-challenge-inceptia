## 2.1) ¿Cómo implementarías las acciones del frontend utilizando redux? (por ejemplo autenticación, solicitud de clientes activos para el usuario y solicitud de casos por cliente)

- Primero instalaría las librerías necesarias: **redux**, **react-redux**, **@reduxjs/toolkit** y **@types/react-redux**.

- Crearía las carpetas "actions, reducers, y store" para organizar el código. También los componentes para la autenticación, clientes y casos por cliente.

- Luego crearía las acciones asíncronas con **createAsyncThunk** de **@reduxjs/toolkit** para manejar las solicitudes a la API.

- Para los reducers usaría createSlice para manejar el estado, las acciones, los estados de carga, éxito y error para cada acción.

- En el reducer de Autenticación manejaría el estado de autenticación, con el inicio y cierre de sesión.
  Y en el reducer de Clientes la lista de clientes activos y los casos por cliente.

- Luego combinaría los reducers en un **rootReducer** y configuraría el store con **configureStore** de **@reduxjs/toolkit**.

- Por ultimo habría que utilizar el componente **Provider** de **react-redux** para proporcionar el store a la aplicación, envolviendo el componente raíz App con el **Provider**.

- Y ya se podrían utilizar las acciones en cada componente correspondiente (autenticación, clientes y casos).

## 2.2) Si quisiéramos agregar una ruta nueva a la app, ¿cómo reestructurarías el index.js?

Depende el framework que se utilice, por ejemplo en mi caso utilicé **Next.js** y para agregar una nueva ruta no haría falta ninguna configuración especial, solo crear una carpeta con el nombre de la nueva ruta dentro de la carpeta _app_ y crear dentro de ella un archivo con el nombre _page.tsx_.

En el caso de _React vainilla_ se debería utilizar alguna biblioteca de enrutamiento como **React Router**, para esto crearía una variable para almacenar las rutas que tenga la _App_ usando **createBrowserRouter** de esta forma:

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);
```

Cada objecto que se agregue dentro de ese array seria una nueva ruta donde _path_ es el nombre de la ruta y _element_ el componente a renderizar.

Luego solo quedaría renderizar el componente **RouterProvider** de **React Router** pasando como _router_ la variable que creamos.

El archivo _index.js_ tendría una estructura como esta:

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```
