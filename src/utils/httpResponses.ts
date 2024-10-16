export const successResponse = (data: any) => ({
    statusCode: 200,
    body: JSON.stringify(data),
  });
  
  export const errorResponse = (message: string, statusCode: number) => ({
    statusCode,
    body: JSON.stringify({ error: message }),
  });