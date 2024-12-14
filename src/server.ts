import fastify from "fastify";
const app = fastify()
import { users } from "./routes/users-routes";
import fastifyCookie from "@fastify/cookie";
import { refeicao } from "./routes/refeicao-routes";
import { metricas } from "./routes/metricas-routes";


app.register(fastifyCookie)
app.register(users)
app.register(refeicao)
app.register(metricas)


app.listen({
    port: 3000
}).then(() => {
    console.log('http server ruuning')
})
