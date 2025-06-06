import { Pageable } from "src/utils/pageable";

export abstract class ProductRepository{
    abstract list(pageable: Pageable, name?: string, min?: number, max?: number): Promise<Object>;
    abstract create(name: string, price: number, quantity: number, description?: string): Promise<Object>;
    abstract update(id: string, name?: string, price?: number, quantity?: number, description?: string): Promise<Object>;
    abstract delete(id: string): Promise<void>;
}