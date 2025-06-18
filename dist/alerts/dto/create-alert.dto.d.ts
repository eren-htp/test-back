import { AlertType } from '../alert.entity';
export declare class CreateAlertDto {
    plantId: number;
    type: AlertType;
    message: string;
}
