(async()=>{

    const{
    
    data
    
    }=await db.auth.getSession();
    
    if(!data.session){
    
    location.href="login.html";
    
    }
    
    })();