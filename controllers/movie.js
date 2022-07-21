const getMovies = (req, res) => {
  res.json('getMovies');
};

const createMovie = (req, res) => {
  res.json('createMovie');
};

const deleteMovie = (req, res) => {
  res.json('deleteMovie');
};

module.exports = { getMovies, createMovie, deleteMovie };
