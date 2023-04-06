import { ZodError } from 'zod';

export function resolveZodError(err: ZodError) {
  const errorsFormated = err.errors.map((issue) => {
    const name = issue.path[0];

    return {
      field: name,
      error: issue.message.toLocaleLowerCase(),
    };
  });

  const requiredFields = errorsFormated
    .filter((item) => item.error === 'required')
    .reduce((acc: (string | number)[], current) => {
      const name = current.field;

      return [...acc, name];
    }, []);

  const invalidTypesFields = errorsFormated.filter(
    (item) => item.error !== 'required'
  );

  return {
    body: {
      errors: {
        required_fields: requiredFields.length > 0 ? requiredFields : undefined,
        invalid_fields: invalidTypesFields,
      },
    },
    statusCode: 400,
  };
}
