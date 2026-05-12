const User = require('../models/User'); // it is a model in the DB, we call it due to we need the information inside it
const bcrypt = require('bcrypt'); // to encrypt the password
const jwt = require('jsonwebtoken'); // to create a token after the login

const register = async (req, res) => { // The register function
  try {
    const { fullName, email, password, confirmPassword } = req.body; // you must send all 4 fields 

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' }); // if there is any field missing -> ERROR
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ where: { email } }); // to avoid any email duplication
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // the part were the password getting encrypted

    const user = await User.create({ // store the user inside the DB
      fullName,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User registered',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => { // The login function
  try {
    const { email, password } = req.body; // you must send 2 feilds

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' }); 
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password); // ensure that the password is the same

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign( // The part were the token created
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // the purpose of it, if the user returns to the page they do not need to login again until the time limit expires (7d or a week)
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); // Getting the ID by the token

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" }); // To make sure that the new email is not duplicate
      }
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save(); // Save the new data inside the DB

    res.json({ // Return the new data
      message: "Profile updated successfully",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, getProfile, updateProfile }; 