const getPingController =(req, res)=>{
    res.json({
        status: 200,
        ok: true,
        menssage: 'pong'
    })
}

export default getPingController