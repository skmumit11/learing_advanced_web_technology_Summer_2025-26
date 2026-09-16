//export function createStudent(name, id, dept, semester="1st", ...mark){
export function createStudent(name, id, dept, semester="1st", ...marks){

    return{id,
    name,
    dept,
    semester,
    marks    
    };
}

/* module.exports= {
    createStudent
};
 */