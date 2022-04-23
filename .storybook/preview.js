import '!style-loader!css-loader!sass-loader!../scss/index.scss'
import { RouterContext } from "next/dist/shared/lib/router-context"

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
