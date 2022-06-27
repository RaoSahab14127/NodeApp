const http= require ("http");
const fs= require ("fs");
const path= require ("path");
const filePath=path.join(__dirname,"file.txt");


const server= http.createServer((req,res)=>{
  if ((req.url)==="/"){
    res.setHeader('Content-Type','Text/html')
    res.write("<form action='/submit' method='post'><input type='text' name='text' id='T' size='35'><label for='T'>Text:::</label><button>Submit</button></form>");
    res.end();
  
  }

else if ((req.url)==="/submit"){
  let data = "";
  req.on("data",(chunk)=>{data+=chunk});
  req.on("end",()=>{
    fs.readFile(filePath,'utf8',(err,oldata)=>{
      let newdata=oldata+ '\n'+data
      fs.writeFile(filePath,newdata,()=>{console.log("saved")});

    })
    
  });

  res.write("Dta Recieved");
  res.end();
}
})
server.listen(8080);