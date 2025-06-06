export class Pageable{
    public constructor(
        public page: number,
        public size: number = 10
    ){}

    public offset(): number
    {
        return (this.page - 1) * this.size;
    }
}