// Function to generate random passwod.
const generatePassword = (alphabets, numbers, special) => {
    let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let num = '0123456789';
    let sp = '!@#$%^&*()<>,.?/[]{}-=_+|/'
    let password = "";
    let len = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    // Generating passwords base on checkboxes input.
    for(let i=0; i<=len; i++){
        password += alphabets ?  alpha[Math.floor(Math.random() * (alpha.length - 1 - 0 + 1)) + 0] : '';
        password += numbers ?  num[Math.floor(Math.random() * (num.length - 1 - 0 + 1)) + 0] : '';
        password += special ?  sp[Math.floor(Math.random() * (sp.length - 1 - 0 + 1)) + 0] : '';
    }
    return password;
  };

export {generatePassword}