export const toObject = (obj: any) => {
    obj = obj.toJSON();
    obj._id = obj._id.toString();
    return obj;
};