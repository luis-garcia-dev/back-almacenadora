export const success = (res, { message = 'OK', data = null, status = 200 }) => {
  return res.status(status).json({ success: true, message, data });
};

export const error = (res, { message = 'Error interno', status = 500, errors = null }) => {
  return res.status(status).json({ success: false, message, errors });
};
