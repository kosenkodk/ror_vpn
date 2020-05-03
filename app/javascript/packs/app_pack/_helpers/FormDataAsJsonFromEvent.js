

export const FormDataAsJsonFromEvent = (e) => {
  const formData = new FormData(e.target);
  let data = {};
  formData.forEach((value, key) => { data[key] = value });
  return data;
};