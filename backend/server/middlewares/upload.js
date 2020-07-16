const path = require('path');

// ========================================
//         check files and extension
// ========================================

const onlyImages = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).json({
      status: false,
      err: {
        msg: 'No se ha seleccionado ningun archivo.',
      },
    });

  let file = req.files.img;

  let ext = file.name.split('.');
  ext = ext[ext.length - 1];

  const validExt = ['jpg', 'jpeg', 'png', 'gif'];

  if (!validExt.includes(ext))
    return res.status(400).json({
      status: false,
      err: {
        msg: 'Solo puedes subir imagenes.',
        valid: validExt,
        ext,
      },
    });

  req.img = { file, ext };

  next();
};

module.exports = {
  onlyImages,
};
