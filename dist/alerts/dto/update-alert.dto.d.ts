import { AlertType, AlertStatus } from '../alert.entity';
export declare class UpdateAlertDto {
    plantId?: number;
    type?: AlertType;
    message?: string;
    status?: AlertStatus;
    resolvedAt?: Date;
}
