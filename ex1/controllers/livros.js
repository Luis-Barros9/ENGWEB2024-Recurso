const Livro = require('../models/livros');

module.exports.list = () => {
  return Livro
    .find()
    .exec();
}

module.exports.findById = id => {
  return Livro
    .findById(id)
    .exec();
}

module.exports.findByCharacter = character => {
  return Livro
    .find({ characters: character })
    .exec();
}

module.exports.findByGenre = genre => {
  return Livro
    .find({ genres: genre })
    .exec();
}

module.exports.genres = () => {
  return Livro
    .distinct('genres')
    .exec();
}

module.exports.characters = () => {
  console.log("characters 2")
  return Livro
    .distinct('characters')
    .exec();
}

module.exports.insert = p => {
  var novo = new Livro(p);
  return novo.save();
}

module.exports.removeById = id => {
  return Livro.deleteOne({ _id: id });
}


module.exports.update = (id, p) => {
  return Livro
    .findByIdAndUpdate
    (id, p
      , { new: true }
    );
}
