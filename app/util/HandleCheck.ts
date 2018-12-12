export const HandleCheck= {
    checkOptionVehicle : async (service , name) =>{
        return await service.findByName(name);
       
    },
    checkOption : async (service , name) =>{
        return await service.findBySlug(name);
       
    }
}