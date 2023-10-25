import { GcEnum, StockGc } from '../../domain/entities/stock-gc.entity';

export class CreateGcInDto implements Pick<StockGc, 'clave' | 'cuenta' | 'ean13' | 'id_producto' | 'monto' | 'cod_seguridad' | 'tipo_gc' | 'falabella_sodimac' | 'fecha_vencimiento' | 'gc_tottus' >  {
    clave: string;
    cuenta: string;
    ean13: string;
    id_producto: number;
    tipo_gc: GcEnum;
    monto?: number;
    cod_seguridad?: string;
    falabella_sodimac?: string;
    fecha_vencimiento?: Date;
    gc_tottus?: string;
}
