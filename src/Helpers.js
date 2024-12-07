const path = require('path');

module.exports = class Helpers {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  getObjects() {
    return {
      date: this.date,
      ...this.getGlobalVaribales(),
      req: this.req,
    };
  }

  auth() {
    return {
      user: this.req.user,
    };
  }

  getGlobalVaribales() {
    return {
      errors: this.req.flash('errors'),
    };
  }

  viewPath(dir) {
    return path.resolve(config.layout.view_dir + '/' + dir);
  }
};
