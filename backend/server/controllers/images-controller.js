const User = require('../models/user-model');
const path = require('path');
const fs = require('fs');

const ctrl = {};

ctrl.uploadUser = async (req, res) => {
  const user = req.user.user;
  let image = req.img;
  const fileName = `${user._id}-${new Date().getMilliseconds()}.${image.ext}`;

  image = image.file;
  const outDir = path.resolve(
    __dirname,
    `../../uploads/images/users/${fileName}`
  );

  image.mv(outDir, (err) => {
    if (err)
      return res.status(500).json({
        status: false,
        err,
      });

    updateUserImg(res, user._id, fileName);
  });
};

const updateUserImg = (response, userID, imgName) => {
  User.findOne({ _id: userID }, (err, userDB) => {
    if (err) {
      deleteImg(imgName);
      return response.status(500).json({
        status: false,
        err: {
          msg: 'Error en la peticion.',
        },
      });
    }

    if (!userDB) {
      deleteImg(imgName);
      return response.status(404).json({
        status: false,
        err: {
          msg: 'El usuario no existe.',
        },
      });
    }

    deleteImg(userDB.img);

    userDB.img = imgName;
    userDB.save((err, saved) => {
      if (err) {
        deleteImg(userDB.img);
        return response.status(500).json({
          status: false,
          err: {
            msg: 'Error en la peticion.',
          },
        });
      }

      return response.json({
        status: true,
        user: saved,
      });
    });
  });
};

const deleteImg = (filename) => {
  const pathimg = path.resolve(
    __dirname,
    `../../uploads/images/users/${filename}`
  );

  if (fs.existsSync(pathimg)) {
    fs.unlinkSync(pathimg);
  }
};

module.exports = ctrl;
