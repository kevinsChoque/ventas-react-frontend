export const validateProduct = (form) => {
  let errors = {};
  if (!form.name || !form.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }
  if (!form.price) {
    errors.price = "El precio es obligatorio";
  } else if (isNaN(form.price)) {
    errors.price = "El precio debe ser número";
  }
  if (!form.stock) {
    errors.stock = "El stock es obligatorio";
  } else if (!Number.isInteger(Number(form.stock))) {
    errors.stock = "El stock debe ser entero";
  }
  return errors;
};
