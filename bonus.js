/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let txt = "";
    let test = strs[0].charAt(0);
    for(i = 0;i<strs.length;i++){
        if(strs[i].charAt(txt.length) === test && i !== strs.length-1 && strs[i]){
            continue;
        }else if(strs[i].charAt(txt.length) === test && i === strs.length-1 && strs[i]){
            txt += test;
            test = strs[0].charAt(txt.length);
            txt.length !== strs[0].length? i=0: i;

        }else{
            return txt;
        }
    }
    return txt;
};