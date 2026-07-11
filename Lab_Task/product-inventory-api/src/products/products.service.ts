import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';
import { Products } from './entities/products.entity';


@Injectable()
export class ProductsService {
    constructor(@InjectRepository (Products) private readonly productsRepo: Repository <Products>, ){}
    
    async create(dto: CreateProductDto){
        const product= this.productsRepo.create(dto);
        const savedProduct= await this.productsRepo.save(product);
        const created= {
            message: 'Product created Successfully',
            data: savedProduct,
        };
        return created;

    }

    async findAll(){
        const productsall= await this.productsRepo.find({
            order:{
                createdAt: 'DESC',
            },
        });
        const allProducts= {
            message: 'Products retrieved successfully',
            count: productsall.length,
            data: productsall,
        }
        return allProducts; 


    }

    async getById(id: number):Promise<Products | null>{
        const productById=await this.productsRepo.findOne({
            where: {
                id: id,
            },
        });
        return productById;
    }

    async findOne(id: number){
        const product= await this.productsRepo.findOne({
            where: {id},
        });

        if(!product){
            throw new NotFoundException(`Product with Id ${id} not found`);
        }
        const productOne= {
            message: 'Product Found Successfully',
            data: product,
        };
        return productOne;
    }

    async update(id: number, dto: PartialUpdateProductDto){
        const product= await this.getById(id);

        if (product== null){
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        Object.assign(product, dto);

        const updateProduct= await this.productsRepo.save(product);

        return{
            message: 'Product updated Successfully',
            data: updateProduct,
        };
    }

    async replace(id: number, dto: UpdateProductDto){
        const product= await this.getById(id);
        
        if (product == null) {
            throw new NotFoundException(`Product with id ${id} not found`);
            }

        Object.assign(product, dto);

        const replaceProduct= await this.productsRepo.save(product);

        return{
            message:'Product replaced successfully',
            data: replaceProduct,
        };

    }
    
    async remove(id:number){
        const result= await this.productsRepo.delete(id);

        if(result.affected== 0){
            throw new NotFoundException(`Product with this is ${id} not found`);
        }
        return {
            message: 'Product Deleted Seccessfully',
            id: id,
        };
    }

    async findByCategory(category: string){

        const products = await this.productsRepo.find({
        where: {
            category: ILike(category),
        },
        order: {
            createdAt: 'DESC',
        },
        });

        return {
        message: `Products in category "${category}" retrieved successfully`,
        count: products.length,
        data: products,
        };
  }


    async search(keyword: string){
        
        const products = await this.productsRepo.find({
            where: {
                name: ILike(`%${keyword}%`),
            },
            order: {
                createdAt: 'DESC',
            },
            });

        return {
            message: `Search results for "${keyword}"`,
            count: products.length,
            data: products,
        };

    }

    async toggleActive(id: number){
            
        const product = await this.getById(id);

            if (product == null) {
            throw new NotFoundException(`Product with id ${id} not found`);
            }

            product.isActive = !product.isActive;

            const updatedProduct = await this.productsRepo.save(product);

            return {
            message: 'Product active status changed successfully',
            data: updatedProduct,
            };
        
    }

    

}
