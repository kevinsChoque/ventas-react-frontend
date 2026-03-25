export const validateClient = (form) => {
  const errors = {};
  // Tipo documento
  if (!form.document_type) {
    errors.document_type = "Seleccione un tipo de documento";
  }
  // Número documento
  if (!form.document_number) {
    errors.document_number = "Número requerido";
  } else {
    if (form.document_type === "DNI" && !/^[0-9]{8}$/.test(form.document_number)) {
      errors.document_number = "DNI debe tener 8 dígitos";
    }
    if (form.document_type === "RUC" && !/^[0-9]{11}$/.test(form.document_number)) {
      errors.document_number = "RUC debe tener 11 dígitos";
    }
  }
  if (!form.name || form.name.trim() === "") {
    errors.name = "Nombre requerido";
  }
  if (form.phone) {
    if (!/^[0-9]{9}$/.test(form.phone)) {
      errors.phone = "Debe tener 9 dígitos";
    }
  }
  return errors;
};