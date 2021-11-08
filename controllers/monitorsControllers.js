const db_connection = require("../db-connection").promise();

// INSERTING Monitors
exports.insert = async (req, res, next) => {

  if (!req.body.names || !req.body.lastsNames || !req.body.academicProgram || !req.body.semester || !req.body.identificationCard || !req.body.contactInformation) {
    return res.status(400).json({
      message: "Please fill in all the required fields.",
      fields: ["names", "lastsNames", "academicProgram", "semester", "identificationCard", "contactInformation"],
    });
  }

  try {

    const [rows] = await db_connection.execute(
      "INSERT INTO `monitors`(`names`,`lastsNames`,`academicProgram`,`semester`,`identificationCard`,`contactInformation`) VALUES(?, ?, ?, ?, ?, ?)",
      [req.body.names, req.body.lastsNames, req.body.academicProgram, req.body.semester, req.body.identificationCard, req.body.contactInformation]
    );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The monitors has been successfully inserted.",
        userID: rows.insertId,
      });
    }

  } catch (err) {
    next(err);
  }
};

// FETCHING ALL monitors
exports.getAllMonitors = async (req, res, next) => {
  try {

    const [rows] = await db_connection.execute("SELECT * FROM `monitors`");
    //se comenta esta linea por si se quiere usar a futuro para bloquear la app cuando no tenga datos el array
    // if (rows.length === 0) {
    //   return res.status(200).json({
    //     message:
    //       "There are no monitors in the database, please insert some monitors.",
    //   });
    // }

    res.status(200).json(rows);

  } catch (err) {
    next(err);
  }

};


// FETCHING SINGLE Monitor
exports.getMonitorByID = async (req, res, next) => {

  try {

    const [row] = await db_connection.execute(
        "SELECT * FROM `monitors` WHERE `id`=?",
        [req.params.id]
    );

    if (row.length === 0) {
      return res.status(404).json({
        message: "No Monitor Found!",
      });
    }

    res.status(200).json(row[0]);

  } catch (err) {
    next(err);
  }

};

// UPDATING Monitor
exports.updateMonitor = async (req, res, next) => {
  try {

    const [row] = await db_connection.execute(
        "SELECT * FROM `monitors` WHERE `id`=?",
        [req.params.id]
    );

    if (row.length === 0) {
      return res.status(404).json({
        message: "Invalid Monitor ID",
      });
    }

    if (req.body.names) row[0].names = req.body.names;

    if (req.body.lastsNames) row[0].lastsNames = req.body.lastsNames;

    if (req.body.academicProgram) row[0].academicProgram = req.body.academicProgram;

    if (req.body.semester) row[0].semester = req.body.semester;

    if (req.body.identificationCard) row[0].identificationCard = req.body.identificationCard;

    if (req.body.contactInformation) row[0].contactInformation = req.body.contactInformation;

    const [update] = await db_connection.execute(
      "UPDATE `monitors` SET `names`=?, `lastsNames`=?, `academicProgram`=?, `semester`=?, `identificationCard`=?, `contactInformation`=? WHERE `id`=?",
      [row[0].names,row[0].lastsNames,row[0].academicProgram,row[0].semester,row[0].identificationCard,row[0].contactInformation, req.params.id]
    );

    if (update.affectedRows === 1) {
      return res.json({
        message: "The Monitor has been successfully updated.",
      });
    }

  } catch (err) {
    next(err);
  }

};

// DELETING Monitor
exports.deleteMonitor = async (req, res, next) => {

  try {

    const [row] = await db_connection.execute(
        "DELETE FROM `monitors` WHERE `id`=?",
        [req.params.id]
    );

    if (row.affectedRows === 0) {
      return res.status(404).json({
        message: "Invalid Monitor ID (No Monitor Found!)",
      });
    }

    res.status(200).json({
      message: "The Monitor has been deleted successfully.",
    });
    
  } catch (err) {
    next(err);
  }

};