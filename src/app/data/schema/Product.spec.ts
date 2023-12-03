import { Product } from "./Product";

describe('Product', () => {
    let product: Product;

    beforeEach(() => {
        product = new Product(
            '1',
            'Product Name',
            'Product Description',
            'product_logo.png',
            '2023-12-01',
            '2023-12-05'
        );
    });

    it('should create an instance of Product', () => {
        expect(product).toBeTruthy();
        expect(product instanceof Product).toBeTrue();
    });

    it('should correctly get and set properties', () => {
        expect(product.$id).toBe('1');
        expect(product.$name).toBe('Product Name');
        expect(product.$description).toBe('Product Description');
        expect(product.$logo).toBe('product_logo.png');
        expect(product.$date_release).toBe('2023-12-01');
        expect(product.$date_revision).toBe('2023-12-05');

        product.$id = '2';
        product.$name = 'Updated Name';
        product.$description = 'Updated Description';
        product.$logo = 'updated_logo.png';
        product.$date_release = '2023-12-02';
        product.$date_revision = '2023-12-06';

        expect(product.$id).toBe('2');
        expect(product.$name).toBe('Updated Name');
        expect(product.$description).toBe('Updated Description');
        expect(product.$logo).toBe('updated_logo.png');
        expect(product.$date_release).toBe('2023-12-02');
        expect(product.$date_revision).toBe('2023-12-06');
    });

    it('should correctly check for matching properties', () => {
        const params = {
            $id: '1',
            $name: 'Product Name',
            $description: 'Product Description',
            $logo: 'product_logo.png',
            $date_release: '2023-12-01',
            $date_revision: '2023-12-05'
        };

        expect(product.matches(params)).toBeTrue();

        const nonMatchingParams = {
            $id: '2',
            $name: 'Product Name',
            $description: 'Product Description',
            $logo: 'product_logo.png',
            $date_release: '2023-12-01',
            $date_revision: '2023-12-05'
        };

        expect(product.matches(nonMatchingParams)).toBeFalse();
    });
});