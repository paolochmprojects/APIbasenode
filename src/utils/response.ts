import http from "node:http"

export const resp = ( res: http.ServerResponse,  data: any , statusCode: number)=>{
    res.writeHead(statusCode, {"Content-Type": "application/json"})
    res.write(JSON.stringify(data))
    return res.end() 
}