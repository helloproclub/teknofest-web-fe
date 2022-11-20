import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup
        .string()
        .email()
        .required('Field cannot be empty'),
    password: Yup
        .string()
        .min(8, 'Password at least 8 characters')
        .required('Field cannot be empty'),
});

export const emailSchema = Yup.object().shape({
    email: Yup
        .string()
        .email()
        .required('Field cannot be empty'),
});

export const passwordSchema = Yup.object().shape({
    password: Yup
        .string()
        .min(8, 'Password at least 8 characters')
        .required('Field cannot be empty'),
});

export const registerSchema = Yup.object().shape({
    email: Yup
        .string()
        .email()
        .required('Field cannot be empty'),
    password: Yup
        .string()
        .min(8, 'Password at least 8 characters')
        .required('Field cannot be empty'),
    fullName: Yup
        .string()
        .trim()
        .matches(/^[a-z,A-Z,\s]*$/, { message: 'Field cannot contain certain special characters', excludeEmptyString: true })
        .required('Field cannot be empty'),
    nim: Yup
        .string()
        .trim()
        .matches(/^\d+$/, { message: 'Field can only contain numbers', excludeEmptyString: true })
        .required('Field cannot be empty'),
    division: Yup
        .string()
        .required('Field cannot be empty'),
    path: Yup
        .string()
        .required('Field cannot be empty'),
    photo_KTM_url: Yup
        .string()
        .trim()
        .matches(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            { message: 'Invalid URL', excludeEmptyString: true }
        )
        .required('Field cannot be empty'),
    cv_url: Yup
        .string()
        .trim()
        .matches(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            { message: 'Invalid URL', excludeEmptyString: true }
        )
        .required('Field cannot be empty'),
    cover_letter_url: Yup
        .string()
        .trim()
        .matches(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            { message: 'Invalid URL', excludeEmptyString: true }
        )
        .required('Field cannot be empty'),
    linkedIn_url: Yup
        .string()
        .trim()
        .matches(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            { message: 'Invalid URL', excludeEmptyString: true }
        )
        .required('Field cannot be empty'),
    portfolio_url: Yup
        .string()
        .trim()
        .matches(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            { message: 'Invalid URL', excludeEmptyString: true }
        )
});

export const resubmitSchema = Yup.object().shape({
    fullName: Yup
        .string()
        .trim()
        .matches(/^[a-z,A-Z,\s]*$/, { message: 'Field cannot contain certain special characters', excludeEmptyString: true })
        .required('Field cannot be empty'),
    nim: Yup
        .string()
        .trim()
        .matches(/^\d+$/, { message: 'Field can only contain numbers', excludeEmptyString: true })
        .required('Field cannot be empty'),
    photo_KTM_url: Yup
        .string()
        .trim()
        .matches(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            { message: 'Invalid URL', excludeEmptyString: true }
        )
        .required('Field cannot be empty'),
    cv_url: Yup
        .string()
        .trim()
        .matches(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            { message: 'Invalid URL', excludeEmptyString: true }
        )
        .required('Field cannot be empty'),
    cover_letter_url: Yup
        .string()
        .trim()
        .matches(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            { message: 'Invalid URL', excludeEmptyString: true }
        )
        .required('Field cannot be empty'),
    linkedIn_url: Yup
        .string()
        .trim()
        .matches(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            { message: 'Invalid URL', excludeEmptyString: true }
        )
        .required('Field cannot be empty'),
    portfolio_url: Yup
        .string()
        .trim()
        .matches(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            { message: 'Invalid URL', excludeEmptyString: true }
        )
});
