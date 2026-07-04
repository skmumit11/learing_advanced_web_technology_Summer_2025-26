import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {

    getAllCourses(){
        const allcourses={
          message: 'ALL Courses',
          data: [],  
        };
        return allcourses;
        
    }

    getCourseById(id: string){
        const course={
          message: `Courses id:${id}`,
          id  
        };
        return course;
    }

    createCourse(name: string, code: string){
        const coursescreate={
            message: 'Course Created',
            data: {
                name,
                code,
            },
        };

        return coursescreate;

    }



}
