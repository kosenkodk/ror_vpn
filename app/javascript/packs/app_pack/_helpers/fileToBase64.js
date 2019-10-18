// Convert file to base64 string
export const fileToBase64 = (bits, filename_or_path_to_the_file) => {
  return new Promise(resolve => {
    var file = new File([bits], filename_or_path_to_the_file);
    var reader = new FileReader();
    // Read file content on file loaded event
    reader.onload = function (event) {
      resolve(event.target.result);
    };

    // Convert data to base64 
    reader.readAsDataURL(file);
  });
};