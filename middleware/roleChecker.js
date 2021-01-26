exports.isAdmin = (req, res, next) => {
  //if you are an admin then next()
  const role = req.user.role;
  if (role !== 'Admin')
    throw new Error(
      `Data available only for administrative accounts.`
    );

  next();
};
