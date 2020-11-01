const Announcement = require('../models/announcement');
const Category = require('../models/category');
const User = require('../models/user');
const fileHelper = require('../util/fileHelper');

exports.addAnnoucement = async (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const phone_number = req.body.phone_number;
  const localization = req.body.localization;
  const user_id = req.userId;
  const category_id = req.body.category_id;
  const photo = req.file;

  try {
    if (!photo) {
      const error = new Error('Wystąpił problem z przesłaniem zdjęcia.');
      error.statusCode = 422;
      throw error;
    }

    const imageUrl = photo.path;

    const categoryDoc = await Category.findById(category_id);

    if (!categoryDoc) {
      fileHelper.deleteFile(imageUrl);
      const error = new Error('Wystąpił błąd podczas dodawania ogłoszenia.');
      error.statusCode = 406;
      throw error;
    }

    const userDoc = await User.findById(user_id);

    if (!userDoc) {
      fileHelper.deleteFile(imageUrl);
      const error = new Error('Wystąpił błąd podczas dodawania ogłoszenia.');
      error.statusCode = 406;
      throw error;
    }

    const announcement = new Announcement({
      title,
      price,
      description,
      phone_number,
      localization,
      category_id,
      user_id,
      imageUrl,
    });

    const doc = await announcement.save();

    if (doc)
      res.status(201).json({
        message: 'Ogłoszenie utworzone pomyślnie!',
        success: true,
      });
    else {
      const error = new Error('Wystąpił błąd podczas dodawania ogłoszenia.');
      error.statusCode = 406;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.getAnnoucements = async (req, res, next) => {
  try {
    const annoucements = await Announcement.find();
    res.status(201).json({
      annoucements,
      message: 'Dane pobrane pomyślnie!',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAnnoucement = async (req, res, next) => {
  const ann_id = req.params.annId;

  try {
    const annoucement = await Announcement.findById(ann_id);
    if (annoucement) {
      res.status(200).json({
        annoucement: annoucement,
        message: 'Ogłoszenie pobrane pomyślnie!',
        success: true,
      });
    } else {
      const error = new Error('Nie znaleziono ogłoszenia!');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.getUserAnnoucements = async (req, res, next) => {
  const user_id = req.params.userId;

  try {
    const userAnnoucement = await Announcement.find({ user_id });

    res.status(200).json({
      annoucements: userAnnoucement,
      message: 'Dane pobrane pomyślnie!',
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

exports.removeAnnoucement = async (req, res, next) => {
  const ann_id = req.params.annId;

  try {
    const annoucement = await Announcement.findById(ann_id);

    if (annoucement) {
      if (annoucement.user_id.toString() !== req.userId) {
        const error = new Error('Brak autoryzacji!');
        error.statusCode = 403;
        throw error;
      }

      const deletedAnn = await Announcement.findByIdAndDelete(ann_id);

      res.status(201).json({
        message: 'Ogłoszenie usunięte pomyslnie!',
        success: true,
      });
    } else {
      const error = new Error('Nie można znaleźć ogłoszenia.');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.addCategory = async (req, res, next) => {
  const name = req.body.name;

  try {
    const category = new Category({
      name,
    });
    const doc = await category.save();
    if (doc)
      res.status(200).json({
        message: 'Kategoria utworzona pomyślnie!',
        success: true,
      });
    else {
      const error = new Error('Wystąpił błąd podczas dodawania ogłoszenia.');
      error.statusCode = 406;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
