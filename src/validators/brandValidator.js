export const validateBrand = (form) => {
  const errors = {};
  if (!form.name || form.name.trim() === "") {
    errors.name = "Nombre requerido";
  }
  return errors;
};
   