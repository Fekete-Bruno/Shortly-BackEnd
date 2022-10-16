export default function schemaValidation(schema,test){
    const validation = schema.validate(test,{abortEarly:false});
    if(validation.error){
        console.error(validation.error.details);
        return validation.error.details;
    }
    return false;
}