const fs = require('fs')
const login_json = JSON.parse(fs.readFileSync('./json-data/login.json'))

exports.allLogin  = (req,res)=>{
        res.status(200).json({
        status: 'success',
        results : login_json.length,
        data:{
            login_json:login_json
        }

    })
}
exports.updateLogin = (req,res)=>{
    const newID = login_json[login_json.length -1 ].id + 1
    console.log(newID)
    const newLogin = Object.assign({id:newID}, req.body)
    login_json.push(newLogin)
    fs.writeFile('./json-data/login.json', JSON.stringify(login_json), err=>{
        res.status(201).json({
            status: 'success',
            results : login_json.length,
            data:{
            login_json: newLogin
           }
        })
    })

}

exports.getLogin = (req,res)=>{
    const id = req.params.id * 1
    console.log(id)
    const login_find = login_json.find(el => el.id === id)
    console.log(login_find)
    if (!login_find){
        res.status(404).json({
            status:'fail',
            message:"Invalid ID"
        })
    }
    res.status(200).json({
        status: 'success',
            data:{
                login_find
            }
    })
    
}
exports.deleteLogin = (req,res)=>{
    if(req.params.id *  1 > login_json.length){
        return res.status(404).json({
            status:'fail',
            message:"Invalid ID"
        })
    } 
    res.status(204).json({
        status: 'success',
            data:null
    })
}
