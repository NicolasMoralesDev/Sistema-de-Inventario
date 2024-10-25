import React from "react"
import { createRoot } from "react-dom/client"
import esES from "antd/lib/locale/es_ES"
import App from "./App.tsx"
import RoutingLogin from "./routes/RoutingLogin.tsx"
import { ConfigProvider } from "antd"
import { defaultValidationMessages } from "./defaults/validation-messages.ts"
import "./index.css"

createRoot(document.getElementById('root')!).render(
	  <ConfigProvider
	    locale={ esES }
	    form={ {
		 validateMessages: defaultValidationMessages
	    } }
	  >
		<RoutingLogin>
		  <App/>
		</RoutingLogin>
	  </ConfigProvider>
	,
)
