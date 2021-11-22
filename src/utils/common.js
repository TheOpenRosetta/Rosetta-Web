export const FindCommonAuthors = (arr, key) =>{
    let arr2 = [];
    arr.forEach((x)=>{
        if(x[key] !== undefined){
            if(x[key].length === 1){
                if(arr2.some((val)=>{ return val[key] === x[key][0] })){
                    arr2.forEach((k)=>{
                        if(k[key] === x[key][0]){
                        k["occurrence"]++
                        }
                    })  
                    }else{
                    let a = {}
                    a[key] = x[key][0]
                    a["occurrence"] = 1
                    arr2.push(a);
                    }
            }
            else{
                for(let i=0; i<x[key].length; i++){
                    if(arr2.some((val)=>{ return val[key] === x[key][i] })){
                        arr2.forEach((k)=>{
                            if(k[key] === x[key][i]){
                            k["occurrence"]++
                            }
                        })
                    }else{
                        let a = {}
                        a[key] = x[key][i]
                        a["occurrence"] = 1
                        arr2.push(a);
                    }
                }
            }
        }
        else {
            return
        }
        })
    return arr2.slice(0,4);
    }