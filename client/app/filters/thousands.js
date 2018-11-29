//千分符

export default function(v){
    return v.toString().replace(/\B(?=(\d\d\d)+$)/g , ",")
}