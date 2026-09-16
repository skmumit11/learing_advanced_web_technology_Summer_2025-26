export function totalMarks(...marks){
    if(marks.length==0){
        return 0;
    }

    let total = 0;
    for (let i =0; i< marks.length; i++){
        total += marks[i];
    }
    return total;  
}

export function averageMarks(...marks){
    if(marks.length==0){
        return 0;
    }

    const total = totalMarks(...marks);
    let average= total/marks.length;
    return average;
}

export function highestMarks(...marks){
    if(marks.length==0){
        return 0;
    }

    let highest= marks[0];
    for (let i =0; i< marks.length; i++){
        if (marks[i]> highest){
            highest=marks[i];
        }
    }
    return highest;
}

export function isPassed(...marks){
    if(marks.length==0){
        return false;
    }
    // let passMark= 50;
    let passMark= 50;
/* 
    for (let i =0; i< marks.length; i++){
        if (marks[i]< passMark){
            return false;
        }
    } */

    if(averageMarks(...marks)< passMark){
        return false;
    }
    return true;
}


/* module.exports = {
  totalMarks,
  averageMarks,
  highestMark,
  isPassed
}; */
