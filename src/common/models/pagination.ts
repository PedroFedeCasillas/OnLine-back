export class Pagination<T> {
    data: T[];
    total: number;
    currentPage: number;
    totalPages: number;
    nextPage?: number;
    prevPage?: number;

    constructor(data: T[], total: number, offset: number, limit: number) {
        this.data = data;
        this.total = total;
        this.totalPages = Math.ceil(total / limit);
        this.currentPage = Math.floor(offset / limit) + 1;
        this.nextPage = this.currentPage < this.totalPages ? this.currentPage + 1 : null;
        this.prevPage = this.currentPage > 1 ? this.currentPage - 1 : null;

    }
}