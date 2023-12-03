import { AlertService } from "./Alert.service";


describe('AlertService', () => {
    let service: AlertService;

    beforeEach(() => {
        service = new AlertService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set alert with default show value', () => {
        service.setAlert('Alert message');

        expect(service.text).toBe('Alert message');
        expect(service.show).toBe(true);
    });

    it('should set alert with custom show value', () => {
        service.setAlert('Custom message', false);

        expect(service.text).toBe('Custom message');
        expect(service.show).toBe(true);
    });

    it('should emit button selection', () => {
        let btnSelected: string | undefined;
        service.btnSelected.subscribe((selected: string) => {
            btnSelected = selected;
        });

        service.btnSelect('accept');

        expect(btnSelected).toBe('accept');
        expect(service.show).toBe(false);
    });
});