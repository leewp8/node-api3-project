const Users = require('../users/users-model')

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)
		if (!user) {
      res.status(404).json({ message: 'user not found'})
    } else {
      req.user = user
      next()
    }
   } catch(err) {
			res.status(500).json({
				message: 'Error retrieving the user',
			});
		};
  }


function validateUser(req, res, next) {
  if (typeof req.body.name != 'string' || req.body.name.trim() == '') {
		res.status(400).json({ message: 'missing required name field' });
		return;
	}

	req.name = req.body.name.trim()
	next();
}


function validatePost(req, res, next) {
  if (typeof req.body.text != 'string' || req.body.text.trim() == '') {
		res.status(400).json({ message: 'missing required text field' });
		return;
	}

	req.text = req.body.text.trim();
	next();
}

module.exports = {
  logger,
  validateUserId,
  validatePost,
  validateUser
}