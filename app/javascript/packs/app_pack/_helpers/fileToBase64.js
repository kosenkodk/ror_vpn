// Convert file to base64 string

export const fileToBase64 = (bits, filename_or_path_to_the_file) => {
  return new Promise((resolve, reject) => {
    var file = new File([bits], filename_or_path_to_the_file);
    var reader = new FileReader();
    // Read file content on file loaded event
    // reader.onload = function (event) {
    //   resolve(event.target.result);
    // };
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;

    // Convert data to base64 
    reader.readAsDataURL(file);
  });
};

export const prepareAttachmentForJsonApi = (file) => {
  return fileToBase64(file, file).then(result => {
    return {
      type: file.type,
      name: file.name,
      size: file.size,
      lastModified: file.lastModified,
      file: result
    }
  });
}

export const prepareAttachmentForJsonApiAsync = async (file) => {
  return await fileToBase64(file, file).then(result => {
    return {
      type: file.type,
      name: file.name,
      size: file.size,
      lastModified: file.lastModified,
      file: result
    }
  });
}
