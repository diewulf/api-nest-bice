import { EGc, StockGc } from '../../domain/entities/stock-gc.entity';

export class CreateGcInDto implements Pick<StockGc, 'clave' | 'cuenta' | 'ean13' | 'id_producto'>  {
    clave: string;
    cuenta: string;
    ean13: string;
    id_producto: number;
    tipo_gc: EGc;
}