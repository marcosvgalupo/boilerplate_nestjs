import { Pageable } from "src/utils/pageable";

export abstract class ProductRepository{
    abstract list(pageable: Pageable, name?: string, min?: number, max?: number): Promise<Object>;
}