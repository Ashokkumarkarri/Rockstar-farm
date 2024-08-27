const fs=require('fs');
const http=require('http')
const url=require('url')

const repalceFun =(el,html)=>{
    let finalOutput=html.replace("{%NAME%}",el.gameName);
    finalOutput=finalOutput.replace("{%IMAGE%}",el.image);
    finalOutput=finalOutput.replace("{%PRICE%}",el.price);
    finalOutput=finalOutput.replace("{%AGE%}",el.hero);
    finalOutput=finalOutput.replace("{%DIFFULCITY%}",el.difficulty);
    finalOutput=finalOutput.replace("{%DESCRIPTION%}",el.description)
    finalOutput=finalOutput.replace("{%FROM%}",el.from)
    finalOutput=finalOutput.replace("{%HERO%}",el.hero)
    finalOutput=finalOutput.replace("{%STARS%}",el.difficulty)

    return finalOutput
}

const dataObj=fs.readFileSync('./dev-data/data.json','utf-8')

const htmlProductPage=fs.readFileSync('./templates/product.html','utf-8');
const htmlOverViewPage=fs.readFileSync('./templates/overview.html','utf-8');
const htmlCard=fs.readFileSync('./templates/card.html','utf-8')

const server=http.createServer((req,res)=>{
    const {query,pathname}=url.parse(req.url,true);

    //overview Page
    if(pathname==='/' || pathname==='/overview' ){
        res.writeHead(200,{'content-type':'text/html'})
         let updatedCard=(JSON.parse(dataObj)).map(el=>repalceFun(el,htmlCard)).join('')
        let output=htmlOverViewPage.replace('{%PRODUCTSCARD%}',updatedCard)
        res.end(output)

        //product
    }else if(pathname=== '/product'){
        res.writeHead(200,{'content-type':'text/html'})
        const id=[query.id]
        const jsonArr=JSON.parse(dataObj)
        const product=jsonArr[id]
        const output=repalceFun(product,htmlProductPage)
        res.end(output);


    }else if(pathname=== '/api'){

            res.end('API')
    
            //page not found   
    }else{
        res.writeHead(404,{'content-type':'text/html'})
        res.end('<h1>Page Not Found <h1>')
    }

})

server.listen(8000,'127.0.0.1',()=>{
    console.log(`Listining from Port number 8000`)
})