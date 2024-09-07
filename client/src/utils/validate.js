// export default function validate(values) {
//     let errors = {};

//     // Regular expressions for validation
//     const namePattern = /^[A-Za-z0-9\s]{4,30}$/;
//     const emailPattern = /\S+@\S+\.\S+/;

//     // Validate Company Name
//     if (!values.C_Name) {
//         errors.C_Name = 'Company Name is required';
//     } else if (!namePattern.test(values.C_Name)) {
//         errors.C_Name = 'Name must be 4 to 30 characters long';
//     }

//     // Validate Company Email
//     if (!values.C_Email) {
//         errors.C_Email = 'Email is required';
//     } else if (!emailPattern.test(values.C_Email)) {
//         errors.C_Email = 'Email address is invalid';
//     }

//     // Validate Password
//     if (!values.Password) {
//         errors.Password = 'Password is required';
//     } else if (values.Password.length < 6) {
//         errors.Password = 'Password must be at least 6 characters long';
//     }

//     // Validate Category
//     if (!values.Category) {
//         errors.Category = 'Category is required';
//     }

//     return errors;
// }