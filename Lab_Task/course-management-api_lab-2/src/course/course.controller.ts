import { Controller, Get, Post, Put, Patch, Delete, Param, Body,UseInterceptors,UploadedFile,BadRequestException,   } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
//import path from 'path';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllCourses(): string{
    const allcourse= this.courseService.getAllCourses();
    return allcourse;
  }

  @Get(':id')
  getCourseById(@Param('id') id: string): string {
    const courseById= this.courseService.getCourseByID(id);
    return courseById;
  }

  @Post()
  createCourse(): string{
    let create= this.courseService.createCourse();
    return create;
  }

  @Put(':id')
  updateCourse(@Param('id') id:string): string{
    let update= this.courseService.updateCourse(id);
    return update;
  }

  @Patch(':id')
  patchCourse(@Param('id') id:string): string{
    let patchC= this.courseService.patchCourse(id);
    return patchC;
  }

  @Delete(':id')
  deleteCourse(@Param('id') id:string): string{
    let deleteC= this.courseService.deleteCourse(id);
    return deleteC;
  }

  
@Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          callback(null, uniqueName);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
        const fileExtension = extname(file.originalname).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          return callback(
            new BadRequestException(
              'Only .jpg, .jpeg, .png, and .pdf files are allowed',
            ),
            false,
          );
        }

        callback(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  uploadCourseMaterial(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.courseService.uploadCourseMaterial(id, file);
  }
}

