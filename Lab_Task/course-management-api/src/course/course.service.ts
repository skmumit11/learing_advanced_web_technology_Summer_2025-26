import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
    getAllCourses(): string{
        const message= 'Get All Course - from Service';
        return message;
    }

    getCourseByID(id:string): string{
        const message= `Get  Course with ID: ${id} - from Service`;
        return message;
    }

    createCourse(): string{
        const message= 'Create Course - from Service';
        return message;
    }

    updateCourse(id:string): string{
        const message= `Update Course with ID: ${id} - from Service`;
        return message;
    }

    patchCourse(id:string): string{
        const message=`Patch Course ${id} - from Service`;
        return message;
    
    }
    deleteCourse(id:string): string{
        const message=`Delete Course ${id} - from Service`;
        return message;
    
    }


}
