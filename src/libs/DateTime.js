export function DateTime(str){
    return str.replace('T',' ').substring(0,16);
}