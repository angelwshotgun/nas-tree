export const success = (data: any = {}, message = 'Success') => ({
  success: true,
  message,
  data,
});

export const error = (message = 'Something went wrong', statusCode = 400) => {
  throw createError({
    statusCode,
    statusMessage: message,
  });
};
