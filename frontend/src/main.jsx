import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './app/routes/routes'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <Toaster position="top-right" />
      <RouterProvider router={router}/>
    </Provider>
)
