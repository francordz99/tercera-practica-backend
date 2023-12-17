const mainController = {
    getIndex: async (req, res) => {
        res.render('index');
    },
    getProductInfo: async (req, res) => {
        res.render('productinfo');
    },
    getSupport: async (req, res) => {
        res.render('support');
    },
    getCart: async (req, res) => {
        res.render('cart');
    },
    getContact: async (req, res) => {
        res.render('contact');
    },
    getAbout: async (req, res) => {
        res.render('about');
    }
};

export default mainController;

