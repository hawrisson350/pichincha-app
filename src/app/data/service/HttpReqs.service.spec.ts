
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from '../schema/Product';
import { HttpReqsService } from './HttpReqs.service';

describe('HttpReqsService', () => {
    let service: HttpReqsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpReqsService]
        });
        service = TestBed.inject(HttpReqsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get products', () => {
        const mockProducts: any[] = [
            {
                id: '1',
                name: 'Product 1',
                description: 'Description 1',
                logo: 'logo1.png',
                date_release: '2023-12-01T00:00:00.000Z',
                date_revision: '2023-12-05T00:00:00.000Z'
            },

        ];

        const expectedProducts: Product[] = [
            new Product('1', 'Product 1', 'Description 1', 'logo1.png', '2023-12-01', '2023-12-05'),

        ];

        service.getProducts().subscribe((products: Product[]) => {
            expect(products.length).toBe(expectedProducts.length);
            expect(products).toEqual(expectedProducts);
        });

        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('GET');
        req.flush(mockProducts);
    });

    // Prueba para el método sendProduct
    it('should send product', () => {
        const mockProduct: Product = new Product('1', 'Product 1', 'Description 1', 'logo1.png', '2023-12-01', '2023-12-05');

        service.sendProduct(mockProduct).subscribe((product: Product) => {
            expect(product).toEqual(mockProduct);
        });

        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('POST');
        req.flush(mockProduct);
    });

    // Prueba para el método editProduct
    it('should edit product', () => {
        const mockProduct: Product = new Product('1', 'Updated Product', 'Updated Description', 'updated_logo.png', '2023-12-02', '2023-12-06');

        service.editProduct(mockProduct).subscribe((product: Product) => {
            expect(product).toEqual(mockProduct);
        });

        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('PUT');
        req.flush(mockProduct);
    });

    // Prueba para el método deleteProduct
    it('should delete product', () => {
        const productId = '1';

        service.deleteProduct(productId).subscribe(() => {
            // Hacer algo después de eliminar el producto, por ejemplo, manejar una confirmación
        });

        const req = httpMock.expectOne(`${service.api}?id=${productId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    });

    // Add more tests for editProduct, deleteProduct methods
});