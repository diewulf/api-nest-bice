export type  ProductType = {
    id: number;
    nombre: string;
    nombreDetalle: string;
    precio: number;
    idcategoria: number;
    categoria: string;
    //subCategoria: string;
    stock: number;
    proveedor: string;
    marca: string;
    //thumbnail: string;
    posicion: number;
};


export type ProductDetailType = {

    idproducto: number;
    nombre: string;
    nombre_detalle: string;
    precio: number;
    idcategoria: string;
    nombre_categoria: string;
    sub_categoria: string;
    stock: number;
    proveedor: string;
    descripcion: string;
    descripcion_general: string;
    marca: string;
    thumbnail: string;
    pesoNormal:number;
    pesoMayor:number;
    pesoVolumetrico: number;
    largo: number;
    alto: number;
    ancho: number;
    modelo: string;
    genero: string;
    img: string[];
    
};