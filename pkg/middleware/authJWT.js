const { expressjwt } = require("express-jwt")

const authJWT = ()=>{
    return expressjwt().unless({
        path: [
            
        ]
    })
}