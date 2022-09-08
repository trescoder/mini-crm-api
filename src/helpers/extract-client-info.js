function extractClientInfo(data) {
  return Object.freeze(
    ({
      name,
      last_name,
      email,
      birthday,
      cel_tel,
      address,
      contact_type,
      origin,
    } = data.body)
  );
}

module.exports = { extractClientInfo };
