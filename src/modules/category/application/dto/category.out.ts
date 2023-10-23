export type CategoryType = {
  idcategoria: number;
    categoria: string;
};
  
  export const categoryDummy: CategoryType[] = [
    { idcategoria: 1979	, categoria: "Gift Card"},
  ];



  export type SubCategoryType = {
    idCat: number;
    idSubCat: number;
    subCategoria: string;
};
  
  export const subCategoryDummy: SubCategoryType[] = [
    { idSubCat: 1	,idCat: 2, subCategoria: "Sub Cat de Equipamiento de local"},
    { idSubCat:2	,idCat:7, subCategoria: "Sub Cat de Accesorios Tecnología"},
    { idSubCat:3	,idCat:8, subCategoria: "Sub Cat de Tiempo Libre"},
    { idSubCat:4	,idCat:9, subCategoria: "Sub Cat de Decohogar"},
    { idSubCat:5	,idCat:10, subCategoria: "Sub Cat de Bienestar y Belleza"},
    { idSubCat:6	,idCat:11, subCategoria: "Sub Cat de Recarga Celular"},
    { idSubCat:7	,idCat:12, subCategoria: "Sub Cat de Equipamiento de Local  "},
    { idSubCat:8	,idCat:13, subCategoria: "Sub Cat de Accesorios Tecnología"},
    { idSubCat:9	,idCat:14, subCategoria: "Sub Cat de Tiempo Libre"},
    { idSubCat:10	,idCat:15, subCategoria: "Sub Cat de Decohogar"},
    { idSubCat:11	,idCat:16, subCategoria: "Sub Cat de Bienestar y Belleza"},
    { idSubCat:12	,idCat:17, subCategoria: "Sub Cat de Recarga Celular"},
    { idSubCat:13	,idCat:18, subCategoria: "Sub Cat de Certificados de Regalo"},
    { idSubCat:14	,idCat:19, subCategoria: "Sub Cat de Certificados de Regalo"},
    { idSubCat:25	,idCat:23, subCategoria: "Sub Cat de Implementación Local"},
  ];

  
