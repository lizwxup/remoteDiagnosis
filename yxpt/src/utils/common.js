export default {
    $gender: function (gender) {
        if (gender === 1) {
                return '男'
           }  else if (gender === 2) {
                return '女'
           } else {
               return '未知'
           }
    },
    $patientSources:function(source,type){
        var sourceDesc,sourceType,patientType;
        switch (source) {
            case  1 :sourceDesc = '门诊';sourceType = 'warning'; return sourceDesc;break; 
            case  2 :sourceDesc = '体检';sourceType = 'primary';return sourceDesc;break; 
            case  3 :sourceDesc = '住院';sourceType = 'success';return sourceDesc;break; 
            case  4 : sourceDesc = '转院';sourceType = 'content';return sourceDesc;break; 
            default:

        }                 
    },
    $age:function(ageUnit){
        if (ageUnit ===1) {
            return '岁'
        } else if (ageUnit === 2) {
             return '月'    
        }else if (ageUnit === 3) {
             return '天'    
        }else if (ageUnit === 4) {
             return '时'    
        }
    },
    $transferFilterLabel:function(imageTitle,variable,index){
         var partsArr = [];   
            variable.forEach(function(key,idx){
                var obj={}
                    obj.label =key.name;
                    obj.value = key.id;
                partsArr.push(obj)
            })
       imageTitle[index].filters = partsArr;
       return  imageTitle[index].filters 
    }  
}