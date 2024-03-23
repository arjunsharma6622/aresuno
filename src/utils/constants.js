export const validationRules = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    url: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
  
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    passwordMessage:
      "Password must contain uppercase and lowercase characters, numbers, special character and must be minimum 8 character long.",
    confirmPasswordMessage:
      "Confirm password must contain uppercase and lowercase characters, numbers, special character and must be minimum 8 character long.",
    newPasswordMessage:
      "New password must contain uppercase and lowercase characters, numbers, special character and must be minimum 8 character long.",
    characters: /^[a-zA-Z_ ]*$/,
    charactersMessage: "Only alphabets are allowed.",
    numbers: /^[0-9]*$/,
  };