import { BadRequestException, Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,ILike } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';


@Injectable()
export class ProductsService {
constructor( 
   @InjectRepository(Products) private productRepository: Repository<Products>, 
) {} 
async create(createProductDto: CreateProductDto): Promise<Products> {
        const product=this.productRepository.create({...createProductDto});
        return this.productRepository.save(product); 
    }
async findAll(): Promise<Products[]> {
        return this.productRepository.find(
            { 
                order: { createdAt: 'DESC' }, 
            });
    }
async findOne(id: number): Promise<Products> {
        const product = await this.productRepository.findOne({ where: { id } }); 
        if (!product) throw new NotFoundException(`Product with id ${id} not 
        found`); 
        else return product;
    }
async update(id: number, PartialUpdateProductDto: PartialUpdateProductDto): Promise<Products> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) throw new NotFoundException(`Product with id ${id} not found`);
        const update = this.productRepository.create({id, ...PartialUpdateProductDto});
        return this.productRepository.save(update);
    }
async replace(id: number, updateProductDto: UpdateProductDto): Promise<Products> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) throw new NotFoundException(`Product with id ${id} not found`);
        const update = this.productRepository.create({id, ...updateProductDto});
        return this.productRepository.save(update);
    }
async remove(id: number): Promise<string> {
        const product: Products | null = await this.findOne(id);
        if (product==null) throw new BadRequestException(`Product with id ${id} not found`);
        else{
           await this.productRepository.remove(product);
        }
        return `Product with id ${id} has been removed successfully`;
    }
async findByCategory(category: string): Promise<Products[]> {
        const products = await this.productRepository.find({ where: { category } });
        if (products.length == 0) throw new NotFoundException(`No products found in category ${category}`);
        else{
            return products;
        }
    }
async search(keyword: string): Promise<Products[]> {
    return this.productRepository.find({ 
    where: { name: ILike(`%${keyword}%`) }, 
}); }

async toggleActive(id: number): Promise<Products> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    product.isActive = !product.isActive;
    return this.productRepository.save(product);

}


}
