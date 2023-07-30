const register = (req, res) => {
    res.json("register");
}

const login = (req, res) => {
    res.json("login");
}

const logout = (req, res) => {
    res.json("logout");
}

module.exports = {register, login, logout};