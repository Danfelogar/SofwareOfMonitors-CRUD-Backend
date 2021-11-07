const db_connection = require("./db-connection").promise();
const { body, param, validationResult } = require("express-validator");

module.exports = {
  // All fields Validation for Monitors
    monitorsInfo: [
    body("names", "The names must be of minimum 5 characters length")
        .exists()
        .isLength({ min: 2 })
        .trim()
        .unescape()
        .escape(),

    body("lastsNames", "The lastNames must be of minimum 5 characters length")
        .exists()
        .isLength({ min: 2 })
        .trim()
        .unescape()
        .escape(),

    body("academicProgram", "The academicProgram must be of minimum 4 characters length")
        .exists()
        .isLength({ min: 4 })
        .trim()
        .unescape()
        .escape(),

    body("semester", "The semester must be of exact 2 characters length, for example: 01")
        .exists()
        .isLength({ min:2 })
        .trim()
        .isNumeric(),

    body("identificationCard", "The identificationCard must be of minimum 6 characters length")
        .exists()
        .isLength({ min: 6 })
        .trim()
        .isNumeric()
        .custom(async (value) => {
            // Checking that the identificationCard already in use or NOT
            const [row] = await db_connection.execute(
                "SELECT `identificationCard` FROM `monitors` WHERE `identificationCard`=?",
                [value]
            );
            if (row.length > 0) {
                return Promise.reject("identificationCard already in use");
            }
        }),

    body("contactInformation", "The contactInformation must be of minimum 10 characters length")
        .exists()
        .isLength({ min: 10 })
        .trim()
        .isNumeric()
        .custom(async (value) => {
            // Checking that the contactInformation already in use or NOT
            const [row] = await db_connection.execute(
                "SELECT `contactInformation` FROM `monitors` WHERE `contactInformation`=?",
                [value]
            );
            if (row.length > 0) {
                return Promise.reject("contactInformation already in use");
            }
        }),
    ],

    // All fields Validation for Monitoring
    monitoringsInfo: [
        body("matter", "The matter must be of minimum 5 characters length")
            .exists()
            .isLength({ min: 5 })
            .trim()
            .unescape()
            .escape(),
    
        body("assignedMonitor", "The assignedMonitor must be of minimum 5 characters length")
            .exists()
            .isLength({ min: 5 })
            .trim()
            .unescape()
            .escape(),
    
        body("date", "The date must be of minimum 4 characters length")
            .exists()
            .isLength({ min: 4 })
            .trim()
            .unescape()
            .custom(async (value) => {
                // Checking that the contactInformation already in use or NOT
                const [row] = await db_connection.execute(
                    "SELECT `date` FROM `monitoring` WHERE `date`=?",
                    [value]
                );
                if (row.length > 0) {
                    return Promise.reject("date already in use");
                }
            }),
    
        body("classroom", "The classroom must be of minimum 2 characters length and is alphanumeric, for example: 203b")
            .exists()
            .isLength({ min:2 })
            .trim()
            .isAlphanumeric(),
        ],

    // id Validation
    id: [param("id", "Invalid id").trim().isInt()],

  // Checking Validation Result
    result: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
        next();
    },
};